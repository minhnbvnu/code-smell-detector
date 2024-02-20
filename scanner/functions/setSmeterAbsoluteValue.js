function setSmeterAbsoluteValue(value) //the value that comes from `csdr squelch_and_smeter_cc`
{
	var logValue=getLogSmeterValue(value);
	var lowLevel=waterfall_min_level-20;
	var highLevel=waterfall_max_level+20;
	var percent=(logValue-lowLevel)/(highLevel-lowLevel);
	setSmeterRelativeValue(percent);
	e("openwebrx-smeter-db").innerHTML=logValue.toFixed(1)+" dB";
}