var canvas = document.getElementById("canvas");    // Creates a link to the canvas element in HTML
canvas.width = 1280; 							  // Sets the canvas width to 640 px. Note that it's a regular property not accessing the .style
canvas.height = 640;	
var surface = canvas.getContext("2d");

//--------------------------------------------PLAYER DATA ------------------------------------------------------------------------
// x = start position, y = start position, speed = players speed (becareful when changing)
var playerOne = {img:null, x:0, y: 512, speed: 10, sizeX: 64, sizeY: 64, isGround: false, velocityY:0, isJumping: false};  
var playerTwo = {img:null, x:0, y: 512, speed: 10, sizeX: 64, sizeY: 64, isGround: false, velocityY:0, isJumping: false};  
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
var images = ["empty","playerTwo", "dirt", "saw" ,"fire3", "fire", "dooropen","fire2",  "purplecoin","playerOne"]; 
var sprites = []; 
const SIZE = 64; 
var map = {
	rows: 13,	
	cols: 40, 
	tiles:
	[
		[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
		[0,0,0,0,2,0,0,0,2,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,2],
		[0,0,0,0,2,0,0,0,2,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,2],
		[0,0,0,0,2,0,0,0,2,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,2],             
		[0,0,0,0,2,0,0,0,2,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,2],            
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,2],            
		[0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,2],
		[0,0,0,0,0,0,2,0,0,0,2,0,0,2,0,0,0,0,0,0,0,0,0,0,2,0,0,2,0,0,0,0,0,0,0,0,0,0,0,2],
		[0,0,0,0,2,0,2,0,0,0,2,0,0,2,0,0,0,0,0,0,0,2,0,0,2,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0],
		[2,2,2,2,2,0,2,0,0,0,2,0,0,2,2,2,2,2,2,0,0,2,0,0,2,0,0,2,0,0,2,0,0,2,0,0,2,2,2,2],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7],
		[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],

	],
	
};//ex. 2,2,2,2,2,2,2,2 to draw the ground//that asset where you want it in the map by using its place number.//This array is used to draw the map. Just read through the image[] and place

var saw = {img: null, x: 253, y: 320};
var saw2 = {img: null, x: 1024, y: 510};
var coin = {img: null, x: 2490, y: 510}; 

var coinSprite = 0;
var coinMax = 16;
var sawSprite = 0;
var saw2Sprite = 0;

setInt = setInterval(update, 33.34);

//=======================================INITIALIZE SPIRTES ============================================
for (var i = 0; i < images.length; i++)                                                                //takes images from image[] and turns them to assets in sprite[]
{
	sprites[i] = new Image();
	sprites[i].src = '../img/'+images[i]+'.png';

}																					   //animated sprite stay outside of map array
playerOne.img = sprites[9];                                                                            //spritesheet for playerOne
playerTwo.img = sprites[1];																			   //spritesheet for playerTwo
coin.img = sprites[8];
saw.img = sprites[3];
saw2.img = sprites[3];																			   //spritesheet for coin
//===========================================UPDATE=====================================================



function update()
{
	animatePlayer(); 
	animatePlayer2(); 
	animateCoin();
	playerController(playerOne, controls.left, controls.right , controls.up);
	playerController(playerTwo, controls.left2, controls.right2, controls.up2);
	draw();
	render();
	checkCollision(playerOne);
    checkCollision(playerTwo);
	CoinCheck(playerOne, coin);
    CoinCheck(playerTwo, coin);
	//flash();
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
			player.velocityY = -20;
		}
	}
	console.log(player.velocityY);
	var gravityPower = 1;
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
function checkCollision()
{
	var gap = 7;
	if(playerOne.x + playerOne.sizeX > saw.X + gap && playerOne.x < saw.X + saw.size - gap &&
        playerOne.y + playerOne.sizeY > saw.Y + gap && playerOne.y < saw.Y + saw.size - gap)
    {
        playerOne.isDead = true;
    }
    if(playerTwo.x + playerTwo.sizeX > saw.X + gap && playerTwo.x < saw.X + saw.size - gap &&
        playerTwo.y + playerTwo.sizeY > saw.Y + gap && playerTwo.y < saw.Y + saw.size - gap )
    {
        playerTwo.isDead = true;
    }	
	if(playerOne.x + playerOne.sizeX > saw2.X + gap && playerOne.x < saw2.X + saw.size - gap &&
        playerOne.y + playerOne.sizeY > saw2.Y + gap && playerOne.y < saw2.Y + saw.size - gap)
    {
        playerOne.isDead = true;
    }
    if(playerTwo.x + playerTwo.sizeX > saw2.X + gap && playerTwo.x < saw2.X + saw.size - gap &&
        playerTwo.y + playerTwo.sizeY > saw2.Y + gap && playerTwo.y < saw2.Y + saw.size - gap )
    {
        playerTwo.isDead = true;
    }
}
function CoinCheck (player, coin)
{
    if (player.x < coin.x + 70 && player.x + 64 > coin.x 
        && player.y > coin.y && player.y + 64 < coin.y + 100)
    {
        console.log("You won");
    }
}
//======================================================================================================

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
		surface.drawImage(saw.img, SIZE*sawSprite, 0, SIZE, SIZE, saw.x, saw.y, SIZE, SIZE);
		surface.drawImage(saw2.img, SIZE*saw2Sprite, 0, SIZE, SIZE, saw2.x, saw2.y, SIZE, SIZE);
}

window.addEventListener("keydown", controls.keyListner)
window.addEventListener("keyup", controls.keyListner);
