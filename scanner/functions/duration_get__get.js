function duration_get__get (units) {
          units = normalizeUnits(units);
          return this[units + 's']();
      }