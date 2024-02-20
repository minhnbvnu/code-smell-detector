function sendhooks() {
	var fullclazzname = zTree.getSelectedNodes()[0].fullclassname;
	var matchtext = Hooksinfo.getValue();
   if (matchtext){
   		Hooksinfo.setValue(matchtext + '\n' + fullclazzname);
    }else {
   		Hooksinfo.setValue(fullclazzname);
    }

}