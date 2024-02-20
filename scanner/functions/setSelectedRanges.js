function setSelectedRanges(ranges) {
            // simple check for: empty selection didn't change, prevent firing onSelectedRangesChanged
            if ((!_ranges || _ranges.length === 0) && (!ranges || ranges.length === 0)) {
                return;
            }
            _ranges = ranges;
            _self.onSelectedRangesChanged.notify(_ranges);
        }