function pythag(a,b)
 	{
		a = Math.abs(a);
		b = Math.abs(b);
		if (a > b)
			return a*Math.sqrt(1.0+(b*b/a/a))
		else if (b == 0.0) 
			return a
		return b*Math.sqrt(1.0+(a*a/b/b))
	}