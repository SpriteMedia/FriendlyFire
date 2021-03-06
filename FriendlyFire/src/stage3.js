canvas.style.backgroundImage = "url('../img/bkg2.gif')";
canvas.width = 1280 * 2; 							  // Sets the canvas width to 640 px. Note that it's a regular property not accessing the .style
canvas.height = 640 * 2;	
var surface = canvas.getContext("2d");
line.src = "../music/Sao.ogg";
//--------------------------------------------PLAYER DATA ------------------------------------------------------------------------
// x = start position, y = start position, speed = players speed (becareful when changing)
//var playerOne = {img:null, x:200, y: 384, speed: 10, sizeX: 64, sizeY: 64, isGround: false, velocityY:0, isJumping: false, isDead: false};  
//var playerTwo = {img:null, x:256, y: 576, speed: 10, sizeX: 64, sizeY: 64, isGround: false, velocityY:0, isJumping: false, isDead: false};
var background = {img:null};
var controls;                     //Object for buttons

playerOne.x = 200;
playerOne.y = 384;

playerTwo.x = 256;
playerTwo.y = 576;
//---------------------------------------------GAME DATA ------------------------------------------------------------------------

//to add asset, place name here of image saved under img folder and call it in map5 array by its placement here. ex: "dirt" = 2
var images5 = ["empty","playerTwo", "Tile", "Tile2" ,"Tile3", "Tile4", "Tile5","Trampoline", "purplecoin", "playerOne", "bkg2", "Raser","pause", "saw"]; 
var sprites5 = []; 
var SIZE = 64; 
var map5 = {
	rows: 20,	
	cols: 40, 
	tiles:
	[
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],            //This array is used to draw the map5. Just read through the image[] and place 
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],            //that asset where you want it in the map5 by using its place number.
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],            //ex. 2,2,2,2,2,2,2,2 to draw the ground
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,0],
		[0,0,0,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,0],
		[0,0,0,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,5,2,0],
		[0,0,0,5,5,5,0,0,0,0,0,0,0,0,0,0,6,6,6,6,0,0,0,6,6,6,6,0,0,0,0,0,0,0,0,0,2,5,2,0],
		[0,0,0,3,3,3,0,0,0,0,0,0,0,0,0,0,6,5,5,6,0,0,0,6,5,5,6,0,0,0,0,0,0,0,0,0,2,5,2,0],
		[0,0,0,3,3,3,0,0,0,0,0,0,0,0,0,0,6,6,6,6,0,0,0,6,6,6,6,0,0,0,0,0,0,0,0,0,2,5,2,0],
		[0,0,0,5,5,5,0,0,0,0,0,0,0,0,0,0,5,5,5,5,0,0,0,5,5,5,5,0,0,0,0,0,0,0,0,0,2,5,2,0],
		[0,0,0,3,3,3,0,0,0,0,0,0,0,0,0,0,6,6,6,6,0,0,0,6,6,6,6,0,0,0,3,7,3,0,0,0,2,5,2,0],
		[0,0,0,3,3,3,0,0,0,4,7,4,0,0,0,0,6,6,6,6,5,7,5,6,6,6,6,0,0,0,3,3,3,0,0,0,2,5,2,0],
		[0,0,0,3,3,3,0,0,0,5,5,5,0,0,0,0,6,6,6,6,5,5,5,6,6,6,6,0,0,0,3,3,3,0,0,0,2,2,2,0],
		[0,0,0,3,3,3,0,0,0,4,4,4,0,0,0,0,6,6,6,6,0,0,0,6,6,6,6,0,0,0,5,5,5,0,0,0,2,2,2,0],
	],
	
};

