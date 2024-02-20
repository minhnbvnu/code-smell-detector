function setSmeterRelativeValue(value)
{
	if(value<0) value=0;
	if(value>1.0) value=1.0;
	var bar=e("openwebrx-smeter-bar");
	var outer=e("openwebrx-smeter-outer");
	bar.style.width=(outer.offsetWidth*value).toString()+"px";
	bgRed="linear-gradient(to top, #ff5939 , #961700)";
	bgGreen="linear-gradient(to top, #22ff2f , #008908)";
	bgYellow="linear-gradient(to top, #fff720 , #a49f00)";
	bar.style.background=(value>0.9)?bgRed:((value>0.7)?bgYellow:bgGreen);
	//bar.style.backgroundColor=(value>0.9)?"#ff5939":((value>0.7)?"#fff720":"#22ff2f");
}