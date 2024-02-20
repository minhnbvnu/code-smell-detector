function updateDimensions(){ // if viewport or sizePhys changed
    center_xPhys=center_xRel*refSizePhys; //[m]
    center_yPhys=center_yRel*refSizePhys;

    arcRadius=arcRadiusRel*refSizePhys;
    arcLen=arcRadius*Math.PI;
    straightLen=refSizePhys*critAspectRatio-center_xPhys;
    mainroadLen=arcLen+2*straightLen;

    uBeginBan=uBeginBanRel*straightLen; // truck overtaking ban if clicked active
    uBeginUp=straightLen+0.3*arcLen;
    uEndUp=straightLen+1.3*arcLen;
}