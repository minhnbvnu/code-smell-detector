function EgoVeh(vLongInit){

    this.latCtrlModel=1; // 0=direct pos control, 1=speed ctrl; 2=steering

    // data members that are only relevant if this.latCtrlModel===2
    // curves in the road are considered in handling by road.js

    this.vLong=vLongInit; // speed along vehicle axis 
    this.vLat=0;           // vLat always=0 if not sliding!
    this.aLong=0;  // acceleration along vehicle axis
    this.aLat=0;  // acceleration perp to veh axis (right=positive)
    this.driveAngle=0;  // =atan(vLat/vLong) only !=0 if isSliding=true
    this.isSliding=false; //driveAngle, sliding only relev. if latCtrlModel===2

    // data memers that are only relevant if this.latCtrlModel===0 or 1 
    // only implemented if road has small curves (y approx u, |x|<<y)
    // => y(u,v)=u, x(u,v)=v+traj_x(u), control is w/respect to x,y

    //!! Watch OUT: Here, v and vv have physical units, in road: lane units

    this.vu=vLongInit; // speed along road axis [m/s]
    this.vv=0;         // speed perp to road axis [m/s], right=positive
    this.v=0;          // lateral pos [m] = distance to road axis

    this.vuOld=this.vu;
    this.vvOld=this.vv;
    this.vOld=this.v;

    // following are parameters of simplified ego model

    this.vmax_col=190/3.6;   // maximum speed of ego vehicle
    this.bmax=9;  // max absolute acc (limit where sliding/ESP begins)
    this.amax=4;  // max long acceleration (if ego.vLong=0)

    this.sensLat0=0.4; // lat displacement sensitivity [1](latCtrlModel===0)
                       //  sensLat0=1 => vehicle follows lateral mouse 1:1
    this.sensLat1=20;  // max lateral speed [m/s] (latCtrlModel===1) 
                       // if mouse pointer at the boundaries of canvas
    this.vc=10;        // steering sensitivity [m/s] (latCtrlModel===2) 
                       // (the lower vc, the higher): 
                       // @vc, max steering (mouse pointer at canvas  
                       // boundaries) leads to |accLat|>bmax
    this.tau_v=0.8;    // time scale exponential smoothing if latCtrlModel===0
    this.tau_vv=0.5;   // time scale exponential smoothing if latCtrlModel===1
}