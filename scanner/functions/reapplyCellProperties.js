function reapplyCellProperties(value) {
    if (!warned.reapplyCellProperties) {
        console.warn('The `.reapplyCellProperties` property has been deprecated as of v2.1.3 in favor of using the new `.propClassLayers` property. (May be removed in a future release.) This property is now a setter which sets `.propClassLayers` to `.propClassLayersMap.DEFAULT` (grid ← columns ← stripes ← rows ← cells) on truthy or `propClassLayersMap.NO_ROWS` (grid ← columns ← cells) on falsy, which is what you will see on properties stringification. This will give the same effect in most cases as the former property implementation, but not in all cases due to it no longer being applied dynamically. Developers should discontinue use of this property and start specifying `.propClassLayers` instead.');
        warned.reapplyCellProperties = true;
    }
    this.propClassLayers = value ? propClassLayersMap.NO_ROWS : propClassLayersMap.DEFAULT;
}