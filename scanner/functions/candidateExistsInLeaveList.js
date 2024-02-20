function candidateExistsInLeaveList(leavelist, candidate) {
        for (var i = leavelist.length - 1; i >= 0; --i) {
            if (leavelist[i].node === candidate) {
                return true;
            }
        }
        return false;
    }