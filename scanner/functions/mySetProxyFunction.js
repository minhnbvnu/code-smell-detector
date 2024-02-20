function mySetProxyFunction (data) {
	var csInterface = new CSInterface();
	csInterface.evalScript('$._PPP_.getActiveSequenceName()', myCallBackFunction);
	csInterface.evalScript('$._PPP_.getSequenceProxySetting()', myGetProxyFunction);
}