function WXPay() {
	
	if (!(this instanceof WXPay)) {
		return new WXPay(arguments[0]);
	};

	this.options = arguments[0];
	this.wxpayID = { appid:this.options.appid, mch_id:this.options.mch_id };
}