function Wipe(hnd)
{
	var buf = new Uint8Array(100*0x44);
	var count = sc.ipcMsg(9).data(1).bDescriptor(buf, buf.length, 0).sendTo(hnd).assertOk().data[0];

	if(!count)
		return;

	utils.log("mii count to delete " + count.toString());

	var key = new Uint8Array(16);

	for(mii = 0; mii < count; mii++)
	{
		for(j = 0; j < 16; j++)
			key[j] = buf[j + 48 + mii * 0x44];
		Delete(hnd, key);
	}
}