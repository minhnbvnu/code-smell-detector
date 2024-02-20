function randNorm(mean, variance)
{
	// Declare variables for the points and radius
    var x1, x2, w;

    // Repeat until suitable points are found
    do
    {
    	x1 = 2.0 * randFloat() - 1.0;
    	x2 = 2.0 * randFloat() - 1.0;
    	w = x1 * x1 + x2 * x2;
    } while (w >= 1.0 || w == 0);

    // compute the multiplier
    w = Math.sqrt((-2.0 * Math.log(w)) / w);

    // compute the gaussian-distributed value
    var gaussian = x1 * w;

    // Shift the gaussian value according to the mean and variance
    return (gaussian * variance) + mean;
}