function delete_selection(meta={}){
	if(selection){
		undoable({
			name: meta.name || localize("Clear Selection"), //"Delete", (I feel like "Clear Selection" is unclear, could mean "Deselect")
			icon: meta.icon || get_help_folder_icon("p_delete.png"),
			// soft: @TODO: conditionally soft?,
		}, ()=> {
			selection.destroy();
			selection = null;
		});
	}
}