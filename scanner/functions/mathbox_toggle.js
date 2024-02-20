function mathbox_toggle()
{

	if(mathbox_mode == MATHBOX_MODES.UNINITIALIZED) mathbox_init();
	mathbox_mode = (mathbox_mode == MATHBOX_MODES.NONE) ? MATHBOX_MODES.WATERFALL : MATHBOX_MODES.NONE;
	mathbox_container.style.display = (mathbox_mode == MATHBOX_MODES.WATERFALL) ? "block" : "none";
	mathbox_clear_data();
	waterfall_clear();
}