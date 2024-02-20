function _componentDidUpdate(component, init) {
	  var styles = component.props.styles;

	  var wrapNode = component.nav || component.root;
	  var containerOffset = offset(wrapNode);
	  var inkBarNode = component.inkBar;
	  var activeTab = component.activeTab;
	  var inkBarNodeStyle = inkBarNode.style;
	  var tabBarPosition = component.props.tabBarPosition;
	  if (init) {
	    // prevent mount animation
	    inkBarNodeStyle.display = 'none';
	  }
	  if (activeTab) {
	    var tabNode = activeTab;
	    var tabOffset = offset(tabNode);
	    var transformSupported = (0, _utils.isTransformSupported)(inkBarNodeStyle);
	    if (tabBarPosition === 'top' || tabBarPosition === 'bottom') {
	      var left = tabOffset.left - containerOffset.left;
	      var width = tabNode.offsetWidth;

	      // If tabNode'width width equal to wrapNode'width when tabBarPosition is top or bottom
	      // It means no css working, then ink bar should not have width until css is loaded
	      // Fix https://github.com/ant-design/ant-design/issues/7564
	      if (width === wrapNode.offsetWidth) {
	        width = 0;
	      } else if (styles.inkBar && styles.inkBar.width !== undefined) {
	        width = parseFloat(styles.inkBar.width, 10);
	        if (width) {
	          left = left + (tabNode.offsetWidth - width) / 2;
	        }
	      }
	      // use 3d gpu to optimize render
	      if (transformSupported) {
	        (0, _utils.setTransform)(inkBarNodeStyle, 'translate3d(' + left + 'px,0,0)');
	        inkBarNodeStyle.width = width + 'px';
	        inkBarNodeStyle.height = '';
	      } else {
	        inkBarNodeStyle.left = left + 'px';
	        inkBarNodeStyle.top = '';
	        inkBarNodeStyle.bottom = '';
	        inkBarNodeStyle.right = wrapNode.offsetWidth - left - width + 'px';
	      }
	    } else {
	      var top = tabOffset.top - containerOffset.top;
	      var height = tabNode.offsetHeight;
	      if (styles.inkBar && styles.inkBar.height !== undefined) {
	        height = parseFloat(styles.inkBar.height, 10);
	        if (height) {
	          top = top + (tabNode.offsetHeight - height) / 2;
	        }
	      }
	      if (transformSupported) {
	        (0, _utils.setTransform)(inkBarNodeStyle, 'translate3d(0,' + top + 'px,0)');
	        inkBarNodeStyle.height = height + 'px';
	        inkBarNodeStyle.width = '';
	      } else {
	        inkBarNodeStyle.left = '';
	        inkBarNodeStyle.right = '';
	        inkBarNodeStyle.top = top + 'px';
	        inkBarNodeStyle.bottom = wrapNode.offsetHeight - top - height + 'px';
	      }
	    }
	  }
	  inkBarNodeStyle.display = activeTab ? 'block' : 'none';
	}