var canvas = document.getElementById("canvas");    // Creates a link to the canvas element in HTML
canvas.width = 1280; 							  // Sets the canvas width to 640 px. Note that it's a regular property not accessing the .style
canvas.height = 640;	
var surface = canvas.getContext("2d");

//--------------------------------------------PLAYER DATA ------------------------------------------------------------------------
// x = start position, y = start position, speed = players speed (becareful when changing)
function PLAYER2()
{
    this.img = null;
    this.x = 0; 
    this.y = 0; 
    this.speed = 10; 
    this.sizeX = 64;
    this.sizeY = 64; 	
    this.isGround = false; 
    this.velocityX = 0;
    this.velocityY = 0; 
    this.isJumping = false; 
    this.collisionLeft = false;
    this.collisionRight = false; 
    this.collisionUp = false;
    this.dir = 0;	
    this.facing = 0; // 0 = left, 1 = right
    this.sprite = 0;
    this.maxSprite = 11;
    this.minSprite = 0;
	this.isDead = false;
	this.isWin = false;
	
}

var playerOne = new PLAYER2();
playerOne.x = 64;
playerOne.y = 300;

var playerTwo = new PLAYER2();
playerTwo.x = 0;
playerTwo.y = 500;

var controls;    
var redShotVImg = new Image();
var blueShotHImg = new Image();
var blueShotVImg = new Image(); 
var redShotHImg = new Image();    


//---------------------------------------------GAME DATA ------------------------------------------------------------------------

