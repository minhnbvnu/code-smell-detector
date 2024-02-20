function js_encrypt(payload){
	var newpayload;
	/**********在这里编写调用加密函数进行加密的代码************/
	newpayload =  CryptoJS.SHA512(payload);
	/**********************************************************/
	return newpayload;
}