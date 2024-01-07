function onHandleDragEnd(ev) {
            if (opts.onUp) {
                //run mouseup code for handle delete etc
                opts.onUp.call(me, ev);
                /**
                 * changed geometry shape event, fired when drag end to change geometry shape.
                 *
                 * @event Geometry#handledragend
                 * @type {Object}
                 * @property {String} type - handledragend
                 * @property {Geometry} target - the geometry fires the event
                 */
                this._geometry.fire('handledragend');
            }
            this._updating = false;
            return false;
        }