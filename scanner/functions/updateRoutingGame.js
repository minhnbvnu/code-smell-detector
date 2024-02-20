function updateRoutingGame(time){ // game inflow
    qIn=(time<50) ? 2700/3600 : 
	(time<90) ? 500/3600 : 
	(time<120) ? 3000/3600 :
	(time<125) ? 800/3600 : 0;
    slider_qIn.value=3600*qIn;
    slider_qInVal.innerHTML=Math.round(3600*qIn)+" Fz/h";
}