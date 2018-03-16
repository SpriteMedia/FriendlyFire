var canvas = document.getElementById("canvas");    
canvas.width = 1280 * 2.5; 							
canvas.height = 640 * 2.5;	
var surface = canvas.getContext("2d");

var bkgImg = new Image();
var unpressedImg = new Image();
var pressedImg 	= new Image();
var playBoxImg = new Image();
var optionsBoxImg = new Image();
var creditBoxImg = new Image();

//var mouseX = event.clientX;     // Get the horizontal coordinate
//var mouseY = event.clientY;     // Get the vertical coordinate

bkgImg.src = "../img/menuBkg.png";
unpressedImg.src = "../img/buttons.png";
pressedImg.src = "../img/buttons.png"; //need to be changed later
playBoxImg.src = "../img/playBox.png";
optionsBoxImg.src = "../img/optionsBox.png";
creditBoxImg.src = "../img/creditsBox.png";

var buttonSizeX = 80;
var buttonSizeY = 80;
var boxSizeX = 330;
var boxSizeY = buttonSizeY;

var playButton = {isPressed: false, posX:canvas.width/3 - buttonSizeX, posY:canvas.height/3 - buttonSizeY};
var optionButton = {isPressed: false, posX:canvas.width/3 - buttonSizeX, posY:canvas.height/3 + buttonSizeY};
var creditButton = {isPressed: false, posX:canvas.width/3 - buttonSizeX, posY:canvas.height/3 + buttonSizeY * 3};
var playBox = {posX:canvas.width/3 + buttonSizeX, posY:canvas.height/3 - buttonSizeY - 2};
var optionBox = {posX:canvas.width/3 + buttonSizeX, posY:canvas.height/3 + buttonSizeY - 2};
var creditBox = {posX:canvas.width/3 + buttonSizeX, posY:canvas.height/3 + buttonSizeY * 3 - 2};

//add isPlaying boolean variable in level js;
if(!isPlaying)

var inSet = setInterval(Update);	

function Update()
{
	//playButtonFunc();
	render();
}

function render()
{
	surface.drawImage(bkgImg, 0, 0, canvas.width, canvas.height);
	
	if(playButton.isPressed) 
		surface.drawImage(pressedImg, playButton.posX, playButton.posY, buttonSizeX, buttonSizeY);
	else 
		surface.drawImage(unpressedImg, playButton.posX, playButton.posY, buttonSizeX, buttonSizeY);
	if(optionButton.isPressed) 
		surface.drawImage(pressedImg, optionButton.posX, optionButton.posY, buttonSizeX, buttonSizeY);
	else 
		surface.drawImage(unpressedImg, optionButton.posX, optionButton.posY, buttonSizeX, buttonSizeY);
	if(creditButton.isPressed) 
		surface.drawImage(pressedImg, creditButton.posX, creditButton.posY, buttonSizeX, buttonSizeY);
	else 
		surface.drawImage(unpressedImg, creditButton.posX, creditButton.posY, buttonSizeX, buttonSizeY);
	
	surface.drawImage(playBoxImg, playBox.posX, playBox.posY, boxSizeX, boxSizeY);
	surface.drawImage(optionsBoxImg, optionBox.posX, optionBox.posY, boxSizeX, boxSizeY);
	surface.drawImage(creditBoxImg, creditBox.posX, creditBox.posY, boxSizeX, boxSizeY);
}

// function playButtonFunc()
// {
	// if(playButton.posX < mouseX && playButton.posX + buttonSizeX > mouseX &&
		// playButton.posY < mouseY && playButton.posY + buttonSizeY > mouseY && !playButton.isPressed)
		// playButton.isPressed = true;
	// if(optionButton.posX < mouseX && optionButton.posX + buttonSizeX > mouseX &&
		// optionButton.posY < mouseY && optionButton.posY + buttonSizeY > mouseY && !optionButton.isPressed)
		// optionButton.isPressed = true;
	// if(creditButton.posX < mouseX && creditButton.posX + buttonSizeX > mouseX &&
		// creditButton.posY < mouseY && creditButton.posY + buttonSizeY > mouseY && !creditButton.isPressed)
		// creditButton.isPressed = true;
// }














