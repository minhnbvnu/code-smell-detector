function isObjectCapable(resourceObject, capability) {
        if (!hasCapability(capability)) return false;
        if (capability === 'select' && resourceObject.type === 'folder') return false;
        if (capability === 'extract') {
            var extension = getExtension(resourceObject.attributes.name);
            return (resourceObject.type === 'file' && extension === 'zip');
        }
        if (capability === 'download' && resourceObject.type === 'folder') {
            return (config.options.allowFolderDownload === true);
        }
        if (typeof(resourceObject.attributes.capabilities) !== 'undefined') {
            return $.inArray(capability, resourceObject.attributes.capabilities) > -1
        }
        return true;
    }