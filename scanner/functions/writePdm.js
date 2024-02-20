function writePdm(payload)
{
//	var data = payload.buffer;
//	utils.hexdump("dat", data);
	sc.ipcMsg(4).sendTo('pdm:ntfy').assertOk();
//	sc.ipcMsg(5).aDescriptor(data, data.byteLength, 0).sendTo('pdm:ntfy').assertOk();
	sc.ipcMsg(5).aDescriptor(payload, payload.length, 0).sendTo('pdm:ntfy').assertOk();
}