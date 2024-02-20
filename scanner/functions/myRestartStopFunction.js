function myRestartStopFunction(){
    console.log("Begin myRestartStopFunction: isStopped=",isStopped);
    clearInterval(myRun);
    init();
    if(false){
	isStopped=false;
	document.getElementById('startStopButton').innerHTML="Neues Spiel";
	myRun=setInterval(main_step, 1000/fps);
    }
    else{
	document.getElementById('startStopButton').innerHTML="";
	document.getElementById('mouseMoveDisplay').innerHTML
	    ="Gehen Sie mit der Maus zum schwarzen Punkt<br>"
	    +" und starten Sie mit Mausklick oder Tastendruck";
	isStopped=true;
	main_step();
    }
    console.log("end of myResumeStopFunction: isStopped=",isStopped);

}