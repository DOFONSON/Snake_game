const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const ground = new Image();
ground.src = 'img/x1562688808.png.pagespeed.ic.sjMd-A7_no.png';
ground.onload = function() {
    canvas.width = ground.width; 
    canvas.height = ground.height;  
};

const foodImg = new Image();
foodImg.src = 'img/yabloko_gd3l4sihcws4_32.png';



let box = 32;
let score = 0;

let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box,
}

let snake = []
snake[0] = {
    x: 9 * box,
    y: 10 * box
}


document.addEventListener('keydown', direction)

let dir

function direction(event){
    if (event.keyCode == 37 && dir != 'right') {
        dir = 'left'
    }
    else if (event.keyCode == 38 && dir != 'down') {
        dir = 'up'
    }
    else if (event.keyCode == 39 && dir != 'left') {
        dir = 'right'
    }
    else if (event.keyCode == 40 && dir != 'up') {
        dir = 'down'
    }
}


function drawGame() {
    ctx.drawImage(ground, 0, 0);

    ctx.drawImage(foodImg, food.x, food.y)

    for(let i = 0; i < snake.length; i++){
        if (i == 0) {
            ctx.fillStyle = 'blue'
            ctx.fillRect(snake[i].x, snake[i].y, box, box)

        }
        else{
            ctx.fillStyle = 'purple'
            ctx.fillRect(snake[i].x, snake[i].y, box, box)
        }

    }

    ctx.fillStyle = 'white'
    ctx.font = '50px sans-serif'
    ctx.fillText(score, box * 2.5, box * 1.7)


    let snakeX = snake[0].x
    let snakeY = snake[0].y


    if (snakeX == food.x && snakeY == food.y) {
        score++
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box,
        }

    } else{
        snake.pop()
    }

    if (snakeX < box || snakeX > 17*box || snakeY < 3*box || snakeY > box*17) {
        clearInterval(game)
    }

    if(dir == 'left') snakeX -= box
    if(dir == 'right') snakeX += box
    if(dir == 'up') snakeY -= box
    if(dir == 'down') snakeY += box

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    eatTale(newHead, snake)

    snake.unshift(newHead)
}




let game = setInterval(drawGame, 100);

function eatTale(head, arr){
    for (let i = 0; i < arr.length; i++) {
        if (head.x == arr[i].x && head.y == arr[i].y) {
            clearInterval(game)
            
        }
    }
}
