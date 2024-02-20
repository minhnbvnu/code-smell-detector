function Delete(hnd, key)
{
	var data = c8to32(key);
	var ipc = sc.ipcMsg(14);
	ipc.datau32.apply(ipc, data);
	ipc.sendTo(hnd).assertOk();
}