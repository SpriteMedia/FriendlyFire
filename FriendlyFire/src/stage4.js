var canvas = document.getElementById("canvas");    // Creates a link to the canvas element in HTML
canvas.width = 1280; 							  // Sets the canvas width to 640 px. Note that it's a regular property not accessing the .style
canvas.height = 640;	
var surface = canvas.getContext("2d");

//--------------------------------------------PLAYER DATA ------------------------------------------------------------------------
// x = start position, y = start position, speed = players speed (becareful when changing)
var playerOne = {img:null, x:50, y: 512, speed: 10, sizeX: 64, sizeY: 64, isGround: false, velocityY:0, isJumping: false};  
var playerTwo = {img:null, x:50, y: 512, speed: 10, sizeX: 64, sizeY: 64, isGround: false, velocityY:0, isJumping: false};
var raser = {img: null, x:-50, y:0, speed: 1.5, velocity:1, isMoving: true};
var background = {img:null};
var controls;                     //Object for buttons
var playerSprite = 0;			  // FOR ANIMATION (IGNORE)
var maxSprite = 11;				  // FOR ANIMATION (IGNORE)
var minSprite = 0;			      // FOR ANIMATION (IGNORE)
var playerTwoSprite = 0;          // FOR ANIMATION (IGNORE)
var minSprite2 = 0;               // FOR ANIMATION (IGNORE)
var maxSprite2 = 11;              // FOR ANIMATION (IGNORE)
var spriteCount = 0;              // FOR ANIMATION (IGNORE)
var fps = 2;                      // FOR ANIMATION (IGNORE)
//---------------------------------------------GAME DATA ------------------------------------------------------------------------

//to add asset, place name here of image saved under img folder and call it in map array by its placement here. ex: "dirt" = 2
var images = ["empty","playerTwo", "Tile", "Tile2" ,"Tile3", "empty", "dooropen","monster", "purplecoin", "playerOne", "Background", "Raser","pause", "saw", "LaserDoor", "Button"]; 
var sprites = []; 
var SIZE = 64; 
var map = {
	rows: 10,	
	cols: 40, 
	tiles:
	[
		[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
		[7,3,7,7,7,3,7,7,7,7,7,3,7,7,7,3,7,7,3,7,7,3,7,7,7,3,7,7,7,7,7,3,7,7,7,3,7,7,3,7],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0],            //This array is used to draw the map. Just read through the image[] and place 
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0],            //that asset where you want it in the map by using its place number.
		[0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,3,0,0,3,0,0,3,0,0,3,0,0,3,0,0,3,0,0,0,5,0,0,0,0],            //ex. 2,2,2,2,2,2,2,2 to draw the ground
		[0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,3,3,3,0,0,0,2,0,0,2,0,0,2,0,0,2,0,0,2,0,0,2,0,0,2,0,2,0,0,0,0],
		[0,0,0,0,0,0,2,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,0,0,0],
		[2,2,2,2,2,2,2,7,7,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
	],
	
};

var pause = {img:null, x:700, y:512};
var Door = {img:null, x:2240, y:320, sizeX:13, sizeY:64, isClosed: false};
var coin = {img:null, x: 2445, y: 512};
var saw1 = {img:null, size:64, fromX:620, fromY: 330, toX: 400, toY: 330, curX:620, curY: 300, speed: 10};
var saw2 = {img:null, size:64, fromX:2020, fromY: 500, toX: 770, toY: 1070, curX:770, curY: 385, speed: 13};
var saw3 = {img:null, size:64, fromX:2020, fromY: 500, toX: 770, toY: 1070, curX:770, curY: 512, speed: 9};
var button = {img:null, size:64, x: 2112, y:512};
var coinSprite = 0;
var coinMax = 16;

setInt = setInterval(update, 33.34);

//==================Raser ===================
function Raser()
{
	if(raser.isMoving != false)
			raser.x += raser.speed;
	surface.drawImage(raser.img, raser.x, raser.y, 10, 700);
}

function Pause()
{
	if ((pause.x + 60 == playerOne.x && pause.y == playerOne.y) || (pause.x + 60 == playerTwo.x && pause.y == playerTwo.y))
	{
			raser.isMoving = false;
			setTimeout(function(){ raser.isMoving = true; }, 3000);
	}
}

//=======================================INITIALIZE SPIRTES ============================================
for (var i = 0; i < images.length; i++)                                                                //takes images from image[] and turns them to assets in sprite[]
{
	sprites[i] = new Image();
	sprites[i].src = '../img/'+images[i]+'.png';
}
																									   //animated sprite stay outside of map array
playerOne.img = sprites[9];                                                                            //spritesheet for playerOne
playerTwo.img = sprites[1];																			   //spritesheet for playerTwo
coin.img = sprites[8];																				   //spritesheet for coin
background.img = sprites[10];
raser.img = sprites[11];
pause.img = sprites[12];
saw1.img = sprites[13];
saw2.img = sprites[13];
saw3.img = sprites[13];
Door.img = sprites[14];
button.img = sprites[15];

//===========================================UPDATE=====================================================

function update()
{
	Pause();
	animatePlayer(); 
	animatePlayer2();
	playerController(playerOne, controls.left, controls.right , controls.up);
	playerController(playerTwo, controls.left2, controls.right2, controls.up2);
	draw();
	collision();
	render();
	Raser();
	animateCoin ();
	moveSawX(saw1);
	moveSawX(saw2);
	moveSawX(saw3);
}


