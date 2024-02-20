function _stripLeadingZeros(str) {
            return str.replace(/^0*(.*)/, "$1") || "0";
        }