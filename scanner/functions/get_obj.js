function get_obj(ourl) {
		var ls = {};
		$.ajax({
			dataType: "json",
			url: ourl,
			async: false,
			success: function(data) {
				$.each(data.rows, function(n, obj){
					ls[obj.key] = obj.value;
				});	
			}
		});
		return ls;
	}