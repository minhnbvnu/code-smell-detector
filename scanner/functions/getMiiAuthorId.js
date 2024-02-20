function getMiiAuthorId()
{
	return c32to8(sc.ipcMsg(90).sendTo('set:sys').assertOk().data);
}