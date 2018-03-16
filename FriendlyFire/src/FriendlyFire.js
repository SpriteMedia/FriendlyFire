var canvas = document.getElementById("canvas");    // Creates a link to the canvas element in HTML
canvas.width = 1280; 							  // Sets the canvas width to 640 px. Note that it's a regular property not accessing the .style
canvas.height = 640;	
var surface = canvas.getContext("2d");

var line = document.createElement("audio");
line.type =  "audio/mp3";
line.src = "../music/Ly.mp3";
line.autoplay = true;
var jumps = document.createElement("jump");
line.type =  "audio/mp3";
line.src = "../SFX/Jump.mp3";
var coin = document.createElement("coin");
line.type =  "audio/mp3";
line.src = "../SFX/Coin.mp3";
var teleport = document.createElement("teleport");
line.type =  "audio/mp3";
line.src = "../SFX/Teleport1.mp3";
var click = document.createElement("uiclick");
line.type =  "audio/mp3";
line.src = "../SFX/UI.mp3";
var trampoline = document.createElement("trampoline");
line.type =  "audio/mp3";
line.src = "../SFX/Trampoline.mp3";
var win = document.createElement("win");
line.type =  "audio/mp3";
line.src = "../SFX/Jingle_Win_00.mp3";

//██████████████████████████████PLAYER DATA █████████████████████████████████████████████
function PLAYER1()
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

var playerOne = new PLAYER1();
playerOne.x = 600;
playerOne.y = 100;

var playerTwo = new PLAYER1();
playerOne.x = 600;
playerOne.y = 100;

var up = false;
var left = false;
var right = false;
var off = false;	

var stage = 0;
var completed = 0;
var entered = 0; //debugging tool
var cheatcode = false;

var textcount = 0;//used for going to next text
var talking = false;

var shop = {img:null , x: 440, y: 192};
var shopkeep = {img:null, x:canvas.width/2, y:canvas.height/2};
var door1 = {img:null , x: 1150, y: 125};
var door2 = {img:null , x: 955, y:510};
var door3 = {img:null , x: 255, y: 510};
var door4 = {img:null , x: 100, y:125};




//██████████████████████████████PLAYER DATA █████████████████████████████████████████████

