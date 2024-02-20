function AjaxBasedTransport(transUrl, urlSuffix, Receiver, AjaxObject) {
	  SenderReceiver.call(this, transUrl, urlSuffix, createAjaxSender(AjaxObject), Receiver, AjaxObject);
	}