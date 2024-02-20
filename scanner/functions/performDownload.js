function performDownload(){
  var msg="";
  for(var i=0; i<network.length; i++){
    var filename="road"+network[i].roadID+"_time"+time.toFixed(1)+".txt";
    msg=msg+filename+" ";
    network[i].writeVehiclesSimpleToFile(filename);
  }
  for (var iDet=0; iDet<detectors.length; iDet++){
    var filename="Detector"+iDet
      +"_road"+detectors[iDet].road.roadID
      +"_x"+detectors[iDet].u.toFixed(0)+"_time"+time.toFixed(0)+".txt";
    msg=msg+filename+" ";
    detectors[iDet].writeToFile(filename);
  }

  msg="wrote files "+msg+" to default folder (Downloads)";
  downloadActive=false;
  alert(msg);
}