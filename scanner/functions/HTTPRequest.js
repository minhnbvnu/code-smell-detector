function HTTPRequest(doc,urladdress,isHTML){
	$.ajax({
		type: "GET",
		dataType: "html",
		url: urladdress,
		success: function (result) {
			changePage(doc,result,isHTML);
		},
		error: function() {
			alert("Error!");
		}
	});
}