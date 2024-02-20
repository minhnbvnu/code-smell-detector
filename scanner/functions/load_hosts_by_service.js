function load_hosts_by_service(name,bolean) {
		design = "hosts";
		var services 	= get_obj_filter(workspace, "services", "byname", name);
		var hids 	= [];
		$.each(services, function(k, v) {
			v = v['value'];
			if($.inArray(v['hid'], hids) < 0) {
				hids.push(v['hid']);
			}
		});
		var hosts 	= get_obj_filter(workspace, "hosts", "hosts", hids);
		var iurl	= "/" + workspace + "/_design/" + design + "/_view/byinterfacecount?group=true";
		var interfaces	= new Object();
		var surl	= "/" + workspace + "/_design/" + design + "/_view/byservicecount?group=true";
		var scount	= new Object();

		interfaces	= get_obj(iurl, interfaces);
		scount		= get_obj(surl, services);
		if(!bolean){
		var table = "<h2>Hosts with Service "+name+" ("+hids.length+" total)</h2>"+
				"<table id=\"hosts-"+workspace+"\" class=\"tablesorter\"><thead><tr>"+
				"<th>Host</th>"+
				"<th>Services</th>"+
				"<th>Interfaces</th>"+
				"<th>OS</th>"+
				"<th>Owned</th>"+
				"</tr></thead><tbody>";
		$.each(hosts, function(k, v){
			var id = v['id'];
			v = v['value'];
			if($.inArray(id, hids) > -1) {
				table += "<tr id=\"host-"+id+"\">"+
					"<td><a href=\"host-"+id+"\" class=\"host\">"+v['name']+"</a></td>"+
					"<td>"+scount[id]+"</td>"+
					"<td>"+interfaces[id]+"</td>"+
					"<td>"+v['os']+"</td>"+
					"<td>"+v['owned']+"</td></tr>";
			}
		});
		table += "</tbody></table></div>";
		}else{
			var table = "<table><tbody>"; 
			$.each(hosts, function(k, v){
			var id = v['id'];
			v = v['value'];
			if($.inArray(id, hids) > -1) {
				table += "<tr id=\"host-"+id+"\">"+
					"<td><p>"+v['name']+"</p></td></tr>";
			}
		});
		table += "</tbody></table>";
		}
		return table;
	}