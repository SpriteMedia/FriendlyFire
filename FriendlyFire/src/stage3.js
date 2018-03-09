var canvas = document.getElementById("canvas");    // Creates a link to the canvas element in HTML
canvas.width = 1280 * 2.5; 							  // Sets the canvas width to 640 px. Note that it's a regular property not accessing the .style
canvas.height = 640 * 2.5;	
var surface = canvas.getContext("2d");

//--------------------------------------------PLAYER DATA ------------------------------------------------------------------------
// x = start position, y = start position, speed = players speed (becareful when changing)
var playerOne = {img:null, isDead: false, x:0, y: 512-64, speed: 10, sizeX: 64, sizeY: 64, isGround: false, velocityY:0, isJumping: false};  
var playerTwo = {img:null, isDead: false, x:128, y: 512/2, speed: 10, sizeX: 64, sizeY: 64, isGround: false, velocityY:0, isJumping: false};  
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
var images = ["empty","playerTwo", "dirt", "grass" ,"grasstop", "empty", 
			"dooropen","monster", "purplecoin", "playerOne", "Saw"];
var mapImg = ["empty", "DarkGrey_Angle", "DarkGrey_Box", "DarkGrey_TrimmedBox",
				"LightGrey_Angle", "empty", "LightGrey_Box",
				"Orange_Angle", "Orange_Box", "Orange_TrimmedBox"];
var displayImg = ["jansick", "giphy", "neonLight", "neonStar", "neonFlower", "neonCherry", "downSign"];
				
var doorZero = {isOpened: false, shape: "vertical", size: 128, x1:5,y1:3, x2:5, y2:4, curSize:128};
var doorOne = {isOpened: false, shape: "vertical", size: 128, x1:13,y1:6, x2:13, y2:7, curSize:128};
var doorTwo = {isOpened: false, shape: "horizontal", size: 128, x1:3, y1:18, x2:4, y2:18, curSize:128};
var doorThree = {isOpened: false, shape: "vertical", size: 128, x1:19, y1:15, x2:19, y2:16, curSize:128};

var buttonZero = {isPressed: false, prev: 0, posX: 600, posY: 450, size: 60, tag:0};
var buttonOne = {isPressed: false, prev: 0, posX: 600, posY: 450, size: 60, tag:1};
var buttonTwo = {isPressed: false, prev: 0, posX: 375, posY: 1015, size: 60, tag:2};
var buttonThree = {isPressed: false, prev: 0, posX: 770, posY: 1250, size: 60, tag:3};
var buttonFour = {isPressed: false, prev: 0, posX: 1925, posY: 260, size: 60, tag:4};

var portal = {sizeX: 60, sizeY: 110, fromX: 1020, fromY: 1300, toX: 1280, toY:200};

var saw1 = {size:64, fromX:620, fromY: 330, toX: 400, toY: 330, curX:620, curY: 330, speed: 10};
var saw2 = {size:64, fromX:975, fromY: 200, toX: 975, toY: 1070, curX:975, curY: 200, speed: 10};
var saw3 = {size:64, fromX:850, fromY: 1250, toX: 350, toY: 1250, curX:350, curY: 1250, speed: 12};
var saw4 = {size:64, fromX:1650, fromY: 870, toX: 1300, toY: 870, curX:1300, curY: 870, speed: 7};
//0, -600, 60, 3500
var timerBeam = {sizeX:60, sizeY:3500, posX:-100, speed: 3.5, enabled: false};
var crown = {sizeX: 100, sizeY: 100, posX: 2750, posY: 950, speed: 3};
var encore = {sizeX: 1000, sizeY: 160, posX: 2050, posY: 1200, speed: 7};
sawArr = [];


var spikesImg = new Image();
var doorImgV = new Image();
var doorImgH = new Image();
var buttonImg = new Image();
var portalImgFrom1 = new Image();
var portalImgTo1 = new Image();
var sawImg = new Image();
var redShotHImg = new Image();
var redShotVImg = new Image();
var blueShotHImg = new Image();
var blueShotVImg = new Image(); 
var timerBeamImg = new Image();
var crownImg = new Image();
var encoreImg = new Image();
var sprites = []; 
var mapSprites = [];
var dpSprites = [];

