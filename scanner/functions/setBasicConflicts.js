function setBasicConflicts(nLanes_main,nLanes_sec){
  
    // <input>
  var conflictName=["OD 23, conflicting road 0 (conflict0_up)", // up=OD 23
		    "OD 23, conflicting road 1 (conflict1_up)",
		    "OD 03, conflicting road 1 (conflict1_03)",
		    "OD 21, conflicting road 0 (conflict0_21)",
		    "OD 21, conflicting road 4 (conflict4_21)",
		    "OD 21, conflicting road 5 (conflict5_21)"];
  

  var sourceIndex=[2,2,0,2,2,2];
  var targetIndex=[3,3,3,1,1,1];
  var conflictIndex=[0,1,1,0,4,5];
  var trajAltIndex=[-1,-1,1,1,1,1]; // alternativ traj  on destination road
                                      // (-1: none)
  var xc_known=[false,false,false,false,true,true];
  var uTarget=[0,0,u03Target,u21Target,u21Target,u21Target];
  var uSource=[network[2].roadLen, network[2].roadLen,
		 u03Source,u21Source,u21Source,u21Source];

  //</input>

 
  var ucOther=[];// output
  var ducExitOwn=[];

  
    // find exact xc,yc for the conflicts and corresponding
    // uConflict, uTargetConflict (uOwn) for all conflicts
    // xc is known/not known  for vertical/horiz conflicting roads

  for(var i=0; i<conflictName.length; i++){

    var iConflict=conflictIndex[i];  // conflicting road index
    var iSource=sourceIndex[i];      // source road index
    var iDest=targetIndex[i];       // destination road indecx
    var iTrajAlt=trajAltIndex[i];    
    var valcTarget=(xc_known[i])
	  ? network[iConflict].traj[0](0)
	  : network[iConflict].traj[1](0);
    var funTarget_x=(iTrajAlt>=0)
	  ? network[iDest].trajAlt[iTrajAlt].x : network[iDest].traj[0];
    var funTarget_y=(iTrajAlt>=0)
	  ? network[iDest].trajAlt[iTrajAlt].y : network[iDest].traj[1];
    var funTarget=(xc_known[i]) // the trajectory component to analyse
	  ? funTarget_x : funTarget_y;
    var funTarget1=(xc_known[i]) // the other traj component
	  ? funTarget_y : funTarget_x;
    var umin=(iTrajAlt>=0) ? network[iDest].trajAlt[iTrajAlt].umin : 0;
    var umax=(iTrajAlt>=0) ? network[iDest].trajAlt[iTrajAlt].umax
	  : network[iDest].roadLen; 
    if(false){
        console.log("valcTarget=",valcTarget," xc_known[i]=",xc_known[i]);
        console.log("funTarget(0)=",funTarget(0),
  		  "funTarget1(0)=",funTarget1(0));
        console.log("funTarget(10)=",funTarget(10),
		  "funTarget1(10)=",funTarget1(10));
        console.log("umin=",umin," umax=",umax);
    }
    var resultsTarget=findArg(funTarget,valcTarget,umin,umax);
    var ucTarget=resultsTarget[0];
    var xc=(xc_known[i])
	  ? valcTarget : funTarget1(ucTarget);
    var yc=(xc_known[i])
	  ? funTarget1(ucTarget) : valcTarget;

    var valcOther=(xc_known[i]) ? yc : xc;
    var funOther=(xc_known[i])
	  ? network[iConflict].traj[1] : network[iConflict].traj[0];
      
      // !! add +100 [m] to roadLen
      // to include possible antic downstream of road end
    var resultsOther
	  =findArg(funOther,valcOther,0,network[iConflict].roadLen+100);

    ucOther[i]=resultsOther[0]; // output
    ducExitOwn[i]=ucTarget-uTarget[i];

    if(false){
      console.log(
	"results for OD ",iSource,iDest,"conflicting road",iConflict,":",
        "\n  ucTarget=",ucTarget.toFixed(1),
        " dist=",resultsTarget[1].toFixed(1),
        " xc=",xc.toFixed(1),
        " yc=",yc.toFixed(1),
        " dist=",resultsOther[1].toFixed(1),
        " \n  ducExitOwn[i]=",ducExitOwn[i].toFixed(1),
        " ucOther[i]=",ucOther[i].toFixed(1),
	"");
    }
  }





  
  // (2) define the independent and symmetric conflicts using above results
  // for ducExitOwn and ucOther for curved trajectories

  

  
  // (2a) conflicts by mainroads for straight ahead OD 23 (secondary road)
  // and by opposite mainroad for secondary left-turners

  
  conflict0_up=  {roadConflict: network[0], 
		  dest:         [0,3], //straight-on and left turners
		  ucOther:    0.5*network[0].roadLen+offsetSec,
		  ducExitOwn: radiusRight+offset20Target-offsetMain};
		  //ucOther: ucOther[0],
		  //ducExitOwn: ducExitOwn[0]};

  conflict1_up=  {roadConflict: network[1],
		  dest:         [],
		  ucOther:    0.5*network[0].roadLen-offsetSec,
		  ducExitOwn: radiusRight+offset20Target+offsetMain};
		  //ucOther: ucOther[1],
		  //ducExitOwn: ducExitOwn[1]};

  // symmetry
  

  conflict0_down={roadConflict: network[0],
		    dest:         [], // all
		    ucOther:    conflict1_up.ucOther,
		    ducExitOwn: conflict1_up.ducExitOwn};

  conflict1_down={roadConflict: network[1],
		    dest:         [1,5],
		    ucOther:    conflict0_up.ucOther,
		    ducExitOwn: conflict0_up.ducExitOwn};


  // (2b) conflicts by straight-on mainroad vehicles (only for right priority
  // where there are no longer mainroad directions)
 
  // 2*offsetSec+laneWidth: wait one laneWidth upstream of sec road boundary
  // offsetSec: distance of sec road axis to center
  // must be consistent with network[0/1].connect(network[0/1],...)
  
  conflict2_00= {roadConflict: network[2],
		 dest:         [],
		 ucOther:      conflict0_up.ducExitOwn+network[2].roadLen,
		 ducExitOwn:   2*offsetSec+laneWidth+offsetSec};

  conflict3_00= {roadConflict: network[3],
		 dest:         [],
		 ucOther:      conflict0_up.ducExitOwn,
		 ducExitOwn:   2*offsetSec+laneWidth+offsetSec};

  // symmetry

  conflict4_11= {roadConflict: network[4],
		 dest:         [],
		 ucOther:      conflict2_00.ucOther,
		 ducExitOwn:   conflict2_00.ducExitOwn};

  conflict5_11= {roadConflict: network[5],
		 dest:         [],
		 ucOther:      conflict3_00.ucOther,
		 ducExitOwn:   conflict3_00.ducExitOwn};


  

  // (2c) conflicts by opposite mainroad for mainroad left-turners

  conflict1_03= {roadConflict: network[1], //by road 1 for OD 03
		 dest:         [1,3], // only main straight-on and right
		 ucOther: ucOther[2],
		 ducExitOwn: ducExitOwn[2]};


  // symmetry

  conflict0_15={roadConflict: network[0],  //by road 0 for OD 15
		dest:         [0,5], // US style: only main-straight/right
		ucOther:      conflict1_03.ucOther,
		ducExitOwn:   conflict1_03.ducExitOwn};


  
  // (2d) conflicts by right road for mainroad left-turners for
  // right-priority rules (no 3_03 since target road)
  //!! no precide calc ucOther, ducOwn but this is tricky and approx good

  conflict2_03= {roadConflict: network[2], //by road 1 for OD 03
		 dest:         [1,3], // only secondary straight or left
		 ucOther:      conflict0_up.ducExitOwn+network[2].roadLen,
		 ducExitOwn:   conflict1_03.ducExitOwn};
  
  // symmetry

  conflict4_15= {roadConflict: network[4], //by road 1 for OD 03
		 dest:         [0,5], // only secondary straight or left
		 ucOther:      conflict2_03.ucOther,
		 ducExitOwn:   conflict2_03.ducExitOwn};
  

  
  // (2e) conflicts by the secondary roads straight traffic
  // for secondary left turners of the other direction
  // anticipation -> roads 2/4 needed as well since
  //roads 3/5 starts too near the conflict (u>roadLen OK)

  
  conflict0_21= {roadConflict: network[0], 
		 dest:         [0,3], //conflict straight-on and left turners
		 ucOther:      ucOther[3],
		 ducExitOwn:   ducExitOwn[3]};

  conflict4_21= {roadConflict: network[4], // By road 4 for OD 21
		 dest:         [1,5],    // right priority+US style left
		 ucOther: ucOther[4],
		 ducExitOwn: ducExitOwn[4]};

  conflict5_21= {roadConflict: network[5],  // By road 5 for OD 21
		 dest:         [],        // sink road
		 ucOther: ucOther[5],
		 ducExitOwn: ducExitOwn[5]};


  // symmetry
  
  conflict1_40= {roadConflict: network[1], 
		 dest:         [1,5], //straight-on and left turners
		 ucOther:      conflict0_21.ucOther,
		 ducExitOwn:   conflict0_21.ducExitOwn};
  
  conflict2_40= {roadConflict: network[2],  // By road 2 for OD 40
		 dest:         [0,3],     // right priority+US style left
		 ucOther:      conflict4_21.ucOther,
		 ducExitOwn:   conflict4_21.ducExitOwn};

  conflict3_40= {roadConflict: network[3],  // By road 3 for OD 40
		 dest:         [],        // road 3 is only sink road
		 ucOther:      conflict5_21.ucOther,
		 ducExitOwn:   conflict5_21.ducExitOwn};


}