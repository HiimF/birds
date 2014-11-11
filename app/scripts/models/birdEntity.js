var Victor = require('victor');
var utils = require('../utils');
var sprite = require('../sprite');
var entity = require('./entity');
var assetsLoader = require('../assetsLoader');

function birdEntity(opts){
  opts.x = opts.x || 100;
  opts.y = opts.y || window.innerHeight/2;
  opts.speedY = opts.speed || -200;
  opts.speedX = opts.speed || -200;

  entity.prototype.constructor.call(this, opts);
  this.color = opts.color || 'black';
  this.colorFancy = utils.randomRGBColor();
  this.angle = opts.angle || 0;
  this.destinyAngle = this.angle;
  this.size = opts.size || 10;
  this.repulsionRadius = 25;
  this.aligmentRadius = 50;
  this.atractionRadius = 200;
  this.sightRadius = 300;
  this.sprite = new sprite(window.backgroundImg);
  this.sprite.addAnimation('flap', [0,1,2,1,0,1,2,3,4,5], [10,10], 5);
  this.sprite.playAnimation('flap');
}

birdEntity.prototype = new entity({x: 0, y : 0});
birdEntity.prototype.constructor = birdEntity;
birdEntity.prototype.parent = entity.prototype;

birdEntity.prototype.render = function(ctx){

  if(window.debugging > 1 ){
    //Attraction  zone
    ctx.beginPath();
    ctx.fillStyle = 'rgba(42, 250, 33, 0.10)';
    ctx.arc(this.pos.x, this.pos.y, this.atractionRadius, Math.PI*2, false);
    ctx.fill();

    //Alignment  zone
    ctx.beginPath();
    ctx.fillStyle = 'rgba(33, 42, 250, 0.20)';
    ctx.arc(this.pos.x, this.pos.y, this.aligmentRadius, Math.PI*2, false);
    ctx.fill();

    //Repulsion zone
    ctx.beginPath();
    ctx.fillStyle = 'rgba(250, 33, 33, 0.30)';
    ctx.arc(this.pos.x, this.pos.y, this.repulsionRadius, Math.PI*2, false);
    ctx.fill();
  }

  //Bird
  ctx.fillStyle = this.leader === true ? 'red' : this.color;

  if(window.debugging == 2){
    ctx.beginPath();
    this.opacity = 0.8;
    //a gradient instead of white fill
    var gradient = ctx.createRadialGradient(this.pos.x, this.pos.y, 0, this.pos.x, this.pos.y, this.size);
    gradient.addColorStop(0, "rgba("+this.colorFancy.r+", "+this.colorFancy.g+", "+this.colorFancy.b+", "+this.opacity+")");
    gradient.addColorStop(0.5, "rgba("+this.colorFancy.r+", "+this.colorFancy.g+", "+this.colorFancy.b+", "+this.opacity+")");
    gradient.addColorStop(1, "rgba("+this.colorFancy.r+", "+this.colorFancy.g+", "+this.colorFancy.b+", 0)");
    ctx.fillStyle = gradient;
    ctx.arc(this.pos.x, this.pos.y, this.size, Math.PI*2, false);
    ctx.fill();   
  }

  this.sprite.render(ctx, this.pos.x, this.pos.y, 20, 20, this.angle);

}

birdEntity.prototype.update = function(dt){
  this.sprite.update(dt);
  
  //Only applies for leaders
  if(this.destinyAngle && this.destinyAngle != this.angle){
    if(this.angle < this.destinyAngle){
      this.angle = (this.angle + dt) > this.destinyAngle ? this.destinyAngle : (this.angle + dt);
    }else{
      this.angle = (this.angle - dt) < this.destinyAngle ? this.destinyAngle : (this.angle - dt);
    }
    //Uncomment for weird movement
    //this.angle = this.destinyAngle * dt;
    //this.speed.rotateDeg(this.angle);
  }
  
  var speedDt = new Victor(this.speed.x, this.speed.y).multiply(new Victor(dt, dt)).rotateDeg(this.angle);
  
  this.pos = this.pos.add(speedDt);

  //Check borders
  if(this.pos.x > window.innerWidth){
    this.pos.x = 0;
  }else if(this.pos.x < 0){
    this.pos.x = window.innerWidth;
  }
  if(this.pos.y > window.innerHeight){
    this.pos.y = 0;
  }else if(this.pos.y < 0){
    this.pos.y = window.innerHeight;
  }
}

module.exports = birdEntity;