var SIZE = 64; 
var map = {
	rows: 25,	
	cols: 50, 
	tiles:
	[   //       5         10        15        20        25
		[2,2,2,1,2,2,0,0,0,0,2,2,2,1,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,8,2,2],
		[2,2,3,2,2,2,0,0,0,0,2,2,3,2,2,2,2,2,3,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,8,2,2],
		[8,8,8,8,8,8,0,0,0,0,8,8,8,2,0,0,0,2,3,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,8,2,2],
		[2,0,0,0,0,0,0,0,0,0,0,2,8,2,0,0,0,2,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,8,8,2],            //This array is used to draw the map. Just read through the image[] and place 
		[2,0,0,0,0,0,0,0,0,0,0,2,8,2,0,0,0,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,8,2],            //that asset where you want it in the map by using its place number.
		[2,2,2,2,2,2,0,0,0,0,0,2,8,3,0,0,0,2,3,2,2,2,2,0,2,2,0,2,0,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,8,2],        //ex. 2,2,2,2,2,2,2,2 to draw the ground
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,0,2,2,0,2,0,3,3,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,8,2],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,0,0,0,2,3,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,8,2],
		[0,0,0,0,0,0,0,0,0,2,2,2,8,2,0,0,0,3,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,8,8,2], 
		[2,2,2,2,2,2,2,2,2,2,3,2,8,2,2,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,8,2,2], 
		[2,2,1,2,2,2,2,2,2,2,2,2,8,2,2,0,0,2,2,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,8,2,2],
		[2,2,2,2,2,2,2,2,1,2,2,2,8,3,2,0,0,2,3,2,0,0,0,0,0,0,0,0,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,8,2,2],
		[0,0,3,2,2,2,2,2,2,2,2,2,8,2,2,0,0,2,2,2,0,0,0,0,0,0,0,2,2,3,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,2,8,2,2],
		[3,2,2,2,2,2,2,2,0,0,0,0,0,2,2,0,0,2,2,2,0,0,0,0,0,0,0,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,8,2,2],
		[2,2,2,2,2,2,2,0,0,0,0,0,0,2,2,0,0,2,2,2,0,0,0,0,0,0,0,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,8,8,2],
		[2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,3,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,8,2], //15
		[3,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,8,8,8,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,8,2],
		[2,2,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,8,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,8,2],
		[2,2,2,0,0,2,2,2,2,2,2,2,2,2,2,2,2,3,2,2,2,2,2,2,2,2,8,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,8,2],
		[2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,8,8,8,8,8,8,8,8,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,8,2],
		[2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,1,1,8,2,2,2,2,2,2,2,3,5,5,5,5,5,5,5,5,5,5,5,5,2,8,8,2],
		[3,2,0,2,2,0,0,0,2,0,0,0,2,0,0,0,0,2,2,2,2,8,8,9,9,8,2,2,2,2,2,3,2,2,0,0,0,0,0,0,0,0,0,0,0,0,2,8,2,2],
		[2,2,0,0,0,0,2,0,0,0,2,0,0,0,8,8,8,8,8,8,8,8,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,8,2,2],
		[2,2,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,8,2,2],
		[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,2,2,2,3,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,8,2,2],
	],
};


var coin = {img:null, x: encore.posX + 600, y: encore.posY - 30}; 
var coinSprite = 0;
var coinMax = 16;

var redShots = [];
var blueShots = [];
var redShotEnabled = false;
var blueShotEnabled = false;
var redShotCurCnt = 0;
var redShotReCnt = 0;
var blueShotCurCnt = 0;
var blueShotReCnt = 0;
var maxShot = 1111;
var redShotSpeed = 12;
var blueShotSpeed = 12;
var shotSizeX = 45;
var shotSizeY = 35;


setInt = setInterval(update, 33.34);

//=======================================INITIALIZE SPIRTES ============================================
for (var i = 0; i < images.length; i++)                                                                //takes images from image[] and turns them to assets in sprite[]
{
	sprites[i] = new Image();
	sprites[i].src = '../img/'+images[i]+'.png';
}
for (var i = 0; i < mapImg.length; i++)
{
	mapSprites[i] = new Image();
	mapSprites[i].src = '../img/'+mapImg[i]+'.png';
}
for (var i = 0; i < displayImg.length; i++)
{
	dpSprites[i] = new Image();
	dpSprites[i].src = '../img/' +displayImg[i]+'.png';
}
spikesImg.src = '../img/spikes.png';
doorImgV.src = '../img/neonWallV.png';
doorImgH.src = '../img/neonWallH.png';
buttonImg.src = '../img/neonButton.png';
portalImgFrom1.src = '../img/WavePortal.png';
portalImgTo1.src = '../img/WavePortal2.png';	
redShotHImg.src = '../img/redShotH.png';
redShotVImg.src = '../img/redShotV.png';
blueShotHImg.src = '../img/blueShotH.png';
blueShotVImg.src = '../img/blueShotV.png';
sawImg.src = '../img/Saw.png';			
timerBeamImg.src = '../img/beam.png';	
crownImg.src = '../img/crown.png';
encoreImg.src = '../img/encore.png';		  
																										//animated sprite stay outside of map array
