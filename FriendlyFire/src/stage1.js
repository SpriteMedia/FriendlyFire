var canvas = document.getElementById("canvas");    // Creates a link to the canvas element in HTML
canvas.width = 1280; 							  // Sets the canvas width to 640 px. Note that it's a regular property not accessing the .style
canvas.height = 640;	
var surface = canvas.getContext("2d");

//--------------------------------------------PLAYER DATA ------------------------------------------------------------------------
// x = start position, y = start position, speed = players speed (becareful when changing)
  


playerOne.x =600;
playerOne.y = 200;
//---------------------------------------------GAME DATA ------------------------------------------------------------------------

//to add asset, place name here of image saved under img folder and call it in map2 array by its placement here. ex: "dirt" = 2
var images2 = ["empty","playerTwo", "dirt", "grass" ,"grasstop", "door", "dooropen","monster", "purplecoin", "playerOne", "Saw"]; 
var sprites2 = [];  
var map2 = {
	rows: 21,	
	cols: 40, 
	tiles:
	[
		[4,2,4,4,4,2,4,4,4,4,4,2,4,4,4,2,4,4,2,4,4,2,4,4,4,2,4,4,4,4,4,2,4,4,4,2,4,4,2,4],
		[0,4,0,0,0,4,0,0,0,0,0,4,0,0,0,4,0,0,4,0,0,4,0,0,0,4,0,0,0,0,0,4,0,0,0,4,0,0,4,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],            //This array is used to draw the map2. Just read through the image[] and place 
		[0,0,0,0,0,0,0,0,3,0,0,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,7,0,0,0,0,0,0,0,0],            //that asset where you want it in the map2 by using its place number.
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0],            //ex. 2,2,2,2,2,2,2,2 to draw the ground
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,6,0,0,0,0],
		[0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,3,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,5,0,3,0,0,2,0,0,0,0,0,2,2,2,0,0,0],
		[3,3,3,2,2,2,3,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
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

setInt = setInterval(update, 33.34);

//=======================================INITIALIZE SPIRTES ============================================
for (var i = 0; i < images2.length; i++)                                                                //takes images from image[] and turns them to assets in sprite[]
{
	sprites2[i] = new Image();
	sprites2[i].src = '../img/'+images2[i]+'.png';
}
																									   //animated sprite stay outside of map2 array
playerOne.img = sprites2[9];                                                                            //sprites2heet for playerOne
playerTwo.img = sprites2[1];																			   //sprites2heet for playerTwo
coin.img = sprites2[8];																				   //sprites2heet for coin
//===========================================UPDATE=====================================================


//============================================================================================================================================================
function update()// DO NOT DELETE this for some reason keeps the game running smooth.//=======================================================================
{//============================================================================================================================================================
	//============================================================================================================================================================
}//============================================================================================================================================================
//============================================================================================================================================================

//===========================================CONTROL INPUT ================================================
controls = {

	up: false, 
	up2: false, 
	left: false, 
	left2: false, 
	right: false, 
	right2: false,
	escape: false,

	keyListner:function(event) 
	{
		var keystate = (event.type == "keydown")?true:false;
		
		switch(event.keyCode) 
		{
			case 65: //A
				controls.left = keystate;
			break;
			case 68: //D
				controls.right = keystate;
			break;
			case 87: //W
				controls.up = keystate;
			break;
			case 37: //left
				controls.left2 = keystate;
			break;
			case 39: //right
				controls.right2 = keystate;
			break;
			case 38: //up
				controls.up2 = keystate;
			break;
			case 27: // escape
				controls.escape = keystate;
			break;
		}
	}
}


//================================================ANIMATION=============================================
function animatePlayer() 
{
	playerSprite++;
	if(playerSprite == maxSprite)
	{
		
		if(controls.right || controls.left)
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
		if(controls.right2 || controls.left2)
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
//==============================================CAMERA==================================================



function clamp(value, min, max){
    if(value < min) return min;
    else if(value > max) return max;
    return value;
}

function draw2() {
    surface.setTransform(1,0,0,1,1,0);//reset the transform matrix as it is cumulative
    surface.clearRect(0, 0, canvas.width, canvas.height);//clear the viewport AFTER the matrix is reset

    //Clamp the camera position to the world bounds while centering the camera around the player                                             
    var camX = clamp(-playerOne.x + canvas.width/2, -2000, 0);
    var camY = clamp(-playerOne.y + canvas.height/1.25, -map2.row, 0);

    surface.translate( camX, camY );    

    //Draw everything
}


//============================================CONTROLLER=================================================

function playerController(player, inleft, inright, inup, inescape) 
{
	if (player.x > 0 && inleft == true && rayCastCheck(player, 10, player.speed/2))
		player.x -= player.speed;
	if (inright == true && player.x < map2.cols * SIZE && rayCastCheck(player, 10, player.speed/2))
		player.x += player.speed;
	if (player.y > 0 && inup == true && rayCastCheck(player, 10, player.speed/2)) //jump
	{
		if(!player.isJumping)
		{
			player.isJumping = true;
			player.velocityY = -20;
		}
	}
	
	if(inescape == true)
	{
	backToMainMenu();
	}
	
	var gravityPower = 3;
	jump(player, gravityPower);
	gravity(player, 10);
	coinCol(player);
	groundCheck(player, 3, gravityPower);//	this.player
}

function backToMainMenu()
{
		stage = 0;
	
}

function jump(player, gravityPower)
{
	if(player.isJumping)
	{
		player.y += player.velocityY;
		player.y_velocity *= 0.7;
		player.velocityY += gravityPower;
	}
}

//==========================================GRAVITY=====================================================

function gravity(player, gravityPower)
{
	if(!player.isGround)
	{
		player.y += gravityPower;
	}


	if(player.isGround && parseInt(player.y/SIZE) * SIZE < player.y)//fix position y;
	{
		player.y = parseInt(player.y/SIZE) * SIZE;
	}
}

//===========================================COLLISION==================================================
function groundCheck(player, gap, rayLength)//n is number of raycasts
{
	var bottomY = parseInt((player.y + player.sizeY + rayLength)/SIZE);
	if(bottomY > map2.rows) return false;
	
	player.isGround = false;
	if(map2.tiles[bottomY][parseInt((player.x + gap)/SIZE)] != 0) player.isGround = true; 
	if(map2.tiles[bottomY][parseInt((player.x + player.sizeX/2)/SIZE)] != 0) player.isGround = true;
	if(map2.tiles[bottomY][parseInt((player.x + (player.sizeX - gap))/SIZE)] != 0) player.isGround = true;
	
	if(player.isGround)
	{
		player.isJumping = false;
		player.velocityY = 0;

	}	
}

function rayCastCheck(player, Gap, rayLength)
{
	var centerPos = {x: player.x + player.sizeX/2, y: player.y + player.sizeY/2};
	var leftRay = centerPos.x - (player.sizeX/2 + rayLength);
	var rightRay = centerPos.x + (player.sizeX/2 + rayLength);
	var upRay = centerPos.y - (player.sizeY/2 + rayLength);
	var downRay = centerPos.y + (player.sizeY/2 + rayLength);

	if(controls.left || controls.left2)
	{
		if( map2.tiles[parseInt(centerPos.y/SIZE)][parseInt(leftRay/SIZE)] != 0) return false;
		if( map2.tiles[parseInt((player.y + Gap)/SIZE)][parseInt(leftRay/SIZE)] != 0) return false;
		if( map2.tiles[parseInt((player.y + SIZE - Gap)/SIZE)][parseInt(leftRay/SIZE)] != 0) return false;
		return true;
	}
	else if(controls.right || controls.right2)
	{
		if( map2.tiles[parseInt(centerPos.y/SIZE)][parseInt(rightRay/SIZE)] != 0) return false;
		if( map2.tiles[parseInt((player.y + Gap)/SIZE)][parseInt(rightRay/SIZE)] != 0) return false;
		if( map2.tiles[parseInt((player.y + SIZE - Gap)/SIZE)][parseInt(rightRay/SIZE)] != 0) return false;
		return true;
	}
	else if(controls.up || controls.up2)
	{
		if( map2.tiles[parseInt(upRay/SIZE)][parseInt(centerPos.x/SIZE)] != 0) return false;
		if( map2.tiles[parseInt(upRay/SIZE)][parseInt((player.x + Gap)/SIZE)] != 0) return false;
		if( map2.tiles[parseInt(upRay/SIZE)][parseInt((player.x + SIZE - Gap)/SIZE)] != 0) return false;
		return true;
	}
}

function coinCol(player)
{
    if(player.x + 64 > coin.x && player.x < coin.x+64 && player.y + 64 > coin.y && player.y < coin.y+64 )
	{
		if(completed == 1)
		{
			completed++;
		}
		backToMainMenu();
		
	}
	
}

//======================================================================================================

function render2()
{
		surface.clearRect(0,0,canvas.width,canvas.height);
		
		for (var r = 0; r < map2.rows; r++)
		{
			for (var c = 0; c < map2.cols; c++)
			{
				surface.drawImage(sprites2[map2.tiles[r][c]], c * SIZE , r * SIZE, SIZE, SIZE );
			}
		}	
		surface.drawImage(playerOne.img, SIZE * playerOne.sprite, SIZE * playerOne.dir, SIZE, SIZE, playerOne.x, playerOne.y, SIZE, SIZE);
		surface.drawImage(playerTwo.img, SIZE * playerTwo.sprite, SIZE * playerTwo.dir, SIZE, SIZE, playerTwo.x, playerTwo.y, SIZE, SIZE);
		surface.drawImage(coin.img, SIZE*coinSprite, 0, SIZE, SIZE, coin.x, coin.y, SIZE, SIZE); //draw coin
}

window.addEventListener("keydown", controls.keyListner)
window.addEventListener("keyup", controls.keyListner);
