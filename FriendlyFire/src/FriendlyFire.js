var canvas = document.getElementById("canvas");    // Creates a link to the canvas element in HTML
canvas.width = 1280; 							  // Sets the canvas width to 640 px. Note that it's a regular property not accessing the .style
canvas.height = 640;	
var surface = canvas.getContext("2d");



//██████████████████████████████PLAYER DATA █████████████████████████████████████████████
var playerOne = {img:null, x:580, y: 132, speed: 10};  //playerOne data
//var playerTwo = {img:null, x:100, y: 576, speed: 10}; //playerTwo date
var up = false;
var down = false;
var left = false;
var right = false;
var off = false;	
var playerSprite = 0;
var minSprite = 0;
var maxSprite = 11;
var spriteCount = 0;
var fps = 2;
var textcount = 0;//used for going to next text
var talking = false;

var shop = {img:null , x: 500, y: 168};
var shopkeep = {img:null, x:canvas.width/2, y:canvas.height/2};
var door1 = {img:null , x: 1150, y: 128};




//██████████████████████████████PLAYER DATA █████████████████████████████████████████████

var images = ["grass", "playerOne", "Door", "empty", "shop", "Shopkeep"];
var sprites = [];
const SIZE = 64; 
var map = {
	rows: 10,
	cols: 20,
	tiles:
	[
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		[1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1],
		[1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1],
		[1,1,1,3,3,3,1,1,1,1,1,1,1,1,3,3,3,1,1,1],
		[1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1],
		[1,3,3,1,1,1,3,3,3,3,3,3,3,3,1,1,1,3,3,1],
		[1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1],
		[1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1],
		[1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		
	],
	


	
}

var indexX = parseInt(playerOne.x/SIZE);
var indexY = parseInt(playerOne.y/SIZE);
var canMove = true;
var posX = 0;
var posY = 0;


window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);

setInt = setInterval(update, 33.34);

//██████████████████████████████INITIALIZE SPIRTES ██████████████████████████████
for (var i = 0; i < images.length; i++)
{
	sprites[i] = new Image();
	sprites[i].src = '../img/'+images[i]+'.png';
}

playerOne.img = sprites[1];
shopkeep.img = sprites[3];
shop.img = sprites[4];
door1.img = sprites[2]
//████████████████████████████████████████████████████████████




//████████████████████████████████████████████████████████████

function update()
{
	animatePlayer(); 
	playerController();
	doorInteract();
	interactCollision();
	draw();
	render();
	textBox();
}

function onKeyDown(event)
{
	if(playerOne.img != sprites[3]) { //make this more efficient 
		switch (event.keyCode)
		{
		
		case 65: //A
			left = true;			
			break;
		case 68: //D
			right = true;
			break;
		case 87: //W
			up = true;
			break;
		case 83: //S
			down = true;
			break;
		//ADD PLAYER 2 INPUT unless menu
		
		}
	}
	else if(playerOne.img = sprites[3])
	{
	switch (event.keyCode)
	{
		case 32:
		console.log("keypress");
		textcount++;
			break;
	}
	}
	
}

function onKeyUp(event)
{
	switch (event.keyCode)
	{
		case 65: //A
			left = false;
			break;
		case 68: //D
			right = false;
			break;
		case 87: //W
			up = false;
			break;
		case 83: //S
			down = false;
			break;	
			
		//ADD PLAYER 2 INPUT
	}
}

