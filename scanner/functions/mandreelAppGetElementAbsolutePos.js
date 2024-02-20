function mandreelAppGetElementAbsolutePos(elementName)
{
	var element = Mandreel_document.getElementById(elementName);
	var res = new Object();
	res.x = 0; res.y = 0;
	if (element !== null)
	{
		if (element.getBoundingClientRect)
		{
			var viewportElement = Mandreel_document.documentElement;
			var box = element.getBoundingClientRect();
			var scrollLeft = viewportElement.scrollLeft;
			var scrollTop = viewportElement.scrollTop;
			res.x = box.left + scrollLeft;
			res.y = box.top + scrollTop;
		}
		else
		{ //for old browsers
			res.x = element.offsetLeft;
			res.y = element.offsetTop;
			var parentNode = element.parentNode;
			var borderWidth = null;
			while (offsetParent != null)
			{
				res.x += offsetParent.offsetLeft;
				res.y += offsetParent.offsetTop;
				var parentTagName = offsetParent.tagName.toLowerCase();
				if ((__isIEOld && parentTagName != "table") ||
					((__isFireFoxNew || __isChrome) &&
						parentTagName == "td"))
				{
					borderWidth = kGetBorderWidth(offsetParent);
					res.x += borderWidth.left;
					res.y += borderWidth.top;
				}

				if (offsetParent != Mandreel_document.body &&
				offsetParent != Mandreel_document.documentElement)
				{
					res.x -= offsetParent.scrollLeft;
					res.y -= offsetParent.scrollTop;
				}

				//next lines are necessary to fix the problem
				//with offsetParent
				if (!__isIE && !__isOperaOld || __isIENew)
				{
					while (offsetParent != parentNode &&
						parentNode !== null) {
						res.x -= parentNode.scrollLeft;
						res.y -= parentNode.scrollTop;
						if (__isFireFoxOld || __isWebKit)
						{
						    borderWidth =
						     kGetBorderWidth(parentNode);
						    res.x += borderWidth.left;
						    res.y += borderWidth.top;
						}
						parentNode = parentNode.parentNode;
					}
				}

				parentNode = offsetParent.parentNode;
				offsetParent = offsetParent.offsetParent;
			}
		}
	}
	return res;
}