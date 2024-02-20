function demodulator_buttons_update()
{
	$(".openwebrx-demodulator-button").removeClass("highlighted");
    if(secondary_demod) $("#openwebrx-button-dig").addClass("highlighted");
    else switch(demodulators[0].subtype)
	{
	case "nfm":
		$("#openwebrx-button-nfm").addClass("highlighted");
		break;
	case "am":
		$("#openwebrx-button-am").addClass("highlighted");
		break;
	case "lsb":
	case "usb":
	case "cw":
		if(demodulators[0].high_cut-demodulators[0].low_cut<300)
			$("#openwebrx-button-cw").addClass("highlighted");
		else
		{
			if(demodulators[0].high_cut<0) 
				$("#openwebrx-button-lsb").addClass("highlighted");
			else if(demodulators[0].low_cut>0) 
				$("#openwebrx-button-usb").addClass("highlighted");
			else $("#openwebrx-button-lsb, #openwebrx-button-usb").addClass("highlighted");
		}
		break;
	}
}