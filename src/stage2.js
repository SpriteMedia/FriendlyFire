var canvas = document.getElementById("canvas");    // Creates a link to the canvas element in HTML
canvas.width = 1280; 							  // Sets the canvas width to 640 px. Note that it's a regular property not accessing the .style
canvas.height = 640;	
var surface = canvas.getContext("2d");



//--------------------------------------------PLAYER DATA ------------------------------------------------------------------------
// x = start position, y = start position, speed = players speed (becareful when changing)
//var playerOne = {img:null, x:0, y: 512, speed: 10, sizeX: 60, sizeY: 64, isGround: false, velocityY:0, isJumping: false};  
//var playerTwo = {img:null, x:510, y: 576, speed: 10, sizeX: 60, sizeY: 64, isGround: false, velocityY:0, isJumping: false};  



playerOne.x = 0;
playerOne.y = 512;


playerTwo.x = 510;
playerTwo.y = 576;

playerOne.isDead = false;
playerTwo.isDead = false;

var redShots = [];
var blueShots = [];
var redShotEnabled = true;
var blueShotEnabled = true;
var redShotCurCnt = 0;
var redShotReCnt = 0;
var blueShotCurCnt = 0;
var blueShotReCnt = 0;
var maxShot = 1111;
var redShotSpeed = 12;
var blueShotSpeed = 12;
var shotSizeX = 25;
var shotSizeY = 25;
//---------------------------------------------GAME DATA ------------------------------------------------------------------------

