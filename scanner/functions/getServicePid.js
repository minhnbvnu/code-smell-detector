function getServicePid(service)
{
	var res = sc.ipcMsg(2).setType(3).datau64(0).sendTo(service).assertOk();
	sc.svcCloseHandle(res.movedHandles[0]);
	return res.pid[0];
}