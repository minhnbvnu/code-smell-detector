function updateEthernet() {
        var updateTime = Date.now();
        if (updateTime - ethernetUpdateTime < 500) {
          return;
        } else {
          ethernetUpdateTime = updateTime;
        }

        fnGetIfTable(iftable.address(), numEntries.address(), 1);
        var count = 0;
        for (var i = 0; i < iftable.dwNumEntries; ++i) {
          var row = iftable.table[i];
          if (filterRow(row)) {++count;
          }
        }

        // reset entries
        if (count != ethernetEntry.length) {
          ethernetEntry = [];
          ethernetTick = 0;
          for (var i = 0; i < count; ++i) {
            ethernetEntry.push({
              in_octets: 0,
              out_octets: 0,
              in_speed: 0,
              out_speed: 0
            });
          }
        }

        count = 0;
        var tick = updateTime;
        var t = tick - ethernetTick;
        if (t <= 0) {
          t = 1;
        }
        for (var i = 0,
        j = 0; i < iftable.dwNumEntries; ++i) {
          var row = iftable.table[i];
          if (!filterRow(row)) {
            continue;
          }

          var entry = ethernetEntry[j];
          if (ethernetTick > 0) {
            entry.in_speed = Math.floor((row.dwInOctets - entry.in_octets) * 1000 / t);
            entry.out_speed = Math.floor((row.dwOutOctets - entry.out_octets) * 1000 / t);
          }

          entry.in_octets = row.dwInOctets;
          entry.out_octets = row.dwOutOctets;
          if (entry.name === undefined) {
            entry.name = '';
            let n = row.dwDescrLen;
            if (n > 1) {--n;
            }
            if (n > 0) {
              let bDesc = new ctypes.ArrayType(ctypes.unsigned_char)(n);
              for (let k = 0; k < n; ++k) {
                bDesc[k] = row.bDescr[k];
              }
              let Name = new ctypes.ArrayType(ctypes.jschar)(n * 2);
              let len = fnMultiByteToWideChar(0, 0, bDesc, n, Name, n * 2);
              for (let k = 0; k < len; ++k) {
                entry.name += Name[k];
              }
            }
          }

          ++j;
          if (j == count) {
            break;
          }
        }
        ethernetTick = tick;
      }