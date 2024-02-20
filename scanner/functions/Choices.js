function Choices(element, userConfig) {
                            if (element === void 0) {
                                element = '[data-choice]';
                            }
                            if (userConfig === void 0) {
                                userConfig = {};
                            }
                            var _this = this;
                            if (userConfig.allowHTML === undefined) {
                                console.warn('Deprecation warning: allowHTML will default to false in a future release. To render HTML in Choices, you will need to set it to true. Setting allowHTML will suppress this message.');
                            }
                            this.config = deepmerge_1.default.all([defaults_1.DEFAULT_CONFIG, Choices.defaults.options, userConfig], 
                            // When merging array configs, replace with a copy of the userConfig array,
                            // instead of concatenating with the default array
                            {
                                arrayMerge: function (_, sourceArray) {
                                    return __spreadArray([], sourceArray, true);
                                }
                            });
                            var invalidConfigOptions = (0, utils_1.diff)(this.config, defaults_1.DEFAULT_CONFIG);
                            if (invalidConfigOptions.length) {
                                console.warn('Unknown config option(s) passed', invalidConfigOptions.join(', '));
                            }
                            var passedElement = typeof element === 'string' ? document.querySelector(element) : element;
                            if (!(passedElement instanceof HTMLInputElement || passedElement instanceof HTMLSelectElement)) {
                                throw TypeError('Expected one of the following types text|select-one|select-multiple');
                            }
                            this._isTextElement = passedElement.type === constants_1.TEXT_TYPE;
                            this._isSelectOneElement = passedElement.type === constants_1.SELECT_ONE_TYPE;
                            this._isSelectMultipleElement = passedElement.type === constants_1.SELECT_MULTIPLE_TYPE;
                            this._isSelectElement = this._isSelectOneElement || this._isSelectMultipleElement;
                            this.config.searchEnabled = this._isSelectMultipleElement || this.config.searchEnabled;
                            if (!['auto', 'always'].includes("".concat(this.config.renderSelectedChoices))) {
                                this.config.renderSelectedChoices = 'auto';
                            }
                            if (userConfig.addItemFilter && typeof userConfig.addItemFilter !== 'function') {
                                var re = userConfig.addItemFilter instanceof RegExp ? userConfig.addItemFilter : new RegExp(userConfig.addItemFilter);
                                this.config.addItemFilter = re.test.bind(re);
                            }
                            if (this._isTextElement) {
                                this.passedElement = new components_1.WrappedInput({
                                    element: passedElement,
                                    classNames: this.config.classNames,
                                    delimiter: this.config.delimiter
                                });
                            }
                            else {
                                this.passedElement = new components_1.WrappedSelect({
                                    element: passedElement,
                                    classNames: this.config.classNames,
                                    template: function (data) {
                                        return _this._templates.option(data);
                                    }
                                });
                            }
                            this.initialised = false;
                            this._store = new store_1.default();
                            this._initialState = reducers_1.defaultState;
                            this._currentState = reducers_1.defaultState;
                            this._prevState = reducers_1.defaultState;
                            this._currentValue = '';
                            this._canSearch = !!this.config.searchEnabled;
                            this._isScrollingOnIe = false;
                            this._highlightPosition = 0;
                            this._wasTap = true;
                            this._placeholderValue = this._generatePlaceholderValue();
                            this._baseId = (0, utils_1.generateId)(this.passedElement.element, 'choices-');
                            /**
                             * setting direction in cases where it's explicitly set on passedElement
                             * or when calculated direction is different from the document
                             */
                            this._direction = this.passedElement.dir;
                            if (!this._direction) {
                                var elementDirection = window.getComputedStyle(this.passedElement.element).direction;
                                var documentDirection = window.getComputedStyle(document.documentElement).direction;
                                if (elementDirection !== documentDirection) {
                                    this._direction = elementDirection;
                                }
                            }
                            this._idNames = {
                                itemChoice: 'item-choice'
                            };
                            if (this._isSelectElement) {
                                // Assign preset groups from passed element
                                this._presetGroups = this.passedElement.optionGroups;
                                // Assign preset options from passed element
                                this._presetOptions = this.passedElement.options;
                            }
                            // Assign preset choices from passed object
                            this._presetChoices = this.config.choices;
                            // Assign preset items from passed object first
                            this._presetItems = this.config.items;
                            // Add any values passed from attribute
                            if (this.passedElement.value && this._isTextElement) {
                                var splitValues = this.passedElement.value.split(this.config.delimiter);
                                this._presetItems = this._presetItems.concat(splitValues);
                            }
                            // Create array of choices from option elements
                            if (this.passedElement.options) {
                                this.passedElement.options.forEach(function (option) {
                                    _this._presetChoices.push({
                                        value: option.value,
                                        label: option.innerHTML,
                                        selected: !!option.selected,
                                        disabled: option.disabled || option.parentNode.disabled,
                                        placeholder: option.value === '' || option.hasAttribute('placeholder'),
                                        customProperties: (0, utils_1.parseCustomProperties)(option.dataset.customProperties)
                                    });
                                });
                            }
                            this._render = this._render.bind(this);
                            this._onFocus = this._onFocus.bind(this);
                            this._onBlur = this._onBlur.bind(this);
                            this._onKeyUp = this._onKeyUp.bind(this);
                            this._onKeyDown = this._onKeyDown.bind(this);
                            this._onClick = this._onClick.bind(this);
                            this._onTouchMove = this._onTouchMove.bind(this);
                            this._onTouchEnd = this._onTouchEnd.bind(this);
                            this._onMouseDown = this._onMouseDown.bind(this);
                            this._onMouseOver = this._onMouseOver.bind(this);
                            this._onFormReset = this._onFormReset.bind(this);
                            this._onSelectKey = this._onSelectKey.bind(this);
                            this._onEnterKey = this._onEnterKey.bind(this);
                            this._onEscapeKey = this._onEscapeKey.bind(this);
                            this._onDirectionKey = this._onDirectionKey.bind(this);
                            this._onDeleteKey = this._onDeleteKey.bind(this);
                            // If element has already been initialised with Choices, fail silently
                            if (this.passedElement.isActive) {
                                if (!this.config.silent) {
                                    console.warn('Trying to initialise Choices on element already initialised', {
                                        element: element
                                    });
                                }
                                this.initialised = true;
                                return;
                            }
                            // Let's go
                            this.init();
                        }