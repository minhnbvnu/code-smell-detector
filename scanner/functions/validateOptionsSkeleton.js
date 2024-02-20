function validateOptionsSkeleton( pattern, skeleton ) {
	validate(
		"E_INVALID_OPTIONS",
		"Invalid `{skeleton: \"{value}\"}` based on provided CLDR.",
		skeleton === undefined || ( typeof pattern === "string" && pattern ),
		{ type: "skeleton", value: skeleton }
	);
}