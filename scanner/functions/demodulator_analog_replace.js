function demodulator_analog_replace(subtype, for_digital)
{ //this function should only exist until the multi-demodulator capability is added
    if(!(typeof for_digital !== "undefined" && for_digital && secondary_demod)) 
    { 
        secondary_demod_close_window(); 
        secondary_demod_listbox_update(); 
    }
    last_analog_demodulator_subtype = subtype;
	var temp_offset=0;
	if(demodulators.length)
	{
		temp_offset=demodulators[0].offset_frequency;
		demodulator_remove(0);
	}
	demodulator_add(new demodulator_default_analog(temp_offset,subtype));
	demodulator_buttons_update();
}