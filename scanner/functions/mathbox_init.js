function mathbox_init()
{
	//mathbox_waterfall_history_length is defined in the config
	mathbox_data_max_depth = fft_fps * mathbox_waterfall_history_length; //how many lines can the buffer store
	mathbox_data_current_depth = 0; //how many lines are in the buffer currently
	mathbox_data_index = 0; //the index of the last empty line / the line to be overwritten
	mathbox_data = new Float32Array(fft_size * mathbox_data_max_depth);
	mathbox_data_global_index = 0;
	mathbox_correction_for_z = 0;

	mathbox = mathBox({
      plugins: ['core', 'controls', 'cursor', 'stats'],
      controls: { klass: THREE.OrbitControls },
    });
    three = mathbox.three;
    if(typeof three == "undefined") divlog("3D waterfall cannot be initialized because WebGL is not supported in your browser.", true);

    three.renderer.setClearColor(new THREE.Color(0x808080), 1.0);
	mathbox_container.appendChild((mathbox_element=three.renderer.domElement));
    view = mathbox
    .set({
      scale: 1080,
      focus: 3,
    })
    .camera({
      proxy: true,
      position: [-2, 1, 3],
    })
    .cartesian({
      range: [[-1, 1], [0, 1], [0, 1]],
      scale: [2, 2/3, 1],
    });

    view.axis({
      axis: 1,
      width: 3,
	  color: "#fff",
  });
    view.axis({
      axis: 2,
      width: 3,
	  color: "#fff",
	  //offset: [0, 0, 0],
  });
    view.axis({
      axis: 3,
      width: 3,
	  color: "#fff",
  });

    view.grid({
      width: 2,
      opacity: 0.5,
      axes: [1, 3],
      zOrder: 1,
	  color: "#fff",
    });

    //var remap = function (v) { return Math.sqrt(.5 + .5 * v); };


	var remap = function(x,z,t)
	{
		var currentTimePos = mathbox_data_global_index/(fft_fps*1.0);
		var realZAdd = (-(t-currentTimePos)/mathbox_waterfall_history_length);
		var zAdd = realZAdd - mathbox_correction_for_z;
		if(zAdd<-0.2 || zAdd>0.2) { mathbox_correction_for_z = realZAdd; }

		var xIndex = Math.trunc(((x+1)/2.0)*fft_size); //x: frequency
		var zIndex = Math.trunc(z*(mathbox_data_max_depth-1)); //z: time
		var realZIndex = mathbox_get_data_line(zIndex);
		if(!mathbox_data_index_valid(zIndex)) return {y: undefined, dBValue: undefined, zAdd: 0 };
		//if(realZIndex>=(mathbox_data_max_depth-1)) console.log("realZIndexundef", realZIndex, zIndex);
		var index = Math.trunc(xIndex + realZIndex * fft_size);
		/*if(mathbox_data[index]==undefined) console.log("Undef", index, mathbox_data.length, zIndex,
				realZIndex, mathbox_data_max_depth,
				mathbox_data_current_depth, mathbox_data_index);*/
		var dBValue = mathbox_data[index];
		//y=1;
		if(dBValue>waterfall_max_level) y = 1;
		else if(dBValue<waterfall_min_level) y = 0;
		else y = (dBValue-waterfall_min_level)/(waterfall_max_level-waterfall_min_level);
		mathbox_dbg = { dbv: dBValue, indexval: index, mbd: mathbox_data.length, yval: y };
		if(!y) y=0;
		return {y: y, dBValue: dBValue, zAdd: zAdd};
	}

    var points = view.area({
      expr: function (emit, x, z, i, j, t) {
		var y;
		remapResult=remap(x,z,t);
		if((y=remapResult.y)==undefined) return;
        emit(x, y, z+remapResult.zAdd);
      },
      width:  mathbox_waterfall_frequency_resolution,
      height: mathbox_data_max_depth - 1,
      channels: 3,
      axes: [1, 3],
    });

    var colors = view.area({
      expr: function (emit, x, z, i, j, t) {
		var dBValue;
		if((dBValue=remap(x,z,t).dBValue)==undefined) return;
		var color=waterfall_mkcolor(dBValue, mathbox_waterfall_colors);
        var b = (color&0xff)/255.0;
        var g = ((color&0xff00)>>8)/255.0;
        var r = ((color&0xff0000)>>16)/255.0;
        emit(r, g, b, 1.0);
      },
      width:  mathbox_waterfall_frequency_resolution,
      height: mathbox_data_max_depth - 1,
      channels: 4,
      axes: [1, 3],
    });

    view.surface({
      shaded: true,
      points: '<<',
      colors: '<',
      color: 0xFFFFFF,
    });

    view.surface({
      fill: false,
      lineX: false,
      lineY: false,
      points: '<<',
      colors: '<',
      color: 0xFFFFFF,
      width: 2,
      blending: 'add',
      opacity: .25,
      zBias: 5,
    });
	mathbox_mode = MATHBOX_MODES.NONE;

	//mathbox_element.style.width="100%";
	//mathbox_element.style.height="100%";

}