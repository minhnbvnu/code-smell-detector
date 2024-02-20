function getContextMenuItems(resourceObject) {
        var clipboardDisabled = !fmModel.clipboardModel.enabled(),
            contextMenuItems = {
                select: {name: lg('action_select'), className: 'select'},
                download: {name: lg('action_download'), className: 'download'},
                rename: {name: lg('action_rename'), className: 'rename'},
                move: {name: lg('action_move'), className: 'move'},
                separator1: '-----',
                copy: {name: lg('clipboard_copy'), className: 'copy'},
                cut: {name: lg('clipboard_cut'), className: 'cut'},
                delete: {name: lg('action_delete'), className: 'delete'},
                extract: {name: lg('action_extract'), className: 'extract'},
                copyUrl: {name: lg('copy_to_clipboard'), className: 'copy-url'}
            };

		if(!isObjectCapable(resourceObject, 'download')) delete contextMenuItems.download;
        if(!isObjectCapable(resourceObject, 'select') || !hasContext()) delete contextMenuItems.select;
        if(!isObjectCapable(resourceObject, 'rename') || config.options.browseOnly === true) delete contextMenuItems.rename;
		if(!isObjectCapable(resourceObject, 'delete') || config.options.browseOnly === true) delete contextMenuItems.delete;
		if(!isObjectCapable(resourceObject, 'extract') || config.options.browseOnly === true) delete contextMenuItems.extract;
		if(!isObjectCapable(resourceObject, 'copy') || config.options.browseOnly === true || clipboardDisabled) delete contextMenuItems.copy;
		if(!isObjectCapable(resourceObject, 'move') || config.options.browseOnly === true || clipboardDisabled) {
            delete contextMenuItems.cut;
            delete contextMenuItems.move;
		}

		return contextMenuItems
	}