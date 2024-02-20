function DiagnosticErrorListener(exactOnly) {
	ErrorListener.call(this);
	exactOnly = exactOnly || true;
	// whether all ambiguities or only exact ambiguities are reported.
	this.exactOnly = exactOnly;
	return this;
}