//============================
var coin = {img:null, x: 2368, y: 448};
var saw1 = {img:null, size:64, fromX:620, fromY: 330, toX: 400, toY: 330, curX:620, curY: 300, speed: 10};
var saw2 = {img:null, size:64, fromX:2020, fromY: 500, toX: 770, toY: 1070, curX:770, curY: 385, speed: 13};
var saw3 = {img:null, size:64, fromX:2020, fromY: 500, toX: 770, toY: 1070, curX:770, curY: 512, speed: 9};
var button = {img:null, size:64, x: 2112, y:512};
var coinSprite = 0;
var coinMax = 16;
var TramCollider = {x:0, y:0, width: 50, height:60};
var TramCollider1 = {x:0, y:0, width: 50, height:60};
var TramCollider2 = {x:0, y:0, width: 50, height:60};
var raser = {img: null, x:-50, y:0, speed: 1, velocity:1, isMoving: true};

setInt = setInterval(update, 33.34);



//=============LaserDoor==================
var laserDoor = {x:374, y:576, sizeX:13, sizeY:64, speed:2, isClosed: true};
var laserDoorSp = new Image();
laserDoorSp.src = '../img/LaserDoor.png';

function LaserDoorOpen()
{

	if(laserDoor.y > 460)
	{
		laserDoor.y -= laserDoor.speed;
		laserDoor.isclosed = true;
	}

}
//=========================================

//==============Button=====================
var doorButton = {x: 1344, y: 900, SIZE:64};
var doorButtonSp = new Image();
doorButtonSp.src = '../img/pause.png';
//=========================================

//=======================bullets==============
var blueHShot = new Image();
var blueVShot = new Image();
var redHShot = new Image();
var redVShot = new Image();
var ShotCurCnt = 0;
var redShots = [];
var blueShots = [];
var maxShot = 999;
var bulletSpeed = 15;
var bulletSize = 64;
blueHShot.src = '../img/blueShotH.png';
blueVShot.src = '../img/blueShotV.png';
redHShot.src = '../img/redShotH.png';
redVShot.src = '../img/redShotV.png';


for(var i = 0; i < maxShot; i++)
{
	var redShot = {};
	var blueShot = {};
	
	redShot.startX = playerOne.x;
	redShot.startY = playerOne.y + playerOne.sizeY/2;
	redShot.right = {posX:redShot.startX, posY:redShot.startY};
	redShot.left = {posX:redShot.startX, posY:redShot.startY};
	redShot.up = {posX:redShot.startX, posY:redShot.startY};
	redShot.down = {posX:redShot.startX, posY:redShot.startY};
	redShots[i] = redShot;
	redShot.colRight = true;
	redShot.colLeft = true;
	
	blueShot.startX = playerTwo.x;
	blueShot.startY = playerTwo.y + playerTwo.sizeY/2;
	blueShot.right = {posX:redShot.startX, posY:redShot.startY};
	blueShot.left = {posX:redShot.startX, posY:redShot.startY};
	blueShot.up = {posX:redShot.startX, posY:redShot.startY};
	blueShot.down = {posX:redShot.startX, posY:redShot.startY};
	blueShots[i] = blueShot;
	blueShot.colUp = true;
	blueShot.colDown = true;
}

var intShot = setInterval(shotCheck,1000);

function shotCheck()
{
	ShotCurCnt++;
}

function ShotColCheck()
{
	for(var i = 0; i < ShotCurCnt; i++)
    {
        if(playerTwo.isDead) break;
        for(var j = 0; j < 2; j++)
        {
            if(j == 0) 
            {
                centerX = redShots[i].right.posX + bulletSize/2;
                centerY = redShots[i].right.posY + bulletSize/2;
                //console.log(centerX, centerY);
            }
            if(j == 1) 
            {
                centerX = redShots[i].left.posX + bulletSize/2;
                centerY = redShots[i].left.posY + bulletSize/2;
            }
            if(playerTwo.x < centerX && playerTwo.x + playerTwo.sizeX > centerX
                && playerTwo.y < centerY && playerTwo.y + playerTwo.sizeY > centerY)
            playerTwo.isDead = true;
        }
    }
	
	for(var i = 0; i < ShotCurCnt; i++)
    {
        if(playerOne.isDead) break;
        for(var j = 0; j < 2; j++)
        {
            if(j == 0) 
            {
                centerX = blueShots[i].up.posX + bulletSize/2;
                centerY = blueShots[i].up.posY + bulletSize/2;
                //console.log(centerX, centerY);
            }
            if(j == 1) 
            {
                centerX = blueShots[i].up.posX + bulletSize/2;
                centerY = blueShots[i].up.posY + bulletSize/2;
            }
            if(playerOne.x < centerX && playerOne.x + playerOne.sizeX > centerX
                && playerOne.y < centerY && playerOne.y + playerOne.sizeY > centerY)
              playerOne.isDead = true;
        }
    }
}

