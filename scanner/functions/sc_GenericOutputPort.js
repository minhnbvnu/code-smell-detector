function sc_GenericOutputPort(appendJSString, close) {
    this.appendJSString = appendJSString;
    if (close)
	this.close = close;
}