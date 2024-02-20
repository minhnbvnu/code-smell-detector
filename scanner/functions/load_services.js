function load_services(hid, hname) {
		design = "hosts";
		// el param design ya no es el recibido por GET, puesto que ahora estamos en services
		var services = get_obj_filter(workspace, "services", "byhost", hid);
		var table = "<h2>Services for Host "+hname+" ("+services.length+" total)</h2>"+
			"<table id=\"services-"+workspace+"\" class=\"tablesorter\"><thead><tr>"+
			"<th>Name</th>"+
			"<th>Description</th>"+
			"<th>Owned</th>"+
			"<th>Ports</th>"+
			"<th>Protocol</th>"+
			"<th>Status</th></tr></thead><tbody>";
		$.each(services, function(k, v){
				var sid = v['id'];
				v = v['value'];
				var desc = (v['description'] === "") ? "n/a" : v['description'];
				var ports = "";
				if(v['ports'].length === 0) {
					ports = "no ports available";
				} else {
					for(i=0; i < v['ports'].length; i++){
						ports += v['ports'][i];
						if(v['ports'].length != 1 && i != (v['ports'].length-1)) {
							ports += ", ";
						}
					}
				}
				table += "<tr id=\"service-"+sid+"\">"+
					"<td><a href=\"service-"+sid+"\" class=\"service\">"+v['name']+"</a></td>"+
					"<td>"+desc+"</td>"+
					"<td>"+v['owned']+"</td>"+
					"<td>"+ports+"</td>"+
					"<td>"+v['protocol']+"</td>"+
					"<td>"+v['status']+"</td></tr>";
		});
		table += "</tbody></table></div>";
		return table;
	}