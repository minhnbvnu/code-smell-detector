function imandreel_update_load(size, total)
{
	if (total == 0)
		total = mandreel_packfiledata_size + mandreel_total_packtexture_size + mandreel_total_pogfile_size + mandreel_jslzma_size + mandreel_swf_size;


	mandreel_update_total_size+=size;

	var percentage = ((100*mandreel_update_total_size)/total)|0;

	if (percentage>100)
		percentage = 100;
	if (mandreelAppStartStateFunc)
		mandreelAppStartStateFunc("loadingProgress",percentage);

}