function ProxyErrorListener(delegates) {
	ErrorListener.call(this);
    if (delegates===null) {
        throw "delegates";
    }
    this.delegates = delegates;
	return this;
}