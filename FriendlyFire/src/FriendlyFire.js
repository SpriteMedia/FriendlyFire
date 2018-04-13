var canvas = document.getElementById("canvas");    // Creates a link to the canvas element in HTML
canvas.width = 1280; 							  // Sets the canvas width to 640 px. Note that it's a regular property not accessing the .style
canvas.height = 640;	
var surface = canvas.getContext("2d");

var line = document.createElement("audio");
line.type =  "audio/mp3";
line.src = "../music/Ly.mp3";
line.autoplay = true;

//shot
var encore = {sizeX: 1000, sizeY: 160, posX: 2050, posY: 1200, speed: 7};
var blueCoin = {img:null, x: encore.posX + 730, y: encore.posY - 30}; 
var redCoin = {img:null, x: encore.posX + 460, y: encore.posY - 30};
var blueCoinSprite = 0;
var redCoinSprite = 3;

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
var shotSizeX = 25;
var shotSizeY = 25;

var soundEnded = false;


//SFX//
var CoinSFX       = new Audio('../SFX/Coin.wav');
var JumpSFX       = new Audio('../SFX/Jump.wav');
var UISFX         = new Audio('../SFX/UI.mp3');
var Laser1SFX     = new Audio('../SFX/Laser1.mp3');
var Laser2SFX     = new Audio('../SFX/Laser2.mp3');
var Teleport1SFX  = new Audio('../SFX/Teleport1.wav');
var TrampolineSFX = new Audio('../SFX/Trampoline.wav');
var GameOverSFX   = new Audio('../SFX/gameover.mp3');
var GameWinSFX    = new Audio('../SFX/gamewin.mp3');
var BoxSFX 	      = new Audio('../SFX/Box.wav');

//volume
line.volume = 0.15;
JumpSFX.volume = 0.05;
CoinSFX.volume = 0.1;
Laser1SFX.volume = 0.05;
Laser2SFX.volume = 0.05;
GameOverSFX.volume = 0.1;
GameWinSFX.volume = 0.1;
TrampolineSFX.volume = 0.3;
Teleport1SFX.volume = 0.3;
BoxSFX.volume = 0.8;

//██████████████████████████████PLAYER DATA █████████████████████████████████████████████
function PLAYER()
{
    this.img = null;
    this.x = 0; 
    this.y = 0; 
    this.speed = 15; 
    this.sizeX = 56;
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
	this.isDead = false; //
	this.isWin = false;  //
	this.jumpOnce = false;
	this.isJumpOnce = true;
	
}

var playerOne = new PLAYER();
playerOne.x = 700;
playerOne.y = 100;

var playerTwo = new PLAYER();


var up, up2 = false;
var left, left2 = false;
var right, right2 = false;
var escape = false;
var off = false;	
var space = false;
var playbutton = false;
var playgame = false;
var stage = 0;
var completedStore = 0; //added
var completed = 0;
var entered = 0; //debugging tool
var cheatcode = false;
var isWin = false;
var isDead = false;
var groundLen = 4.5;//for groundCheck raycast length

var textcount = 0;//used for going to next text
var talking = false;

var shop = {img:null , x: 900, y: 266};
var shopkeep = {img:null, x:canvas.width/2, y:canvas.height/2};
var door1 = {img:null , x: 126, y:438};
var door2 = {img:null , x: 1755, y:759};
var door3 = {img:null , x: 30, y: 1014};
var door4 = {img:null , x: 100, y:1590};


var water     = {img: null, x: 640,  y: 1090, waterSprite: 0, waterMax: 17}; //EDIT
var moveblock = {img: null, x: 705,  y: 1090,speed: 7, start: 705, end: 950, touching: false}; //EDIT
var moveblock2= {img: null, x: 1340, y: 1090,speed: 7, start: 1095, end: 1340, touching: false}; //EDIT

