function updateModels(){
    var v0=Math.min(IDM_v0, speedL);
    var v0_truck=Math.min(IDM_v0, speedL_truck);
    var T_truck=factor_T_truck*IDM_T;
    var a_truck=factor_a_truck*IDM_a;
    longModelCar=new ACC(v0,IDM_T,IDM_s0,IDM_a,IDM_b);
    longModelCar.speedlimit=speedL;
    longModelTruck=new ACC(v0_truck,T_truck,IDM_s0,a_truck,IDM_b);
    longModelTruck.speedlimit=Math.min(speedL, speedL_truck);
    LCModelCar=new MOBIL(MOBIL_bSafe, MOBIL_bSafeMax, MOBIL_p,
                        MOBIL_bThr, MOBIL_bBiasRight_car);
 
    LCModelTruck=new MOBIL(MOBIL_bSafe, MOBIL_bSafeMax, MOBIL_p,
			   MOBIL_bThr, MOBIL_bBiasRight_truck);
    LCModelMandatory=new MOBIL(MOBIL_mandat_bSafe, MOBIL_mandat_bSafe, 
			       MOBIL_mandat_p,
			       MOBIL_mandat_bThr, MOBIL_mandat_bias);

  console.log("control_gui.updateModels:",
	      " longModelTruck.speedlimit=",longModelTruck.speedlimit);


}