var UI = new Image();
UI.src = "../img/UI.png"; 		
canvas.width = 1280; 							  // Sets the canvas width to 640 px. Note that it's a regular property not accessing the .style
canvas.height = 640;	
surface.clearRect(0,0,canvas.width,canvas.height);
surface.drawImage(UI, 0, 0, canvas.width,canvas.height, 0, 0, canvas.width,canvas.height);
	

window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);

line.src = " ";




function onKeyDown(event)
{


	switch (event.keyCode)
	{
		case 80:
		playbutton = true;
			break;
	}
	
}

checkpress();

function checkpress()
{
	if(playbutton == true)
	{
		line.src = "../music/Ly.mp3";
		playgame = true;
		stage = 0;
	}
	
}

console.log(playbutton);

