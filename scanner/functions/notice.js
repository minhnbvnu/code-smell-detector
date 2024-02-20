function notice(args) {
	    var outerPrefixCls = args.prefixCls || 'ant-notification';
	    var prefixCls = outerPrefixCls + '-notice';
	    var duration = args.duration === undefined ? defaultDuration : args.duration;
	    var iconNode = null;
	    if (args.icon) {
	        iconNode = _react2['default'].createElement(
	            'span',
	            { className: prefixCls + '-icon' },
	            args.icon
	        );
	    } else if (args.type) {
	        var iconType = typeToIcon[args.type];
	        iconNode = _react2['default'].createElement(_icon2['default'], { className: prefixCls + '-icon ' + prefixCls + '-icon-' + args.type, type: iconType });
	    }
	    var autoMarginTag = !args.description && iconNode ? _react2['default'].createElement('span', { className: prefixCls + '-message-single-line-auto-margin' }) : null;
	    getNotificationInstance(outerPrefixCls, args.placement || defaultPlacement).notice({
	        content: _react2['default'].createElement(
	            'div',
	            { className: iconNode ? prefixCls + '-with-icon' : '' },
	            iconNode,
	            _react2['default'].createElement(
	                'div',
	                { className: prefixCls + '-message' },
	                autoMarginTag,
	                args.message
	            ),
	            _react2['default'].createElement(
	                'div',
	                { className: prefixCls + '-description' },
	                args.description
	            ),
	            args.btn ? _react2['default'].createElement(
	                'span',
	                { className: prefixCls + '-btn' },
	                args.btn
	            ) : null
	        ),
	        duration: duration,
	        closable: true,
	        onClose: args.onClose,
	        key: args.key,
	        style: args.style || {},
	        className: args.className
	    });
	}