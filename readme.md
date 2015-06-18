#Asteroids
A 2D Spaceship-Shooter Browser Game
[galaxyshooter.space to play](www.galaxyshooter.space)

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
###Bullet
The Bullet object is created with a keybinding to the 'spacebar' with a position equal to the ship's point. The Bullet inherits from MovingObject. The decay method on Bullet reduces its life to ensure that it will be removed after a constant period of time.
##Background
####maxFunc()
Returns the number of planets to be added each time addPlanets is called. Return a constant number for symmetry. Changing this by 1 unit produces different visual patterns. As this number gets larger, the number of movingObjects the game must render increases significantly. You can get very interesting results by sending a dynamic function that, say, returns different numbers depending on this.count.
####countChange
countChange is the modifier for the count variable that is used when calculating the angle to give to the next newly generated planet. Adjusting the countChange has a big effect on the visual pattern produced. This number affects the rotating effect, and certain values can eliminate the rotation.
####modConstant
modConstant changes how frequently the background will add planets (by setting the value that the count var is modded by). Increasing this number will reduce how often planets are added.
