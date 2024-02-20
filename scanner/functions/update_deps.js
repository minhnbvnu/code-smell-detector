function update_deps(my_tags) {
        if (!loading) {
		var oid = subscription_id;
        	var itype = subscription_type;
        	var data = {
           		'id': oid,
           		'data_type_dependency': my_tags.toString(),
           		'type': itype
        	};

        	$.ajax({
            		type: "POST",
               		url: update_dependency,
                	data: data,
                 	datatype: 'json',
                 	success: function(data) {
                    		// console.log(my_tags);
                 	}
          	});
	}
     }