function Move(hnd, key, pos)
{
	var data = new Uint32Array(key.length / 4 + 1);
	data.set(c8to32(key));
	data[data.length - 1] = pos;
	var ipc = sc.ipcMsg(12);
	ipc.datau32.apply(ipc, data);
	ipc.sendTo(hnd).assertOk();
}