//to add asset, place name here of image saved under img folder and call it in map2 array by its placement here. ex: "dirt" = 2
var images2 = ["empty","playerTwo", "dirt", "grass" ,"grasstop", "door", "dooropen","monster", "purplecoin", "playerOne", "Saw","Spike_Down","Spike_up","Spike_left&right"]; 
var sprites2 = [];  
var map2 = {
	rows: 21,	
	cols: 40, 
	tiles:
	[
		[4,4,4,2,2,2,2,2,4,4,4,4,4,4,4,4,4,4,4,4,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
        [0,0,0,2,4,4,4,2,0,0,0,0,0,0,0,0,0,0,0,0,4,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
        [0,0,0,2,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
        [0,0,0,2,0,0,0,11,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
        [0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,2,2,2,2,2,2,2,2,2,2,2,2],
        [0,0,0,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,2,2,2,2,2,2,2,2,2,2,2],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,4,0,0,0,2],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,3,3,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,2],
        [0,3,3,3,3,3,3,3,0,0,0,0,0,0,0,2,0,3,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
        [3,2,2,2,2,2,2,2,0,0,3,0,0,0,3,2,3,2,3,3,3,3,3,3,2,3,3,3,3,0,0,3,3,3,3,3,3,3,3,3],
        [2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,0,0,2,2,2,2,2,2,2,2,2],
        [2,2,2,2,2,2,2,2,2,3,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,0,0,2,2,2,2,2,2,2,2,2],
        [2,2,2,2,2,2,2,2,2,2,3,3,0,3,3,0,0,0,0,2,2,2,2,2,2,2,2,2,2,0,0,2,2,2,2,2,2,2,2,2],
        [2,2,2,2,2,2,2,2,2,2,2,2,0,2,2,2,0,0,0,2,2,2,2,2,2,2,2,2,2,0,0,2,2,2,2,2,2,2,2,2],
        [0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2],
        [0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2],
        [0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,2,2,2,2,0,0,0,0,2],
        [0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
        [0,3,3,2,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2],
        [3,2,2,2,2,2,0,0,3,0,0,3,0,0,3,0,0,3,0,0,3,0,0,3,0,0,3,3,3,0,2,0,0,0,0,0,0,0,0,0],
        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,7,2,0,0,0,0,0,0,0,0,0],
	],
	

};

var spike = new Image();
spike.src = '../img/Spike_Down.png';

var spike1 = {x: 1240, y: 890};
var spike2 = {x: 1300, y: 890};
var spike3 = {x: 1400, y: 890};
var spike4 = {x: 1500, y: 890};
var spike5 = {x: 1600, y: 890};
var spike8 = {x: 1216, y: 1082};
var spike9 = {x: 1300, y: 1082};
var spike10 = {x: 1400, y: 1082};
var spike11 = {x: 1500, y: 1082};
var spike12 = {x: 1600, y: 1082};
var spike13 = {x: 1160, y: 1082};

var blueShotHImg = new Image();
var redShotHImg = new Image();

var coin = {img:null, x: 125, y: 925}; 
var coinSprite = 0;
var coinMax = 16;

var sdSpike = new Image();
sdSpike.src = '../img/Spike_Left&Right.png';

var Spike = {x:1850, y:580};

setInt = setInterval(update, 33.34);

//=======================================INITIALIZE SPIRTES ============================================
for (var i = 0; i < images2.length; i++)                                                                //takes images2 from image[] and turns them to assets in sprite[]
{
	sprites2[i] = new Image();
	sprites2[i].src = '../img/'+images2[i]+'.png';
}
																									   //animated sprite stay outside of map2 array
playerOne.img = sprites2[9];                                                                            //sprites2heet for playerOne
playerTwo.img = sprites2[1];																			   //sprites2heet for playerTwo
coin.img = sprites2[8];																				   //sprites2heet for coin

var sawSprite = new Image();
sawSprite.src = '../img/Saw.png';
var Saw1 = {img:null, x:600, y:200, speed: 7, fromY: 200, toY:500};
var Saw2 = {img:null, x:715, y:500, speed: 7, fromY: 200, toY:500};
var Saw3 = {img:null, x:1160, y:320, speed: 10, fromX:1160 , toX:1350};
var Saw4 = {x:765, y: 820};

var monstSprite = new Image();
monstSprite.src = '../img/monster.png';
var monst1 = {img:null, x:430, y:1030, speed: 10, fromY: 1030, toY: 1150};
var monst2 = {x:1800, y: 440};
var monst3 = {x:1860, y: 1280};

redShotHImg.src = '../img/redShotH.png';
blueShotHImg.src = '../img/blueShotH.png';

//===========================================UPDATE=====================================================

for(var i = 0; i < maxShot; i++)
{
    var redShot = {};
    var blueShot = {};

    redShot.startX = playerOne.x;
    redShot.right = {posX:redShot.startX, posY:redShot.startY};
    redShot.left = {posX:redShot.startX, posY:redShot.startY};
    redShot.colRight = true;
    redShot.colLeft = true;
    redShots[i] = redShot;

    blueShot.startX = playerTwo.x;
    blueShot.right = {posX:redShot.startX, posY:redShot.startY};
    blueShot.left = {posX:redShot.startX, posY:redShot.startY};
    blueShot.colRight = true;
    blueShot.colLeft = true;
    blueShots[i] = blueShot;
}

intShot = setInterval(shotCheck, 1700);

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

            if(playerTwo.x < centerX && playerTwo.x + playerTwo.sizeX > centerX
                && playerTwo.y < centerY && playerTwo.y + playerTwo.sizeY > centerY)
                {
					playerTwo.isDead = true;
					console.log("Player2 died");
					return;
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
			
           if(playerOne.x < centerX && playerOne.x + playerOne.sizeX > centerX
                && playerOne.y < centerY && playerOne.y + playerOne.sizeY > centerY)
                {
					playerOne.isDead = true;
					console.log("Player1 died");
					return;
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
function animator(player, leftInput, rightInput, upInput)
{

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



function clamp(value, min, max){
    if(value < min) return min;
    else if(value > max) return max;
    return value;
}

function draw() {
    surface.setTransform(1,0,0,1,1,0);//reset the transform matrix as it is cumulative
    surface.clearRect(0, 0, canvas.width, canvas.height);//clear the viewport AFTER the matrix is reset

    //Clamp the camera position to the world bounds while centering the camera around the player                                             
    var camX = clamp(-((playerOne.x + playerTwo.x)/2)+ canvas.width/2, -2000, 0);
    var camY = clamp(-((playerOne.y + playerTwo.y)/2)+ canvas.height/1.35, -map2.row, 0);

    surface.translate( camX, camY );    

    //Draw everything
}



function backToMainMenu()
{
		stage = 0;
	
}

function MoveObject ()
{		
	Saw1.y += Saw1.speed;
    if(Saw1.fromY > Saw1.y||Saw1.toY < Saw1.y)
        Saw1.speed *= -1;
	
	Saw2.y += Saw2.speed;
	if(Saw2.fromY > Saw2.y||Saw2.toY < Saw2.y)
        Saw2.speed *= -1;
	
		Saw3.x += Saw3.speed;
	if(Saw3.fromX > Saw3.x||Saw3.toX < Saw3.x)
        Saw3.speed *= -1;
	
	monst1.y += monst1.speed;
	if(monst1.fromY > monst1.y||monst1.toY < monst1.y)
		monst1.speed*= -1;
	
}

function checkCollision(player)
{
	if (player.x < Saw1.x + SIZE && player.x + player.sizeX > Saw1.x
    && player.y + player.sizeY > Saw1.y && player.y < Saw1.y + SIZE)
    {
		player.isDead = true;
		console.log("game over1");
	return;
	}
	if (player.x < Saw2.x + SIZE && player.x + player.sizeX > Saw2.x
    && player.y + player.sizeY > Saw2.y && player.y < Saw2.y + SIZE)
    {
		player.isDead = true;
		console.log("game over2");
	return;
	}
	if (player.x < Saw3.x + SIZE && player.x + player.sizeX > Saw3.x
    && player.y + player.sizeY > Saw3.y && player.y < Saw3.y + SIZE)
    {
     player.isDead = true;
    console.log("game over3");
	return;
	}
	if (player.x < Saw4.x + SIZE && player.x + player.sizeX > Saw4.x
    && player.y + player.sizeY > Saw4.y && player.y < Saw4.y + SIZE)
    {
    player.isDead = true;
    console.log("game over4");
	return;
	}
	if (player.x < monst1.x + SIZE && player.x + player.sizeX > monst1.x
    && player.y + player.sizeY > monst1.y && player.y < monst1.y + SIZE)
    {
    player.isDead = true;
    console.log("game over5");
	return;
	}
	if (player.x < monst2.x + SIZE && player.x + player.sizeX > monst2.x
    && player.y + player.sizeY > monst2.y && player.y < monst2.y + SIZE)
    {
		player.isDead = true;
		console.log("game over6");
		return;
	}
	if (player.x < monst3.x + SIZE && player.x + player.sizeX > monst3.x
    && player.y + player.sizeY > monst3.y && player.y < monst3.y + SIZE)
    {
    player.isDead = true;
    console.log("game over7");
	return;
	}
	if (player.x < Spike.x + SIZE && player.x + player.sizeX > Spike.x
    && player.y + player.sizeY > Spike.y && player.y < Spike.y + SIZE)
    {
    player.isDead = true;
    console.log("game over8");
	return;
	}
    if (player.x < spike1.x + SIZE && player.x + player.sizeX > spike1.x
    && player.y + player.sizeY > spike1.y && player.y < spike1.y + SIZE)
    {
    player.isDead = true;
    console.log("game over9");
	return;
    }
    if (player.x < spike2.x + SIZE && player.x + player.sizeX > spike2.x
    && player.y + player.sizeY > spike2.y && player.y < spike2.y + SIZE)
    {
    player.isDead = true;
    console.log("game over10");
	return;
    }
    if (player.x < spike3.x + SIZE && player.x + player.sizeX > spike3.x
    && player.y + player.sizeY > spike3.y && player.y < spike3.y + SIZE)
    {
    player.isDead = true;
    console.log("game over11");
	return;
    }
    if (player.x < spike4.x + SIZE && player.x + player.sizeX > spike4.x
    && player.y + player.sizeY > spike4.y && player.y < spike4.y + SIZE)
    {
    player.isDead = true;
    console.log("game over12");
	return;
    }
    if (player.x < spike5.x + SIZE && player.x + player.sizeX > spike5.x
    && player.y + player.sizeY > spike5.y && player.y < spike5.y + SIZE)
    {
    player.isDead = true;
    console.log("game over13");
	return;
    }
    if (player.x < spike8.x + SIZE && player.x + player.sizeX > spike8.x
    && player.y + player.sizeY > spike8.y && player.y < spike8.y + SIZE)
    {
    player.isDead = true;
    console.log("game over14");
	return;
    }
    if (player.x < spike9.x + SIZE && player.x + player.sizeX > spike9.x
    && player.y + player.sizeY > spike9.y && player.y < spike9.y + SIZE)
    {
    player.isDead = true;
    console.log("game over15");
	return;
    }
    if (player.x < spike10.x + SIZE && player.x + player.sizeX > spike10.x
    && player.y + player.sizeY > spike10.y && player.y < spike10.y + SIZE)
    {
    player.isDead = true;
    console.log("game over16");
	return;
    }
    if (player.x < spike11.x + SIZE && player.x + player.sizeX > spike11.x
    && player.y + player.sizeY > spike11.y && player.y < spike11.y + SIZE)
    {
    player.isDead = true;
    console.log("game over17");
	return;
    }
    if (player.x < spike12.x + SIZE && player.x + player.sizeX > spike12.x
    && player.y + player.sizeY > spike12.y && player.y < spike12.y + SIZE)
    {
    player.isDead = true;
    console.log("game over18");
	return;
    }
    if (player.x < spike13.x + SIZE && player.x + player.sizeX > spike13.x
    && player.y + player.sizeY > spike13.y && player.y < spike13.y + SIZE)
    {
    player.isDead = true;
    console.log("game over19");
	return;
    }
}

function CoinCheck (player, coin)
{
    if (player.x < coin.x + 70 && player.x + 64 > coin.x 
        && player.y > coin.y && player.y + 64 < coin.y + 100)
    {
		console.log("hitting");	
		if(completed == 2)
		{
			completed++;	
		}
		soundEnded = false;
		isWin = true;
		CoinSFX.play();
		clearInterval(intShot);
		backToMainMenu();
		return;
    }
}
//======================================================================================================

function render()
{
		surface.clearRect(0,0,canvas.width,canvas.height);
		surface.drawImage(sawSprite, Saw1.x, Saw1.y, SIZE, SIZE);
		surface.drawImage(sawSprite, Saw2.x, Saw2.y, SIZE, SIZE);
		surface.drawImage(sawSprite, Saw3.x, Saw3.y, SIZE, SIZE);
		surface.drawImage(sawSprite, Saw4.x, Saw4.y, SIZE, SIZE);
		
		surface.drawImage(spike, spike1.x, spike1.y, SIZE, SIZE);
		surface.drawImage(spike, spike2.x, spike2.y, SIZE, SIZE);
		surface.drawImage(spike, spike3.x, spike3.y, SIZE, SIZE);
		surface.drawImage(spike, spike4.x, spike4.y, SIZE, SIZE);
		surface.drawImage(spike, spike5.x, spike5.y, SIZE, SIZE);
		surface.drawImage(spike, spike8.x, spike8.y, SIZE, SIZE);
		surface.drawImage(spike, spike9.x, spike9.y, SIZE, SIZE);
		surface.drawImage(spike, spike10.x, spike10.y, SIZE, SIZE);
		surface.drawImage(spike, spike11.x, spike11.y, SIZE, SIZE);
		surface.drawImage(spike, spike12.x, spike12.y, SIZE, SIZE);
		surface.drawImage(spike, spike13.x, spike13.y, SIZE, SIZE);
		
		surface.drawImage(sdSpike, Spike.x, Spike.y, SIZE, SIZE);
		
		for (var r = 0; r < map2.rows; r++)
		{
			for (var c = 0; c < map2.cols; c++)
			{
				surface.drawImage(sprites2[map2.tiles[r][c]], c * SIZE , r * SIZE, SIZE, SIZE );
			}
		}	
		surface.drawImage(playerOne.img, SIZE * playerOne.sprite, SIZE * playerOne.dir, SIZE, SIZE, playerOne.x, playerOne.y, SIZE, SIZE);
		surface.drawImage(playerTwo.img, SIZE * playerTwo.sprite, SIZE * playerTwo.dir, SIZE, SIZE, playerTwo.x, playerTwo.y, SIZE, SIZE);
		surface.drawImage(monstSprite, monst1.x, monst1.y, SIZE, SIZE);
		surface.drawImage(monstSprite, monst2.x, monst2.y, SIZE, SIZE);
		surface.drawImage(monstSprite, monst3.x, monst3.y, SIZE, SIZE);
		northSouthEastWestShot();
		surface.drawImage(coin.img, SIZE*coinSprite, 0, SIZE, SIZE, coin.x, coin.y, SIZE, SIZE); //draw coin
}

