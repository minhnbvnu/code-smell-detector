function getMarginStyle(index, tabBarPosition) {
	  var marginDirection = isVertical(tabBarPosition) ? 'marginTop' : 'marginLeft';
	  return (0, _defineProperty3['default'])({}, marginDirection, -index * 100 + '%');
	}