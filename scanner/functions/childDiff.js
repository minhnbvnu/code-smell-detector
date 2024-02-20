function childDiff(c1, c2) {
        var relocations = [],
            insertions = [],
            removals = [];

        var c, last=c1.length, child, hash, positions, pos;
        for(c=0; c<last; c++) {
          child = c1[c];
          positions = getPositions(c2, child);

          if(positions.length===0) continue;

          if(positions.length>1) continue;

          pos = positions[0];
          if(c!==pos && getPositions(c1, child).length <= 1) {
            relocations.push(c2[pos]);
            child["marked"] = true;
            c2[pos]["marked"] = true;
          }

          else if(c===pos) {
            child["marked"] = true;
            c2[pos]["marked"] = true;
          }
        }

        last = c2.length;
        for(c=0; c<last; c++) {
          child = c2[c];
          if(!child["marked"]) {
            removals.push(child);
          }
        }
        
        last = c1.length;
        for(c=0; c<last; c++) {
          child = c1[c];
          if(!child["marked"]) {
            insertions.push(child);
          }
        }

        var localdiff = {
          c1: util.snapshot(c1),
          c2: util.snapshot(c2),
          relocations: relocations,
          insertions: insertions,
          removals: removals
        };
        return localdiff;
      }