var images = ["empty", "playerOne", "Door", "grass", "shop", "Shopkeep", "dirt", "dooropen"];
var sprites = [];
var SIZE = 64; 
var map1 = {
	rows: 10,
	cols: 20,
	tiles:
	[
		[6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],
		[6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[6,3,3,0,0,0,3,3,3,3,3,3,3,3,0,0,0,3,3,6],
		[6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6],
		[6,0,0,3,3,3,0,0,0,0,0,0,0,0,3,3,3,0,0,6],
		[6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6],
		[6,0,3,0,0,0,3,0,0,0,0,0,0,3,0,0,0,3,0,6],
		[6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6],
		[6,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,6],
		
	],
	


	
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
//████████████████████████████████████████████████████████████




//████████████████████████████████████████████████████████████

function update()
{
	level();
	
}

function reset()
{
	canvas.width = 1280; 							  // Sets the canvas width to 640 px. Note that it's a regular property not accessing the .style
	canvas.height = 640;
	playerOne.x = 600;
	playerOne.y = 100;
	entered = 0;
	line.src = "../music/Ly.mp3";
}
function unlock()
{
	
	if(completed == 1)
	{
		door2.img = sprites[7];
	}
	if(completed == 2)
	{
		door3.img = sprites[7];
	}
	if(completed == 3)
	{
		door4.img = sprites[7];
	}
}
function level()
{
	console.log(stage);
	if(stage == 0)
	{
		if(entered == 1)
		{
			reset();
		}
	
	animator(playerOne, left, right); 
	playerController1(playerOne, left, right, up);
	doorInteract();
	interactCollision();
	draw1();
	render1();
	textBox();
	}
	else if(stage == 1)		
	{
	animator(playerOne, controls.left, controls.right); 
	animator(playerTwo, controls.left2, controls.right2); 
	playerController(playerOne, controls.left, controls.right , controls.up, controls.escape);
	playerController(playerTwo, controls.left2, controls.right2, controls.up2);
	draw2();
	render2();
	}
	else if(stage == 2)
	{
	animator(playerOne, controls.left, controls.right); 
	animator(playerTwo, controls.left2, controls.right2);  
	animateCoin();
	playerController(playerOne, controls.left, controls.right , controls.up, controls.escape);
	playerController(playerTwo, controls.left2, controls.right2, controls.up2);
	CoinCheck(playerOne, coin);
	CoinCheck(playerTwo, coin);
	checkCollision(playerOne);
	checkCollision(playerTwo);
	draw();
	render();
	
	}
	else if(stage == 3)
	{

	animator(playerOne, controlOne.left, controlOne.right); 
	animator(playerTwo, controlTwo.left2, controlTwo.right2); 
	animateCoin();
	gameManager();
	playerController3(playerOne, controlOne);
	playerController3(playerTwo, controlTwo);
	
	//draw();
	render3();
		
	}
	else if(stage == 4)
	{

animatePlayer(); 
	animatePlayer2();
	playerController(playerOne, controls.left, controls.right , controls.up);
	playerController(playerTwo, controls.left2, controls.right2, controls.up2);
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


function onKeyDown(event)
{
	if(playerOne.img != sprites[0]) { //make this more efficient 
		switch (event.keyCode)
		{
		
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
		case 74: // J
			cheatcode = true;
		//ADD PLAYER 2 INPUT unless menu
		
		}
	}
	else if(playerOne.img = sprites[0])
	{
	switch (event.keyCode)
	{
		case 32:
		console.log("keypress");
		textcount++;
			break;
	}
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
			break;
		case 83: //S
			down = false;
			break;	
			
		//ADD PLAYER 2 INPUT
	}
}

function playerController1(player, inleft, inright, inup) 
{
	
	if (player.x > 0 && inleft == true && rayCastCheck1(player, 10, player.speed/2)){
		player.x -= player.speed;
	}
	if (inright == true && player.x < map1.cols * SIZE && rayCastCheck1(player, 10, player.speed/2)){
		player.x += player.speed;
	}
	if (player.y > 0 && inup == true && rayCastCheck1(player, 10, player.speed/2)) //jump
	{
		if(!player.isJumping)
		{
			player.isJumping = true;
			player.velocityY = -20;
			console.log(player.isJumping);
		}
	}
	var gravity1Power = 3;
	jump(player, gravity1Power);
	gravity1(player, 10);
	groundCheck1(player, 3, gravity1Power);//	this.player
}

function jump(player, gravity1Power)
{
	if(player.isJumping)
	{
		player.y += player.velocityY;
		player.y_velocity *= 0.7;
		player.velocityY += gravity1Power;
	}
}
//██████████████████████████████gravity1██████████████████████████████
function gravity1(player, gravity1Power)
{
	if(!player.isGround)
	{
		player.y += gravity1Power;
	}


	if(player.isGround && parseInt(player.y/SIZE) * SIZE < player.y)//fix position y;
	{
		player.y = parseInt(player.y/SIZE) * SIZE;
	}
}
//██████████████████████████████Collision██████████████████████████████
function groundCheck1(player, gap, rayLength)//n is number of raycasts
{
	var bottomY = parseInt((player.y + player.sizeY + rayLength)/SIZE);
	if(bottomY > map1.rows) return false;
	
	player.isGround = false;
	if(map1.tiles[bottomY][parseInt((player.x + gap)/SIZE)] != 0) player.isGround = true; 
	if(map1.tiles[bottomY][parseInt((player.x + player.sizeX/2)/SIZE)] != 0) player.isGround = true;
	if(map1.tiles[bottomY][parseInt((player.x + (player.sizeX - gap))/SIZE)] != 0) player.isGround = true;
	
	if(player.isGround)
	{
		player.isJumping = false;
		player.velocityY = 0;

	}	
}

function rayCastCheck1(player, Gap, rayLength)
{
	var centerPos = {x: player.x + player.sizeX/2, y: player.y + player.sizeY/2};
	var leftRay = centerPos.x - (player.sizeX/2 + rayLength);
	var rightRay = centerPos.x + (player.sizeX/2 + rayLength);
	var upRay = centerPos.y - (player.sizeY/2 + rayLength);
	var downRay = centerPos.y + (player.sizeY/2 + rayLength);

	if(left)
	{
		if( map1.tiles[parseInt(centerPos.y/SIZE)][parseInt(leftRay/SIZE)] != 0) return false;
		if( map1.tiles[parseInt((player.y + Gap)/SIZE)][parseInt(leftRay/SIZE)] != 0) return false;
		if( map1.tiles[parseInt((player.y + SIZE - Gap)/SIZE)][parseInt(leftRay/SIZE)] != 0) return false;
		return true;
	}
	else if(right)
	{
		if( map1.tiles[parseInt(centerPos.y/SIZE)][parseInt(rightRay/SIZE)] != 0) return false;
		if( map1.tiles[parseInt((player.y + Gap)/SIZE)][parseInt(rightRay/SIZE)] != 0) return false;
		if( map1.tiles[parseInt((player.y + SIZE - Gap)/SIZE)][parseInt(rightRay/SIZE)] != 0) return false;
		return true;
	}
	else if(up)
	{
		if( map1.tiles[parseInt(upRay/SIZE)][parseInt(centerPos.x/SIZE)] != 0) return false;
		if( map1.tiles[parseInt(upRay/SIZE)][parseInt((player.x + Gap)/SIZE)] != 0) return false;
		if( map1.tiles[parseInt(upRay/SIZE)][parseInt((player.x + SIZE - Gap)/SIZE)] != 0) return false;
		return true;
	}
}
//██████████████████████████████Text Box██████████████████████████████
//fix up text box. its hard coded on only one text box because of the variable
//textcount is being checked if it's completed then reseting to -1 by a text.length +3
//figure out how to create text in the canvas
//enable(playerOne, 1, 100,100);// this changes the spawn of his location and changes his sprite back to normal (object, sprite#, x, y)
function textBox()
{
	if(talking)
	{
		var text= [["Hello fellow hunters.", "I'm about to send you on a dangerous mission." ,
				"I don't know what mission because i didn't think this through","comeback again when i have figured it out",
				"Goodbye"],["Hey, you completed your first mission!", "Well done! Although that was just an easy task i gave you.",
				"this one might be a little tougher"], ["Here in my dialog", "but what's more important is the", "story"]];
				
				
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
			enable(playerOne, 1, 600,100);// this changes the spawn of his location and changes his sprite back to normal (object, sprite#, x, y)
			textcount -= text[completed].length;
			shopkeep.img = sprites[0]
			shop.img = sprites[4];
			talking = false;
			console.log(textcount);
			
		}
	}
}
//████████████████████████████████████████████████████████████████████████
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
//██████████████████████████████CAMERA██████████████████████████████
function clamp(value, min, max){
    if(value < min) return min;
    else if(value > max) return max;
    return value;
}

function draw1() {
    surface.setTransform(1,0,0,1,1,0);//reset the transform matrix as it is cumulative
    surface.clearRect(0, 0, canvas.width, canvas.height);//clear the viewport AFTER the matrix is reset

    //Clamp the camera position to the world bounds while centering the camera around the player                                             
    var camX = clamp(-playerOne.x + canvas.width/2, 0, 0);//the second last number changes the distance of how far the camera can move
    var camY = clamp(-playerOne.y + canvas.height/1.25, 0, 0);//same applies to this one but downwards

    surface.translate( camX, camY );    

    //Draw everything
}
//████████████████████████████████████████████████████████████
/*
function collision()
{
	if(player.x && player.y > map.tiles[1])
	{
		
	}
	

}
*/
function doorInteract()
{
	var imported = document.createElement("script")//<script>
	if(playerOne.x < door1.x + 64 && playerOne.x > door1.x && playerOne.y < door1.y + 64 && playerOne.y > door1.y)
	{
		
		imported.src = "stage1.js";//this runs the second script
		document.body.appendChild(imported);
		entered = 1;
		stage = 1;
	}
		if(playerOne.x < door2.x + 64 && playerOne.x > door2.x && playerOne.y < door2.y + 64 && playerOne.y > door2.y && completed > 0 && door2.img == sprites[7])
	{
		imported.src = "stage3.js";//this runs the second script
		document.body.appendChild(imported);
		entered = 1;
		stage = 3;
		
		
	}
	if(playerOne.x < door3.x + 64 && playerOne.x > door3.x && playerOne.y < door3.y + 64 && playerOne.y > door3.y && completed > 1 && door3.img == sprites[7])
	{
		imported.src = "stage2.js";//this runs the second script
		document.body.appendChild(imported);
		entered = 1;
		stage = 2;
		
	}
	if(playerOne.x < door4.x + 64 && playerOne.x > door4.x && playerOne.y < door4.y + 64 && playerOne.y > door4.y && completed > 2 && door4.img == sprites[7])
	{
		imported.src = "stage4.js";//this runs the second script
		document.body.appendChild(imported);
		entered = 1;
		stage = 4;
		
	}
}

function interactCollision()//this is where it checks for shop collision and makes sprites appear and disappear
{
	if(playerOne.x < shop.x + 384 && playerOne.x > shop.x && playerOne.y < shop.y + 384 &&  playerOne.y > shop.y)
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

function render1()
{
		surface.clearRect(0,0,canvas.width,canvas.height);
		
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
		
		surface.drawImage(door1.img, 0, 0, SIZE, SIZE, door1.x, door1.y, SIZE, SIZE);
		surface.drawImage(door2.img, 0, 0, SIZE, SIZE, door2.x, door2.y, SIZE, SIZE);
		surface.drawImage(door3.img, 0, 0, SIZE, SIZE, door3.x, door3.y, SIZE, SIZE);
		surface.drawImage(door4.img, 0, 0, SIZE, SIZE, door4.x, door4.y, SIZE, SIZE);
		surface.drawImage(playerOne.img, SIZE * playerOne.sprite, SIZE * playerOne.dir, SIZE, SIZE, playerOne.x, playerOne.y, SIZE, SIZE);
		surface.drawImage(shop.img, 0, 0, 128*3, 128*3, shop.x, shop.y, 128*3, 128*3);
		surface.drawImage(shopkeep.img, 0, 0, 187, 300, canvas.width/2 - 187/2,canvas.height/7, 187, 300);
		
			
		
}