var monster   = {img: null, x: 545,  y: 550, speed: 7, start: 400, end: 700}; //EDIT
var monster2  = {img: null, x: 670,  y: 700, speed: 7, start: 640, end: 1140}; //EDIT
var monster3  = {img: null, x: 1300, y: 780, speed: 7, start: 800, end: 1300}; //EDIT
var monster4  = {img: null, x: 1025, y: 900, speed: 7, start: 900, end: 1090}; //EDIT
var monster5  = {img: null, x: 640,  y: 1280, speed: 11, start: 260, end: 640}; //EDIT
var monster6  = {img: null, x: 350,  y: 1355, speed: 10, start: 350, end: 1000}; //EDIT
var monster7  = {img: null, x: 690,  y: 1280, speed: 11, start: 690, end: 1090}; //EDIT
var monster8  = {img: null, x: 400,  y: 1500, speed: 10, start: 1500, end: 1600}; //EDIT
var monster9  = {img: null, x: 640,  y: 1500, speed: 10, start: 1500, end: 1600}; //EDIT
var monster10 = {img: null, x: 850,  y: 1500, speed: 10, start: 1500, end: 1600}; //EDIT

//██████████████████████████████PLAYER DATA █████████████████████████████████████████████

var images = ["empty", "playerOne", "Door", "grass", "shop", "Shopkeep", "dirt", "dooropen", "tree", "monster", "wateranimation", "movingblock"];
var sprites = [];
var SIZE = 64; 
var map1 = {
	rows: 27,
	cols: 30,
	tiles:
	[
	  //                   10                  20                  30
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[3,3,6,3,3,3,3,3,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3], //main ground
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,3,3,3,3], //second floor
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[3,3,0,0,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,3,3,3,3], //third floor
		[6,6,0,0,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	    [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,3,3,3,3,3,3,3,3,3], //fourth floor
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	    [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3], //fifth floor
		],
}






function objectCol(player, object, hitboxX, hitboxY)
{
	if(player.x < object.x + hitboxX && player.x + hitboxX > object.x && player.y + hitboxY > object.y && player.y < object.y + hitboxY)
	{
		player.isDead = true;
		//console.log("game over");
	}
}

function movingBox(player, object)
{
	console.log(object.touching);
	if (player.x < object.x + SIZE && player.x + SIZE > object.x && player.y + SIZE > object.y && player.y + SIZE < object.y + 20)
		object.touching = true;
	else
		object.touching = false;
	
	if (object.touching)
	{
		player.x = object.x;
	}
}


function doorInteract()
{
	var imported = document.createElement("script")//<script>
	if(playerOne.x < door1.x + 64 && playerOne.x > door1.x && playerOne.y < door1.y + 64 && playerOne.y > door1.y)
	{
		imported.src = "stage1.js";//this runs the second script
		document.body.appendChild(imported);
		entered = 1;
		stage = 2;
		
	}
		if(playerOne.x < door2.x + 64 && playerOne.x > door2.x && playerOne.y < door2.y + 64 && playerOne.y > door2.y && completed > 0 && door2.img == sprites[7])
	{
		
		
		imported.src = "stage2.js";//this runs the second script
		document.body.appendChild(imported);
		entered = 1;
		stage = 1;
		
	}
	if(playerOne.x < door3.x + 64 && playerOne.x > door3.x && playerOne.y < door3.y + 64 && playerOne.y > door3.y && completed > 1 && door3.img == sprites[7])
	{

		
		
		imported.src = "stage3.js";//this runs the second script
		document.body.appendChild(imported);
		entered = 1;
		stage = 4;
	}
	if(playerOne.x < door4.x + 64 && playerOne.x > door4.x && playerOne.y < door4.y + 64 && playerOne.y > door4.y && completed > 2 && door4.img == sprites[7])
	{
		imported.src = "stage4.js";//this runs the second script
		document.body.appendChild(imported);
		entered = 1;
		stage = 3;
		
	}
}

