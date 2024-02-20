function assertSupported()
{
	if (e2eSupported === false)
		throw new Error('e2e not supported');
	else if (e2eSupported === undefined)
		throw new Error('e2e not initialized, must call isSupported() first');
}