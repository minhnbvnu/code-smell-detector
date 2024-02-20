function applyCrosstalkFilter(e) {
        $table[0].ctfilter = keysToMatches(e.value);
        table.draw();
      }