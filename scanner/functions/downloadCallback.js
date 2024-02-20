function downloadCallback(){
  if(downloadActive){
    performDownload();
    downloadActive=false;
    document.getElementById("download").src="figs/iconDownloadStart_small.png";
  }
  
  else{ // title/header lines
    for(var i=0; i<network.length; i++){
      network[i].exportString
        ="#time\tid\tx[m]\ty[m]\tspeed[m/s]\theading\tacc[m/s^2]";
    }
    for (var iDet=0; iDet<detectors.length; iDet++){
      var det=detectors[iDet];
      console.log("det=",det);
      det.exportString="#Detector "+iDet
	+" at road "+det.road.roadID+" at position x="+det.u.toFixed(0)
	+ " aggregation time [s]="+det.dtAggr
	+"\n#time[s]\tflow[veh/h]\tspeed[km/h]";
    }
    downloadActive=true;
    document.getElementById("download").src="figs/iconDownloadFinish_small.png";
  }
}