function onKeyDown(event)
{
	
	switch(event.keyCode)
	{
		case 74: // J
			if(cheatcode)
			{
				playerOne.isDead = false;
				playerTwo.isDead = false; 
			}
			cheatcode = !cheatcode;
			console.log("cheatcode: ", cheatcode, completed);
			break;
			//completed = completedStore;
		case 27: // escape	
			escape = true;
			break;
	}
	//if(playerOne.img != sprites[0]) { //make this more efficient 
		switch (event.keyCode)
		{
		
		case 65: //A
			left = true;			
			break;
		case 68: //D
			right = true;
			break;
		case 87: //W
			if(playerOne.isJumpOnce == true)
			playerOne.jumpOnce = true;
			up = true;
			break;
		case 37: //left2
			left2 = true;
			break;
		case 39: //right2
			right2 = true;
			break;
		case 38: //up2
			if(playerTwo.isJumpOnce == true)
			playerTwo.jumpOnce = true;
			up2 = true;
			break;		
		}
	//}
	// else if(playerOne.img = sprites[0])
	// {
		// switch (event.keyCode)
		// {
			// case 32:
			// UISFX.play();
			// console.log("keypress");
			// textcount++;
				// break;
		// }
	// }
	switch (event.keyCode)
		{
			case 32:
			UISFX.play();
			console.log("keypress");
			textcount++;
				break;
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
			playerOne.isJumpOnce = true;
			playerOne.jumpOnce = false;
			break;
		case 37: //left2
			left2 = false;
			break;
		case 39: //right2
			right2 = false;
			break;
		case 38: //up2
			up2 = false;
			playerTwo.isJumpOnce = true;
			playerTwo.jumpOnce = false;
			break;
			
		case 27: // escape	
		escape = false;
		break;	
			
		//ADD PLAYER 2 INPUT
	}
}

var indexX = parseInt(playerOne.x/SIZE);
var indexY = parseInt(playerOne.y/SIZE);
var canMove = true;
var posX = 0;
var posY = 0;


window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);

setInt = setInterval(update, 33.34);

//██████████████████████████████INITIALIZE SPIRTES ██████████████████████████████
for (var i = 0; i < images.length; i++)
{
	sprites[i] = new Image();
	sprites[i].src = '../img/'+images[i]+'.png';
}

playerOne.img = sprites[1];
shopkeep.img = sprites[0];
shop.img = sprites[4];
door1.img = sprites[7];
door2.img = sprites[2];
door3.img = sprites[2];
door4.img = sprites[2];

monster.img = sprites[9];
monster2.img = sprites[9];
monster3.img = sprites[9];
monster4.img = sprites[9];
monster5.img = sprites[9];
monster6.img = sprites[9];
monster7.img = sprites[9];
monster8.img = sprites[9];
monster9.img = sprites[9];
monster10.img = sprites[9];

water.img = sprites[10];
moveblock.img = sprites[11];
moveblock2.img = sprites[11];

//EDIT
var treeG =  new Image();
treeG.src = '../img/tree.png';
var treeO=  new Image();
treeO.src = '../img/tree2.png';
var treeR=  new Image();
treeR.src = '../img/tree3.png';
var bush =  new Image();
bush.src = '../img/bush.png';
var rock =  new Image();
rock.src = '../img/rock.png';

function interactCollision()//this is where it checks for shop collision and makes sprites appear and disappear
{
	if(playerOne.x < shop.x + 384 && playerOne.x > shop.x + 20 && playerOne.y < shop.y + 384 &&  playerOne.y > shop.y)
	{
		playerOne.img = sprites[0];
		shopkeep.img = sprites[5]
		shop.img = sprites[0];
		talking = true;
	}
}


function enable (object, sprite, x, y)
{
	object.img = sprites[sprite];
	object.x = x;
	object.y = y;
}
function disable()
{
	
	
}


function update()
{
	level();
	
}
function gravity(player, gravityPower, restrict)
{
	if(restrict && player.y > restrict) return;
	
	if(!player.isGround)
	{
		player.y += gravityPower;
	}


	if(player.isGround && parseInt(player.y/SIZE) * SIZE < player.y)//fix position y;
	{
		player.y = parseInt(player.y/SIZE) * SIZE;
	}
}

