# BIRDS

I allways been fascitaned about the movement of animals in groups. 
Sometimes I need to be alone and stop listening the noises of the city, and then I find myself sitting on the middle of nature, finding the pace I need.

On one of those times I thought that it could be great to translate the bird's dance into a canvas, and be able to see it whenever I want.


#Flocking

Quoting wikipedia:

> Flocking behavior is the behavior exhibited when a group of birds, called a flock, are foraging or in flight. There are parallels with the shoaling behavior of fish, the swarming behavior of insects, and herd behavior of land animals.
 Computer simulations and mathematical models which have been developed to emulate the flocking behaviors of birds can generally be applied also to the "flocking" behavior of other species. As a result, the term "flocking" is sometimes applied, in computer science, to species other than birds.

## Rules

1. Separation, birds mantain a minimum distance between members.
2. Aligment,  steer towards average heading of neighbors
3. Cohesion, steer towards average position of neighbours
4. Leader, one of the members of the pack becomes the leader, and has the chance to change direction. Randomnly various members of the pack can become leaders when the movement separates the group in various. 
5. Fear, fear randomly can change the initial movement of the pack
6. Low number of interaction partners. Birds modelate their rules by the 7 nearest birds.

## Implementation
Wrote directly on canvas, bundled with browserify.
[VictorJS](http://victorjs.org/) as the vector 2D library
[ReactJS](http://facebook.github.io/react/) for rendering templates
Feel free to use, modify or share any part of this code.

## References
Heaton Research for his open source examples about [flocking with JavaScript](http://www.heatonresearch.com/fun/flock), which served me for having a better algorithm.

Wikipedia articles about [flocking](http://en.wikipedia.org/wiki/Flocking_(behavior)), [Swarm Behaviour](http://en.wikipedia.org/wiki/Swarm_behaviour#Models),  [Nearest neighbor search](http://en.wikipedia.	org/wiki/Nearest_neighbor_search),  

## Contributing
Is a good thing to do ;)