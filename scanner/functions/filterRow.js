function filterRow(row) {
        var dwType = row.dwType;
        var dwOperStatus = row.dwOperStatus;
        return ((dwType == MIB_IF_TYPE_ETHERNET || dwType == MIB_IF_TYPE_PPP || dwType == MIB_IF_TYPE_FDDI || dwType == IF_TYPE_IEEE80211) && (dwOperStatus == IF_OPER_STATUS_OPERATIONAL || dwOperStatus == IF_OPER_STATUS_CONNECTED) && (row.dwInOctets > 0 && row.dwOutOctets > 0));
      }