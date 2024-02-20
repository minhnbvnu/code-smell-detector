function Avatar(props) {
	        (0, _classCallCheck3['default'])(this, Avatar);

	        var _this = (0, _possibleConstructorReturn3['default'])(this, (Avatar.__proto__ || Object.getPrototypeOf(Avatar)).call(this, props));

	        _this.setScale = function () {
	            var childrenNode = _this.avatarChildren;
	            if (childrenNode) {
	                var childrenWidth = childrenNode.offsetWidth;
	                var avatarWidth = _reactDom2['default'].findDOMNode(_this).getBoundingClientRect().width;
	                // add 4px gap for each side to get better performance
	                if (avatarWidth - 8 < childrenWidth) {
	                    _this.setState({
	                        scale: (avatarWidth - 8) / childrenWidth
	                    });
	                } else {
	                    _this.setState({
	                        scale: 1
	                    });
	                }
	            }
	        };
	        _this.handleImgLoadError = function () {
	            return _this.setState({ isImgExist: false });
	        };
	        _this.state = {
	            scale: 1,
	            isImgExist: true
	        };
	        return _this;
	    }