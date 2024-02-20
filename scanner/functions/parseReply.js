function parseReply(err, ret) {
	if(err) addMsg(ret);
	else if(ret.cmds) updateCmds(ret.cmds);
}