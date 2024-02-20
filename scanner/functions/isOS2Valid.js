function isOS2Valid(os2Table) {
        var data = os2Table.data;
        // usWinAscent == 0 makes font unreadable by windows
        var usWinAscent = (data[74] << 8) | data[75];
        if (usWinAscent == 0)
          return false;

        return true;
      }