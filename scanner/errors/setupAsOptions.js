        function render() {
          renderScheduled = false;

          // Temporary location for the option groups before we render them
          var optionGroups = {'':[]},
              optionGroupNames = [''],
              optionGroupName,
              optionGroup,
              option,
              existingParent, existingOptions, existingOption,
              viewValue = ctrl.$viewValue,
              values = valuesFn(scope) || [],
              keys = keyName ? sortedKeys(values) : values,
              key,
              value,
              groupLength, length,
              groupIndex, index,
              labelMap = {},
              selected,
              isSelected = createIsSelectedFn(viewValue),
              anySelected = false,
              lastElement,
              element,
              label,
              optionId;

          trackKeysCache = {};

          // We now build up the list of options we need (we merge later)
          for (index = 0; length = keys.length, index < length; index++) {
            key = index;
            if (keyName) {
              key = keys[index];
              if (key.charAt(0) === '$') continue;
            }
            value = values[key];

            optionGroupName = callExpression(groupByFn, key, value) || '';
            if (!(optionGroup = optionGroups[optionGroupName])) {
              optionGroup = optionGroups[optionGroupName] = [];
              optionGroupNames.push(optionGroupName);
            }

            selected = isSelected(key, value);
            anySelected = anySelected || selected;

            label = callExpression(displayFn, key, value); // what will be seen by the user

            // doing displayFn(scope, locals) || '' overwrites zero values
            label = isDefined(label) ? label : '';
            optionId = trackFn ? trackFn(scope, locals) : (keyName ? keys[index] : index);
            if (trackFn) {
              trackKeysCache[optionId] = key;
            }

            optionGroup.push({
              // either the index into array or key from object
              id: optionId,
              label: label,
              selected: selected                   // determine if we should be selected
            });
          }
          if (!multiple) {
            if (nullOption || viewValue === null) {
              // insert null option if we have a placeholder, or the model is null
              optionGroups[''].unshift({id:'', label:'', selected:!anySelected});
            } else if (!anySelected) {
              // option could not be found, we have to insert the undefined item
              optionGroups[''].unshift({id:'?', label:'', selected:true});
            }
          }

          // Now we need to update the list of DOM nodes to match the optionGroups we computed above
          for (groupIndex = 0, groupLength = optionGroupNames.length;
               groupIndex < groupLength;
               groupIndex++) {
            // current option group name or '' if no group
            optionGroupName = optionGroupNames[groupIndex];

            // list of options for that group. (first item has the parent)
            optionGroup = optionGroups[optionGroupName];

            if (optionGroupsCache.length <= groupIndex) {
              // we need to grow the optionGroups
              existingParent = {
                element: optGroupTemplate.clone().attr('label', optionGroupName),
                label: optionGroup.label
              };
              existingOptions = [existingParent];
              optionGroupsCache.push(existingOptions);
              selectElement.append(existingParent.element);
            } else {
              existingOptions = optionGroupsCache[groupIndex];
              existingParent = existingOptions[0];  // either SELECT (no group) or OPTGROUP element

              // update the OPTGROUP label if not the same.
              if (existingParent.label != optionGroupName) {
                existingParent.element.attr('label', existingParent.label = optionGroupName);
              }
            }

            lastElement = null;  // start at the beginning
            for (index = 0, length = optionGroup.length; index < length; index++) {
              option = optionGroup[index];
              if ((existingOption = existingOptions[index + 1])) {
                // reuse elements
                lastElement = existingOption.element;
                if (existingOption.label !== option.label) {
                  updateLabelMap(labelMap, existingOption.label, false);
                  updateLabelMap(labelMap, option.label, true);
                  lastElement.text(existingOption.label = option.label);
                  lastElement.prop('label', existingOption.label);
                }
                if (existingOption.id !== option.id) {
                  lastElement.val(existingOption.id = option.id);
                }
                // lastElement.prop('selected') provided by jQuery has side-effects
                if (lastElement[0].selected !== option.selected) {
                  lastElement.prop('selected', (existingOption.selected = option.selected));
                  if (msie) {
                    // See #7692
                    // The selected item wouldn't visually update on IE without this.
                    // Tested on Win7: IE9, IE10 and IE11. Future IEs should be tested as well
                    lastElement.prop('selected', existingOption.selected);
                  }
                }
              } else {
                // grow elements

                // if it's a null option
                if (option.id === '' && nullOption) {
                  // put back the pre-compiled element
                  element = nullOption;
                } else {
                  // jQuery(v1.4.2) Bug: We should be able to chain the method calls, but
                  // in this version of jQuery on some browser the .text() returns a string
                  // rather then the element.
                  (element = optionTemplate.clone())
                      .val(option.id)
                      .prop('selected', option.selected)
                      .attr('selected', option.selected)
                      .prop('label', option.label)
                      .text(option.label);
                }

                existingOptions.push(existingOption = {
                    element: element,
                    label: option.label,
                    id: option.id,
                    selected: option.selected
                });
                updateLabelMap(labelMap, option.label, true);
                if (lastElement) {
                  lastElement.after(element);
                } else {
                  existingParent.element.append(element);
                }
                lastElement = element;
              }
            }
            // remove any excessive OPTIONs in a group
            index++; // increment since the existingOptions[0] is parent element not OPTION
            while (existingOptions.length > index) {
              option = existingOptions.pop();
              updateLabelMap(labelMap, option.label, false);
              option.element.remove();
            }
          }
          // remove any excessive OPTGROUPs from select
          while (optionGroupsCache.length > groupIndex) {
            // remove all the labels in the option group
            optionGroup = optionGroupsCache.pop();
            for (index = 1; index < optionGroup.length; ++index) {
              updateLabelMap(labelMap, optionGroup[index].label, false);
            }
            optionGroup[0].element.remove();
          }
          forEach(labelMap, function(count, label) {
            if (count > 0) {
              selectCtrl.addOption(label);
            } else if (count < 0) {
              selectCtrl.removeOption(label);
            }
          });
        }