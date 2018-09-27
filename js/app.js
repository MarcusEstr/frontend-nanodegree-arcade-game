let debug = false;
let game = true;
// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.height = 65; //pixels
    this.width = 95;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += 150 * dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, image) {
    //This image/sprite is for our player character
    //This uses a helper to easily load images.
    this.sprite = image;
    this.x = x;
    this.y = y;
    this.height = 75;
    this.width = 65;
};

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
    const horizontal = 101;
    const vertical = 83;
   console.log('before if - x axis: ', this.x);
    if (direction === 'left' && this.x - horizontal >= 0) {
        this.x -= horizontal;
    } else if (direction === 'right' && this.x + horizontal < ctx.canvas.width) {
        this.x += horizontal;
    } else if (direction === 'up' && this.y - vertical >= 0) {
        this.y -= vertical;
    } else if (direction === 'down' && this.y + vertical < ctx.canvas.height - 200) {
        this.y += vertical;
    }
    console.log('after if - x axis: ', this.x);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
//var player = new Player();
//var allEnemies = [new Enemy()]; 

const enemyPosition = [55, 140, 230];
const player = new Player(202, 400, 'images/char-boy.png');
const allEnemies = enemyPosition.map((y, index) => {
    return new Enemy( (-100 * (index + 1)), y);
});
// Place the player object in a variable called player


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
