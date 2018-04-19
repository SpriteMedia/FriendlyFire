var UI = new Image();
UI.src = "../img/UI.png"; 		
canvas.width = 1280; 							  // Sets the canvas width to 640 px. Note that it's a regular property not accessing the .style
canvas.height = 640;	
surface.clearRect(0,0,canvas.width,canvas.height);
surface.drawImage(UI, 0, 0, canvas.width,canvas.height, 0, 0, canvas.width,canvas.height);
	
var optionsimage = new Image();
optionsimage.src = '../img/tutorialbutton.jpg';

var creditimage = new Image();
creditimage.src = '../img/credits.jpg'; 



window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);


line.src = " ";




function onKeyDown(event)
{


	switch (event.keyCode)
	{
		case 80:
		if(optionsbutton == false && creditbutton == false)
		playbutton = true;
			break;
		case 84:
		if(creditbutton == false && playbutton == false)
		optionsbutton = true;
			break;
		case 67:
		if(optionsbutton == false && playbutton == false)
		creditbutton = true;
			break;
		
		case 27:
		goBack = true;
			break;
	}
	
}

checkpress();

function checkpress()
{
	if(optionsbutton == true)
	{
		surface.drawImage(optionsimage, 0, 0, canvas.width,canvas.height, 0, 0, canvas.width,canvas.height);
		if(goBack == true)
		{
			console.log("going back");
			optionsbutton = false;
			goBack = false;
			surface.clearRect(0,0,canvas.width,canvas.height);
			surface.drawImage(UI, 0, 0, canvas.width,canvas.height, 0, 0, canvas.width,canvas.height);
		}
	}
	else if(creditbutton == true)
	{
			
		surface.drawImage(creditimage, 0, 0, canvas.width,canvas.height, 0, 0, canvas.width,canvas.height);
		if(goBack == true)
		{
		console.log("going back");
			creditbutton = false;
			goBack = false;
		}
	}
	else if(playbutton == true)
	{
		line.src = "../music/Ly.mp3";
		playgame = true;
		stage = 0;
	}
	else if(goBack == true)//this is used for the mainmenu so you dont need to press the option button twice.
	{
		goBack = false;
	}
	
	
	
}

console.log(playbutton);

