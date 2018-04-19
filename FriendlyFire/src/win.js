var winner = new Image();
winner.src = "../img/win.png"; 		
canvas.width = 1280; 							  // Sets the canvas width to 640 px. Note that it's a regular property not accessing the .style
canvas.height = 640;	
surface.clearRect(0,0,canvas.width,canvas.height);
surface.drawImage(winner, 0, 0, canvas.width,canvas.height, 0, 0, canvas.width,canvas.height);
	

window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);

line.src = " ";
GameWinSFX.play();

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
		isWin = false;
		stage = 0;
	
}