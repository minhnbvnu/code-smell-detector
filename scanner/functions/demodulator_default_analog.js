function demodulator_default_analog(offset_frequency,subtype)
{
	//console.log("hopefully this happens");
	//http://stackoverflow.com/questions/4152931/javascript-inheritance-call-super-constructor-or-use-prototype-chain
	demodulator.call(this,offset_frequency);
	this.subtype=subtype;
	this.filter={
		min_passband: 100,
		high_cut_limit: (audio_server_output_rate/2)-1, //audio_context.sampleRate/2,
		low_cut_limit: (-audio_server_output_rate/2)+1 //-audio_context.sampleRate/2
	};
	//Subtypes only define some filter parameters and the mod string sent to server,
	//so you may set these parameters in your custom child class.
	//Why? As of demodulation is done on the server, difference is mainly on the server side.
	this.server_mod=subtype;
	if(subtype=="lsb")
	{
		this.low_cut=-3000;
		this.high_cut=-300;
		this.server_mod="ssb";
	}
	else if(subtype=="usb")
	{
		this.low_cut=300;
		this.high_cut=3000;
		this.server_mod="ssb";
	}
	else if(subtype=="cw")
	{
		this.low_cut=700;
		this.high_cut=900;
		this.server_mod="ssb";
	}
	else if(subtype=="nfm")
	{
		this.low_cut=-4000;
		this.high_cut=4000;
	}
	else if(subtype=="am")
	{
		this.low_cut=-4000;
		this.high_cut=4000;
	}

	this.wait_for_timer=false;
	this.set_after=false;
	this.set=function()
	{ //set() is a wrapper to call doset(), but it ensures that doset won't execute more frequently than demodulator_response_time.
		if(!this.wait_for_timer)
		{
			this.doset(false);
			this.set_after=false;
			this.wait_for_timer=true;
			timeout_this=this; //http://stackoverflow.com/a/2130411
			window.setTimeout(function() {
				timeout_this.wait_for_timer=false;
				if(timeout_this.set_after) timeout_this.set();
			},demodulator_response_time);
		}
		else
		{
			this.set_after=true;
		}
	}

	this.doset=function(first_time)
	{  //this function sends demodulator parameters to the server
		ws.send("SET"+((first_time)?" mod="+this.server_mod:"")+
			" low_cut="+this.low_cut.toString()+" high_cut="+this.high_cut.toString()+
			" offset_freq="+this.offset_frequency.toString());
	}
	this.doset(true); //we set parameters on object creation

	//******* envelope object *******
   // for drawing the filter envelope above scale
	this.envelope.parent=this;

	this.envelope.draw=function(visible_range)
	{
		this.visible_range=visible_range;
		this.drag_ranges=demod_envelope_draw(range,
				center_freq+this.parent.offset_frequency+this.parent.low_cut,
				center_freq+this.parent.offset_frequency+this.parent.high_cut,
				this.color,center_freq+this.parent.offset_frequency);
	};

	// event handlers
	this.envelope.drag_start=function(x, key_modifiers)
	{
		this.key_modifiers=key_modifiers;
		this.dragged_range=demod_envelope_where_clicked(x,this.drag_ranges, key_modifiers);
		//console.log("dragged_range: "+this.dragged_range.toString());
		this.drag_origin={
			x: x,
			low_cut: this.parent.low_cut,
			high_cut: this.parent.high_cut,
			offset_frequency: this.parent.offset_frequency
		};
		return this.dragged_range!=demodulator.draggable_ranges.none;
	};

	this.envelope.drag_move=function(x)
	{
		dr=demodulator.draggable_ranges;
		if(this.dragged_range==dr.none) return false; // we return if user is not dragging (us) at all
		freq_change=Math.round(this.visible_range.hps*(x-this.drag_origin.x));
		/*if(this.dragged_range==dr.beginning||this.dragged_range==dr.ending)
		{
			//we don't let the passband be too small
			if(this.parent.low_cut+new_freq_change<=this.parent.high_cut-this.parent.filter.min_passband) this.freq_change=new_freq_change;
			else return;
		}
		var new_value;*/

		//dragging the line in the middle of the filter envelope while holding Shift does emulate
		//the BFO knob on radio equipment: moving offset frequency, while passband remains unchanged
		//Filter passband moves in the opposite direction than dragged, hence the minus below.
		minus=(this.dragged_range==dr.bfo)?-1:1;
		//dragging any other parts of the filter envelope while holding Shift does emulate the PBS knob
		//(PassBand Shift) on radio equipment: PBS does move the whole passband without moving the offset
		//frequency.
		if(this.dragged_range==dr.beginning||this.dragged_range==dr.bfo||this.dragged_range==dr.pbs)
		{
			//we don't let low_cut go beyond its limits
			if((new_value=this.drag_origin.low_cut+minus*freq_change)<this.parent.filter.low_cut_limit) return true;
			//nor the filter passband be too small
			if(this.parent.high_cut-new_value<this.parent.filter.min_passband) return true;
			//sanity check to prevent GNU Radio "firdes check failed: fa <= fb"
			if(new_value>=this.parent.high_cut) return true;
			this.parent.low_cut=new_value;
		}
		if(this.dragged_range==dr.ending||this.dragged_range==dr.bfo||this.dragged_range==dr.pbs)
		{
			//we don't let high_cut go beyond its limits
			if((new_value=this.drag_origin.high_cut+minus*freq_change)>this.parent.filter.high_cut_limit) return true;
			//nor the filter passband be too small
			if(new_value-this.parent.low_cut<this.parent.filter.min_passband) return true;
			//sanity check to prevent GNU Radio "firdes check failed: fa <= fb"
			if(new_value<=this.parent.low_cut) return true;
			this.parent.high_cut=new_value;
		}
		if(this.dragged_range==dr.anything_else||this.dragged_range==dr.bfo)
		{
			//when any other part of the envelope is dragged, the offset frequency is changed (whole passband also moves with it)
			new_value=this.drag_origin.offset_frequency+freq_change;
			if(new_value>bandwidth/2||new_value<-bandwidth/2) return true; //we don't allow tuning above Nyquist frequency :-)
			this.parent.offset_frequency=new_value;
		}
		//now do the actual modifications:
		mkenvelopes(this.visible_range);
		this.parent.set();
		//will have to change this when changing to multi-demodulator mode:
		e("webrx-actual-freq").innerHTML=format_frequency("{x} MHz",center_freq+this.parent.offset_frequency,1e6,4);
		return true;
	};

	this.envelope.drag_end=function(x)
	{ //in this demodulator we've already changed values in the drag_move() function so we shouldn't do too much here.
		demodulator_buttons_update();
		to_return=this.dragged_range!=demodulator.draggable_ranges.none; //this part is required for cliking anywhere on the scale to set offset
		this.dragged_range=demodulator.draggable_ranges.none;
		return to_return;
	};

}