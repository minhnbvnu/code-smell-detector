function parseSignUpReply(err,ret){
	parseReply(err,ret);
	if(! err) {
		addMsg(_T('account created:') + ret.uid + '/' + ret.passwd);
		login(ret.uid, ret.passwd);
	}
}