function hasCommentsAtPosition(pos) {
                return hasTrailingCommentsAtPosition(pos) || hasLeadingCommentsAtPosition(pos);
            }