function Shooting()
{
	for(var i = 0; i < maxShot; i++)
	{
		Laser1SFX.play();
		if(i < ShotCurCnt)
		{
		redShots[i].right.posX += bulletSpeed;
		surface.drawImage(redHShot, redShots[i].right.posX, 
		redShots[i].right.posY, bulletSize, bulletSize);
		
		redShots[i].left.posX -= bulletSpeed;
		surface.drawImage(redHShot, redShots[i].left.posX, 
		redShots[i].left.posY, bulletSize, bulletSize);
		
		blueShots[i].up.posY -= bulletSpeed;
		surface.drawImage(blueVShot, blueShots[i].up.posX, 
		blueShots[i].up.posY, bulletSize, bulletSize);	
		
		blueShots[i].down.posY += bulletSpeed;
		surface.drawImage(blueVShot, blueShots[i].down.posX, 
		blueShots[i].down.posY, bulletSize, bulletSize);	
		}
		else
		{
			redShots[i].startX = (playerOne.x + playerOne.sizeX/2 -15);
			redShots[i].startY = (playerOne.y + playerOne.sizeY/2 - 15);
			redShots[i].right = {posX:redShot.startX, posY:redShot.startY};
			redShots[i].left = {posX:redShot.startX, posY:redShot.startY };
			
			blueShots[i].startX = (playerTwo.x + playerTwo.sizeX/2 - 15);
			blueShots[i].startY = (playerTwo.y + playerTwo.sizeY/2 - 15);
			blueShots[i].up = {posX:blueShot.startX, posY:blueShot.startY};
			blueShots[i].down = {posX:blueShot.startX, posY:blueShot.startY};
		}
	}
}
	
//===========================================

//======Trampoline=========================
function TramplineColCheck()
{
	TramCollider.x = 640;
	TramCollider.y = 1088;
	TramCollider1.x = 1344;
	TramCollider1.y = 1088;
	TramCollider2.x = 1984;
	TramCollider2.y =1024;
	
	var gap = 20;
	if(!(playerTwo.y > (TramCollider.y + gap) ||
		(playerTwo.y + playerTwo.sizeY) < TramCollider.y ||
		playerTwo.x > (TramCollider.x + gap ) ||
		(playerTwo.x + playerTwo.sizeX - 40) < TramCollider.x))
		{
			TrampolineSFX.play();
			playerTwo.isJumping = true;
			playerTwo.velocityY = -75;
			controls.up2 = false;
		}
		
	if(!(playerTwo.y > (TramCollider1.y + gap) ||
	(playerTwo.y + playerTwo.sizeY) < TramCollider1.y ||
	playerTwo.x > (TramCollider1.x + gap ) ||
	(playerTwo.x + playerTwo.sizeX - 40) < TramCollider1.x))
		{
			TrampolineSFX.play();
			playerTwo.isJumping = true;
			playerTwo.velocityY = -75;
			controls.up2 = false;
		}

	if(!(playerTwo.y > (TramCollider2.y + gap) ||
	(playerTwo.y + playerTwo.sizeY) < TramCollider2.y ||
	playerTwo.x > (TramCollider2.x + gap ) ||
	(playerTwo.x + playerTwo.sizeX - 40) < TramCollider2.x))
		{
			TrampolineSFX.play();
			playerTwo.isJumping = true;
			playerTwo.velocityY = -75;
			controls.up2 = false;
		}		
		
	if(!(playerOne.y > (TramCollider.y + gap) ||
	(playerOne.y + playerOne.sizeY) < TramCollider.y ||
	playerOne.x > (TramCollider.x + gap ) ||
	(playerOne.x + playerOne.sizeX - 40) < TramCollider.x))
	{
		TrampolineSFX.play();
		playerOne.isJumping = true;
		playerOne.velocityY = -75;
		controls.up = false;
	}
	
	if(!(playerOne.y > (TramCollider1.y + gap) ||
	(playerOne.y + playerOne.sizeY) < TramCollider1.y ||
	playerOne.x > (TramCollider1.x + gap ) ||
	(playerOne.x + playerOne.sizeX - 40) < TramCollider1.x))
		{
			TrampolineSFX.play();
			playerOne.isJumping = true;
			playerOne.velocityY = -75;
			controls.up = false;
		}

	if(!(playerOne.y > (TramCollider2.y + gap) ||
	(playerOne.y + playerOne.sizeY) < TramCollider2.y ||
	playerOne.x > (TramCollider2.x + gap ) ||
	(playerOne.x + playerOne.sizeX - 40) < TramCollider2.x))
		{
			TrampolineSFX.play();
			playerOne.isJumping = true;
			playerOne.velocityY = -75;
			controls.up = false;
		}	
}

