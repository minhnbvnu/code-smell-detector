function getFirstChars(buf, num)
{
	var u8buf=new Uint8Array(buf);
	var output=String();
	num=Math.min(num,u8buf.length);
	for(i=0;i<num;i++) output+=String.fromCharCode(u8buf[i]);
	return output;
}