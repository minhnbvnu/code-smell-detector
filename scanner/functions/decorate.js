function decorate(WrappedComponent) {
	    var Form = (0, _createReactClass2['default'])({
	      displayName: 'Form',

	      mixins: mixins,

	      getInitialState: function getInitialState() {
	        var _this = this;

	        var fields = mapPropsToFields && mapPropsToFields(this.props);
	        this.fieldsStore = (0, _createFieldsStore2['default'])(fields || {});

	        this.instances = {};
	        this.cachedBind = {};
	        // HACK: https://github.com/ant-design/ant-design/issues/6406
	        ['getFieldsValue', 'getFieldValue', 'setFieldsInitialValue', 'getFieldsError', 'getFieldError', 'isFieldValidating', 'isFieldsValidating', 'isFieldsTouched', 'isFieldTouched'].forEach(function (key) {
	          return _this[key] = function () {
	            var _fieldsStore;

	            (0, _warning2['default'])(false, 'you should not use `ref` on enhanced form, please use `wrappedComponentRef`. ' + 'See: https://github.com/react-component/form#note-use-wrappedcomponentref-instead-of-withref-after-rc-form140');
	            return (_fieldsStore = _this.fieldsStore)[key].apply(_fieldsStore, arguments);
	          };
	        });

	        return {
	          submitting: false
	        };
	      },
	      componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	        if (mapPropsToFields) {
	          this.fieldsStore.updateFields(mapPropsToFields(nextProps));
	        }
	      },
	      onCollectCommon: function onCollectCommon(name_, action, args) {
	        var name = name_;
	        var fieldMeta = this.fieldsStore.getFieldMeta(name);
	        if (fieldMeta[action]) {
	          fieldMeta[action].apply(fieldMeta, (0, _toConsumableArray3['default'])(args));
	        } else if (fieldMeta.originalProps && fieldMeta.originalProps[action]) {
	          var _fieldMeta$originalPr;

	          (_fieldMeta$originalPr = fieldMeta.originalProps)[action].apply(_fieldMeta$originalPr, (0, _toConsumableArray3['default'])(args));
	        }
	        var value = fieldMeta.getValueFromEvent ? fieldMeta.getValueFromEvent.apply(fieldMeta, (0, _toConsumableArray3['default'])(args)) : _utils.getValueFromEvent.apply(undefined, (0, _toConsumableArray3['default'])(args));
	        if (onValuesChange && value !== this.fieldsStore.getFieldValue(name)) {
	          onValuesChange(this.props, (0, _set2['default'])({}, name, value));
	        }
	        var nameKeyObj = (0, _utils.getNameIfNested)(name);
	        if (this.fieldsStore.getFieldMeta(nameKeyObj.name).exclusive) {
	          name = nameKeyObj.name;
	        }
	        var field = this.fieldsStore.getField(name);
	        return { name: name, field: (0, _extends3['default'])({}, field, { value: value, touched: true }), fieldMeta: fieldMeta };
	      },
	      onCollect: function onCollect(name_, action) {
	        for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	          args[_key - 2] = arguments[_key];
	        }

	        var _onCollectCommon = this.onCollectCommon(name_, action, args),
	            name = _onCollectCommon.name,
	            field = _onCollectCommon.field,
	            fieldMeta = _onCollectCommon.fieldMeta;

	        var validate = fieldMeta.validate;

	        var fieldContent = (0, _extends3['default'])({}, field, {
	          dirty: (0, _utils.hasRules)(validate)
	        });
	        this.setFields((0, _defineProperty3['default'])({}, name, fieldContent));
	      },
	      onCollectValidate: function onCollectValidate(name_, action) {
	        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	          args[_key2 - 2] = arguments[_key2];
	        }

	        var _onCollectCommon2 = this.onCollectCommon(name_, action, args),
	            field = _onCollectCommon2.field,
	            fieldMeta = _onCollectCommon2.fieldMeta;

	        var fieldContent = (0, _extends3['default'])({}, field, {
	          dirty: true
	        });
	        this.validateFieldsInternal([fieldContent], {
	          action: action,
	          options: {
	            firstFields: !!fieldMeta.validateFirst
	          }
	        });
	      },
	      getCacheBind: function getCacheBind(name, action, fn) {
	        var cache = this.cachedBind[name] = this.cachedBind[name] || {};
	        if (!cache[action]) {
	          cache[action] = fn.bind(this, name, action);
	        }
	        return cache[action];
	      },
	      getFieldDecorator: function getFieldDecorator(name, fieldOption) {
	        var _this2 = this;

	        var props = this.getFieldProps(name, fieldOption);
	        return function (fieldElem) {
	          var fieldMeta = _this2.fieldsStore.getFieldMeta(name);
	          var originalProps = fieldElem.props;
	          if (true) {
	            var valuePropName = fieldMeta.valuePropName;
	            (0, _warning2['default'])(!(valuePropName in originalProps), '`getFieldDecorator` will override `' + valuePropName + '`, ' + ('so please don\'t set `' + valuePropName + '` directly ') + 'and use `setFieldsValue` to set it.');
	            var defaultValuePropName = 'default' + valuePropName[0].toUpperCase() + valuePropName.slice(1);
	            (0, _warning2['default'])(!(defaultValuePropName in originalProps), '`' + defaultValuePropName + '` is invalid ' + ('for `getFieldDecorator` will set `' + valuePropName + '`,') + ' please use `option.initialValue` instead.');
	          }
	          fieldMeta.originalProps = originalProps;
	          fieldMeta.ref = fieldElem.ref;
	          return _react2['default'].cloneElement(fieldElem, (0, _extends3['default'])({}, props, _this2.fieldsStore.getFieldValuePropValue(fieldMeta)));
	        };
	      },
	      getFieldProps: function getFieldProps(name) {
	        var _this3 = this;

	        var usersFieldOption = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	        if (!name) {
	          throw new Error('Must call `getFieldProps` with valid name string!');
	        }

	        var nameIfNested = (0, _utils.getNameIfNested)(name);
	        var leadingName = nameIfNested.name;
	        var fieldOption = (0, _extends3['default'])({
	          valuePropName: 'value',
	          validate: [],
	          trigger: DEFAULT_TRIGGER,
	          leadingName: leadingName,
	          name: name
	        }, usersFieldOption);

	        var rules = fieldOption.rules,
	            trigger = fieldOption.trigger,
	            _fieldOption$validate = fieldOption.validateTrigger,
	            validateTrigger = _fieldOption$validate === undefined ? trigger : _fieldOption$validate,
	            exclusive = fieldOption.exclusive,
	            validate = fieldOption.validate;


	        var fieldMeta = this.fieldsStore.getFieldMeta(name);
	        if ('initialValue' in fieldOption) {
	          fieldMeta.initialValue = fieldOption.initialValue;
	        }

	        var leadingFieldMeta = this.fieldsStore.getFieldMeta(leadingName);
	        if (nameIfNested.isNested) {
	          leadingFieldMeta.virtual = !exclusive;
	          // exclusive allow getFieldProps('x', {initialValue})
	          // non-exclusive does not allow getFieldProps('x', {initialValue})
	          leadingFieldMeta.hidden = !exclusive;
	          leadingFieldMeta.exclusive = exclusive;
	        }

	        var inputProps = (0, _extends3['default'])({}, this.fieldsStore.getFieldValuePropValue(fieldOption), {
	          ref: this.getCacheBind(name, name + '__ref', this.saveRef)
	        });
	        if (fieldNameProp) {
	          inputProps[fieldNameProp] = name;
	        }

	        var validateRules = (0, _utils.normalizeValidateRules)(validate, rules, validateTrigger);
	        var validateTriggers = validateRules.filter(function (item) {
	          return !!item.rules && item.rules.length;
	        }).map(function (item) {
	          return item.trigger;
	        }).reduce(function (pre, curr) {
	          return pre.concat(curr);
	        }, []);
	        validateTriggers.forEach(function (action) {
	          if (inputProps[action]) return;
	          inputProps[action] = _this3.getCacheBind(name, action, _this3.onCollectValidate);
	        });

	        // make sure that the value will be collect
	        if (trigger && validateTriggers.indexOf(trigger) === -1) {
	          inputProps[trigger] = this.getCacheBind(name, trigger, this.onCollect);
	        }

	        var meta = (0, _extends3['default'])({}, fieldMeta, fieldOption, {
	          validate: validateRules
	        });
	        this.fieldsStore.setFieldMeta(name, meta);
	        if (fieldMetaProp) {
	          inputProps[fieldMetaProp] = meta;
	        }

	        return inputProps;
	      },
	      getFieldInstance: function getFieldInstance(name) {
	        return this.instances[name];
	      },
	      getRules: function getRules(fieldMeta, action) {
	        var actionRules = fieldMeta.validate.filter(function (item) {
	          return !action || item.trigger.indexOf(action) >= 0;
	        }).map(function (item) {
	          return item.rules;
	        });
	        return (0, _utils.flattenArray)(actionRules);
	      },
	      setFields: function setFields(fields) {
	        var _this4 = this;

	        this.fieldsStore.setFields(fields);
	        if (onFieldsChange) {
	          var changedFields = {};
	          Object.keys(fields).forEach(function (f) {
	            changedFields[f] = _this4.fieldsStore.getField(f);
	          });
	          onFieldsChange(this.props, changedFields);
	        }
	        this.forceUpdate();
	      },
	      resetFields: function resetFields(ns) {
	        var newFields = this.fieldsStore.resetFields(ns);
	        if (Object.keys(newFields).length > 0) {
	          this.setFields(newFields);
	        }
	      },
	      setFieldsValue: function setFieldsValue(fieldsValue) {
	        if (onValuesChange) {
	          onValuesChange(this.props, fieldsValue);
	        }
	        var newFields = {};
	        var _fieldsStore2 = this.fieldsStore,
	            fieldsMeta = _fieldsStore2.fieldsMeta,
	            fields = _fieldsStore2.fields;

	        var virtualPaths = (0, _utils.getVirtualPaths)(fieldsMeta);
	        Object.keys(fieldsValue).forEach(function (name) {
	          var value = fieldsValue[name];
	          if (fieldsMeta[name] && fieldsMeta[name].virtual) {
	            (0, _utils.clearVirtualField)(name, fields, fieldsMeta);
	            for (var i = 0, len = virtualPaths[name].length; i < len; i++) {
	              var path = virtualPaths[name][i];
	              if ((0, _has2['default'])(fieldsValue, path)) {
	                newFields[path] = {
	                  name: path,
	                  value: (0, _get2['default'])(fieldsValue, path)
	                };
	              }
	            }
	          } else if (fieldsMeta[name]) {
	            newFields[name] = {
	              name: name,
	              value: value
	            };
	          } else {
	            (0, _warning2['default'])(false, 'Cannot use `setFieldsValue` until ' + 'you use `getFieldDecorator` or `getFieldProps` to register it.');
	          }
	        });
	        this.setFields(newFields);
	      },
	      saveRef: function saveRef(name, _, component) {
	        if (!component) {
	          // after destroy, delete data
	          this.fieldsStore.clearField(name);
	          delete this.instances[name];
	          delete this.cachedBind[name];
	          return;
	        }
	        var fieldMeta = this.fieldsStore.getFieldMeta(name);
	        if (fieldMeta) {
	          var ref = fieldMeta.ref;
	          if (ref) {
	            if (typeof ref === 'string') {
	              throw new Error('can not set ref string for ' + name);
	            }
	            ref(component);
	          }
	        }
	        this.instances[name] = component;
	      },
	      validateFieldsInternal: function validateFieldsInternal(fields, _ref, callback) {
	        var _this5 = this;

	        var fieldNames = _ref.fieldNames,
	            action = _ref.action,
	            _ref$options = _ref.options,
	            options = _ref$options === undefined ? {} : _ref$options;

	        var allRules = {};
	        var allValues = {};
	        var allFields = {};
	        var alreadyErrors = {};
	        fields.forEach(function (field) {
	          var name = field.name;
	          if (options.force !== true && field.dirty === false) {
	            if (field.errors) {
	              (0, _set2['default'])(alreadyErrors, name, { errors: field.errors });
	            }
	            return;
	          }
	          var fieldMeta = _this5.fieldsStore.getFieldMeta(name);
	          var newField = (0, _extends3['default'])({}, field);
	          newField.errors = undefined;
	          newField.validating = true;
	          newField.dirty = true;
	          allRules[name] = _this5.getRules(fieldMeta, action);
	          allValues[name] = newField.value;
	          allFields[name] = newField;
	        });
	        this.setFields(allFields);
	        // in case normalize
	        Object.keys(allValues).forEach(function (f) {
	          allValues[f] = _this5.fieldsStore.getFieldValue(f);
	        });
	        if (callback && (0, _utils.isEmptyObject)(allFields)) {
	          callback((0, _utils.isEmptyObject)(alreadyErrors) ? null : alreadyErrors, this.fieldsStore.getFieldsValue((0, _utils.flatFieldNames)(fieldNames)));
	          return;
	        }
	        var validator = new _asyncValidator2['default'](allRules);
	        if (validateMessages) {
	          validator.messages(validateMessages);
	        }
	        validator.validate(allValues, options, function (errors) {
	          var errorsGroup = (0, _extends3['default'])({}, alreadyErrors);
	          if (errors && errors.length) {
	            errors.forEach(function (e) {
	              var fieldName = e.field;
	              if (!(0, _has2['default'])(errorsGroup, fieldName)) {
	                (0, _set2['default'])(errorsGroup, fieldName, { errors: [] });
	              }
	              var fieldErrors = (0, _get2['default'])(errorsGroup, fieldName.concat('.errors'));
	              fieldErrors.push(e);
	            });
	          }
	          var expired = [];
	          var nowAllFields = {};
	          Object.keys(allRules).forEach(function (name) {
	            var fieldErrors = (0, _get2['default'])(errorsGroup, name);
	            var nowField = _this5.fieldsStore.getField(name);
	            // avoid concurrency problems
	            if (nowField.value !== allValues[name]) {
	              expired.push({
	                name: name
	              });
	            } else {
	              nowField.errors = fieldErrors && fieldErrors.errors;
	              nowField.value = allValues[name];
	              nowField.validating = false;
	              nowField.dirty = false;
	              nowAllFields[name] = nowField;
	            }
	          });
	          _this5.setFields(nowAllFields);
	          if (callback) {
	            if (expired.length) {
	              expired.forEach(function (_ref2) {
	                var name = _ref2.name;

	                var fieldErrors = [{
	                  message: name + ' need to revalidate',
	                  field: name
	                }];
	                (0, _set2['default'])(errorsGroup, name, {
	                  expired: true,
	                  errors: fieldErrors
	                });
	              });
	            }

	            callback((0, _utils.isEmptyObject)(errorsGroup) ? null : errorsGroup, _this5.fieldsStore.getFieldsValue((0, _utils.flatFieldNames)(fieldNames)));
	          }
	        });
	      },
	      validateFields: function validateFields(ns, opt, cb) {
	        var _this6 = this;

	        var _getParams = (0, _utils.getParams)(ns, opt, cb),
	            names = _getParams.names,
	            callback = _getParams.callback,
	            options = _getParams.options;

	        var fieldNames = names || this.fieldsStore.getValidFieldsName();
	        var fields = fieldNames.filter(function (name) {
	          var fieldMeta = _this6.fieldsStore.getFieldMeta(name);
	          return (0, _utils.hasRules)(fieldMeta.validate);
	        }).map(function (name) {
	          var field = _this6.fieldsStore.getField(name);
	          field.value = _this6.fieldsStore.getFieldValue(name);
	          return field;
	        });
	        if (!fields.length) {
	          if (callback) {
	            callback(null, this.fieldsStore.getFieldsValue((0, _utils.flatFieldNames)(fieldNames)));
	          }
	          return;
	        }
	        if (!('firstFields' in options)) {
	          options.firstFields = fieldNames.filter(function (name) {
	            var fieldMeta = _this6.fieldsStore.getFieldMeta(name);
	            return !!fieldMeta.validateFirst;
	          });
	        }
	        this.validateFieldsInternal(fields, {
	          fieldNames: fieldNames,
	          options: options
	        }, callback);
	      },
	      isSubmitting: function isSubmitting() {
	        return this.state.submitting;
	      },
	      submit: function submit(callback) {
	        var _this7 = this;

	        var fn = function fn() {
	          _this7.setState({
	            submitting: false
	          });
	        };
	        this.setState({
	          submitting: true
	        });
	        callback(fn);
	      },
	      render: function render() {
	        var _props = this.props,
	            wrappedComponentRef = _props.wrappedComponentRef,
	            restProps = (0, _objectWithoutProperties3['default'])(_props, ['wrappedComponentRef']);

	        var formProps = (0, _defineProperty3['default'])({}, formPropName, this.getForm());
	        function innerestWrappedComponentRef() {
	          if (wrappedComponentRef && !innerestWrappedComponentRef.called) {
	            wrappedComponentRef.apply(undefined, arguments);
	            innerestWrappedComponentRef.called = true;
	          }
	        }
	        if (withRef) {
	          (0, _warning2['default'])(false, '`withRef` is deprecated, please use `wrappedComponentRef` instead. ' + 'See: https://github.com/react-component/form#note-use-wrappedcomponentref-instead-of-withref-after-rc-form140');
	          formProps.ref = 'wrappedComponent';
	        } else if (wrappedComponentRef) {
	          formProps.ref = innerestWrappedComponentRef;
	        }
	        var props = mapProps.call(this, (0, _extends3['default'])({}, formProps, restProps, {
	          wrappedComponentRef: innerestWrappedComponentRef
	        }));
	        return _react2['default'].createElement(WrappedComponent, props);
	      }
	    });

	    return (0, _utils.argumentContainer)(Form, WrappedComponent);
	  }