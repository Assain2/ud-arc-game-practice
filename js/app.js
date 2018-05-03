// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    const yPositions = [232, 148, 64];
    this.x = -120;
    this.y = yPositions[Math.floor(Math.random() * yPositions.length)];
    this.speed = 0;
    this.w = 75;
    this.h = 60;

    this.addSpeed = function() {
      this.speed += Math.floor(Math.random() * 450) + 30;
    };
    this.addSpeed();

    this.reposition = function() {
      this.x = -120;
      this.y = yPositions[Math.floor(Math.random() * yPositions.length)];
      this.speed = 0;
      this.addSpeed();
    };

    this.collisionTest = function () {
      if(this.x+this.w >= player.x && this.x <= player.x+player.w && this.y >= player.y && this.y <= player.y+player.h) {
        player.x = 200;
        player.y = 400;
      }
    };

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt * this.speed;
    if (this.x > 550) {
      this.reposition();
    }
    this.collisionTest();


};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
  this.sprite = 'images/char-boy.png';
  this.x = x;
  this.y = y;
  this.h = 50;
  this.w = 50;
};


Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
  if (key === 'up' && this.y > 20) {
    this.y -= 84;
  } else if (key === 'down' && this.y < 400) {
    this.y += 84;
  } else if (key === 'left' && this.x > 4) {
    this.x -= 102;
  } else if (key === 'right' && this.x < 404) {
    this.x += 102;
  }
};


var player = new Player(200, 400);
var allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy()];
var player = player;
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
player.update = function(dt) {
};


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
