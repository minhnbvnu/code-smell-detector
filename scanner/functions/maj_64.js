function maj_64(x, y, z)
	{
		return new Int_64(
				(x.highOrder & y.highOrder) ^
				(x.highOrder & z.highOrder) ^
				(y.highOrder & z.highOrder),
				(x.lowOrder & y.lowOrder) ^
				(x.lowOrder & z.lowOrder) ^
				(y.lowOrder & z.lowOrder)
			);
	}