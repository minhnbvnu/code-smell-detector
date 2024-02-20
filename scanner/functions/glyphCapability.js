function glyphCapability(entries, opt) {
	var self = {
		__TYPE__ : CapsType.CAPSTYPE_GLYPHCACHE,
		glyphCache : entries || new type.Factory(function(s) {
			self.glyphCache = new type.Component([]);
			for(var i = 0; i < 10; i++) {
				self.glyphCache.obj.push(cacheEntry().read(s));
			}
		}),
        fragCache : new type.UInt32Le(),
        // all fonts are sent with bitmap format (very expensive)
        glyphSupportLevel : new type.UInt16Le(GlyphSupport.GLYPH_SUPPORT_NONE),
        pad2octets : new type.UInt16Le()
	};
	
	return new type.Component(self, opt);
}