playerOne.img = sprites[9];                                                                            //spritesheet for playerOne
playerTwo.img = sprites[1];																			   //spritesheet for playerTwo
coin.img = sprites[8];	

for(var i = 0; i < maxShot; i++)
{
	var redShot = {};
	var blueShot = {};
	
	redShot.startX = playerOne.x;
	redShot.startY = playerOne.y + playerOne.sizeY;
	redShot.right = {posX:redShot.startX, posY:redShot.startY};
	redShot.left = {posX:redShot.startX, posY:redShot.startY};
	redShot.up = {posX:redShot.startX, posY:redShot.startY};
	redShot.down = {posX:redShot.startX, posY:redShot.startY};
	redShot.colRight = true;
	redShot.colLeft = true;
	redShot.colUp = true;
	redShot.colDown = true;
	redShots[i] = redShot;
	
	blueShot.startX = playerTwo.x;
	blueShot.startY = playerTwo.y + playerTwo.sizeY/2;
	blueShot.right = {posX:redShot.startX, posY:redShot.startY};
	blueShot.left = {posX:redShot.startX, posY:redShot.startY};
	blueShot.up = {posX:redShot.startX, posY:redShot.startY};
	blueShot.down = {posX:redShot.startX, posY:redShot.startY};
	blueShot.colRight = true;
	blueShot.colLeft = true;
	blueShot.colUp = true;
	blueShot.colDown = true;
	blueShots[i] = blueShot;
}

var intShot = setInterval(shotCheck, 1000);

function shotCheck()
{
	if(redShotEnabled && redShotCurCnt < maxShot)
		redShotCurCnt ++;
	if(blueShotEnabled && blueShotCurCnt < maxShot)
		blueShotCurCnt++;
}

function shotColCheck()
{

	var gap1 = 8;
	var gap2 = 7;
	var posX;
	var posY;
	for(var i = 0; i < redShotCurCnt; i++)
	{
		
			
	}
	for(var i = 0; i < blueShotCurCnt; i++)
	{
		
	}
}

function northSouthEastWestShot()
{
	for(var i = 0; i < maxShot; i++)
	{
		if(i < redShotCurCnt)
		{			
			if(redShots[i].colRight)
			{
				redShots[i].right.posX += redShotSpeed;
				surface.drawImage(redShotHImg, redShots[i].right.posX, 
							redShots[i].right.posY, shotSizeX, shotSizeY);
			}				
			if(redShots[i].colLeft)
			{
				redShots[i].left.posX -= redShotSpeed;
				surface.drawImage(redShotHImg, redShots[i].left.posX, 
							redShots[i].left.posY, shotSizeX, shotSizeY);
			}
			if(redShots[i].colUp)
			{
				redShots[i].up.posY -= redShotSpeed;
				surface.drawImage(redShotVImg, redShots[i].up.posX, 
							redShots[i].up.posY, shotSizeX, shotSizeY);	
			}
			if(redShots[i].colDown)
			{
				redShots[i].down.posY += redShotSpeed;
				surface.drawImage(redShotVImg, redShots[i].down.posX, 
							redShots[i].down.posY, shotSizeX, shotSizeY);	
			}
		}
		else
		{
			redShots[i].startX = (playerOne.x + playerOne.sizeX/2 -15);
			redShots[i].startY = (playerOne.y + playerOne.sizeY/2 - 15);
			redShots[i].right = {posX:redShot.startX, posY:redShot.startY};
			redShots[i].left = {posX:redShot.startX, posY:redShot.startY };
			redShots[i].up = {posX:redShot.startX, posY:redShot.startY};
			redShots[i].down = {posX:redShot.startX, posY:redShot.startY};
		}
	}
	
	for(var i = 0; i < maxShot; i++)
	{
		if(i < blueShotCurCnt)
		{
			if(blueShots[i].colRight)
			{
				blueShots[i].right.posX += blueShotSpeed;
				surface.drawImage(blueShotHImg, blueShots[i].right.posX, 
							blueShots[i].right.posY, shotSizeX, shotSizeY);
			}				
			if(blueShots[i].colLeft)
			{
				blueShots[i].left.posX -= blueShotSpeed;
				surface.drawImage(blueShotHImg, blueShots[i].left.posX, 
							blueShots[i].left.posY, shotSizeX, shotSizeY);
			}
			if(blueShots[i].colUp)
			{
				blueShots[i].up.posY -= blueShotSpeed;
				surface.drawImage(blueShotVImg, blueShots[i].up.posX, 
							blueShots[i].up.posY, shotSizeX, shotSizeY);	
			}
			if(blueShots[i].colDown)
			{
				blueShots[i].down.posY += blueShotSpeed;
				surface.drawImage(blueShotVImg, blueShots[i].down.posX, 
							blueShots[i].down.posY, shotSizeX, shotSizeY);	
			}	
		}
		else
		{
			blueShots[i].startX = (playerTwo.x + playerTwo.sizeX/2 - 15);
			blueShots[i].startY = (playerTwo.y + playerTwo.sizeY/2 - 15);
			blueShots[i].right = {posX:blueShot.startX, posY:blueShot.startY};
			blueShots[i].left = {posX:blueShot.startX, posY:blueShot.startY };
			blueShots[i].up = {posX:blueShot.startX, posY:blueShot.startY};
			blueShots[i].down = {posX:blueShot.startX, posY:blueShot.startY};
		}
	}
	shotColCheck();
}
																			   //spritesheet for coin
