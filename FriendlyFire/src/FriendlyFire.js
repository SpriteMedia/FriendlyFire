var canvas = document.getElementById("canvas");    // Creates a link to the canvas element in HTML
canvas.width = 1280; 							  // Sets the canvas width to 640 px. Note that it's a regular property not accessing the .style
canvas.height = 640;	
var surface = canvas.getContext("2d");

//--------------------------PLAYER DATA ----------------------------------------
var playerOne = {img:null, x:0, y: 512, speed: 10};  //playerOne data
//var playerTwo = {img:null, x:100, y: 576, speed: 10}; //playerTwo date
var up = false;
var down = false;
var left = false;
var right = false;
var playerSprite = 0;
var maxSprite = 11;
var minSprite = 0;
var spriteCount = 0;
var fps = 2;


//--------------------------PLAYER DATA ----------------------------------------

var images = ["empty","playerTwo", "dirt", "grass" ,"grasstop", "door", "dooropen","monster"];
var sprites = [];
const SIZE = 64; 
var map = {
	rows: 10,	
	cols: 20,
	tiles:
	[
		[4,2,4,4,4,2,4,4,4,4,4,2,4,4,4,2,4,4,2,4],
		[0,4,0,0,0,4,0,0,0,0,0,4,0,0,0,4,0,0,4,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,3,0,0,7,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,6,0,0,0,0],
		[0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,3,0,0,0,0],
		[0,0,0,5,0,3,0,0,2,0,0,0,0,0,2,2,2,0,0,0],
		[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
		
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

//==================INITIALIZE SPIRTES =====================
for (var i = 0; i < images.length; i++)
{
	sprites[i] = new Image();
	sprites[i].src = '../img/'+images[i]+'.png';
}

playerOne.img = sprites[1];
//==========================================================


//======================CAMERA==============================

//==========================================================

function update()
{
	animatePlayer(); 
	playerController();
	//scrollMap();
	render();
	
}

function onKeyDown(event)
{
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
			
		//ADD PLAYER 2 INPUT
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
	if (playerOne.x > 0 && left == true)
		playerOne.x -= playerOne.speed;
	if (playerOne.x < canvas.width-SIZE && right == true)
		playerOne.x += playerOne.speed;
	if (playerOne.y > 0 && up == true)
		playerOne.y -= playerOne.speed;
	if (playerOne.y < canvas.height-SIZE && down == true)
		playerOne.y += playerOne.speed;
}


function animatePlayer() 
{
	playerSprite++;
	if(playerSprite == maxSprite){
		
		if(right || left)
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

/*function scrollMap() 
{
	// Iterate through all the tiles in map.
	for (var row = 0; row < map.rows; row++)
	{
		for (var col = 0; col < map.cols; col++)
		{
			map[row][col].x -= scrollSpeed; // Subtract speed from tile's x.
		}
	}
}*/



function render()
{
		surface.clearRect(0,0,canvas.width,canvas.height);
		
		for (var r = 0; r < map.rows; r++)
		{
			for (var c = 0; c < map.cols; c++)
			{
				surface.drawImage(sprites[map.tiles[r][c]], c * SIZE , r * SIZE, SIZE, SIZE );
			}
		}	
		surface.drawImage(playerOne.img, SIZE*playerSprite, 0, SIZE, SIZE, playerOne.x, playerOne.y, SIZE, SIZE);
}