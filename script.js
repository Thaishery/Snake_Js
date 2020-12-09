//on récupére le canvas.
var canvas = document.getElementById('canvasSnake');
var ctx = canvas.getContext('2d');

//on définie la taille d'un carré sur notre backgroud
let box = 32;

//on définie l'interval de rafraichisement du jeu, ici 100ms.
let game = setInterval (draw,100);

//on déclare notre variable pour le serpent qui sera stoquer dans un array.
let snake = [];

//test de rendu du serpent on donnant 2 valeur a l'aray.
snake[0]={x: 9*box, y:10*box};

//on déclare la variable score: 
let score = 0;

//on initialise la viariable de direction d;
let d;

//on détecte les input: 
document.addEventListener("keydown",direction);
function direction(event){
	if(event.keyCode == 37 && d !="RIGHT"){
	d="LEFT";}
	else if(event.keyCode == 38 && d !="DOWN"){
	d="UP";}
	else if(event.keyCode == 39 && d !="LEFT"){
	d="RIGHT";}
	else if(event.keyCode == 40 && d !="UP"){
	d="DOWN";}
}

//on test avec une direction: 
// d="UP";

//on déclare notre variable de nouriture et la ramdomise avec Math.random
let food = {
	x:Math.floor(Math.random()*17+1)*box,
	y:Math.floor(Math.random()*15+3)*box};

//on déclare les resources:
//les images : 
let apple = new Image();
apple.src = "images/food.png";
let ground = new Image();
ground.src = "images/ground.png";

//les audios : 
// let upSound = new audios();
// upSound.src = "sound/up.mp3";

// cheack collision function
function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}
//on dessine le jeu via la fonction draw.
function draw(){
	//le background: 
	ctx.drawImage(ground,0,0);
	//la boucle pour dessiner le serpent: 
	for(let i=0;i<snake.length;i++){
		//verifie la cellule du serpent que l'on dessine si tete alors vert, si corp alors blanc
		ctx.fillStyle=(i==0)?"green":"white";
		ctx.fillRect(snake[i].x,snake[i].y,box,box);
	}
	//on dessine la nouriture:
	ctx.drawImage(apple,food.x,food.y);
	//on affiche le score: 
	ctx.fillStyle="white";
	ctx.font="45px Changa One";
	ctx.fillText(score,2*box,1.6*box);
	
	//on déplace le serpent:
	//on récupére la 1er valeur de l'array.
	let snakeX = snake[0].x;
	let snakeY = snake[0].y;
	//on vérifie ou ajouter la nouvelle tête.
	if (d == "LEFT"){
		snakeX -= box;}
	else if (d =="UP"){
		snakeY -= box;}
	else if (d == "RIGHT"){
		snakeX += box;}
	else if (d == "DOWN"){
		snakeY += box;}
    // si le serpent mange la nouriture.
    if(snakeX == food.x && snakeY == food.y){
        score++;
            food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
        // on ne suprime pas la queue
    }else{
        // on suprime la queue.
        snake.pop();
    }
    
    // on ajoute la nouvelle tete.
    
    let newHead = {
        x : snakeX,
        y : snakeY
    }
	//on verifie si collision: 
    if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
        clearInterval(game);
		ctx.fillStyle="Black";
		ctx.font="45px Changa One";
		ctx.fillText("Game Over",6*box,10*box);
    };
	//on affiche la nouvelle tete. 
	 snake.unshift(newHead);
}