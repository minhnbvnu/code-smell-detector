function reset_selected_colors(){
	selected_colors = {
		foreground: "#000000",
		background: "#ffffff",
		ternary: "",
	};
	$G.trigger("option-changed");
}