function AddOrReplace(hnd, key, unm, authorid)
{
	var crcbuf = new Uint8Array(unm.length + key.length);
	crcbuf.set(unm);
	crcbuf.set(key, unm.length);
	crcbuf = crcMiiBuf(crcbuf, authorid);

	var new_mii = new Uint8Array(crcbuf.length + 4);
	new_mii.set(crcbuf);

	var new_mii_as_words = c8to32(new_mii);

	var ipc = sc.ipcMsg(13);
	ipc.datau32.apply(ipc, new_mii_as_words);
	ipc.sendTo(hnd).assertOk();
}