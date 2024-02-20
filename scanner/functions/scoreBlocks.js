function scoreBlocks(possibles, blocks, x, y, filled, width, height) {
        var i, len=blocks.length, score=0, bottoms = {}, tx, ty, overlaps;

        // base score
        for (i=0; i<len; i+=2) {
          score += possibles[game._filled.asIndex(x + blocks[i], y + blocks[i+1])] || 0;
        }

        // overlap score -- //TODO - don't count overlaps if cleared?
        for (i=0; i<len; i+=2) {
          tx = blocks[i];
          ty = blocks[i+1];
          if (bottoms[tx] === undefined || bottoms[tx] < ty) {
            bottoms[tx] = ty;
          }
        }
        overlaps = 0;
        for (tx in bottoms) {
          tx = parseInt(tx);
          for (ty=bottoms[tx]+1, i=0; y+ty<height; ty++, i++) {
            if (!game._filled.check(x + tx, y + ty)) {
              overlaps += i == 0 ? 2 : 1; //TODO-score better
              //if (i == 0) overlaps += 1;
              break;
            }
          }
        }

        score = score - overlaps;

        return score;
      }