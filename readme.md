#Asteroids
A 2D Spaceship-Shooter Browser Game
##Overview
Asteroids uses the HTML5 Canvas element to draw to the browser. A game loop calls the draw method on the game which in turn calls a draw method on every game object every 20 milliseconds (50 fps). This game is written in javascript.
##Objects
###GameView
The GameView is instantiated directly on the page and passed the canvas element to be drawn on as well as the document dimensions. The gameView will create a game with the proper dimensions begin the game loop when the start method is invoked. The start method calls draw on the game in a setInterval loop. The gameView defines the basic key bindings to pause the game, activate shield, and modify the acceleration of the ship.
###Game
The Game object holds on to every game object and the game draw method simply calls draw on each object. Game keeps track of remaining lives, draws text to the screen for lives left, shield life etc. and is responsible for checking collisions in the checkCollisions method.

The checkCollisions method calls the isCollidedWith method on each game object to see if it has collided with another object.
###MovingObject
The MovingObject prototype is used as a parent class for every object in the Asteroids game that moves. MovingObject defines a simple draw method for a circular object (this is overwritten in non-circular obejcts such as the shiip), the Move method which shifts the objects position based on velocity (speed & direction), isCollidedWith which compares the position of an object to another provided object.
###Asteroid
Asteroid inherits from MovingObject and defines a spawnChildren method which creates smaller asteroids. spawnChildren is called from the game object in the checkCollisions method when an asteroid has been destroyed.
###Ship
The Ship redefines the draw method so that it is a triangle. The Ship also redefines the isCollidedWith method to accommodate its new shape. To take advantage of the circular shape of asteroids and their existing isCollidedWith methods, the Ship's isCollidedWith defines circular hitboxes at various points along the Ship's exterior. The decay method on ship slows the ship down - this produces the slowing effect noticeable if no arrow keys are pressed.
###Shield
The Shield object exists on the ship. It's move method sets it's position to be the same as the ship. The decay method shrinks or grows the radius depending on the isOn status which is set by the keybinding for 'z'.
