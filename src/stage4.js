canvas.style.backgroundImage = "url('../img/bkg.gif')";
canvas.width = 1280 * 2.5; 							  // Sets the canvas width to 640 px. Note that it's a regular property not accessing the .style
canvas.height = 640 * 2.5;	
var surface = canvas.getContext("2d");
line.src = "../music/Kevin.mp3";
//--------------------------------------------PLAYER DATA ------------------------------------------------------------------------
// x = start position, y = start position, speed = players speed (becareful when changing)


playerOne.x = 330;
playerOne.y = 500;
playerTwo.x = 200;
playerTwo.y = 200;

playerOne.isDead = false;
playerTwo.isDead = false;


//---------------------------------------------GAME DATA ------------------------------------------------------------------------

//to add asset, place name here of image saved under img folder and call it in map4 array by its placement here. ex: "dirt" = 2
var images4 = ["empty","playerTwo", "dirt", "grass" ,"grasstop", "empty", 
			"dooropen","monster", "purplecoin", "playerOne", "Saw", "redcoin"];
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
var sprites4 = []; 
var mapsprites = [];
var dpsprites = [];

var map4 = {
	rows: 25,	
	cols: 50, 
	tiles:
	[   //       5         10        15        20        25
		[2,2,2,1,2,2,0,0,0,0,2,2,2,1,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,8,2,2],
		[2,2,3,2,2,2,0,0,0,0,2,2,3,2,2,2,2,2,3,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,8,2,2],
		[8,8,8,8,8,8,0,0,0,0,8,8,8,2,0,0,0,2,3,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,8,2,2],
		[2,0,0,0,0,0,0,0,0,0,0,2,8,2,0,0,0,2,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,8,8,2],            //This array is used to draw the map44. Just read through the image[] and place 
		[2,0,0,0,0,0,0,0,0,0,0,2,8,2,0,0,0,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,8,2],            //that asset where you want it in the map4 by using its place number.
		[2,2,2,2,2,2,0,0,0,0,0,2,8,3,0,0,0,2,3,2,2,2,0,0,2,0,0,2,0,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,8,2],        //ex. 2,2,2,2,2,2,2,2 to draw the ground
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,0,0,2,0,0,2,0,3,3,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,8,2],
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

var coinMax = 16;
setInt = setInterval(update, 33.34);

//=======================================INITIALIZE SPIRTES ============================================
for (var i = 0; i < images4.length; i++)                                                                //takes images4 from image[] and turns them to assets in sprite[]
{
	sprites4[i] = new Image();
	sprites4[i].src = '../img/'+images4[i]+'.png';
}
for (var i = 0; i < mapImg.length; i++)
{
	mapsprites[i] = new Image();
	mapsprites[i].src = '../img/'+mapImg[i]+'.png';
}
for (var i = 0; i < displayImg.length; i++)
{
	dpsprites[i] = new Image();
	dpsprites[i].src = '../img/' +displayImg[i]+'.png';
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
																										//animated sprite stay outside of map4 array
playerOne.img = sprites4[9];                                                                            //sprites4heet for playerOne
playerTwo.img = sprites4[1];																			   //sprites4heet for playerTwo
blueCoin.img = sprites4[8];	
redCoin.img = sprites4[11];

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

intShot = setInterval(shotCheck, 1000);

function shotCheck()
{
	Laser1SFX.play();	
	if(redShotEnabled && redShotCurCnt < maxShot)
		redShotCurCnt ++;
	if(blueShotEnabled && blueShotCurCnt < maxShot)
		blueShotCurCnt++;
	if(redShotEnabled && 34 * SIZE < playerOne.x && playerOne.y > 13 * SIZE)
		redShotEnabled = false;
	if(blueShotEnabled && 34 * SIZE < playerTwo.x && playerTwo.y > 13 * SIZE)
		blueShotEnabled = false;
}

function shotColCheck()
{
	var centerX;
	var centerY;

	for(var i = 0; i < redShotCurCnt; i++)
	{	
		if(playerTwo.isDead) break;
		for(var j = 0; j < 4; j++)
		{
			if(j == 0) 
			{
				centerX = redShots[i].right.posX + shotSizeX/2;
				centerY = redShots[i].right.posY + shotSizeY/2;
				//console.log(centerX, centerY);
			}
			if(j == 1) 
			{
				centerX = redShots[i].left.posX + shotSizeX/2;
				centerY = redShots[i].left.posY + shotSizeY/2;
			}
			if(j == 2) 
			{
				centerX = redShots[i].up.posX + shotSizeX/2;
				centerY = redShots[i].up.posY + shotSizeY/2;
			}
			if(j == 3) 
			{
				centerX = redShots[i].down.posX + shotSizeX/2;
				centerY = redShots[i].down.posY + shotSizeY/2;
			}
			if(playerTwo.x < centerX && playerTwo.x + playerTwo.sizeX > centerX
				&& playerTwo.y < centerY && playerTwo.y + playerTwo.sizeY > centerY)
				{
					playerTwo.isDead = true;
				}
		}
	}
	for(var i = 0; i < blueShotCurCnt; i++)
	{
		if(playerOne.isDead) break;
		for(var j = 0; j < 4; j++)
		{
			if(j == 0) 
			{
				centerX = blueShots[i].right.posX + shotSizeX/2;
				centerY = blueShots[i].right.posY + shotSizeY/2;
			}
			if(j == 1) 
			{
				centerX = blueShots[i].left.posX + shotSizeX/2;
				centerY = blueShots[i].left.posY + shotSizeY/2;
			}
			if(j == 2) 
			{
				centerX = blueShots[i].up.posX + shotSizeX/2;
				centerY = blueShots[i].up.posY + shotSizeY/2;
			}
			if(j == 3) 
			{
				centerX = blueShots[i].down.posX + shotSizeX/2;
				centerY = blueShots[i].down.posY + shotSizeY/2;
			}
			if(playerOne.x < centerX && playerOne.x + playerOne.sizeX > centerX
				&& playerOne.y < centerY && playerOne.y + playerOne.sizeY > centerY)
				{
					playerOne.isDead = true;
				}
		}
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



//================================================ANIMATION=============================================


function animateCoin ()
{
	blueCoinSprite++;
	redCoinSprite++;
	blueCoinSprite %= coinMax;
	redCoinSprite %= coinMax;
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
    var camY = clamp(-playerOne.y + canvas.height/1.25, -map4.row, 0);

    surface.translate( camX, camY );    

    //Draw everything
}





//==========================================game player================================================

function spikesF(player)
{
	if(player.isDead) return;
	
	if(player.x + player.sizeX > 130 && player.x < 930 &&
		player.y + player.sizeY > 1507 && player.y < 1537)
		{
			player.isDead = true;
		}
}

function portalFunc(portal)
{
	var gap = 5;
	if(playerOne.x + playerOne.sizeX > portal.fromX + gap && playerOne.x < portal.fromX + portal.sizeX - gap &&
		playerOne.y + playerOne.sizeY > portal.fromY + gap && playerOne.y < portal.fromY + portal.sizeY - gap )
	{
		Teleport1SFX.play();
		playerOne.x = portal.toX;
		playerOne.y = portal.toY;
	}
	if(playerTwo.x + playerTwo.sizeX > portal.fromX + gap && playerTwo.x < portal.fromX + portal.sizeX - gap&&
		playerTwo.y + playerTwo.sizeY > portal.fromY + gap && playerTwo.y < portal.fromY + portal.sizeY - gap )
	{
		Teleport1SFX.play();
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
		map4.tiles[14][25] = 6;
		t2 = setInterval(add2, 300);
	}
}
function add2()
{
	clearInterval(t2);
	map4.tiles[14][26] = 6;
	t3 = setInterval(add3, 300);
}

function add3()
{
	clearInterval(t3);
	map4.tiles[13][26] = 6;
}

var timerBeamInt;
function buttonFunc(button)
{
	if(button.isPressed) return;
	var gap = 5;
	if(playerOne.x + playerOne.sizeX > button.posX + gap && playerOne.x < button.posX + button.size - gap &&
		playerOne.y + playerOne.sizeY > button.posY + gap && playerOne.y < button.posY + button.size - gap )
	{
		BoxSFX.play();
		if(blueShotEnabled) blueShotEnabled = false;
		//intStopShot = setInterval(stopShot, 5000);
		if(button.tag == 2) timerBeam.enabled = true;
		button.isPressed = true;
		redShotEnabled = true;
	}
	if(playerTwo.x + playerOne.sizeX > button.posX + gap && playerTwo.x < button.posX + button.size - gap &&
		playerTwo.y + playerOne.sizeY > button.posY + gap && playerTwo.y < button.posY + button.size - gap )
	{
		BoxSFX.play();
		if(redShotEnabled) redShotEnabled = false;
		//intStopShot = setInterval(stopShot, 5000);
		if(button.tag == 2) timerBeam.enabled = true;
		button.isPressed = true;
		blueShotEnabled = true;
	}
}

function stopShot()
{
	clearInterval(intShot);
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
		map4.tiles[door.y1][door.x1] = 0;
		map4.tiles[door.y2][door.x2] = 0;
	}
	else
	{
		map4.tiles[door.y1][door.x1] = 5;
		map4.tiles[door.y2][door.x2] = 5;
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
	
	if(!(playerOne.isWin && playerTwo.isWin))
	if(timerBeam.posX < 5 * SIZE)
		timerBeam.posX += timerBeam.speed;
	else
		timerBeam.posX += timerBeam.speed + 2;
	
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
	var gap = 10;
	crown.posY = encore.posY - 250;
	if(h < min || h > max) dir *= -1;
	h += dir;
	crown.posY += h;
	
	surface.drawImage(crownImg, crown.posX, crown.posY, crown.sizeX, crown.sizeY);
	surface.drawImage(encoreImg, encore.posX, encore.posY, encore.sizeX, encore.sizeY);
	
	if(playerOne.x + playerOne.sizeX > redCoin.x + gap && playerOne.x < redCoin.x + SIZE - gap &&
		playerOne.y + playerOne.sizeY > redCoin.y + gap && playerOne.y < redCoin.y + SIZE - gap)
	{
		CoinSFX.play();
		playerOne.isWin = true;
	}
	if(playerTwo.x + playerTwo.sizeX > blueCoin.x + gap && playerTwo.x < blueCoin.x + SIZE - gap &&
		playerTwo.y + playerTwo.sizeY > blueCoin.y + gap && playerTwo.y < blueCoin.y + SIZE - gap)
	{
		CoinSFX.play();
		playerTwo.isWin = true;
	}
	if(playerOne.isWin == true && playerTwo.isWin == true)
	{
		playerOne.x = 300;
		playerOne.y = 500;
		playerTwo.x = 250;
		playerTwo.y = 200;
		if(completed == 4)
		{
		completed++;
		
		}
		soundEnded = false;
		playerOne.isWin = false;
		playerTwo.isWin = false;
		isWin = true;
		backToMainMenu();
		
	}
	
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
	Death();
	spikesF(playerOne);
	spikesF(playerTwo);
	addTiles();
}
//===========================================draw====================================================


function render3()
{
	surface.clearRect(0,0,canvas.width,canvas.height);
	surface.drawImage(dpsprites[0], 250, 440, 120, 150);
	surface.drawImage(dpsprites[1], 900, 980, 150, 150);
	surface.drawImage(dpsprites[2], 850, -450);
	surface.drawImage(dpsprites[3], 1500, 550);
	surface.drawImage(dpsprites[4], -100, 700);
	surface.drawImage(dpsprites[5], 480, 820, 150, 150);
	surface.drawImage(dpsprites[6], 2400, 700, 300, 300);

	door(doorZero, buttonZero, 9);
	door(doorOne, buttonOne, 9);
	door(doorTwo, buttonTwo, 9);
	door(doorThree, buttonThree, 9);

	for (var r = 0; r < map4.rows; r++)
	{
		for (var c = 0; c < map4.cols; c++)
		{
			surface.drawImage(mapsprites[map4.tiles[r][c]], c * SIZE , r * SIZE, SIZE, SIZE );
		}
	}	
	surface.drawImage(blueCoin.img, SIZE * blueCoinSprite, 0, SIZE, SIZE, blueCoin.x, blueCoin.y, SIZE, SIZE); //draw coin
	surface.drawImage(redCoin.img, SIZE * redCoinSprite, 0, SIZE, SIZE, redCoin.x, redCoin.y, SIZE, SIZE);
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
	surface.drawImage(playerOne.img, SIZE * playerOne.sprite, SIZE * playerOne.dir, SIZE, SIZE, playerOne.x, playerOne.y, SIZE, SIZE);
	surface.drawImage(playerTwo.img, SIZE * playerTwo.sprite, SIZE * playerTwo.dir, SIZE, SIZE, playerTwo.x, playerTwo.y, SIZE, SIZE);
	northSouthEastWestShot();
	moveTimerBeam();
	if(timerBeam.enabled)
	surface.drawImage(timerBeamImg, timerBeam.posX, -600, timerBeam.sizeX, timerBeam.sizeY);
	
}	


