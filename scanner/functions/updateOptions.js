function updateOptions() {

        var previousValue = options && selectCtrl.readValue();

        options = ngOptions.getOptions();

        var groupMap = {};
        var currentElement = selectElement[0].firstChild;

        // Ensure that the empty option is always there if it was explicitly provided
        if (providedEmptyOption) {
          selectElement.prepend(emptyOption);
        }

        currentElement = skipEmptyAndUnknownOptions(currentElement);

        options.items.forEach(function updateOption(option) {
          var group;
          var groupElement;
          var optionElement;

          if (isDefined(option.group)) {

            // This option is to live in a group
            // See if we have already created this group
            group = groupMap[option.group];

            if (!group) {

              // We have not already created this group
              groupElement = addOrReuseElement(selectElement[0],
                                               currentElement,
                                               'optgroup',
                                               optGroupTemplate);
              // Move to the next element
              currentElement = groupElement.nextSibling;

              // Update the label on the group element
              groupElement.label = option.group;

              // Store it for use later
              group = groupMap[option.group] = {
                groupElement: groupElement,
                currentOptionElement: groupElement.firstChild
              };

            }

            // So now we have a group for this option we add the option to the group
            optionElement = addOrReuseElement(group.groupElement,
                                              group.currentOptionElement,
                                              'option',
                                              optionTemplate);
            updateOptionElement(option, optionElement);
            // Move to the next element
            group.currentOptionElement = optionElement.nextSibling;

          } else {

            // This option is not in a group
            optionElement = addOrReuseElement(selectElement[0],
                                              currentElement,
                                              'option',
                                              optionTemplate);
            updateOptionElement(option, optionElement);
            // Move to the next element
            currentElement = optionElement.nextSibling;
          }
        });


        // Now remove all excess options and group
        Object.keys(groupMap).forEach(function(key) {
          removeExcessElements(groupMap[key].currentOptionElement);
        });
        removeExcessElements(currentElement);

        ngModelCtrl.$render();

        // Check to see if the value has changed due to the update to the options
        if (!ngModelCtrl.$isEmpty(previousValue)) {
          var nextValue = selectCtrl.readValue();
          var isNotPrimitive = ngOptions.trackBy || multiple;
          if (isNotPrimitive ? !equals(previousValue, nextValue) : previousValue !== nextValue) {
            ngModelCtrl.$setViewValue(nextValue);
            ngModelCtrl.$render();
          }
        }

      }