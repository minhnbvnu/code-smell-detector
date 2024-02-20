function GetLoadBase(hnd, authorid)
{
	var unm = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x97, 0x02, 0x00, 0x00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x41, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
	var key = c64to8([[0xcafe, 0], [0xcafe0080, 0]]);

	AddOrReplace(hnd, key, unm, authorid);

	var data = GetDefault(hnd, (0x010b4b20 + 0xC + 0x44 * (GetCount(hnd) - 1) - 0x01079438) / 4);

	Delete(hnd, key);

	return utils.add2([data[5], data[6]], -0x9c540);
}