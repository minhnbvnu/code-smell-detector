function myResumeStopFunction(){ 

    clearInterval(myRun);
    if(isStopped){
	isStopped=false;
	document.getElementById('startStopButton').innerHTML="Neues Spiel";
	myRun=setInterval(main_step, 1000/fps);
    }
    else{
	document.getElementById('startStopButton').innerHTML="Neues Spiel";
	document.getElementById('mouseMoveDisplay').innerHTML
	    =coordsText+"<br>Weiter mit Mausklick oder Tastendruck";
	isStopped=true;
    }
    console.log("end of myResumeStopFunction: isStopped=",isStopped);

}