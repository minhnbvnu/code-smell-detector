function _updateLiveList(list){
	var inc = list._node._inc || list._node.ownerDocument._inc;
	if(list._inc != inc){
		var ls = list._refresh(list._node);
		__set__(list,'length',ls.length);
		copy(ls,list);
		list._inc = inc;
	}
}