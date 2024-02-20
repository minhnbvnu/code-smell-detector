function addOkListener() {
	dialog.onok = function() {
		if (!imageUrls.length) return;
		var urlPrefix = editor.getOpt('imageUrlPrefix'),
            images = domUtils.getElementsByTagName(editor.document,"img");
        editor.fireEvent('saveScene');
		for (var i = 0,img; img = images[i++];) {
			var src = img.getAttribute("word_img");
			if (!src) continue;
			for (var j = 0,url; url = imageUrls[j++];) {
				if (src.indexOf(url.original.replace(" ","")) != -1) {
					img.src = urlPrefix + url.url;
					img.setAttribute("_src", urlPrefix + url.url);  //同时修改"_src"属性
					img.setAttribute("title",url.title);
                    domUtils.removeAttributes(img, ["word_img","style","width","height"]);
					editor.fireEvent("selectionchange");
					break;
				}
			}
		}
        editor.fireEvent('saveScene');
        hideFlash();
	};
    dialog.oncancel = function(){
        hideFlash();
    }
}