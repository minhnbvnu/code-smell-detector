function fixDefinition(def) {
	def = def || {};
	def = _.defaults(def, {
		parents: [],
		children: []
	});
	return def;
}