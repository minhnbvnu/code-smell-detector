function hrtimeNanosec(a)
{
	assertHrtime(a);

	return (Math.floor(a[0] * 1e9 + a[1]));
}