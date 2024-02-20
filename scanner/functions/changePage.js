function changePage(doc,htmlContent,isHTML){
	if(isHTML){
		doc.html(htmlContent);
	}else{
		doc.text(htmlContent);
	}
}