var gameoverBK = new Image();
gameoverBK.src = "../img/gameover.png"; 		
canvas.width = 1280; 							  // Sets the canvas width to 640 px. Note that it's a regular property not accessing the .style
canvas.height = 640;	
surface.clearRect(0,0,canvas.width,canvas.height);
surface.drawImage(gameoverBK, 0, 0, canvas.width,canvas.height, 0, 0, canvas.width,canvas.height);
	

window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);

line.src = " ";
GameOverSFX.play();

function onKeyDown(event)
{


	switch (event.keyCode)
	{
		case 32:
		space = true;
			break;
	}
	
}

function onKeyUp(event)
{
	switch (event.keyCode)
	{
		case 32:
		space = false;
			break;

	}
}
function checkpress()
{
	if(space == true)
	{
		backToMainMenu();
	}
	
}


function backToMainMenu()
{
		isDead = false;
		stage = 0;
	
}