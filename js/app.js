// Enemies our player must avoid
var Enemy = function() {

// Main properties of Enemy class
    this.sprite = 'images/enemy-bug.png';
    const yPositions = [232, 148, 64];
    this.x = -120;
    this.y = yPositions[Math.floor(Math.random() * yPositions.length)];
    this.w = 75;
    this.h = 60;
    this.speed = 0;

// Function that determines Enemy's speed property
    this.addSpeed = function() {
      this.speed += Math.floor(Math.random() * 450) + 30;
    };
    this.addSpeed();

// Function that reposition an existing instance of Enemy, making them look
// As if new instance of Enemy is created
    this.reposition = function() {
      this.x = -120;
      this.y = yPositions[Math.floor(Math.random() * yPositions.length)];
      this.speed = 0;
      this.addSpeed();
    };

// Function that returns Player instance to initial state if collision occurs
    this.collisionTest = function () {
      if(this.x+this.w >= player.x && this.x <= player.x+player.w && this.y >= player.y && this.y <= player.y+player.h) {
        alert('try again!');
        player.movePlayer();
      }
    };

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

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

// Player's character
var Player = function(x, y) {
  this.sprite = 'images/char-boy.png';
  this.x = x;
  this.y = y;
  this.h = 50;
  this.w = 50;

// Function that repositions player
  this.movePlayer = function() {
    player.x = 200;
    player.y = 400;
  }

// Function that chcecks if player met the win condition
  this.checkGoal = function() {
    if (player.y === (-20)) {
      this.movePlayer();
      alert('you did it!');
    }
  }

};

// Draw player instance on the screen
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Keys input handler
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

// Instantiating Player and Enemy objects
var player = new Player(200, 400);
var allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy()];

// Updating player's position
Player.prototype.update = function(dt) {
  this.checkGoal();

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
