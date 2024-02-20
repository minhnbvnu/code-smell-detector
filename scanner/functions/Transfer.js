function Transfer(props) {
	        (0, _classCallCheck3['default'])(this, Transfer);

	        var _this = (0, _possibleConstructorReturn3['default'])(this, (Transfer.__proto__ || Object.getPrototypeOf(Transfer)).call(this, props));

	        _this.moveTo = function (direction) {
	            var _this$props = _this.props,
	                _this$props$targetKey = _this$props.targetKeys,
	                targetKeys = _this$props$targetKey === undefined ? [] : _this$props$targetKey,
	                _this$props$dataSourc = _this$props.dataSource,
	                dataSource = _this$props$dataSourc === undefined ? [] : _this$props$dataSourc,
	                onChange = _this$props.onChange;
	            var _this$state = _this.state,
	                sourceSelectedKeys = _this$state.sourceSelectedKeys,
	                targetSelectedKeys = _this$state.targetSelectedKeys;

	            var moveKeys = direction === 'right' ? sourceSelectedKeys : targetSelectedKeys;
	            // filter the disabled options
	            var newMoveKeys = moveKeys.filter(function (key) {
	                return !dataSource.some(function (data) {
	                    return !!(key === data.key && data.disabled);
	                });
	            });
	            // move items to target box
	            var newTargetKeys = direction === 'right' ? newMoveKeys.concat(targetKeys) : targetKeys.filter(function (targetKey) {
	                return newMoveKeys.indexOf(targetKey) === -1;
	            });
	            // empty checked keys
	            var oppositeDirection = direction === 'right' ? 'left' : 'right';
	            _this.setState((0, _defineProperty3['default'])({}, _this.getSelectedKeysName(oppositeDirection), []));
	            _this.handleSelectChange(oppositeDirection, []);
	            if (onChange) {
	                onChange(newTargetKeys, direction, newMoveKeys);
	            }
	        };
	        _this.moveToLeft = function () {
	            return _this.moveTo('left');
	        };
	        _this.moveToRight = function () {
	            return _this.moveTo('right');
	        };
	        _this.handleSelectAll = function (direction, filteredDataSource, checkAll) {
	            var originalSelectedKeys = _this.state[_this.getSelectedKeysName(direction)] || [];
	            var currentKeys = filteredDataSource.map(function (item) {
	                return item.key;
	            });
	            // Only operate current keys from original selected keys
	            var newKeys1 = originalSelectedKeys.filter(function (key) {
	                return currentKeys.indexOf(key) === -1;
	            });
	            var newKeys2 = [].concat((0, _toConsumableArray3['default'])(originalSelectedKeys));
	            currentKeys.forEach(function (key) {
	                if (newKeys2.indexOf(key) === -1) {
	                    newKeys2.push(key);
	                }
	            });
	            var holder = checkAll ? newKeys1 : newKeys2;
	            _this.handleSelectChange(direction, holder);
	            if (!_this.props.selectedKeys) {
	                _this.setState((0, _defineProperty3['default'])({}, _this.getSelectedKeysName(direction), holder));
	            }
	        };
	        _this.handleLeftSelectAll = function (filteredDataSource, checkAll) {
	            return _this.handleSelectAll('left', filteredDataSource, checkAll);
	        };
	        _this.handleRightSelectAll = function (filteredDataSource, checkAll) {
	            return _this.handleSelectAll('right', filteredDataSource, checkAll);
	        };
	        _this.handleFilter = function (direction, e) {
	            _this.setState((0, _defineProperty3['default'])({}, direction + 'Filter', e.target.value));
	            if (_this.props.onSearchChange) {
	                _this.props.onSearchChange(direction, e);
	            }
	        };
	        _this.handleLeftFilter = function (e) {
	            return _this.handleFilter('left', e);
	        };
	        _this.handleRightFilter = function (e) {
	            return _this.handleFilter('right', e);
	        };
	        _this.handleClear = function (direction) {
	            _this.setState((0, _defineProperty3['default'])({}, direction + 'Filter', ''));
	        };
	        _this.handleLeftClear = function () {
	            return _this.handleClear('left');
	        };
	        _this.handleRightClear = function () {
	            return _this.handleClear('right');
	        };
	        _this.handleSelect = function (direction, selectedItem, checked) {
	            var _this$state2 = _this.state,
	                sourceSelectedKeys = _this$state2.sourceSelectedKeys,
	                targetSelectedKeys = _this$state2.targetSelectedKeys;

	            var holder = direction === 'left' ? [].concat((0, _toConsumableArray3['default'])(sourceSelectedKeys)) : [].concat((0, _toConsumableArray3['default'])(targetSelectedKeys));
	            var index = holder.indexOf(selectedItem.key);
	            if (index > -1) {
	                holder.splice(index, 1);
	            }
	            if (checked) {
	                holder.push(selectedItem.key);
	            }
	            _this.handleSelectChange(direction, holder);
	            if (!_this.props.selectedKeys) {
	                _this.setState((0, _defineProperty3['default'])({}, _this.getSelectedKeysName(direction), holder));
	            }
	        };
	        _this.handleLeftSelect = function (selectedItem, checked) {
	            return _this.handleSelect('left', selectedItem, checked);
	        };
	        _this.handleRightSelect = function (selectedItem, checked) {
	            return _this.handleSelect('right', selectedItem, checked);
	        };
	        _this.handleScroll = function (direction, e) {
	            var onScroll = _this.props.onScroll;

	            if (onScroll) {
	                onScroll(direction, e);
	            }
	        };
	        _this.handleLeftScroll = function (e) {
	            return _this.handleScroll('left', e);
	        };
	        _this.handleRightScroll = function (e) {
	            return _this.handleScroll('right', e);
	        };
	        var _props$selectedKeys = props.selectedKeys,
	            selectedKeys = _props$selectedKeys === undefined ? [] : _props$selectedKeys,
	            _props$targetKeys = props.targetKeys,
	            targetKeys = _props$targetKeys === undefined ? [] : _props$targetKeys;

	        _this.state = {
	            leftFilter: '',
	            rightFilter: '',
	            sourceSelectedKeys: selectedKeys.filter(function (key) {
	                return targetKeys.indexOf(key) === -1;
	            }),
	            targetSelectedKeys: selectedKeys.filter(function (key) {
	                return targetKeys.indexOf(key) > -1;
	            })
	        };
	        return _this;
	    }