function Coffeemeter(cupImgBack,cupImgFront,
		     diam,dist,xRelCoffee,yRelCoffee,
		     tau,angSurfSpill,evap){

    // quantities that possibly need to be tuned here
    // (more parameters to be finetuned in the prototype.draw method!) 

    this.stainVolMax=2.; // max spilled coffee [rad] to avoid complete pigsty

    this.cupImgBack=cupImgBack;
    this.cupImgFront=cupImgFront;
    this.diam=diam; 
    this.dist=dist; 
    this.xRelCoffee=xRelCoffee; 
    this.yRelCoffee=yRelCoffee; 
    this.tau=tau;
    this.angSurfSpill=angSurfSpill;
    this.evap=evap;
    this.stainVolMax=2.; // maximum spilled coffee to avoid 
                         // a complete pigsty
    this.g=9.81;
    this.omega0=Math.sqrt(this.g/diam);

    if(tau<1.01/this.omega0){
	this.tau=1.01/this.omega0;
	console.log("damping time constant too small for periodic motion");
        console.log("resetting to nearly aperiodic limiting case",
		    " tau=1.01/omega0=",tau);
	this.tau=Math.sqrt(this.g/diam);
    }


    this.x=0; // angle of surface normal [rad] in long (u) direction
    this.y=0; // .. in lateral (v) direction. start with zero angles
    this.dotx=0; // start with zero angular speeds
    this.doty=0; 

    // stains at nStains different fixed places at angles 
    // phi_i=iStain*2*pi/nStains; 
    // stains[i]=cumulative not evaporated spilt coffee in terms of 
    // cumulative excess angle over the rim at rim angle phi_i

    this.nStains=12;          
    this.stains=new Array(this.nStains); 
    this.stains.fill(0); // initially, no spilt coffee
}