//===========================================CONTROL INPUT ================================================
controls = {

	up: false, 
	up2: false, 
	left: false, 
	left2: false, 
	right: false, 
	right2: false,

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



function moveSawX(saw)
{
	saw.curX += saw.speed;
	if(saw.fromX < saw.curX ||saw.toX > saw.curX)
		saw.speed *= -1;
}

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
    
    surface.translate( camX, 0 );
}

function collision()
{
	if(raser.x == playerOne.x || raser.x == playerTwo.x)
	{
		alert("GG! Press F5 to Restart Game");
	}
	
	if (2110 == playerOne.x || 2110 == playerTwo.x )
	{
		setTimeout(function(){ Door.isClosed = true; }, 3000);
		map.tiles[5][35] = 0;
		Door.y -= 1;
	}
	
	if (2445 == playerOne.x || 2445 == playerTwo.x)
	{
		alert("GG! You Win! Press F5 to Restart Game");
	}
	
}
//============================================CONTROLLER=================================================

function playerController(player, inleft, inright, inup) 
{
	if (player.x > 0 && inleft == true && rayCastCheck(player, 10, player.speed/2))
		player.x -= player.speed;
	if (inright == true && player.x < map.cols * SIZE && rayCastCheck(player, 10, player.speed/2))
		player.x += player.speed;
	if (player.y > 0 && inup == true && rayCastCheck(player, 10, player.speed/2)) //jump
	{
		if(!player.isJumping)
		{
			player.isJumping = true;
			player.velocityY = -30;
			controls.up = false;
			controls.up2 = false;
		}
	}
	var gravityPower = 3;
	jump(player, gravityPower);
	gravity(player, 10);
	groundCheck(player, 3, gravityPower);//	this.player
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
	if(bottomY > map.rows) return false;
	
	player.isGround = false;
	if(map.tiles[bottomY][parseInt((player.x + gap)/SIZE)] != 0) player.isGround = true; 
	if(map.tiles[bottomY][parseInt((player.x + player.sizeX/2)/SIZE)] != 0) player.isGround = true;
	if(map.tiles[bottomY][parseInt((player.x + (player.sizeX - gap))/SIZE)] != 0) player.isGround = true;
	
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
		if( map.tiles[parseInt(centerPos.y/SIZE)][parseInt(leftRay/SIZE)] != 0) return false;
		if( map.tiles[parseInt((player.y + Gap)/SIZE)][parseInt(leftRay/SIZE)] != 0) return false;
		if( map.tiles[parseInt((player.y + SIZE - Gap)/SIZE)][parseInt(leftRay/SIZE)] != 0) return false;
		return true;
	}
	else if(controls.right || controls.right2)
	{
		if( map.tiles[parseInt(centerPos.y/SIZE)][parseInt(rightRay/SIZE)] != 0) return false;
		if( map.tiles[parseInt((player.y + Gap)/SIZE)][parseInt(rightRay/SIZE)] != 0) return false;
		if( map.tiles[parseInt((player.y + SIZE - Gap)/SIZE)][parseInt(rightRay/SIZE)] != 0) return false;
		return true;
	}
	else if(controls.up || controls.up2)
	{
		if( map.tiles[parseInt(upRay/SIZE)][parseInt(centerPos.x/SIZE)] != 0) return false;
		if( map.tiles[parseInt(upRay/SIZE)][parseInt((player.x + Gap)/SIZE)] != 0) return false;
		if( map.tiles[parseInt(upRay/SIZE)][parseInt((player.x + SIZE - Gap)/SIZE)] != 0) return false;
		return true;
	}
}


//======================================================================================================

function render()
{
	var cam = clamp(-playerOne.x + canvas.width/2, -2000, 0);
		surface.clearRect(0,0,canvas.width,canvas.height);
		surface.drawImage(background.img, -cam - 50,0,1400,700);
		surface.drawImage(pause.img, pause.x, pause.y, SIZE,SIZE);
		surface.drawImage(button.img, button.x, button.y, button.size, button.size);
		surface.drawImage(Door.img, Door.x, Door.y, Door.sizeX, Door.sizeY);
		for (var r = 0; r < map.rows; r++)
		{
			for (var c = 0; c < map.cols; c++)
			{
				surface.drawImage(sprites[map.tiles[r][c]], c * SIZE , r * SIZE, SIZE, SIZE );
			}
		}	
		surface.drawImage(playerOne.img, SIZE*playerSprite, 0, SIZE, SIZE, playerOne.x, playerOne.y, SIZE, SIZE);
		surface.drawImage(playerTwo.img, SIZE*playerTwoSprite, 0, SIZE, SIZE, playerTwo.x, playerTwo.y, SIZE, SIZE);
		surface.drawImage(saw1.img, saw1.curX, saw1.curY, saw1.size, saw1.size);
		surface.drawImage(saw2.img, saw2.curX, saw2.curY, saw2.size, saw2.size);
		surface.drawImage(saw3.img, saw3.curX, saw3.curY, saw3.size, saw3.size);
		surface.drawImage(coin.img, SIZE*coinSprite, 0, SIZE, SIZE, coin.x, coin.y, SIZE, SIZE); //draw coin
}

window.addEventListener("keydown", controls.keyListner);
window.addEventListener("keyup", controls.keyListner);
