function LiveNodeList(node,refresh){
	this._node = node;
	this._refresh = refresh;
	_updateLiveList(this);
}