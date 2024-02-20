function back_to_services(hid,hname){
		$(document).on('click', 'a#back_to_services', function(e) {
			var div = load_services(hid, hname);
			$("#hosts").html(div);
            // sacamos la tabla de hosts y agregamos un link de navegacion para volverla a cargar
            $("#hosts").prepend("<p><a href=\"load_all_hosts\">View all hosts</a> - <a id='back_to_host'>Back</a></p>");
		});
	}