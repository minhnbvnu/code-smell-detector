function onHandleDragstart(param) {
            this._updating = true;
            if (opts.onDown) {
                opts.onDown.call(me, param['containerPoint'], param);
                /**
                 * change geometry shape start event, fired when drag to change geometry shape.
                 *
                 * @event Geometry#handledragstart
                 * @type {Object}
                 * @property {String} type - handledragstart
                 * @property {Geometry} target - the geometry fires the event
                 */
                this._geometry.fire('handledragstart');
            }
            return false;
        }