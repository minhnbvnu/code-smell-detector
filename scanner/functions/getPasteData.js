function getPasteData(id) {
	baidu.g("msg").innerHTML = lang.copySuccess + "</br>";
	setTimeout(function() {
		baidu.g("msg").innerHTML = "";
	}, 5000);
	return baidu.g(id).value;
}