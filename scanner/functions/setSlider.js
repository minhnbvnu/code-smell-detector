function setSlider(slider, sliderHTMLval, value, commaDigits, str_units){
  var formattedValue=value.toFixed(commaDigits);
  slider.value=value;
  sliderHTMLval.innerHTML=formattedValue+" "+str_units; // +" " DOS=>str_units
  console.log("setSlider: value=",value
	      ," innerHTML=",sliderHTMLval.innerHTML);
}