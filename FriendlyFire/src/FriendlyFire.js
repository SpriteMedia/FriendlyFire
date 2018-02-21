var canvas = document.getElementById("canvas");    // Creates a link to the canvas element in HTML
canvas.width = 1280; 							  // Sets the canvas width to 640 px. Note that it's a regular property not accessing the .style
canvas.height = 640;	
var surface = canvas.getContext("2d");

//--------------------------PLAYER DATA ----------------------------------------
var playerOne = {img:null, x:0, y: 300, speed: 10, sizeX: 64, sizeY: 64, jumping : false, y_velocity: 0, x_velocity: 0, falling: true};  //playerOne data 
var up = false;
var down = false;	
var left = false;
var right = false;
var playerSprite = 0;
var maxSprite = 11;
var minSprite = 0;
var spriteCount = 0;
var fps = 2;

var playerTwo = {img:null, x:0, y: 215, speed: 10};
var up2 = false;
var down2 = false;
var left2 = false;
var right2 = false;
var playerTwoSprite = 0;
var minSprite2 = 0;
var maxSprite2 = 11;


var ground = 520;
//--------------------------PLAYER DATA ----------------------------------------


var images = ["empty","playerTwo", "dirt", "grass" ,"grasstop", "door", "dooropen","monster", "purplecoin", "playerOne"];
var sprites = [];
const SIZE = 64; 
var map = {
	rows: 21,	
	cols: 40, 
	tiles:
	[
		[4,2,4,4,4,2,4,4,4,4,4,2,4,4,4,2,4,4,2,4,4,2,4,4,4,2,4,4,4,4,4,2,4,4,4,2,4,4,2,4],
		[0,4,0,0,0,4,0,0,0,0,0,4,0,0,0,4,0,0,4,0,0,4,0,0,0,4,0,0,0,0,0,4,0,0,0,4,0,0,4,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,3,0,0,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,7,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,6,0,0,0,0],
		[0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,3,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,5,0,3,0,0,2,0,0,0,0,0,2,2,2,0,0,0],
		[3,3,3,2,2,2,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
		[0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,6,0,0,0,0],
		[0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,3,0,0,0,0],
		[0,0,0,5,0,3,0,0,2,0,0,0,0,0,2,2,2,0,0,0,0,0,0,5,0,3,0,0,2,0,0,0,0,0,2,2,2,0,0,0],
		[2,2,2,2,2,2,2,2,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,3,0,0,0,0],
		[0,0,0,5,0,3,0,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,5,0,3,0,0,2,0,0,0,0,0,2,2,2,0,0,0],
		[2,2,2,2,2,2,2,2,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,6,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,3,0,0,0,0],
		[0,0,0,5,0,3,0,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,5,0,3,0,0,2,0,0,0,0,0,2,2,2,0,0,0],
		[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
	],
	
};


var coin = {img:null, x: 960, y: 360};
var coinSprite = 0;
var coinMax = 16;


window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);

setInt = setInterval(update, 33.34);

//==================INITIALIZE SPIRTES =====================
for (var i = 0; i < images.length; i++)
{
	sprites[i] = new Image();
	sprites[i].src = '../img/'+images[i]+'.png';
}

playerOne.img = sprites[9];
playerTwo.img = sprites[1];
coin.img = sprites[8];
//==========================================================



function update()
{
	animatePlayer(); 
	animatePlayer2(); 
	animateCoin();
	playerController();
	//Jump]();
	draw();
	render();
}

function onKeyDown(event)
{
	switch (event.keyCode)
	{
		//Player 1
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
			
		//Player 2
		case 37: 
			left2 = true;			
			break;
		case 39: 
			right2 = true;
			break;
		case 38: 
			up2 = true;
			break;
		case 40: 
			down2 = true;
			break;
	}
}

function onKeyUp(event)
{
	switch (event.keyCode)
	{
		//Player 1
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

			
		//Player 2
		case 37: 
			left2 = false;
			break;
		case 39: 
			right2 = false;
			break;
		case 38: 
			up2 = false;
			break;
		case 40: 
			down2 = false;
			break;
	}
}


//==================ANIMATION============================
function animatePlayer() 
{
	playerSprite++;
	if(playerSprite == maxSprite)
	{
		
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

function animatePlayer2() 
{
	playerTwoSprite++;
	if(playerTwoSprite == maxSprite2)
	{
		if(right2 || left2)
		{
			minSprite2 = 12;
			maxSprite2 = 29;
		}
		else 	
		{
			minSprite2 = 0;
			maxSprite2 = 11;
		}
		playerTwoSprite = minSprite2;
	}
}

function animateCoin ()
{
	coinSprite++;
	if(coinSprite == coinMax)
		coinSprite = 0;
}
//======================CAMERA==============================


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

//==========================================================

//=====================collision============================

function playerController() 
{
	if (playerOne.x > 0 && left == true && rayCastCheck(playerOne, 10, playerOne.speed/2))                //left is clicked 
		playerOne.x_velocity -= 1;
	if (right == true && playerOne.x < map.cols * SIZE && rayCastCheck(playerOne, 10, playerOne.speed/2)) //right is clicked
		playerOne.x_velocity += 1;
	if (up == true && playerOne.jumping == false && rayCastCheck(playerOne, 10, playerOne.speed/2))      //jump 
	{
		playerOne.jumping = true;
		playerOne.y_velocity -= 20;
	}

	
	playerOne.y_velocity += 1.5;
	playerOne.x += playerOne.x_velocity;
	playerOne.y += playerOne.y_velocity;
	playerOne.x_velocity *= 0.9;
	playerOne.y_velocity *= 0.9;
	
	if(playerOne.y > 510)
	{
		playerOne.jumping = false;
		playerOne.y = 510;
		playerOne.y_velocity = 0;
	}
}

//function gravity()
//{
//	if( map.tiles[parseInt(downRay/SIZE)][parseInt(centerPos.x/SIZE)] == 0)
//		{
//		console.log("falling");
//		
//		}
//		if( map.tiles[parseInt(downRay/SIZE)][parseInt((player.x + Gap)/SIZE)] == 0)
//		{
//		console.log("falling");
//		
//		}	
//		if( map.tiles[parseInt(downRay/SIZE)][parseInt((player.x + SIZE - Gap)/SIZE)] == 0)
//		{
//		console.log("falling");
//		
//		}
//	
//}
 

function rayCastCheck(player, Gap, rayLength)
{
	var centerPos = {x: player.x + player.sizeX/2, y: player.y + player.sizeY/2};
	var leftRay = centerPos.x - (player.sizeX/2 + rayLength);
	var rightRay = centerPos.x + (player.sizeX/2 + rayLength);
	var upRay = centerPos.y - (player.sizeY/2 + rayLength);
	var downRay = centerPos.y + (player.sizeY/2 + rayLength);
	
	if(left)
	{
		if( map.tiles[parseInt(centerPos.y/SIZE)][parseInt(leftRay/SIZE)] != 0) 
		{
			playerOne.x_velocity = 0;             
			return false;
		}
		if( map.tiles[parseInt((player.y + Gap)/SIZE)][parseInt(leftRay/SIZE)] != 0)
		{
			playerOne.x_velocity = 0;      
			return false;
		}
		if( map.tiles[parseInt((player.y + SIZE - Gap)/SIZE)][parseInt(leftRay/SIZE)] != 0) 
		{
			playerOne.x_velocity = 0;	
			return false;
		}
		return true;
	}
	else if(right)
	{
		if( map.tiles[parseInt(centerPos.y/SIZE)][parseInt(rightRay/SIZE)] != 0) 
		{
			playerOne.x_velocity = 0;			// right top rayCast
			return false;
		}
		if( map.tiles[parseInt((player.y + Gap)/SIZE)][parseInt(rightRay/SIZE)] != 0) 
		{
			playerOne.x_velocity = 0;			// right centre rayCast
			return false;
		}
		if( map.tiles[parseInt((player.y + SIZE - Gap)/SIZE)][parseInt(rightRay/SIZE)] != 0) 
		{
			playerOne.x_velocity = 0;	
			return false;
		}			// right bottom rayCast
		return true;
	}
	else if(up)
	{
		if( map.tiles[parseInt(upRay/SIZE)][parseInt(centerPos.x/SIZE)] != 0) 
		{
			playerOne.x_velocity = 0;
			return false;
		}
		if( map.tiles[parseInt(upRay/SIZE)][parseInt((player.x + Gap)/SIZE)] != 0)
		{		
			playerOne.x_velocity = 0;
			return false;
		}
		if( map.tiles[parseInt(upRay/SIZE)][parseInt((player.x + SIZE - Gap)/SIZE)] != 0)
		{
			playerOne.x_velocity = 0;
			return false;
		}
		return true;
	}
	

		
	

}
//==========================================================

//======================PHYSICS=============================


//==========================================================

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
		surface.drawImage(playerTwo.img, SIZE*playerTwoSprite, 0, SIZE, SIZE, playerTwo.x, playerTwo.y, SIZE, SIZE);
		surface.drawImage(coin.img, SIZE*coinSprite, 0, SIZE, SIZE, coin.x, coin.y, SIZE, SIZE); //draw coin
}