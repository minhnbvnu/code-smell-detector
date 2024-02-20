function _isInsideParent(_el, pos) {
            var p = _findParent(_el),
                s = _jsPlumb.getSize(p),
                ss = _jsPlumb.getSize(_el),
                leftEdge = pos[0],
                rightEdge = leftEdge + ss[0],
                topEdge = pos[1],
                bottomEdge = topEdge + ss[1];

            return rightEdge > 0 && leftEdge < s[0] && bottomEdge > 0 && topEdge < s[1];
        }