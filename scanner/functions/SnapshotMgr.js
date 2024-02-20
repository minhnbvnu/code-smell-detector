function SnapshotMgr(pubname, capacity){
	this.pubname = pubname;
	this.capacity = capacity;
	this.snapshot = [];
	this.versionMap = [];
}