//==================Raser ===================
function Laser()
{
	if(raser.isMoving != false)
			raser.x += raser.speed;

	surface.drawImage(raser.img, raser.x, raser.y, 10, 1280);
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
for (var i = 0; i < images5.length; i++)                                                                //takes images5 from image[] and turns them to assets in sprite[]
{
	sprites5[i] = new Image();
	sprites5[i].src = '../img/'+images5[i]+'.png';
}
																									   //animated sprite stay outside of map5 array
playerOne.img = sprites5[9];                                                                            //sprites5heet for playerOne
playerTwo.img = sprites5[1];																			   //sprites5heet for playerTwo
coin.img = sprites5[8];																				   //sprites5heet for coin
background.img = sprites5[10];
raser.img = sprites5[11];
saw1.img = sprites5[13];
saw2.img = sprites5[13];
saw3.img = sprites5[13];
button.img = sprites5[15];

//================================================ANIMATION=============================================
function animator(player, leftInput, rightInput, upInput)
{

    console.log("direction" + player.maxSprite);
    console.log("facing" + player.facing);

    player.sprite++;
    if(player.sprite >= player.maxSprite)
    {
        player.sprite = 0;
    }
     if(leftInput)
    {
        player.dir = 2;
        player.facing = 0;
        player.maxSprite = 18;

    }
    if (!leftInput && player.facing == 0)
    {
        player.dir = 0;
    }
    if(rightInput)
    {
        player.dir = 3;
        player.facing = 1;
        player.maxSprite = 18;

    }
    if (!rightInput && player.facing == 1)
    {
        player.dir = 1;
    }
    if (!rightInput && !leftInput && player.maxSprite!= 11)
    {
        player.maxSprite = 11;
    }
    if (upInput && player.facing == 0)
    {
        player.dir = 4;
        player.sprite = 2; 
    }
    if (upInput && player.facing == 1)
    {
        player.dir = 4;
        player.sprite = 0; 
    }
    if (!upInput && !player.isGround && player.facing == 0)
    {
        player.dir = 4;
        player.sprite = 3;
    }
    if (!upInput && !player.isGround && player.facing == 1)
    {
        player.dir = 4;
        player.sprite = 1;
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
	var gap = 7;
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
	var gap = 15;
	if(raser.x > playerOne.x)
		playerOne.isDead = true;
	else if(raser.x > playerTwo.x)
		playerTwo.isDead = true;
	
	if(!(playerTwo.y > (laserDoor.y) ||
	(playerTwo.y + playerTwo.sizeY) < laserDoor.y ||
	playerTwo.x > (laserDoor.x) ||
	(playerTwo.x + playerTwo.sizeX) < laserDoor.x))
	{
		playerTwo.speed = 0;
	}
	else
		playerTwo.speed = 10;
	
	if(!(playerOne.y > (doorButton.y + gap) ||
	(playerOne.y + playerOne.sizeY) < doorButton.y ||
	playerOne.x > (doorButton.x + gap ) ||
	(playerOne.x + playerOne.sizeX - 40) < doorButton.x))
	{
		laserDoor.isClosed = false;
	}
	
	if(!(playerOne.y > (coin.y) ||
	(playerOne.y + playerOne.sizeY) < (coin.y)||
	playerOne.x > (coin.x + 30) ||
	(playerOne.x + playerOne.sizeX) < coin.x + 30))
	{
		if(completed == 2)
		{
		completed++;
		}
		CoinSFX.play();
		isWin = true;
		console.log("You Win");
		backToMainMenu();
	}
	
	if(!(playerTwo.y > (coin.y) ||
	(playerTwo.y + playerTwo.sizeY) < (coin.y)||
	playerTwo.x > (coin.x + 30) ||
	(playerTwo.x + playerTwo.sizeX) < coin.x + 30))
	{
		if(completed == 2)
		{
		completed++;
		}
		CoinSFX.play();
		console.log("You Win");
		isWin = true;
		backToMainMenu();
	}
	
	if(playerOne.y + playerOne.sizeY > canvas.height - 20)
		playerOne.isDead = true;
	else if(playerTwo.y + playerTwo.sizeY > canvas.height - 20)
		playerTwo.isDead = true;
}
//============================================CONTROLLER=================================================

function playerController(player, inleft, inright, inup, inescape) 
{
	if (player.x > 0 && inleft == true && rayCastCheck(player, 3, player.speed/2, map5))
		player.x -= player.speed;
	if (inright == true && player.x < map5.cols * SIZE && rayCastCheck(player, 3, player.speed/2, map5))
		player.x += player.speed;
	if (player.y > 0 && inup == true && rayCastCheck(player, 3, player.speed/2, map5)) //jump
	{
		if(!player.isJumping)
		{
			JumpSFX.play();
			player.isJumping = true;
			player.velocityY = -30;
			controls.up = false;
			controls.up2 = false;
		}
	}
	if(inescape == true)
	{
	backToMainMenu();
	}
	
	var gravityPower = 3;
	jump(player, gravityPower);
	gravity(player, 10, 0);
	groundCheck(player, 3, gravityPower, map5);//	this.player
}

function backToMainMenu()
{
		stage = 0;
	
}	

/* Death()
{
	if(playerOne.isDead || playerTwo.isDead) 
	{
		console.log("game over");
		if(cheatcode == false)
		{
			isDead = true;
		backToMainMenu();
		}
	}
}*/

//======================================================================================================

function render()
{
	var cam = clamp(-playerOne.x + canvas.width/2, -2000, 0);
		surface.clearRect(0,0,canvas.width,canvas.height);
		surface.drawImage(laserDoorSp, laserDoor.x, laserDoor.y, laserDoor.sizeX, laserDoor.sizeY);
		surface.drawImage(doorButtonSp, doorButton.x, doorButton.y, SIZE, SIZE);
		for (var r = 0; r < map5.rows; r++)
		{
			for (var c = 0; c < map5.cols; c++)
			{
				surface.drawImage(sprites5[map5.tiles[r][c]], c * SIZE , r * SIZE, SIZE, SIZE );
			}
		}	
		surface.drawImage(saw1.img, saw1.curX, saw1.curY, saw1.size, saw1.size);
		surface.drawImage(saw2.img, saw2.curX, saw2.curY, saw2.size, saw2.size);
		surface.drawImage(saw3.img, saw3.curX, saw3.curY, saw3.size, saw3.size);
		surface.drawImage(coin.img, SIZE*coinSprite, 0, SIZE, SIZE, coin.x, coin.y, SIZE, SIZE); //draw coin
		surface.drawImage(playerOne.img, SIZE * playerOne.sprite, SIZE * playerOne.dir, SIZE, SIZE, playerOne.x, playerOne.y, SIZE, SIZE);
		surface.drawImage(playerTwo.img, SIZE * playerTwo.sprite, SIZE * playerTwo.dir, SIZE, SIZE, playerTwo.x, playerTwo.y, SIZE, SIZE);
}

window.addEventListener("keydown", controls.keyListner);
window.addEventListener("keyup", controls.keyListner);
