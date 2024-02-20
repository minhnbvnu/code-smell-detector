function getIsLateCheckFlag(s) {
                return getCheckFlags(s) & 4096 /* Late */;
            }