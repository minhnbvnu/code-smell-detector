function onHandleDragging(param) {
            me._hideContext();
            if (opts.onMove) {
                opts.onMove.call(me, param);
                /**
                 * changing geometry shape event, fired when dragging to change geometry shape.
                 *
                 * @event Geometry#handledragging
                 * @type {Object}
                 * @property {String} type - handledragging
                 * @property {Geometry} target - the geometry fires the event
                 */
                this._geometry.fire('handledragging');
            }
            return false;
        }