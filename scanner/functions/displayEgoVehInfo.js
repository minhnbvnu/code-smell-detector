function displayEgoVehInfo(){

    coordsText="Zeit: "+parseFloat(time).toFixed(1)+" s"
	+" a<sub>long</sub>="+parseFloat(egoVeh.aLong).toFixed(1)+" m/s<sup>2</sup>"
	+" a<sub>lat</sub>="+parseFloat(egoVeh.aLat).toFixed(2)+" m/s<sup>2</sup>"
 	+" Richtung="+parseFloat(180/Math.PI*egoVeh.driveAngle).toFixed(0)+" Grad.";
    var displayText=coordsText;
    if(isStopped){displayText += "Weiter mit Mausklick oder Tastendruck";}
    else{displayText += "<br>Stop mit Mausklick oder Tastendruck";}
    if((!isStopped)&&isOutside){
	displayText="Ihre Maus ist au&szlig;erhalb der Simulation!";
    }
    if(itime<2){
	displayText="Gehen Sie mit der Maus zum schwarzen Punkt<br>"
	    +"und starten Sie mit Mausklick oder Tastendruck.<br>"
	    +" Beschleunigen, Bremsen und Lenken mit der Maus";
    }
    //console.log("after displayEgoVehInfo(): displayText=",displayText);
    document.getElementById("mouseMoveDisplay").innerHTML=displayText;
}