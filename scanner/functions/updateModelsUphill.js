function updateModelsUphill(){

    // uphill section (no overtaking ban by default)

    var T_truck=factor_T_truck*IDM_T;
    var a_truck=factor_a_truck*IDM_a;

    longModelCarUphill=longModelCar;
    longModelTruckUphill=new ACC(IDM_v0Up,T_truck,IDM_s0,a_truck,IDM_b);
    LCModelCarUphill=LCModelCar;
    LCModelTruckUphill=(banIsActive) ? LCModelMandatory : LCModelTruck;
    //console.log("control_gui.updateModelsUphill: LCModelTruckUphill=",
//		LCModelTruckUphill);
}