function GetCount(hnd)
{
	ret = sc.ipcMsg(2).datau32(1).sendTo(hnd).assertOk().data[0];
//	utils.log("mii count is " + ret.toString());
	return ret;
}