function groundCheck(player, gap, rayLength, map)//n is number of raycasts
{
	var bottomY = parseInt((player.y + player.sizeY + rayLength)/SIZE);
	if(bottomY > map.rows) return false;
	
	player.isGround = false;
	if(map.tiles[bottomY][parseInt((player.x + gap + 5)/SIZE)] != 0) player.isGround = true; 
	if(map.tiles[bottomY][parseInt((player.x + player.sizeX/2)/SIZE)] != 0) player.isGround = true;
	if(map.tiles[bottomY][parseInt((player.x + (player.sizeX - gap))/SIZE)] != 0) player.isGround = true;
	if(moveblock.touching || moveblock2.touching) player.isGround = true; 
	
	if(player.isGround)
	{
		player.isJumping = false;
		player.velocityY = 0;

	}	
}



function reset()
{
	canvas.width = 1280; 							  // Sets the canvas width to 640 px. Note that it's a regular property not accessing the .style
	canvas.height = 640;
	entered = 0;
	playerOne.isDead = false;
	playerTwo.isDead = false;
	isDead = false;
	line.src = "../music/Ly.mp3";
}
function unlock()
{
	
	if(completed >= 3)
	{
		door4.img = sprites[7];
	}
	if(completed >= 2)
	{
		door3.img = sprites[7];
	}
	if(completed >= 1)
	{
		door2.img = sprites[7];
	}
}



