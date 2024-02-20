function rowPropertiesDeprecationWarning() {
    if (!warned.rowProperties) {
        warned.rowProperties = true;
        console.warn('The `rowProperties` property has been deprecated as of v2.1.0 in favor of `rowStripes`. (Will be removed in a future release.)');
    }
}