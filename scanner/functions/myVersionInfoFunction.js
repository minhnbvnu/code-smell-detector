function myVersionInfoFunction (data) {
	var boilerPlate		= "PPro Version: ";
	var v_string		= document.getElementById("version_string");
	v_string.innerHTML	= boilerPlate + data;
}