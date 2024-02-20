function getTouches(ev, type) {
            var allTouches = toArray(ev.touches);
            var targetIds = this.targetIds;
            // when there is only one touch, the process can be simplified
            if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
                targetIds[allTouches[0].identifier] = true;
                return [allTouches, allTouches];
            }
            var i, targetTouches, changedTouches = toArray(ev.changedTouches), changedTargetTouches = [], target = this.target;
            // get target touches from touches
            targetTouches = allTouches.filter(function (touch) {
                return hasParent(touch.target, target);
            });
            // collect touches
            if (type === INPUT_START) {
                i = 0;
                while (i < targetTouches.length) {
                    targetIds[targetTouches[i].identifier] = true;
                    i++;
                }
            }
            // filter changed touches to only contain touches that exist in the collected target ids
            i = 0;
            while (i < changedTouches.length) {
                if (targetIds[changedTouches[i].identifier]) {
                    changedTargetTouches.push(changedTouches[i]);
                }
                // cleanup removed touches
                if (type & (INPUT_END | INPUT_CANCEL)) {
                    delete targetIds[changedTouches[i].identifier];
                }
                i++;
            }
            if (!changedTargetTouches.length) {
                return;
            }
            return [
                // merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
                uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true),
                changedTargetTouches
            ];
        }