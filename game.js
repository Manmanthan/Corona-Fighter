function loadImages(){
    // Load the images for player,enemies and gem. 
    enemy_image = new Image;
    enemy_image.src = "Assets/v1.png";
    
    player_image = new Image;
    player_image.src = "Assets/superhero.png";
    
    gem_image = new Image;
    gem_image.src = "Assets/gem.png";
}

function init(){
    // Define the objects that we will have in the game.
    canvas = document.getElementById("myCanvas");
    console.log(canvas);
    W = 1000;
    H = 432;
    
    canvas.width = W;
    canvas.height = H;
    
    // Create a context
    pen = canvas.getContext('2d');
    console.log(pen);
    
    game_over = false;
    
    e1 = {
        x : 150,
        y : 50,
        w : 60,
        h : 60,
        speed : 20
    };
    e2 = {
        x : 300,
        y : 150,
        w : 60,
        h : 60,
        speed : 30
    };
    e3 = {
        x : 450,
        y : 20,
        w : 60,
        h : 60,
        speed : 40
    };
    
    enemy = [e1,e2,e3];
    
    player = {
        x : 0,
        y : H/2,
        w : 60,
        h : 60,
        speed : 40,
        moving : "false",
        health : 100
    }
    
    gem = {
        x : W-100,
        y : H/2,
        w : 60,
        h : 60
    }
    
    canvas.addEventListener('mousedown', function(){
        console.log("Mouse Pressed");
        player.moving = true;
    });
    canvas.addEventListener('mouseup', function(){
        console.log("Mouse released");
        player.moving = false;
    });
    
    
}

function isOverlap(rect1, rect2){
    if (rect1.x < rect2.x + rect2.w &&
       rect1.x + rect1.w > rect2.x &&
       rect1.y < rect2.y + rect2.h &&
       rect1.y + rect1.h > rect2.y) 
    {
        return true;
    }
    
    return false;
}

function draw(){
    // Clear the canvas area for the old frame
    pen.clearRect(0, 0, W, H);
    pen.fillStyle = "red";
    
    pen.drawImage(player_image, player.x, player.y, player.w, player.h);
    pen.drawImage(gem_image, gem.x, gem.y, gem.w, gem.h);
    
    for(let i = 0; i < enemy.length; i++){
        pen.drawImage(enemy_image,enemy[i].x, enemy[i].y, enemy[i].w, enemy[i].h); 
    }
    
    pen.fillStyle = "white";
    pen.fillText("Score" +player.health, 10, 10)
}

function update(){
    // If the player is moving.
    if(player.moving == true){
        player.x += player.speed;
        player.health += 20;
    }
    
    // Check overlap between player and enemy
    for(let i = 0; i < enemy.length; i++){
       if(isOverlap(enemy[i], player)){
           player.health -= 50;
           if(player.health < 0){
               console.log(player.health);
               game_over = true;
               alert("Game Over" + player.health);
           }
        } 
    }
    
    
    // Check Overlap between player and gem
    if(isOverlap(player, gem)){
        console.log("You have won the game");
        alert("You won the game");
        game_over = true;
        return;
    }
    
    // Update each enemy.
    for(let i = 0; i < enemy.length; i++){
        enemy[i].y += enemy[i].speed;
        if(enemy[i].y > H-enemy[i].h || enemy[i].y < 0){
            enemy[i].speed *= -1;
        }
    }
}

function gameloop(){
    if(game_over == true){
        clearInterval(f);
    }
    draw();
    update();
    console.log("In gameloop");
}

loadImages();
init();
var f = setInterval(gameloop, 100);