function playerController() 
{
	if (left == true)
		playerOne.x -= playerOne.speed;
	if (right == true)
		playerOne.x += playerOne.speed;
	if (up == true)
		playerOne.y -= playerOne.speed;
	if (down == true)
		playerOne.y += playerOne.speed;
}
//██████████████████████████████Text Box██████████████████████████████
//fix up text box. its hard coded on only one text box because of the variable
//textcount is being checked if it's completed then reseting to -1 by a text.length +3
//figure out how to create text in the canvas
//enable(playerOne, 1, 100,100);// this changes the spawn of his location and changes his sprite back to normal (object, sprite#, x, y)
function textBox()
{
	if(talking)
	{
		var text = ["Hello fellow hunters.", "I'm about to send you on a dangerous mission." ,
				"I don't know what mission because i didn't think this through","comeback again when i have figured it out",
				"Goodbye"];
		if(textcount < text.length)
		{
			for(var next = 0; next < text.length; next++)
			{
	
				if(textcount == next)
				{
					surface.fillStyle = 'grey';
					surface.fillRect(368,390,550,180);
					surface.strokeRect(360,382,568,196);
					surface.font = "20px Georgia";
					surface.fillStyle = 'white';
					surface.fillText(text[textcount], 373, 420);
				
				}

			}
		}
		else if(textcount == text.length)
		{
			console.log(textcount);
			enable(playerOne, 1, 100,100);// this changes the spawn of his location and changes his sprite back to normal (object, sprite#, x, y)
			textcount -= text.length;
			shopkeep.img = sprites[3]
			shop.img = sprites[4];
			talking = false;
			console.log(textcount);
			
			
		}
	}
}
//████████████████████████████████████████████████████████████████████████
function animatePlayer() 
{
	playerSprite++; 
	if(playerSprite == maxSprite)
	{
		if(right||left)
		{
			minSprite = 12;
			maxSprite = 29;
		}
		else
		{
			minSprite = 0;
			maxSprite = 11;
		}
		playerSprite = minSprite;
		
	}
}
//██████████████████████████████CAMERA██████████████████████████████
function clamp(value, min, max){
    if(value < min) return min;
    else if(value > max) return max;
    return value;
}

function draw() {
    surface.setTransform(1,0,0,1,1,0);//reset the transform matrix as it is cumulative
    surface.clearRect(0, 0, canvas.width, canvas.height);//clear the viewport AFTER the matrix is reset

    //Clamp the camera position to the world bounds while centering the camera around the player                                             
    var camX = clamp(-playerOne.x + canvas.width/2, -2000, 0);
    var camY = clamp(-playerOne.y + canvas.height/1.25, -map.row, 0);

    surface.translate( camX, camY );    

    //Draw everything
}
//████████████████████████████████████████████████████████████
/*
function collision()
{
	if(player.x && player.y > map.tiles[1])
	{
		
	}
	

}
*/
function doorInteract()
{
	if(playerOne.x < door1.x + 64 && playerOne.x > door1.x && playerOne.y < door1.y + 64 && playerOne.y > door1.y)
	{
		playerOne.img = sprites[3];
		var imported = document.createElement("script")
		imported.src = "testone.js";//this runs the second script
		document.head.appendChild(imported);
		
	}
	
}

function interactCollision()//this is where it checks for shop collision and makes sprites appear and disappear
{
	if(playerOne.x < shop.x + 384 && playerOne.x > shop.x && playerOne.y < shop.y + 384 &&  playerOne.y > shop.y)
	{
		playerOne.img = sprites[3];
		shopkeep.img = sprites[5]
		shop.img = sprites[3];
		talking = true;
	}
}

function enable (object, sprite, x, y)
{
	object.img = sprites[sprite];
	object.x = x;
	object.y = y;
}
function render()
{
		surface.clearRect(0,0,canvas.width,canvas.height);
		
		for (var r = 0; r < map.rows; r++)
		{
			for (var c = 0; c < map.cols; c++)
			{
				
				if(map.tiles[r][c] == 1){
					surface.drawImage(sprites[0], c * SIZE , r * SIZE, SIZE, SIZE );
				}
				if(map.tiles[r][c] == 2){
					surface.drawImage(sprites[2], c * SIZE , r * SIZE, SIZE, SIZE );
				}
				if(map.tiles[r][c] == 3){
					surface.drawImage(sprites[3], c * SIZE , r * SIZE, SIZE, SIZE );
				}
			}
		}	
		surface.drawImage(door1.img, 0, 0, SIZE, SIZE, 1150, 128, SIZE, SIZE);
		surface.drawImage(playerOne.img, SIZE*playerSprite, 0, SIZE, SIZE, playerOne.x, playerOne.y, SIZE, SIZE);
		surface.drawImage(shop.img, 0, 0, 128*3, 128*3, shop.x, shop.y, 128*3, 128*3);
		surface.drawImage(shopkeep.img, 0, 0, 187, 300, canvas.width/2 - 187/2,canvas.height/7, 187, 300);
			
		
}