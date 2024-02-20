function ngOptionsPostLink(scope, selectElement, attr, ctrls) {

      var selectCtrl = ctrls[0];
      var ngModelCtrl = ctrls[1];
      var multiple = attr.multiple;

      // The emptyOption allows the application developer to provide their own custom "empty"
      // option when the viewValue does not match any of the option values.
      var emptyOption;
      for (var i = 0, children = selectElement.children(), ii = children.length; i < ii; i++) {
        if (children[i].value === '') {
          emptyOption = children.eq(i);
          break;
        }
      }

      var providedEmptyOption = !!emptyOption;

      var unknownOption = jqLite(optionTemplate.cloneNode(false));
      unknownOption.val('?');

      var options;
      var ngOptions = parseOptionsExpression(attr.ngOptions, selectElement, scope);


      var renderEmptyOption = function() {
        if (!providedEmptyOption) {
          selectElement.prepend(emptyOption);
        }
        selectElement.val('');
        emptyOption.prop('selected', true); // needed for IE
        emptyOption.attr('selected', true);
      };

      var removeEmptyOption = function() {
        if (!providedEmptyOption) {
          emptyOption.remove();
        }
      };


      var renderUnknownOption = function() {
        selectElement.prepend(unknownOption);
        selectElement.val('?');
        unknownOption.prop('selected', true); // needed for IE
        unknownOption.attr('selected', true);
      };

      var removeUnknownOption = function() {
        unknownOption.remove();
      };

      // Update the controller methods for multiple selectable options
      if (!multiple) {

        selectCtrl.writeValue = function writeNgOptionsValue(value) {
          var option = options.getOptionFromViewValue(value);

          if (option && !option.disabled) {
            // Don't update the option when it is already selected.
            // For example, the browser will select the first option by default. In that case,
            // most properties are set automatically - except the `selected` attribute, which we
            // set always

            if (selectElement[0].value !== option.selectValue) {
              removeUnknownOption();
              removeEmptyOption();

              selectElement[0].value = option.selectValue;
              option.element.selected = true;
            }

            option.element.setAttribute('selected', 'selected');
          } else {
            if (value === null || providedEmptyOption) {
              removeUnknownOption();
              renderEmptyOption();
            } else {
              removeEmptyOption();
              renderUnknownOption();
            }
          }
        };

        selectCtrl.readValue = function readNgOptionsValue() {

          var selectedOption = options.selectValueMap[selectElement.val()];

          if (selectedOption && !selectedOption.disabled) {
            removeEmptyOption();
            removeUnknownOption();
            return options.getViewValueFromOption(selectedOption);
          }
          return null;
        };

        // If we are using `track by` then we must watch the tracked value on the model
        // since ngModel only watches for object identity change
        if (ngOptions.trackBy) {
          scope.$watch(
            function() { return ngOptions.getTrackByValue(ngModelCtrl.$viewValue); },
            function() { ngModelCtrl.$render(); }
          );
        }

      } else {

        ngModelCtrl.$isEmpty = function(value) {
          return !value || value.length === 0;
        };


        selectCtrl.writeValue = function writeNgOptionsMultiple(value) {
          options.items.forEach(function(option) {
            option.element.selected = false;
          });

          if (value) {
            value.forEach(function(item) {
              var option = options.getOptionFromViewValue(item);
              if (option && !option.disabled) option.element.selected = true;
            });
          }
        };


        selectCtrl.readValue = function readNgOptionsMultiple() {
          var selectedValues = selectElement.val() || [],
              selections = [];

          forEach(selectedValues, function(value) {
            var option = options.selectValueMap[value];
            if (option && !option.disabled) selections.push(options.getViewValueFromOption(option));
          });

          return selections;
        };

        // If we are using `track by` then we must watch these tracked values on the model
        // since ngModel only watches for object identity change
        if (ngOptions.trackBy) {

          scope.$watchCollection(function() {
            if (isArray(ngModelCtrl.$viewValue)) {
              return ngModelCtrl.$viewValue.map(function(value) {
                return ngOptions.getTrackByValue(value);
              });
            }
          }, function() {
            ngModelCtrl.$render();
          });

        }
      }


      if (providedEmptyOption) {

        // we need to remove it before calling selectElement.empty() because otherwise IE will
        // remove the label from the element. wtf?
        emptyOption.remove();

        // compile the element since there might be bindings in it
        $compile(emptyOption)(scope);

        // remove the class, which is added automatically because we recompile the element and it
        // becomes the compilation root
        emptyOption.removeClass('ng-scope');
      } else {
        emptyOption = jqLite(optionTemplate.cloneNode(false));
      }

      // We need to do this here to ensure that the options object is defined
      // when we first hit it in writeNgOptionsValue
      updateOptions();

      // We will re-render the option elements if the option values or labels change
      scope.$watchCollection(ngOptions.getWatchables, updateOptions);

      // ------------------------------------------------------------------ //


      function updateOptionElement(option, element) {
        option.element = element;
        element.disabled = option.disabled;
        // NOTE: The label must be set before the value, otherwise IE10/11/EDGE create unresponsive
        // selects in certain circumstances when multiple selects are next to each other and display
        // the option list in listbox style, i.e. the select is [multiple], or specifies a [size].
        // See https://github.com/angular/angular.js/issues/11314 for more info.
        // This is unfortunately untestable with unit / e2e tests
        if (option.label !== element.label) {
          element.label = option.label;
          element.textContent = option.label;
        }
        if (option.value !== element.value) element.value = option.selectValue;
      }

      function addOrReuseElement(parent, current, type, templateElement) {
        var element;
        // Check whether we can reuse the next element
        if (current && lowercase(current.nodeName) === type) {
          // The next element is the right type so reuse it
          element = current;
        } else {
          // The next element is not the right type so create a new one
          element = templateElement.cloneNode(false);
          if (!current) {
            // There are no more elements so just append it to the select
            parent.appendChild(element);
          } else {
            // The next element is not a group so insert the new one
            parent.insertBefore(element, current);
          }
        }
        return element;
      }


      function removeExcessElements(current) {
        var next;
        while (current) {
          next = current.nextSibling;
          jqLiteRemove(current);
          current = next;
        }
      }


      function skipEmptyAndUnknownOptions(current) {
        var emptyOption_ = emptyOption && emptyOption[0];
        var unknownOption_ = unknownOption && unknownOption[0];

        // We cannot rely on the extracted empty option being the same as the compiled empty option,
        // because the compiled empty option might have been replaced by a comment because
        // it had an "element" transclusion directive on it (such as ngIf)
        if (emptyOption_ || unknownOption_) {
          while (current &&
                (current === emptyOption_ ||
                current === unknownOption_ ||
                current.nodeType === NODE_TYPE_COMMENT ||
                (nodeName_(current) === 'option' && current.value === ''))) {
            current = current.nextSibling;
          }
        }
        return current;
      }


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
  }