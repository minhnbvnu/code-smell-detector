function mqSmartphone(){
    //return mqMobile()&&(!mqTablet()); 
    return mqMobile()
	|| (window.innerWidth<windowSizeCrit) || (window.innerHeight<windowSizeCrit);
}