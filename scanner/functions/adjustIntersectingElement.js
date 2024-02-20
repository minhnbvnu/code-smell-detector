function adjustIntersectingElement(element, changeStart, changeRangeOldEnd, changeRangeNewEnd, delta) {
                        Debug.assert(element.end >= changeStart, "Adjusting an element that was entirely before the change range");
                        Debug.assert(element.pos <= changeRangeOldEnd, "Adjusting an element that was entirely after the change range");
                        Debug.assert(element.pos <= element.end);
                        const pos = Math.min(element.pos, changeRangeNewEnd);
                        const end = element.end >= changeRangeOldEnd ? (
                        // Element ends after the change range.  Always adjust the end pos.
                        element.end + delta) : (
                        // Element ends in the change range.  The element will keep its position if
                        // possible. Or Move backward to the new-end if it's in the 'Y' range.
                        Math.min(element.end, changeRangeNewEnd));
                        Debug.assert(pos <= end);
                        if (element.parent) {
                            Debug.assertGreaterThanOrEqual(pos, element.parent.pos);
                            Debug.assertLessThanOrEqual(end, element.parent.end);
                        }
                        setTextRangePosEnd(element, pos, end);
                    }