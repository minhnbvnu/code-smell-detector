function unstupid(hex,len)
{
	return (hex.length >= len) ? hex : unstupid("0"+hex,len);
}