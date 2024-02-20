function parsehash()
{
	if(h=window.location.hash)
	{
		h.substring(1).split(",").forEach(function(x){
			harr=x.split("=");
			//console.log(harr);
			if(harr[0]=="mute") toggleMute();
			else if(harr[0]=="mod") starting_mod = harr[1];
			else if(harr[0]=="sql") 
			{ 
				e("openwebrx-panel-squelch").value=harr[1]; 
				updateSquelch(); 
			}
			else if(harr[0]=="freq") 
			{
				console.log(parseInt(harr[1]));
				console.log(center_freq);
				starting_offset_frequency = parseInt(harr[1])-center_freq;
			}
		});

	}
}