//===========================================UPDATE=====================================================



function update()
{
	animatePlayer(); 
	animatePlayer2(); 
	animateCoin();
	gameManager();
	playerController(playerOne, controls.left, controls.right , controls.up);
	playerController(playerTwo, controls.left2, controls.right2, controls.up2);
	
	//draw();
	render();
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
	if (player.x > 0 && inleft == true && rayCastCheck(player, 10, 5))
		player.x -= player.speed;
	if (inright == true && player.x < map.cols * SIZE && rayCastCheck(player, 10, 5))
		player.x += player.speed;
	if (player.y > 0 && inup == true && rayCastCheck(player, 10, 5)) //jump
	{
		if(!player.isJumping)
		{
			player.isJumping = true;
			player.velocityY = -20;
			controls.up = false;
			controls.up2 = false;
		}
	}
	//console.log(player.velocityY);
	var gravityPower = 3;
	jump(player, gravityPower);
	gravity(player, 10);
	groundCheck(player, 6, gravityPower);//	this.player
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
	if(player.y > 2000) return;
	
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


//==========================================game player================================================

function playerDie()
{
	if(playerOne.isDead || playerTwo.isDead) 
	{
		//game over;
		console.log("game over");
	}
	//x :130, y: 1443, x end: 700, y end: 1473 spikes
	spikesF(playerOne);
	spikesF(playerTwo);
}

function spikesF(player)
{
	if(player.isDead) return;
	
	if(player.x + player.sizeX > 130 && player.x < 930 &&
		player.y + player.sizeY > 1507 && player.y < 1537)
		player.isDead = true;
}

function portalFunc(portal)
{
	var gap = 5;
	if(playerOne.x + playerOne.sizeX > portal.fromX + gap && playerOne.x < portal.fromX + portal.sizeX - gap &&
		playerOne.y + playerOne.sizeY > portal.fromY + gap && playerOne.y < portal.fromY + portal.sizeY - gap )
	{
		playerOne.x = portal.toX;
		playerOne.y = portal.toY;
	}
	if(playerTwo.x + playerTwo.sizeX > portal.fromX + gap && playerTwo.x < portal.fromX + portal.sizeX - gap&&
		playerTwo.y + playerTwo.sizeY > portal.fromY + gap && playerTwo.y < portal.fromY + portal.sizeY - gap )
	{
		playerTwo.x = portal.toX;
		playerTwo.y = portal.toY;
	}
}

var t2, t3;
function addTiles()
{	
	if(buttonFour.isPressed && buttonFour.prev == 0)
	{
		buttonFour.prev = 1;
		map.tiles[14][25] = 6;
		t2 = setInterval(add2, 300);
	}
}
function add2()
{
	clearInterval(t2);
	map.tiles[14][26] = 6;
	t3 = setInterval(add3, 300);
}

function add3()
{
	clearInterval(t3);
	map.tiles[13][26] = 6;
}

var timerBeamInt;
function buttonFunc(button)
{
	if(button.isPressed) return;
	var gap = 5;
	if(playerOne.x + playerOne.sizeX > button.posX + gap && playerOne.x < button.posX + button.size - gap &&
		playerOne.y + playerOne.sizeY > button.posY + gap && playerOne.y < button.posY + button.size - gap )
	{
		if(blueShotEnabled) blueShotEnabled = false;
		//intStopShot = setInterval(stopShot, 5000);
		if(button.tag == 2) timerBeam.enabled = true;
		button.isPressed = true;
		redShotEnabled = true;
	}
	if(playerTwo.x + playerOne.sizeX > button.posX + gap && playerTwo.x < button.posX + button.size - gap &&
		playerTwo.y + playerOne.sizeY > button.posY + gap && playerTwo.y < button.posY + button.size - gap )
	{
		if(redShotEnabled) redShotEnabled = false;
		//intStopShot = setInterval(stopShot, 5000);
		if(button.tag == 2) timerBeam.enabled = true;
		button.isPressed = true;
		blueShotEnabled = true;
	}
}

function stopShot()
{
	clearInterval(intStopShot);
	redShotEnabled = false;
	blueShotEnabled = false;
}

function moveSawX(saw)
{
	var gap = 7;
	saw.curX += saw.speed;
	if(saw.fromX < saw.curX ||saw.toX > saw.curX)
		saw.speed *= -1;	

	if(playerOne.x + playerOne.sizeX > saw.curX + gap && playerOne.x < saw.curX + saw.size - gap &&
		playerOne.y + playerOne.sizeY > saw.curY + gap && playerOne.y < saw.curY + saw.size - gap )
	{
		playerOne.isDead = true;
	}
	if(playerTwo.x + playerTwo.sizeX > saw.curX + gap && playerTwo.x < saw.curX + saw.size - gap &&
		playerTwo.y + playerTwo.sizeY > saw.curY + gap && playerTwo.y < saw.curY + saw.size -gap )
	{
		playerTwo.isDead = true;
	}
}
function moveSawY(saw)
{
	var gap = 7
	saw.curY += saw.speed;
	if(saw.fromY > saw.curY ||saw.toY < saw.curY)
		saw.speed *= -1;	

	if(playerOne.x + playerOne.sizeX > saw.curX + gap && playerOne.x < saw.curX + saw.size - gap &&
		playerOne.y + playerOne.sizeY > saw.curY + gap && playerOne.y < saw.curY + saw.size - gap)
	{
		playerOne.isDead = true;
	}
	if(playerTwo.x + playerTwo.sizeX > saw.curX + gap && playerTwo.x < saw.curX + saw.size - gap &&
		playerTwo.y + playerTwo.sizeY > saw.curY + gap && playerTwo.y < saw.curY + saw.size - gap )
	{
		playerTwo.isDead = true;
	}
}


function door(door, button, doorSpeed)
{	
	if(door.isOpened && button.prev == 1)
		return;
	if(button.isPressed && button.prev == 0)
	{	
		if(door.curSize <= 0)
			door.isOpened = true;
		else if(door.curSize > 0)
			door.curSize -= doorSpeed;
	}
	
	if(door.isOpened)
	{
		button.prev = 1;
		map.tiles[door.y1][door.x1] = 0;
		map.tiles[door.y2][door.x2] = 0;
	}
	else
	{
		map.tiles[door.y1][door.x1] = 5;
		map.tiles[door.y2][door.x2] = 5;
	}
	
	if(door.shape == "vertical")
		surface.drawImage(doorImgV, door.x1*SIZE, door.y1*SIZE, 60, door.y1+door.curSize);
	else if(door.shape == "horizontal")
		surface.drawImage(doorImgH, door.x1*SIZE, door.y1*SIZE, door.x1+door.curSize, 60);
	
}

function moveTimerBeam()
{
	if(!timerBeam.enabled) return;
	var gap = 40;
	
	timerBeam.posX += timerBeam.speed;
	
	if(playerOne.x < (timerBeam.posX + timerBeam.sizeX - gap))
	{
		playerOne.isDead = true;
	}
	if(playerTwo.x < (timerBeam.posX + timerBeam.sizeX - gap))
	{
		playerOne.isDead = true;
	}
}

var h = 0, min = - 20, max = 20, dir = 1;
function winningStep()
{
	crown.posY = encore.posY - 250;
	if(h < min || h > max) dir *= -1;
	h += dir;
	crown.posY += h;
	
	
	surface.drawImage(crownImg, crown.posX, crown.posY, crown.sizeX, crown.sizeY);
	surface.drawImage(encoreImg, encore.posX, encore.posY, encore.sizeX, encore.sizeY);
}

function gameManager()
{
	moveSawX(saw1);
	moveSawY(saw2);
	moveSawX(saw3);
	moveSawX(saw4);
	buttonFunc(buttonZero);
	buttonFunc(buttonOne);
	buttonFunc(buttonTwo);
	buttonFunc(buttonThree);
	buttonFunc(buttonFour);
	portalFunc(portal);
	playerDie();
	addTiles();
}
//===========================================draw====================================================


function render()
{
	surface.clearRect(0,0,canvas.width,canvas.height);
	surface.drawImage(dpSprites[0], 250, 440, 120, 150);
	surface.drawImage(dpSprites[1], 900, 980, 150, 150);
	surface.drawImage(dpSprites[2], 850, -450);
	surface.drawImage(dpSprites[3], 1500, 550);
	surface.drawImage(dpSprites[4], -100, 700);
	surface.drawImage(dpSprites[5], 480, 820, 150, 150);
	surface.drawImage(dpSprites[6], 2400, 700, 300, 300);

	door(doorZero, buttonZero, 9);
	door(doorOne, buttonOne, 9);
	door(doorTwo, buttonTwo, 9);
	door(doorThree, buttonThree, 9);

	for (var r = 0; r < map.rows; r++)
	{
		for (var c = 0; c < map.cols; c++)
		{
			surface.drawImage(mapSprites[map.tiles[r][c]], c * SIZE , r * SIZE, SIZE, SIZE );
		}
	}	
	surface.drawImage(coin.img, SIZE*coinSprite, 0, SIZE, SIZE, coin.x, coin.y, SIZE, SIZE); //draw coin
	var size =  190;
	surface.drawImage(spikesImg, 130, 1507, size, 30);
	surface.drawImage(spikesImg, 130 + size, 1507, size, 30);
	surface.drawImage(spikesImg, 130 + size*2, 1507, size, 30);
	surface.drawImage(spikesImg, 130 + size*3, 1507, size, 30);
	//surface.drawImage(buttonImg, buttonZero.posX, buttonOne.posY, buttonOne.size, buttonOne.size);
	surface.drawImage(buttonImg, buttonOne.posX, buttonOne.posY, buttonOne.size, buttonOne.size);
	surface.drawImage(buttonImg, buttonTwo.posX, buttonTwo.posY, buttonTwo.size, buttonTwo.size);
	surface.drawImage(buttonImg, buttonThree.posX, buttonThree.posY, buttonThree.size, buttonThree.size);
	surface.drawImage(buttonImg, buttonFour.posX, buttonFour.posY, buttonFour.size, buttonFour.size);
	surface.drawImage(portalImgFrom1, portal.fromX, portal.fromY, portal.sizeX, portal.sizeY);
	surface.drawImage(portalImgTo1, portal.toX, portal.toY, portal.sizeX, portal.sizeY);
	surface.drawImage(sawImg, saw1.curX, saw1.curY, saw1.size, saw1.size);
	surface.drawImage(sawImg, saw2.curX, saw2.curY, saw2.size, saw2.size);
	surface.drawImage(sawImg, saw3.curX, saw3.curY, saw3.size, saw3.size);
	surface.drawImage(sawImg, saw4.curX, saw4.curY, saw4.size, saw4.size);
	winningStep();
	surface.drawImage(playerOne.img, SIZE*playerSprite, 0, SIZE, SIZE, playerOne.x, playerOne.y, SIZE, SIZE);
	surface.drawImage(playerTwo.img, SIZE*playerTwoSprite, 0, SIZE, SIZE, playerTwo.x, playerTwo.y, SIZE, SIZE);
	northSouthEastWestShot();
	moveTimerBeam();
	surface.drawImage(timerBeamImg, timerBeam.posX, -600, timerBeam.sizeX, timerBeam.sizeY);
}

window.addEventListener("keydown", controls.keyListner)
window.addEventListener("keyup", controls.keyListner);