//to add asset, place name here of image saved under img folder and call it in map3 array by its placement here. ex: "dirt" = 2
var images3 = ["empty","playerTwo", "M.Block","M.Light","M.Gun", "purplecoin", "playerOne", "M.FloorSpike", "Background"]; 
var sprites3 = []; 
var SIZE = 64; 
var backGroundImg = new Image();
var map3 = {
	rows: 10,	
	cols: 40, 
	tiles:
	[
		[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
		[0,2,2,0,0,2,0,2,2,0,2,2,2,2,2,0,3,0,3,0,0,2,0,2,0,2,2,2,2,2,2,0,0,0,0,0,0,0,2,2],
		[0,2,0,0,0,3,0,0,3,0,3,0,0,0,0,0,0,0,0,0,0,3,0,3,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,2],
		[0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2],           
		[0,0,0,0,0,0,0,0,0,0,2,2,0,0,2,2,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,2,0,0,0,0,2],            
		[2,2,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,2,0,0,0,0,2,2,0,0,0,0,2,0,0,2],            
		[0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,2,2,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,2,0,2,0,0,2,2],
		[0,0,0,2,2,0,2,2,0,2,0,2,0,2,2,0,0,0,0,0,0,0,2,2,0,0,2,0,0,2,0,0,2,0,0,0,0,2,2,2],
		[0,0,2,2,2,7,2,2,7,2,7,2,7,2,2,7,2,2,2,7,2,7,2,2,7,2,2,7,2,2,7,7,2,7,2,7,2,2,2,2],
		[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
		
	],
	
};
var spikeArray;
	var spike1Size = {x: 320, y: 512};
	var spike2Size = {x: 512, y: 512};
	var spike3Size = {x: 640, y: 512};
	var spike4Size = {x: 768, y: 512};
	var spike5Size = {x: 960, y: 512};
	var spike6Size = {x: 1216, y: 512};
	var spike7Size = {x: 1344, y: 512};
	var spike8Size = {x: 1536, y: 512};
	var spike9Size = {x: 1728, y: 512};
	var spike10Size = {x: 1920, y: 512};
	var spike11Size = {x: 1984, y: 512};
	var spike12Size = {x: 2112, y: 512};
	var spike13Size = {x: 2176, y: 512};

var turretOne = {curShot:0, maxShot: 1000, speed: 10};

var coin = {img:null, x: 2350, y: 100};
var coinSprite = 0;
var coinMax = 16;


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

redShotHImg.src = '../img/redShotH.png';
redShotVImg.src = '../img/redShotV.png';
blueShotHImg.src = '../img/blueShotH.png';
blueShotVImg.src = '../img/blueShotV.png';

setInt = setInterval(update, 33.34);
//=======================================INITIALIZE SPIRTES ============================================
for (var i = 0; i < images3.length; i++)                                                                //takes images3 from image[] and turns them to assets in sprite[]
{
	sprites3[i] = new Image();
	sprites3[i].src = '../img/'+images3[i]+'.png';
}
																									   //animated sprite stay outside of map3 array
playerOne.img = sprites3[6];                                                                            //sprites3heet for playerOne
playerTwo.img = sprites3[1];																			   //sprites3heet for playerTwo
coin.img = sprites3[5];		
backGroundImg = sprites3[8];			



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

var intShot = setInterval(shotCheck, 700);

function shotCheck()
{
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
			console.log("Player2 died");
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
			console.log("Player1 died");
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
//===========================================UPDATE=====================================================




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
    var camX = clamp(-playerOne.x + canvas.width/2, -1275, 0);
    var camY = clamp(-playerOne.y + canvas.height/1.25, -map3.row, 0);

    surface.translate( camX, camY );    

    //Draw everything
}


//============================================CONTROLLER=================================================

function playerController(player, inleft, inright, inup, inescape) 
{
	if (player.x > 0 && inleft == true && rayCastCheck(player, 10, player.speed/2))
		player.x -= player.speed;
	if (inright == true && player.x < map3.cols * SIZE && rayCastCheck(player, 10, player.speed/2))
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
	
	//console.log(player.velocityY);
	var gravityPower = 3;
	jump(player, gravityPower);
	gravity(player, 10);
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
	if(bottomY > map3.rows) return false;
	
	player.isGround = false;
	if(map3.tiles[bottomY][parseInt((player.x + gap)/SIZE)] != 0) player.isGround = true; 
	if(map3.tiles[bottomY][parseInt((player.x + gap)/SIZE)] == 7)
	{
		player.isDead = true;
	}
	if(map3.tiles[bottomY][parseInt((player.x + player.sizeX/2)/SIZE)] != 0) player.isGround = true;
	if(map3.tiles[bottomY][parseInt((player.x + player.sizeX/2)/SIZE)] == 7)
	{
		player.isDead = true;
	}
	if(map3.tiles[bottomY][parseInt((player.x + (player.sizeX - gap))/SIZE)] != 0) player.isGround = true;
	if(map3.tiles[bottomY][parseInt((player.x + (player.sizeX - gap))/SIZE)] == 7)
	{
		player.isDead = true;
	}	
	
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
		if( map3.tiles[parseInt(centerPos.y/SIZE)][parseInt(leftRay/SIZE)] != 0) return false;
		if( map3.tiles[parseInt((player.y + Gap)/SIZE)][parseInt(leftRay/SIZE)] != 0) return false;
		if( map3.tiles[parseInt((player.y + SIZE - Gap)/SIZE)][parseInt(leftRay/SIZE)] != 0) return false;
		return true;
	}
	else if(controls.right || controls.right2)
	{
		if( map3.tiles[parseInt(centerPos.y/SIZE)][parseInt(rightRay/SIZE)] != 0) return false;
		if( map3.tiles[parseInt(centerPos.y/SIZE)][parseInt(rightRay/SIZE)] != 0) return false;
		if( map3.tiles[parseInt((player.y + Gap)/SIZE)][parseInt(rightRay/SIZE)] != 0) return false;
		if( map3.tiles[parseInt((player.y + SIZE - Gap)/SIZE)][parseInt(rightRay/SIZE)] != 0) return false;
		return true;
	}
	else if(controls.up || controls.up2)
	{
		if( map3.tiles[parseInt(upRay/SIZE)][parseInt(centerPos.x/SIZE)] != 0) return false;
		if( map3.tiles[parseInt(upRay/SIZE)][parseInt((player.x + Gap)/SIZE)] != 0) return false;
		if( map3.tiles[parseInt(upRay/SIZE)][parseInt((player.x + SIZE - Gap)/SIZE)] != 0) return false;
		return true;
	}
}

function CoinCheck (player, coin)
{
	if (player.x < coin.x + 70 && player.x + 64 > coin.x 
		&& player.y > coin.y && player.y + 64 < coin.y + 100)
	{
		console.log("You won");
		if(completed == 2)
		{
			completed++;
			backToMainMenu();
		}
		
	}
}

function checkCollision(player)
{
	if (player.x < spike1Size.x + SIZE && player.x + player.sizeX > spike1Size.x
	&& player.y + player.sizeY > spike1Size.y)
	{
	player.isDead = true;
	console.log("game over");
	}
	if (player.x < spike2Size.x + SIZE && player.x + player.sizeX > spike2Size.x
	&& player.y + player.sizeY > spike2Size.y)
	{
	player.isDead = true;
	console.log("game over");
	}
	if (player.x < spike3Size.x + SIZE && player.x + player.sizeX > spike3Size.x
	&& player.y + player.sizeY > spike3Size.y)
	{
	player.isDead = true;
	console.log("game over");
	}
	if (player.x < spike4Size.x + SIZE && player.x + player.sizeX > spike4Size.x
	&& player.y + player.sizeY > spike4Size.y)
	{
	player.isDead = true;
	console.log("game over");
	}
	if (player.x < spike5Size.x + SIZE && player.x + player.sizeX > spike5Size.x
	&& player.y + player.sizeY > spike5Size.y)
	{
	player.isDead = true;
	console.log("game over");
	}
	if (player.x < spike6Size.x + SIZE && player.x + player.sizeX > spike6Size.x
	&& player.y + player.sizeY > spike6Size.y)
	{
	player.isDead = true;
	console.log("game over");
	}
	if (player.x < spike7Size.x + SIZE && player.x + player.sizeX > spike7Size.x
	&& player.y + player.sizeY > spike7Size.y)
	{
	player.isDead = true;
	console.log("game over");
	}
	if (player.x < spike8Size.x + SIZE && player.x + player.sizeX > spike8Size.x
	&& player.y + player.sizeY > spike8Size.y)
	{
	player.isDead = true;
	console.log("game over");
	}
	if (player.x < spike9Size.x + SIZE && player.x + player.sizeX > spike9Size.x
	&& player.y + player.sizeY > spike9Size.y)
	{
	player.isDead = true;
	console.log("game over");
	}
	if (player.x < spike10Size.x + SIZE && player.x + player.sizeX > spike10Size.x
	&& player.y + player.sizeY > spike10Size.y)
	{
	player.isDead = true;
	console.log("game over");
	}
	if (player.x < spike11Size.x + SIZE && player.x + player.sizeX > spike11Size.x
	&& player.y + player.sizeY > spike11Size.y)
	{
	player.isDead = true;
	console.log("game over");
	}
	if (player.x < spike12Size.x + SIZE && player.x + player.sizeX > spike12Size.x
	&& player.y + player.sizeY > spike12Size.y)
	{
	player.isDead = true;
	console.log("game over");
	}
	if (player.x < spike13Size.x + SIZE && player.x + player.sizeX > spike13Size.x
	&& player.y + player.sizeY > spike13Size.y)
	{
	player.isDead = true;
	console.log("game over");
	}
}
//=======================================Player Actions===================================================
function Death()
{
	if(playerOne.isDead || playerTwo.isDead) 
	{
		//game over;
		console.log("game over");
		if(cheatcode == false)
		{
			playerOne.x = 50; 
			playerOne.y = 300;
			playerTwo.x = 0;
			playerTwo.y = 512;
		}
	}
}

function stopShot()
{
	clearInterval(intStopShot);
	redShotEnabled = false;
	blueShotEnabled = false;
}
//======================================================================================================

function render()
{
		surface.clearRect(0,0,canvas.width,canvas.height);
				
		for (var r = 0; r < map3.rows; r++)
		{
			for (var c = 0; c < map3.cols; c++)
			{
				surface.drawImage(sprites3[map3.tiles[r][c]], c * SIZE , r * SIZE, SIZE, SIZE );
			}
		}	
		surface.drawImage(coin.img, SIZE*coinSprite, 0, SIZE, SIZE, coin.x, coin.y, SIZE, SIZE); //draw coin
		surface.drawImage(playerOne.img, SIZE * playerOne.sprite, SIZE * playerOne.dir, SIZE, SIZE, playerOne.x, playerOne.y, SIZE, SIZE);
		surface.drawImage(playerTwo.img, SIZE * playerTwo.sprite, SIZE * playerTwo.dir, SIZE, SIZE, playerTwo.x, playerTwo.y, SIZE, SIZE);
		northSouthEastWestShot();
}

window.addEventListener("keydown", controls.keyListner)
window.addEventListener("keyup", controls.keyListner);

//========================================================================================================