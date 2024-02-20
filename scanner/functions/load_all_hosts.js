function load_all_hosts(design) {
		design = "hosts";
		var iurl	= "/" + workspace + "/_design/" + design + "/_view/byinterfacecount?group=true";
		var hurl	= "/" + workspace + "/_design/" + design + "/_view/hosts";
		var surl	= "/" + workspace + "/_design/" + design + "/_view/byservicecount?group=true";
		var hosts	= new Object();
		var interfaces	= new Object();
		var services	= new Object();
		
		hosts		= get_obj(hurl);
		interfaces	= get_obj(iurl, interfaces);
		services	= get_obj(surl, services);
		var table = "<div class='seccion2'><h2>Hosts report</h2>";
		table += "<table id=\"hosts-"+workspace+"\" class=\"tablesorter\"><thead><tr>"+
				"<th>Host</th>"+
				"<th>Services</th>"+
				"<th>Interfaces</th>"+
				"<th>OS</th>"+
				"<th>Owned</th>"+
				"</tr></thead><tbody>";
		$.each(hosts, function(k, v){
			var hname = "";
			if(!services.hasOwnProperty(k)) {
				services[k] = 0;
				hname = v.name;
			} else {
				hname = "<a href=\"host-"+k+"\" class=\"host\">"+v.name+"</a>";
			}
			if(!interfaces.hasOwnProperty(k)) interfaces[k] = 0;
			table += "<tr id=\"host-"+k+"\">"+
				"<td>"+hname+"</td>"+
				"<td>"+services[k]+"</td>"+
				"<td>"+interfaces[k]+"</td>"+
				"<td>"+v.os+"</td>"+
				"<td>"+v.owned+"</td></tr>";
		});
		table += "</tbody></table></div>";
		return table;
	}