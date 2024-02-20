function onClickButton(ppid) {
	var extScript = "$._ext_" + ppid + ".run()";
	evalScript(extScript);
}