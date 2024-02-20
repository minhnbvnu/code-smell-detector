function searchengines(url,doc){
	doc.html("");
	var v = url;
	var i = 0;
	var x = "";
	var hack = new Array(
		"https://www.google.com/search?q=site:" + v,
		"https://www.baidu.com/s?ie=utf-8&wd=site:" + v,
		"https://www.so.com/s?ie=utf-8&q=site:" + v,
		"http://www.sogou.com/tx?ie=utf8&query=site:" + v,
		"https://cn.bing.com/search?q=site:" + v
	)
	var txt = new Array(
		"Google",
		"Baidu",
		"360So",
		"Sogou",
		"CNBing"
	)

	while (i<hack.length)
	{
		doc.append("<br><br><a href='" + hack[i] + "' target='__blank'>" + txt[i] + "</a>");
		i++;
	}
	//alert(doc.html());
}