function level()
{
	//console.log(stage);
	if(playgame == false)
	{
		mainmenu();	
		
	}
	else if(isDead)
	{
		
		gameover();
		checkpress();
		if(stage!= 0)
			clearInterval(intShot);
	}
	else if(isWin)
	{
		winScreen();
		checkpress();
		if(stage!= 0)
			clearInterval(intShot);
	}
	else if(stage == 0)
	{
		if(entered == 1)
		{
			reset();
		}
		canvas.style.backgroundImage = "url('../img/mainbg.png')";
		animator(playerOne, left, right); 
		playerController(playerOne, left, right, up, map1);
		doorInteract();
		interactCollision();
		draw1();
		render1();
		textBox();
		colObjectsAnim(); //EDIT
		WaterAnim(); //EDIT
		Death1();
		objectCol(playerOne, monster, SIZE, SIZE);
		objectCol(playerOne, monster2, SIZE, SIZE);
		objectCol(playerOne, monster3, SIZE, SIZE);
		objectCol(playerOne, monster4, SIZE, SIZE);
		objectCol(playerOne, monster5, SIZE, SIZE);
		objectCol(playerOne, monster6, SIZE, SIZE);
		objectCol(playerOne, monster7, SIZE, SIZE);
		objectCol(playerOne, monster8, SIZE, SIZE);
		objectCol(playerOne, monster9, SIZE, SIZE);
		objectCol(playerOne, monster10, SIZE, SIZE);
		objectCol(playerOne, water, SIZE*13, SIZE);
		movingBox(playerOne, moveblock);
		movingBox(playerOne, moveblock2);
	}
	else if(stage == 1)		
	{
		checkCollision(playerOne);
		checkCollision(playerTwo);
		MoveObject();
		animator(playerOne, left, right); 
		animator(playerTwo, left2, right2); 
		animateCoin();
		CoinCheck(playerOne, coin);
		CoinCheck(playerTwo, coin);
		playerController(playerOne, left, right, up, map2);
		playerController(playerTwo, left2, right2, up2, map2);
		draw();
		render();
		Death();
	}
	else if(stage == 2)
	{
		canvas.style.backgroundImage = "url('../img/background.png')";
		animator(playerOne, left, right); 
		animator(playerTwo, left2, right2); 
		animateCoin();
		playerController(playerOne, left, right, up, map3);
		playerController(playerTwo, left2, right2, up2, map3);
		CoinCheck(playerOne, coin);
		CoinCheck(playerTwo, coin);
		checkCollision(playerOne);
		checkCollision(playerTwo);
		draw();
		render();
		Death();
		
	}
	else if(stage == 3)
	{
		animator(playerOne, left, right); 
		animator(playerTwo, left2, right2); 
		animateCoin();
		gameManager();
		playerController(playerOne, left, right, up, map4);
		playerController(playerTwo, left2, right2, up2, map4);
		//draw();
		render3();
		Death();
			
	}
	else if(stage == 4)
	{
		animator(playerOne, left, right); 
		animator(playerTwo, left2, right2);  
		playerController(playerOne, left, right, up, map5);
		playerController(playerTwo, left2, right2, up2, map5);
		//draw();
		collision();
		render();
		Laser();
		animateCoin ();
		moveSawX(saw1);
		moveSawX(saw2);
		moveSawX(saw3);
		Shooting();
		TramplineColCheck();
		ShotColCheck();
		if(laserDoor.isClosed == false)
		{
			LaserDoorOpen();
		}
		Death();
	}
	
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

function playerController(player, inleft, inright, inup, map) 
{
	
	if (player.y > 0 && inup == true && rayCastCheck(player, 3, player.speed/2, map) && player.jumpOnce && player.isJumpOnce) //jump
	{
		JumpSFX.play();
		if(!player.isJumping)
		{
			console.log(player.isJumpOnce);
			player.isJumpOnce = false;
			player.isJumping = true;
			player.velocityY = -20;	
		}
	}
	if (player.x > 0 && inleft == true && rayCastCheck(player, 3, player.speed/2, map)){
		player.x -= player.speed;
	}
	if (inright == true && player.x < map.cols * SIZE && rayCastCheck(player, 3, player.speed/2, map)){
		player.x += player.speed;
	}
	
	
	if(escape == true && stage != 0)
	{
		stage = 0;
	}
	//Death();
	
	var gravityPower = 3;
	jump(player, gravityPower);
	gravity(player, 10);
	groundCheck(player, groundLen, gravityPower, map);//	this.player
}

function Death1()
{
	if(playerOne.isDead) 
	{
		//game over;
		console.log("game over");
		if(cheatcode == false)
		{
			soundEnded = false;
			isDead = true;
			playerOne.x = 700; 
			playerOne.y = 100;			
		}
	}
}

function Death()
{
	if(playerOne.isDead || playerTwo.isDead) 
	{
		//game over;
		console.log("game over");
		if(cheatcode == false)
		{
			soundEnded = false;
			isDead = true;
			backToMainMenu();
			
		}
	}
}


function rayCastCheck(player, Gap, rayLength, map)
{
	var centerPos = {x: player.x + player.sizeX/2 + 2, y: player.y + player.sizeY/2};
	var leftRay = centerPos.x - (player.sizeX/2 + rayLength) + 10;
	var rightRay = centerPos.x + (player.sizeX/2 + rayLength) -5;
	var upRay = centerPos.y - (player.sizeY/2 + rayLength);
	var downRay = centerPos.y + (player.sizeY/2 + rayLength);

	if(left || left2)
	{
		if( map.tiles[parseInt((player.y + Gap)/SIZE)][parseInt(leftRay/SIZE)] != 0) 
		{
			player.x = player.x	;
			return false;
		}
		return true;
	}
	else if(right || right2)
	{
		if( map.tiles[parseInt((player.y + Gap)/SIZE)][parseInt(rightRay/SIZE)] != 0)
		{			
			player.x = player.x;
			return false;
		}
		return true;
	}
	else if(up || up2)
	{
		if(map.tiles[parseInt(upRay/SIZE)][parseInt((player.x + Gap)/SIZE)] != 0) return false;
		return true;
	}
}


/////////////////////////////////////////////SHOPKEEP/////////////////////////////////////////////

function textBox()
{
	if(cheatcode) //added
	{
		unlock();
	}
	if(talking)
	{
		playerOne.x = 700;
		playerOne.y = 100;
		
		var text= [["Hello fellow hunters.", "I'm in need of help to get something." ,
                "A diamond that i myself can't even get,","I'll pay you guys a hefty price if you get me it",
                "But ill only pay the one that gets the diamond to me.", "Get it to me ASAP before someone else gets it before us." , "Now go and get me it!"],
                ["Hey, you completed your first mission!", "Well done! Although that was just an easy task i gave you.",
                "There's a lot more harder tasks than that one.", "This one is in an underground tunnel Filed with spikes,", "and other traps that ive never seen.", "No one seems to know about this so you can take your time.", "Now BEGONE THOT!"],
                ["Great your back!", "Quickly i need you to get me an item in the city", "A group of hunters are already at it.", "GO NOW!"], 
                ["You guys are amazing! I got one last task before your done.",
                "I've found a secret base that holds a piece of Technology", "That no one knows about, It may change the future", "here's another one for you"],
                ["HAHAHAHA! I've used you to get all the things to...", "TAKE OVER THE WORLD!!!!"]];
				
				unlock();
		if(textcount < text[completed].length)
		{
			for(var next = 0; next < text[completed].length; next++)
			{
	
				if(textcount == next)
				{
					surface.fillStyle = 'grey';
					surface.fillRect(368,390,550,180);
					surface.strokeRect(360,382,568,196);
					surface.font = "20px Georgia";
					surface.fillStyle = 'white';
					surface.fillText(text[completed][textcount], 373, 420);
				
				}

			}
			
		}
		else if(textcount == text[completed].length)
		{
			enable(playerOne, 1, 700,100);// this changes the spawn of his location and changes his sprite back to normal (object, sprite#, x, y)
			textcount -= text[completed].length;
			shopkeep.img = sprites[0]
			shop.img = sprites[4];
			talking = false;
			console.log(textcount);
			
		}
	}
}

function gameover()
{
	
	var imported = document.createElement("script")//<script>
	imported.src = "gameover.js";//this runs the second script
	document.body.appendChild(imported);
	
}
function winScreen()
{
	
	var imported = document.createElement("script")//<script>
	imported.src = "win.js";//this runs the second script
	document.body.appendChild(imported);
	
}
function mainmenu()
{
	
	var imported = document.createElement("script")//<script>
	imported.src = "testone.js";//this runs the second script
	document.body.appendChild(imported);
	
}
//████████████████████████████████████████████████████████████████████████
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

function colObjectsAnim()
{		
	monster.y += monster.speed;
    if(monster.start > monster.y||monster.end < monster.y)
        monster.speed *= -1;
	
	monster2.x += monster2.speed;
    if(monster2.start > monster2.x||monster2.end < monster2.x)
        monster2.speed *= -1;
	
	monster3.x += monster3.speed;
    if(monster3.start > monster3.x||monster3.end < monster3.x)
        monster3.speed *= -1;

	monster4.y += monster4.speed;
    if(monster4.start > monster4.y||monster4.end < monster4.y)
        monster4.speed *= -1;
	
	monster5.x -= monster5.speed;
	if(monster5.start > monster5.x||monster5.end < monster5.x)
        monster5.speed *= -1;
	
	monster6.x += monster6.speed;
	if(monster6.start > monster6.x||monster6.end < monster6.x)
        monster6.speed *= -1;
	
	monster7.x += monster7.speed;
	if(monster7.start > monster7.x||monster7.end < monster7.x)
        monster7.speed *= -1;
	
	monster8.y += monster8.speed;
	if(monster8.start > monster8.y||monster8.end < monster8.y)
        monster8.speed *= -1;
	
	monster9.y += monster9.speed;
	if(monster9.start > monster9.y||monster9.end < monster9.y)
        monster9.speed *= -1;

	monster10.y += monster9.speed;
	if(monster10.start > monster10.y||monster10.end < monster10.y)
        monster10.speed *= -1;
	
	moveblock.x += moveblock.speed;
    if(moveblock.start > moveblock.x||moveblock.end < moveblock.x)
        moveblock.speed *= -1;
	
	moveblock2.x += moveblock2.speed;
    if(moveblock2.start > moveblock2.x||moveblock2.end < moveblock2.x)
        moveblock2.speed *= -1;	
}

function WaterAnim ()
{
	water.waterSprite++;
	if(water.waterSprite == water.waterMax)
		water.waterSprite = 0;
}
/////////////////////////////////////////////CAMERA/////////////////////////////////////////////                                             
function clamp(value, min, max){                                                                                  
    if(value < min) return min;                                                                                   
    else if(value > max) return max;                                                                              
    return value;                                                                                                 
}                                                                                                                 

function draw1() {                                                                                                
    surface.setTransform(1,0,0,1,1,0);//reset the transform matrix as it is cumulative                            
    surface.clearRect(0, 0, canvas.width, canvas.height);//clear the viewport AFTER the matrix is reset           

    //Clamp the camera position to the world bounds while centering the camera around the player                                          
   
	var camX = clamp(-playerOne.x + canvas.width/2, -2000, 0);  
		camX = camX < -640 ? -640 : camX;
    var camY = clamp(-playerOne.y + canvas.height/1.25, -map1.row, 0);                                            

    surface.translate( camX, camY );                                                                              

    //Draw everything    

/*
function Lerp (S, E, T) //S = Vo,  E=V1, T = time or speed
{
		return (S * (1-T) + (E * T)
}

function CameraMov ()
{
	
}
*/

	
}


function render1()
{
		surface.clearRect(0,0,canvas.width,canvas.height);
		//BACKGROUND
		
		surface.drawImage(water.img, 832*water.waterSprite, 0, 832, SIZE, water.x, water.y, 832, SIZE);
		surface.drawImage(treeG, 350, 407); //first row
		surface.drawImage(bush, 690, 534); //first row
		surface.drawImage(rock, 1200, 478); //first row
		surface.drawImage(treeR, 1790, 675); //second row

		surface.drawImage(monster.img, monster.x, monster.y); //first floor
		surface.drawImage(monster2.img, monster2.x, monster2.y); //second floor
		surface.drawImage(monster3.img, monster3.x, monster3.y); //third floor 
		surface.drawImage(monster4.img, monster4.x, monster4.y); //fourth floor
		surface.drawImage(monster5.img, monster5.x, monster5.y);
		surface.drawImage(monster6.img, monster6.x, monster6.y);
		surface.drawImage(monster7.img, monster7.x, monster7.y);
		surface.drawImage(monster8.img, monster8.x, monster8.y);
		surface.drawImage(monster9.img, monster9.x, monster9.y);
		surface.drawImage(monster10.img, monster10.x, monster10.y);
		
		
		
		surface.drawImage(door1.img, 0, 0, SIZE, SIZE, door1.x, door1.y, SIZE, 74);
		surface.drawImage(door2.img, 0, 0, SIZE, SIZE, door2.x, door2.y, SIZE, 74);
		surface.drawImage(door3.img, 0, 0, SIZE, SIZE, door3.x, door3.y, SIZE, 74);
		surface.drawImage(door4.img, 0, 0, SIZE, SIZE, door4.x, door4.y, SIZE, 74);
		surface.drawImage(shop.img,shop.x, shop.y);  //EDITTED
		surface.drawImage(shopkeep.img, 0, 0, 187, 300, canvas.width/2 - 187/2,canvas.height/7, 187, 300);
		surface.drawImage(playerOne.img, SIZE * playerOne.sprite, SIZE * playerOne.dir, SIZE, SIZE, playerOne.x, playerOne.y, SIZE, SIZE);
		
		for (var r = 0; r < map1.rows; r++)
		{
			for (var c = 0; c < map1.cols; c++)
			{
				if(map1.tiles[r][c] == 3){
					surface.drawImage(sprites[3], c * SIZE , r * SIZE, SIZE, SIZE );
				}
				if(map1.tiles[r][c] == 6){
					surface.drawImage(sprites[6], c * SIZE , r * SIZE, SIZE, SIZE );
				}
			}
		}	
		
		//FOREGROUND
		surface.drawImage(moveblock.img, moveblock.x, moveblock.y);
		surface.drawImage(moveblock2.img, moveblock2.x, moveblock2.y);
		surface.drawImage(bush, 280, 534); //first row
		surface.drawImage(treeO, 250, 663); //second row
		
}