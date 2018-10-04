let game = true;
// Modal:
const modal = document.getElementById('winnerModal');
const span = document.getElementsByClassName("close")[0];
const playAgain = document.getElementById("playAgain");

const modalstart = document.getElementById('startModal');
const startgame = document.getElementById("startGame");

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.height = 65; //pixels
    this.width = 95;
    this.collision = false;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    //If enemies are outside of the screen, send them back in via a random number:
    if (this.x > ctx.canvas.width + this.width) {
        this.x = -300 * Math.floor(Math.random() * 4) + 1;
    } else { //otherwise, they must simply move across the screen:
        this.x += this.speed * dt;
    }

    if (collision(player.x, player.y, player.width, player.height, this.x, this.y, this.width, this.height)) {
        this.collision = true;
        if (player) {
            player.x = 202;
            player.y = 400;
        } else {
            this.collision = false;
        }
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

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
    //40 height and above is the location of the top row (Water row)
    if (game && player.y < 40) {
        game = false;
        //allEnemies = [];
        winCondition();
    }
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
    const horizontal = 101;
    const vertical = 83;
    if (direction === 'left' && this.x - horizontal >= 0) {
        this.x -= horizontal;
    } else if (direction === 'right' && this.x + horizontal < ctx.canvas.width) {
        this.x += horizontal;
    } else if (direction === 'up' && this.y - vertical > 0 - player.height) {
        this.y -= vertical;
    } else if (direction === 'down' && this.y + vertical < ctx.canvas.height - 200) {
        this.y += vertical;
    }
};

//const enemyPosition = [65, 150, 230, 315];
// Place the player object in a variable called player
const player = new Player(202, 400, 'images/char-boy.png');
//map creates new array.
// let allEnemies = enemyPosition.map((y, index) => {
//     return new Enemy( (-300 * (index + 1)), y);
// });
const bugRow1 = new Enemy(-100, 65, 250);
const bugRow2 = new Enemy(-300, 150, 500);
const bugRow3 = new Enemy(-300, 230, 300);
const bugRow4 = new Enemy(-300, 315, 400);

const allEnemies = [];
allEnemies.push(bugRow1, bugRow2, bugRow3, bugRow4);

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//player x coord, player y coord, player width, player height, 
//enemy x, enemy y coord, enemy width, enemy height
function collision(px, py, pw, ph, ex, ey, ew, eh) {
    //If the two characters are within proximity of each other then they collide (= true).
    return (Math.abs(px - ex) * 2 < pw + ew) && (Math.abs(py - ey) * 2 < ph + eh);
}

function winCondition() {
    modal.style.display = "block";
}

function reset() {
    //Reset player
    player.x = 202;
    player.y = 400;
    game = true;
}

// When the user clicks on "x", close the modal.
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it.
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Restart game.
playAgain.onclick = function() {
    modal.style.display = "none";
    reset();
}

function welcomeModal() {
    modalstart.style.display = "block";
}

startgame.onclick = function() {
    modalstart.style.display = "none";
    reset();
}