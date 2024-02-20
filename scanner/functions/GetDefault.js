function GetDefault(hnd, offset)
{
	ret = sc.ipcMsg(7).datau32(offset).sendTo(hnd).assertOk();
	return ret.data;
}