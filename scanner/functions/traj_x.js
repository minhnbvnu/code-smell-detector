function traj_x(u){ // physical coordinates
    var dxPhysFromCenter= // left side (median), phys coordinates
	(u<straightLen) ? straightLen-u
	: (u>straightLen+arcLen) ? u-mainroadLen+straightLen
	: -arcRadius*Math.sin((u-straightLen)/arcRadius);
    //dxPhysFromCenter -=10; // !!! activate if testing inflow
    return center_xPhys+dxPhysFromCenter;
}