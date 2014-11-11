/** YEAH **/
'use strict';
var birdsGenerator = require('./models/birdsGenerator');
var particleGenerator = require('./models/particles');
var assetsLoader = require('./assetsLoader');
var particles = particleGenerator.particles;
var song, then, now, canvas,ctx, canvas2, ctx2, shown,  particlesGenerationStep, particlesDying, color, birds;


function start(){
  birds = birdsGenerator.getPackOfBirds(window.innerWidth, window.innerHeight);
  particlesGenerationStep = 'white'
  getBlueParticles();
  launchCanvas();
}

function launchCanvas(){
  $('#canvas').removeClass('hidden');

  then = Date.now();
  canvas = document.getElementById('canvas');
  canvas2 = document.getElementById('canvas2');
  
  canvas.width = window.innerWidth //Or wathever
  canvas.height = window.innerHeight; //Or wathever
  ctx = canvas.getContext('2d');
  ctx2 = canvas2.getContext('2d');

  loop();
}

var loop = function loop(){
  now = Date.now();
  var dt = now - then;
  then = now;

  clear();
  update(dt);
  render();

  requestAnimationFrame(loop);
}

function update(dt){
  updateBackgrounds(dt/1000);
  updateBirds(dt/1000);
}

function updateBackgrounds(dt){
   particles = _.compact(particles.map(function(particle){
      particle.update(dt);
      if(particle.dying && particle.remaining_life <= 0){
        return null;
      }

      if(particle.pos.x > -30  && particle.pos.x < window.innerWidth + 30 
        && particle.pos.y > -30 && particle.pos.y < window.innerHeight + 30){
        return particle;
      }else if(!particlesDying){
        //Play sound particle
        return particleGenerator.newParticle(color);
      }
    }));
 
  if(particles.length == 0){
    regenerateParticles();
  }
}

function updateBirds(dt){
  birdsGenerator.updatePackOfBirds(birds, ctx);

  birds = _.compact(birds.map(function(bird){
    bird.update(dt);
    return bird;
  }));
}

function clear(){
 // ctx.globalCompositeOperation = "source-over";
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  ctx2.canvas.width = window.innerWidth;
  ctx2.canvas.height = window.innerHeight;
  var gradient = ctx.createLinearGradient(canvas.width, canvas.height,0, 0);
 
  gradient.addColorStop(0, "rgb(84, 141, 189)");
  gradient.addColorStop(1, "rgb(99, 64, 113)");
  ctx.fillStyle = gradient;
    
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx2.clearRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = "lighter";

}

function render(){

  particles.forEach(function(particle){
    particle.render(ctx);
  });

  birds.forEach(function(bird){
    bird.render(ctx2);
  });
}

function changeAnimation(anim){
  particles = particles.map(function(p){
    p.dying = true;
    return p;
  });
  particlesDying = true;
  particlesGenerationStep = anim;
}

function regenerateParticles(){
  particlesDying = false;
  switch(particlesGenerationStep){
    case 'red':
      getRedParticles();
    break;
    case 'green':
     getGreenParticles();
    break;
    case 'brown':
      getBrownParticles();
    break;
    case 'blue':
      getBlueParticles();
    break;
    case 'yellow':
      color = {r:248,g:235,b:79};
      particles = particleGenerator.getColorParticles(color, 20,0);
    break;
    case 'white':
      color = {r:255,g:255,b:255};
      particles = particleGenerator.getColorParticles(color, 20,0);
    break;
    case 'default':
      color = null;
      particles = particleGenerator.getColorParticles(color, 20,0);
    break;
  }
}

function  getRedParticles(){
  color = {r:255,g:0,b:0};
  particles = particleGenerator.getColorParticles(color, 20, 0);
}
function  getGreenParticles(){
  color = {r:13,g:209,b:23};
  particles = particleGenerator.getColorParticles(color, 20,0);
}
function  getBrownParticles(){
  color = {r:138,g:65,b:71};
  particles = particleGenerator.getColorParticles(color, 20,0);
}
function  getBlueParticles(){
  color = {r:53,g:100,b:223};
  particles = particleGenerator.getColorParticles(color, 20,0);
}

$(document).ready(function(){
  window.loader = new PxLoader(), 
  window.backgroundImg = loader.addImage('images/birdsprite.png');

 
  loader.addCompletionListener(function() {
    
    start();
  }); 
  // begin downloading 
  loader.start(); 

  window.debugging = 0;
  $(window).on('click', function(){
    window.debugging = window.debugging < 3 ? window.debugging+1 : 0;
  });
 
});