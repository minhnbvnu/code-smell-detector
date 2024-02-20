function isDenylisted() {
  var _this$opts$denylist;

  const denylist = (_this$opts$denylist = this.opts.denylist) != null ? _this$opts$denylist : this.opts.blacklist;
  return denylist && denylist.indexOf(this.node.type) > -1;
}