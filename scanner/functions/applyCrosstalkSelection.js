function applyCrosstalkSelection(e) {
        if (e.sender !== instance.ctselectHandle) {
          table
            .rows('.' + selClass, {search: 'applied'})
            .nodes()
            .to$()
            .removeClass(selClass);
          if (selectedRows)
            changeInput('rows_selected', selectedRows(), void 0, true);
        }

        if (e.sender !== instance.ctselectHandle && e.value && e.value.length) {
          var matches = keysToMatches(e.value);

          // persistent selection with plotly (& leaflet)
          var ctOpts = crosstalk.var("plotlyCrosstalkOpts").get() || {};
          if (ctOpts.persistent === true) {
            var matches = $.extend(matches, $table[0].ctselect);
          }

          $table[0].ctselect = matches;
          table.draw();
        } else {
          if ($table[0].ctselect) {
            $table[0].ctselect = null;
            table.draw();
          }
        }
      }