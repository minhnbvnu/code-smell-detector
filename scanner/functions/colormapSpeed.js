function colormapSpeed(v, vmin_col, vmax_col, vehType, isEgo, time, isOpaque){
    var dt_blink_ms=1000; // to see ego vehicle
    var hue_vmin_col=10/360; // color wheel: 0=360=red
    var hue_vmax_col=270/360; 



    // rel speed with respect to [vmin_col,vmax_col]
    // transform nonlinearly (use vrel_nl) to shrink the unnaturally wide 
    // central green regions

    var vrel= Math.min( (v-vmin_col)/(vmax_col-vmin_col), 1.0);
    var vrel_nl=(vrel<=0.5) ? 2*Math.pow(vrel,2) : 1-2*Math.pow(vrel-1,2)

    // determine hue-saturation-lightness

    var hue=hue_vmin_col+vrel_nl*(hue_vmax_col-hue_vmin_col);
    var sat=1; // use max saturation
    var lightness=(vehType==="truck") ? 0.2 : 0.5; //0: all black; 1: white
 
    // convert into rgb and add opacity (0: fully transp; 1: opaque=normal)

    var rgbArr=hslToRgb(hue,sat,lightness);

    r=rgbArr[0];
    g=rgbArr[1];
    b=rgbArr[2];
    a=(vehType==="truck") ? 0.3 : 0.4;
    if(isEgo){
	var lightsOn=( (Math.floor(1000*time))%dt_blink_ms<0.5*dt_blink_ms);
	a=(lightsOn) ? 0.95 : 0.2;
    }
    if(isOpaque){a=1;}
    var colStr="rgba("+r+","+g+","+b+","+a+")";
    return colStr;
}