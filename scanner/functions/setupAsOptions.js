function setupAsOptions(scope, selectElement, ctrl) {
        var match;

        if (!(match = optionsExp.match(NG_OPTIONS_REGEXP))) {
          throw ngOptionsMinErr('iexp',
            "Expected expression in form of " +
            "'_select_ (as _label_)? for (_key_,)?_value_ in _collection_'" +
            " but got '{0}'. Element: {1}",
            optionsExp, startingTag(selectElement));
        }

        var displayFn = $parse(match[2] || match[1]),
            valueName = match[4] || match[6],
            selectAs = / as /.test(match[0]) && match[1],
            selectAsFn = selectAs ? $parse(selectAs) : null,
            keyName = match[5],
            groupByFn = $parse(match[3] || ''),
            valueFn = $parse(match[2] ? match[1] : valueName),
            valuesFn = $parse(match[7]),
            track = match[8],
            trackFn = track ? $parse(match[8]) : null,
            trackKeysCache = {},
            // This is an array of array of existing option groups in DOM.
            // We try to reuse these if possible
            // - optionGroupsCache[0] is the options with no option group
            // - optionGroupsCache[?][0] is the parent: either the SELECT or OPTGROUP element
            optionGroupsCache = [[{element: selectElement, label:''}]],
            //re-usable object to represent option's locals
            locals = {};

        if (nullOption) {
          // compile the element since there might be bindings in it
          $compile(nullOption)(scope);

          // remove the class, which is added automatically because we recompile the element and it
          // becomes the compilation root
          nullOption.removeClass('ng-scope');

          // we need to remove it before calling selectElement.empty() because otherwise IE will
          // remove the label from the element. wtf?
          nullOption.remove();
        }

        // clear contents, we'll add what's needed based on the model
        selectElement.empty();

        selectElement.on('change', selectionChanged);

        ctrl.$render = render;

        scope.$watchCollection(valuesFn, scheduleRendering);
        scope.$watchCollection(getLabels, scheduleRendering);

        if (multiple) {
          scope.$watchCollection(function() { return ctrl.$modelValue; }, scheduleRendering);
        }

        // ------------------------------------------------------------------ //

        function callExpression(exprFn, key, value) {
          locals[valueName] = value;
          if (keyName) locals[keyName] = key;
          return exprFn(scope, locals);
        }

        function selectionChanged() {
          scope.$apply(function() {
            var collection = valuesFn(scope) || [];
            var viewValue;
            if (multiple) {
              viewValue = [];
              forEach(selectElement.val(), function(selectedKey) {
                  selectedKey = trackFn ? trackKeysCache[selectedKey] : selectedKey;
                viewValue.push(getViewValue(selectedKey, collection[selectedKey]));
              });
            } else {
              var selectedKey = trackFn ? trackKeysCache[selectElement.val()] : selectElement.val();
              viewValue = getViewValue(selectedKey, collection[selectedKey]);
            }
            ctrl.$setViewValue(viewValue);
            render();
          });
        }

        function getViewValue(key, value) {
          if (key === '?') {
            return undefined;
          } else if (key === '') {
            return null;
          } else {
            var viewValueFn = selectAsFn ? selectAsFn : valueFn;
            return callExpression(viewValueFn, key, value);
          }
        }

        function getLabels() {
          var values = valuesFn(scope);
          var toDisplay;
          if (values && isArray(values)) {
            toDisplay = new Array(values.length);
            for (var i = 0, ii = values.length; i < ii; i++) {
              toDisplay[i] = callExpression(displayFn, i, values[i]);
            }
            return toDisplay;
          } else if (values) {
            // TODO: Add a test for this case
            toDisplay = {};
            for (var prop in values) {
              if (values.hasOwnProperty(prop)) {
                toDisplay[prop] = callExpression(displayFn, prop, values[prop]);
              }
            }
          }
          return toDisplay;
        }

        function createIsSelectedFn(viewValue) {
          var selectedSet;
          if (multiple) {
            if (trackFn && isArray(viewValue)) {

              selectedSet = new HashMap([]);
              for (var trackIndex = 0; trackIndex < viewValue.length; trackIndex++) {
                // tracking by key
                selectedSet.put(callExpression(trackFn, null, viewValue[trackIndex]), true);
              }
            } else {
              selectedSet = new HashMap(viewValue);
            }
          } else if (trackFn) {
            viewValue = callExpression(trackFn, null, viewValue);
          }

          return function isSelected(key, value) {
            var compareValueFn;
            if (trackFn) {
              compareValueFn = trackFn;
            } else if (selectAsFn) {
              compareValueFn = selectAsFn;
            } else {
              compareValueFn = valueFn;
            }

            if (multiple) {
              return isDefined(selectedSet.remove(callExpression(compareValueFn, key, value)));
            } else {
              return viewValue === callExpression(compareValueFn, key, value);
            }
          };
        }

        function scheduleRendering() {
          if (!renderScheduled) {
            scope.$$postDigest(render);
            renderScheduled = true;
          }
        }

        /**
         * A new labelMap is created with each render.
         * This function is called for each existing option with added=false,
         * and each new option with added=true.
         * - Labels that are passed to this method twice,
         * (once with added=true and once with added=false) will end up with a value of 0, and
         * will cause no change to happen to the corresponding option.
         * - Labels that are passed to this method only once with added=false will end up with a
         * value of -1 and will eventually be passed to selectCtrl.removeOption()
         * - Labels that are passed to this method only once with added=true will end up with a
         * value of 1 and will eventually be passed to selectCtrl.addOption()
        */
        function updateLabelMap(labelMap, label, added) {
          labelMap[label] = labelMap[label] || 0;
          labelMap[label] += (added ? 1 : -1);
        }

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
      }