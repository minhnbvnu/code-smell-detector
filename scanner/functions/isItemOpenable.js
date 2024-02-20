function isItemOpenable(event) {
            // selecting with Ctrl key
            if(config.manager.selection.enabled && config.manager.selection.useCtrlKey && event.ctrlKey === true) {
                return false;
            }

            // single clicked while expected dblclick
            if(config.manager.dblClickOpen && event.type === 'click') {
                return false;
            }

            return true;
        }