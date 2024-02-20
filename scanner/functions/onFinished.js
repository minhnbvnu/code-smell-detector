function onFinished(success) {
            if (success) {
                log.info('Settings import finished successfully');
            } else {
                log.error('Error importing settings');
            }

            listeners.notifyListeners(events.SETTINGS_UPDATED, { success });
        }