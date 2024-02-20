function pluckv(obj, key)
{
	if (obj === null || typeof (obj) !== 'object')
		return (undefined);

	if (obj.hasOwnProperty(key))
		return (obj[key]);

	var i = key.indexOf('.');
	if (i == -1)
		return (undefined);

	var key1 = key.substr(0, i);
	if (!obj.hasOwnProperty(key1))
		return (undefined);

	return (pluckv(obj[key1], key.substr(i + 1)));
}