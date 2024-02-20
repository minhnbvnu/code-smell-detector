function addOptgroup (index, selectOptions) {
        var optgroup = selectOptions[index],
            // skip placeholder option
            previous = index - 1 < startIndex ? false : selectOptions[index - 1],
            next = selectOptions[index + 1],
            options = optgroup.querySelectorAll('option' + optionSelector);

        if (!options.length) return;

        var config = {
              display: htmlEscape(optgroup.label),
              subtext: optgroup.getAttribute('data-subtext'),
              icon: optgroup.getAttribute('data-icon'),
              type: 'optgroup-label',
              optgroupClass: ' ' + (optgroup.className || '')
            },
            headerIndex,
            lastIndex;

        optID++;

        if (previous) {
          addDivider({ optID: optID });
        }

        config.optID = optID;

        mainData.push(config);

        for (var j = 0, len = options.length; j < len; j++) {
          var option = options[j];

          if (j === 0) {
            headerIndex = mainData.length - 1;
            lastIndex = headerIndex + len;
          }

          addOption(option, {
            headerIndex: headerIndex,
            lastIndex: lastIndex,
            optID: config.optID,
            optgroupClass: config.optgroupClass,
            disabled: optgroup.disabled
          });
        }

        if (next) {
          addDivider({ optID: optID });
        }
      }