//snake properties
playerX = playerY = 3;
tail = 3;
tailPositions = [];
//velocity in each direction;
velocityX = velocityY = 0;
//apple position
appleX = appleY = 15;
//determine the amount of tiles in the playfield 10 x 60, can be resized later
gridsize = 10;
tilecount = 60
//Highscore variables
highscore = 0;
//Toggle difficulties
gamespeed = 150;
//Check for active game
playing = true;
buttonpushed = false;

//Get Canvas and its context








function draw() {
    canvas = document.getElementById('playfield');
    ctx = canvas.getContext('2d');

    if (playing) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        //Dynamically adjust snake size tiles
        console.log("geschwindigkeit ist " + gamespeed);

        tilecount = canvas.width / gridsize;


        //move head
        playerY += velocityY;
        playerX += velocityX;
        //Make torus board
        if (playerX < 0) {
            playerX = tilecount - 1;
        }
        if (playerY < 0) {
            playerY = tilecount - 1;
        }
        if (playerX > tilecount - 1) {
            playerX = 0;
        }
        if (playerY > tilecount - 1) {
            playerY = 0;
        }



        //spawn snake
        ctx.fillStyle = "green";
        for (var i = 0; i < tailPositions.length; i++) {
            console.log("Positionen " + tailPositions[i].x + " " + tailPositions[i].y);

            ctx.fillRect(tailPositions[i].x * gridsize, tailPositions[i].y * gridsize, gridsize - 2, gridsize - 2);
            if (tailPositions[i].x == playerX && tailPositions[i].y == playerY) {
                tail = 3;
                if (buttonpushed && playing) {


                    gameOver();


                }



            }
        }
        console.log("Ingame " + velocityX + " " + velocityY);

        tailPositions.push({ x: playerX, y: playerY });



        //for(var i = tail; i < tailPositions.length; i++)
        while (tailPositions.length > tail) {
            // ctx.clearRect(tailPositions[i].x, tailPositions[i].y, gridsize, gridsize);
            tailPositions.shift();
        }



        //eat apple and spawn new one
        if (appleX == playerX && appleY == playerY) {

            tail++;
            appleX = Math.floor(Math.random() * tilecount);
            appleY = Math.floor(Math.random() * tilecount);
        }
        ctx.fillStyle = "red";
        ctx.fillRect(appleX * gridsize, appleY * gridsize, gridsize - 2, gridsize - 2);
        document.getElementById('score').innerHTML = "Score: " + (tail - 3);


        if ((tail - 3) > highscore) {
            highscore = (tail - 3);
        }
        document.getElementById('highscore').innerHTML = "Highscore: " + highscore;

    }
}

function startGame(difficulty) {
    canvas = document.getElementById('playfield');
    ctx = canvas.getContext('2d');


    playing = true;

    document.getElementById('startContainer').style.visibility = 'hidden';
    document.getElementById('gameOver').style.visibility = 'hidden';
    if (difficulty == 3) {
        gamespeed = 60;
    }
    if (difficulty == 2) {
        gamespeed = 100;
    }
    if (difficulty == 1) {
        gamespeed = 150;
    }
    startGame();


}
function startGame() {
    playing = true;
    document.getElementById('startContainer').style.visibility = 'hidden';
    document.getElementById('gameOver').style.visibility = 'hidden';
    setInterval(() => {
        draw();


    }, gamespeed);
}


function gameOver() {
    playing = false;
    buttonpushed = false;
    canvas = document.getElementById('playfield');
    ctx = canvas.getContext('2d');

    velocityX = velocityY = 0;

    if ((tail - 3) > highscore) {
        highscore = (tail - 3);
        docuument.getElementById('tryAgain').style.visibility = 'hidden';
    }
    else {
        document.getElementById('highscoreBroken').style.visibility = 'hidden';
    }
    document.getElementById('highscore').innerHTML = "Highscore: " + highscore;
    var gameOVerScreen = document.querySelector('.gameOverContainer');
    gameOVerScreen.style.visibility = "visible";
}


function resizeWindow() {
    sqaure = 400;
    if (window.outerHeight <= window.outerWidth) {
        sqaure = window.outerHeight;
    }
    else {
        sqaure = window.outerWidth;
    }
    sqaure -= 200;
    Math.round(sqaure);
    while ((sqaure % gridsize) != 0) {
        sqaure--;
        console.log(sqaure);
    }
    ctx.canvas.width = sqaure;
    ctx.canvas.height = sqaure;

}
window.addEventListener('resize', resizeWindow);
window.addEventListener('deviceorientation', function (event) {


    //if (window.innerWidth > window.innerHeight) {
        if (event.gamma > 2) {
            // if (!(velocityY == 1)) {
            velocityY = -1;
            velocityX = 0;
            //}

        } else if (event.gamma < -2) {
            //  if (!(velocityY == -1)) {
            velocityY = 1;
            velocityX = 0;
        }
        //  }

        if (event.beta > 2) {
            //   if (!(velocityX == -1)) {
            velocityY = 0;
            velocityX = 1;
            //   }
        } else if (event.beta < -2) {
            //if (!(velocityX == 1)) {
            velocityY = 0;
            velocityX = -1;
            // }
        }
        buttonpushed = true;
        document.getElementById('helper').innerHTML = event.beta + " " + event.gamma;
    //}
}, true);


window.addEventListener('keydown', function (e) {

    if (e.keyCode == 87 || e.keyCode == 38) {  //W, arrowup

        if (!(velocityY == 1)) {
            velocityX = 0;
            velocityY = -1;
        }

        console.log(velocityX + " " + velocityY);
    }
    if (e.keyCode == 65 || e.keyCode == 37) {  //A, arrowleft
        if (!(velocityX == 1)) {
            velocityX = -1;
            velocityY = 0;
        }
        console.log(velocityX + " " + velocityY);
    }
    if (e.keyCode == 83 || e.keyCode == 40) {  //S, arrowdown
        if (!(velocityY == -1)) {
            velocityX = 0;
            velocityY = 1;
        }
        console.log(velocityX + " " + velocityY);
    }
    if (e.keyCode == 68 || e.keyCode == 39) {  //D, arrowright
        if (!(velocityX == -1)) {
            velocityX = 1;
            velocityY = 0;
        }

        console.log(velocityX + " " + velocityY);
    }
    buttonpushed = true;
})

