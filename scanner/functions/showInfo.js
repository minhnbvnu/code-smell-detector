function showInfo(){ 
    var scenarioFile="info/info_"+scenarioString+".html";
    console.log("showInfo (control_gui): scenarioFile=",scenarioFile);


   // scenarioFile is dynamically determined 
   // e.g., "info/info_"+scenarioString+".html"

    if(infoLevel===0){$("#infotext").load("info/info_gui.html");}
    else if(infoLevel===1){$("#infotext").load(scenarioFile);}
    else if(infoLevel===2){$("#infotext").load("info/info_IDM.html");}
    else if(infoLevel===3){$("#infotext").load("info/info_MOBIL.html");}
    else if(infoLevel===4){$("#infotext").load("info/info_BC.html");}
    else if(infoLevel===5){$("#infotext").load("info/info_Numerics.html");}
    infoLevel++; infoLevel=(infoLevel%nLevels);
}