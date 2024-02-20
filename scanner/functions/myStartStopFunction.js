function myStartStopFunction(){ 

    clearInterval(myRun);
    //console.log("in myStartStopFunction: isStopped=",isStopped);

    //!!
    if(isStopped){
	isStopped=false;
	document.getElementById("startStop").src="figs/buttonStop3_small.png";
	myRun=setInterval(main_loop, 1000/fps);
    }
    else{
	document.getElementById("startStop").src="figs/buttonGo_small.png";
	isStopped=true;
    }
}