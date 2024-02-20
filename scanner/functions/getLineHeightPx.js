function getLineHeightPx(element) {
	  var computed = getComputedStyle(element);
	  var div = document.createElement('div');
	  div.style.fontFamily = computed.fontFamily;
	  div.style.fontSize = computed.fontSize;
	  div.style.fontStyle = computed.fontStyle;
	  div.style.fontWeight = computed.fontWeight;
	  div.style.lineHeight = computed.lineHeight;
	  div.style.position = 'absolute';
	  div.textContent = 'M';

	  var documentBody = document.body;
	  !documentBody ?  true ? invariant(false, 'Missing document.body') : invariant(false) : void 0;

	  // forced layout here
	  documentBody.appendChild(div);
	  var rect = div.getBoundingClientRect();
	  documentBody.removeChild(div);

	  return rect.height;
	}