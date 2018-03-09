var canvas = document.getElementById("canvas");    // Creates a link to the canvas element in HTML
canvas.width = 1280; 							  // Sets the canvas width to 640 px. Note that it's a regular property not accessing the .style
canvas.height = 640;	
var surface = canvas.getContext("2d");



//██████████████████████████████PLAYER DATA █████████████████████████████████████████████
var playerOne = {img:null, x:600, y: 100, speed: 10, sizeX: 64, sizeY: 64, isGround: false, velocityY:0, isJumping: false};  //playerOne data
var up = false;
var left = false;
var right = false;
var off = false;	
var playerSprite = 0;
var minSprite = 0;
var maxSprite = 11;
var stage = 0;

var textcount = 0;//used for going to next text
var talking = false;

var shop = {img:null , x: 440, y: 192};
var shopkeep = {img:null, x:canvas.width/2, y:canvas.height/2};
var door1 = {img:null , x: 1150, y: 100};
var door2 = {img:null , x: 955, y:480};
var door3 = {img:null , x: 255, y: 480};
var door4 = {img:null , x: 100, y:100};




//██████████████████████████████PLAYER DATA █████████████████████████████████████████████

var images = ["empty", "playerOne", "Door", "grass", "shop", "Shopkeep", "dirt"];
var sprites = [];
var SIZE = 64; 
var map = {
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
door1.img = sprites[2];
door2.img = sprites[2];
door3.img = sprites[2];
door4.img = sprites[2];
//████████████████████████████████████████████████████████████




//████████████████████████████████████████████████████████████

function update()
{
	level();
	
}

function level()
{
	if(stage == 0)
	{
	animatePlayer(); 
	playerController(playerOne, left, right, up);
	doorInteract();
	interactCollision();
	draw();
	render();
	textBox();
	}
	else if(stage == 1)
	{
	animatePlayer(); 
	animatePlayer2(); 
	animateCoin();
	playerController(playerOne, controls.left, controls.right , controls.up, controls.escape);
	playerController(playerTwo, controls.left2, controls.right2, controls.up2);
	draw();
	render();
	}
	else if(stage == 2)
	{
		animatePlayer(); 
	animatePlayer2(); 
	animateCoin();
	coinCollect();
	playerController(playerOne, controls.left, controls.right , controls.up, controls.escape);
	playerController(playerTwo, controls.left2, controls.right2, controls.up2);
	draw();
	render();
		
	}
	else if(stage == 3)
	{
		animatePlayer(); 
	animatePlayer2(); 
	animateCoin();
	gameManager();
	playerController(playerOne, controls.left, controls.right , controls.up);
	playerController(playerTwo, controls.left2, controls.right2, controls.up2);
	draw();
	render();
		
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

function playerController(player, inleft, inright, inup) 
{
	
	if (player.x > 0 && inleft == true && rayCastCheck(player, 10, player.speed/2)){
		player.x -= player.speed;
	}
	if (inright == true && player.x < map.cols * SIZE && rayCastCheck(player, 10, player.speed/2)){
		player.x += player.speed;
	}
	if (player.y > 0 && inup == true && rayCastCheck(player, 10, player.speed/2)) //jump
	{
		if(!player.isJumping)
		{
			player.isJumping = true;
			player.velocityY = -20;
			console.log(player.isJumping);
		}
	}
	console.log(player.velocityY);
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
//██████████████████████████████Gravity██████████████████████████████
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
//██████████████████████████████Collision██████████████████████████████
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

	if(left)
	{
		if( map.tiles[parseInt(centerPos.y/SIZE)][parseInt(leftRay/SIZE)] != 0) return false;
		if( map.tiles[parseInt((player.y + Gap)/SIZE)][parseInt(leftRay/SIZE)] != 0) return false;
		if( map.tiles[parseInt((player.y + SIZE - Gap)/SIZE)][parseInt(leftRay/SIZE)] != 0) return false;
		return true;
	}
	else if(right)
	{
		if( map.tiles[parseInt(centerPos.y/SIZE)][parseInt(rightRay/SIZE)] != 0) return false;
		if( map.tiles[parseInt((player.y + Gap)/SIZE)][parseInt(rightRay/SIZE)] != 0) return false;
		if( map.tiles[parseInt((player.y + SIZE - Gap)/SIZE)][parseInt(rightRay/SIZE)] != 0) return false;
		return true;
	}
	else if(up)
	{
		if( map.tiles[parseInt(upRay/SIZE)][parseInt(centerPos.x/SIZE)] != 0) return false;
		if( map.tiles[parseInt(upRay/SIZE)][parseInt((player.x + Gap)/SIZE)] != 0) return false;
		if( map.tiles[parseInt(upRay/SIZE)][parseInt((player.x + SIZE - Gap)/SIZE)] != 0) return false;
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
		var text = ["Hello fellow hunters.", "I'm about to send you on a dangerous mission." ,
				"I don't know what mission because i didn't think this through","comeback again when i have figured it out",
				"Goodbye"];
		if(textcount < text.length)
		{
			for(var next = 0; next < text.length; next++)
			{
	
				if(textcount == next)
				{
					surface.fillStyle = 'grey';
					surface.fillRect(368,390,550,180);
					surface.strokeRect(360,382,568,196);
					surface.font = "20px Georgia";
					surface.fillStyle = 'white';
					surface.fillText(text[textcount], 373, 420);
				
				}

			}
		}
		else if(textcount == text.length)
		{
			enable(playerOne, 1, 600,100);// this changes the spawn of his location and changes his sprite back to normal (object, sprite#, x, y)
			textcount -= text.length;
			shopkeep.img = sprites[0]
			shop.img = sprites[4];
			talking = false;
			console.log(textcount);
			
		}
	}
}
//████████████████████████████████████████████████████████████████████████
function animatePlayer() 
{
	playerSprite++; 
	if(playerSprite == maxSprite)
	{
		if(right||left)
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
//██████████████████████████████CAMERA██████████████████████████████
function clamp(value, min, max){
    if(value < min) return min;
    else if(value > max) return max;
    return value;
}

function draw() {
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
		stage = 1;
	}
		if(playerOne.x < door2.x + 64 && playerOne.x > door2.x && playerOne.y < door2.y + 64 && playerOne.y > door2.y)
	{
		
		
		imported.src = "stage2.js";//this runs the second script
		document.body.appendChild(imported);
		stage = 2;
	}
	if(playerOne.x < door3.x + 64 && playerOne.x > door3.x && playerOne.y < door3.y + 64 && playerOne.y > door3.y)
	{
		imported.src = "stage3.js";//this runs the second script
		document.body.appendChild(imported);
		stage = 3;
		
	}
	if(playerOne.x < door4.x + 64 && playerOne.x > door4.x && playerOne.y < door4.y + 64 && playerOne.y > door4.y)
	{
		imported.src = "stage4.js";//this runs the second script
		document.body.appendChild(imported);
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

function render()
{
		surface.clearRect(0,0,canvas.width,canvas.height);
		
		for (var r = 0; r < map.rows; r++)
		{
			for (var c = 0; c < map.cols; c++)
			{
				if(map.tiles[r][c] == 3){
					surface.drawImage(sprites[3], c * SIZE , r * SIZE, SIZE, SIZE );
				}
				if(map.tiles[r][c] == 6){
					surface.drawImage(sprites[6], c * SIZE , r * SIZE, SIZE, SIZE );
				}
			}
		}	
		surface.drawImage(door1.img, 0, 0, SIZE, SIZE, door1.x, door1.y, SIZE, SIZE);
		surface.drawImage(door2.img, 0, 0, SIZE, SIZE, door2.x, door2.y, SIZE, SIZE);
		surface.drawImage(door3.img, 0, 0, SIZE, SIZE, door3.x, door3.y, SIZE, SIZE);
		surface.drawImage(door4.img, 0, 0, SIZE, SIZE, door4.x, door4.y, SIZE, SIZE);
		surface.drawImage(playerOne.img, SIZE*playerSprite, 0, SIZE, SIZE, playerOne.x, playerOne.y, SIZE, SIZE);
		surface.drawImage(shop.img, 0, 0, 128*3, 128*3, shop.x, shop.y, 128*3, 128*3);
		surface.drawImage(shopkeep.img, 0, 0, 187, 300, canvas.width/2 - 187/2,canvas.height/7, 187, 300);
		
			
		
}
