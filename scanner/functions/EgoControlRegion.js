function EgoControlRegion(bulletPointFixed,xRelZero,yRelZero,ego_yRel){
    this.bulletPointFixed=bulletPointFixed;
    this.xRelZero=xRelZero; // fixed: mouse pos for zero steering (0=left,1=right)
    this.yRelZero=yRelZero; // fixed: mouse position for zero accel (0=bot,1=top)
    this.ego_yRel=ego_yRel; // rel position of ego vehicle 
}