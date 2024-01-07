function onbaseLayerload() {
            /**
             * baselayerload event, fired when base layer is loaded.
             *
             * @event Map#baselayerload
             * @type {Object}
             * @property {String} type - baselayerload
             * @property {Map} target - map
             */
            this._fireEvent('baselayerload');
            if (isChange) {
                isChange = false;
                this._fireEvent('baselayerchangeend');
            }
        }