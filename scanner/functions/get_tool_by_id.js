function get_tool_by_id(id){
	for(let i=0; i<tools.length; i++){
		if(tools[i].id == id){
			return tools[i];
		}
	}
	for(let i=0; i<extra_tools.length; i++){
		if(extra_tools[i].id == id){
			return extra_tools[i];
		}
	}
}