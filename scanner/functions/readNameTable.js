function readNameTable(nameTable) {
        var start = (font.start ? font.start : 0) + nameTable.offset;
        font.pos = start;
        var names = [[], []];
        var length = nameTable.length,
            end = start + length;
        var format = font.getUint16();
        var FORMAT_0_HEADER_LENGTH = 6;

        if (format !== 0 || length < FORMAT_0_HEADER_LENGTH) {
          return names;
        }

        var numRecords = font.getUint16();
        var stringsStart = font.getUint16();
        var records = [];
        var NAME_RECORD_LENGTH = 12;
        var i, ii;

        for (i = 0; i < numRecords && font.pos + NAME_RECORD_LENGTH <= end; i++) {
          var r = {
            platform: font.getUint16(),
            encoding: font.getUint16(),
            language: font.getUint16(),
            name: font.getUint16(),
            length: font.getUint16(),
            offset: font.getUint16()
          };

          if (r.platform === 1 && r.encoding === 0 && r.language === 0 || r.platform === 3 && r.encoding === 1 && r.language === 0x409) {
            records.push(r);
          }
        }

        for (i = 0, ii = records.length; i < ii; i++) {
          var record = records[i];

          if (record.length <= 0) {
            continue;
          }

          var pos = start + stringsStart + record.offset;

          if (pos + record.length > end) {
            continue;
          }

          font.pos = pos;
          var nameIndex = record.name;

          if (record.encoding) {
            var str = "";

            for (var j = 0, jj = record.length; j < jj; j += 2) {
              str += String.fromCharCode(font.getUint16());
            }

            names[1][nameIndex] = str;
          } else {
            names[0][nameIndex] = (0, _util.bytesToString)(font.getBytes(record.length));
          }
        }

        return names;
      }