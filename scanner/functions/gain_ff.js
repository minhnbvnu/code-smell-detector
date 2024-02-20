function gain_ff(gain_value,data) //great! solved clicking! will have to move to sdr.js
{
	for(var i=0;i<data.length;i++)
	data[i]*=gain_value;
	return data;
}