function Hilitor(id, tag)
{

  var targetNode = document.getElementById(id) || document.body;
  var hiliteTag = tag || "EM";
  var skipTags = new RegExp("^(?:" + hiliteTag + "|SCRIPT|FORM|SPAN)$");
  var colors = ["#ff6", "#a0ffff", "#9f9", "#f99", "#f6f"];
  var wordColor = [];
  var colorIdx = 0;
  var matchRegex = "";
  var matchingSlides = [];

  this.setRegex = function(input)
  {
    input = input.replace(/^[^\w]+|[^\w]+$/g, "").replace(/[^\w'-]+/g, "|");
    matchRegex = new RegExp("(" + input + ")","i");
  }

  this.getRegex = function()
  {
    return matchRegex.toString().replace(/^\/\\b\(|\)\\b\/i$/g, "").replace(/\|/g, " ");
  }

  // recursively apply word highlighting
  this.hiliteWords = function(node)
  {
    if(node == undefined || !node) return;
    if(!matchRegex) return;
    if(skipTags.test(node.nodeName)) return;

    if(node.hasChildNodes()) {
      for(var i=0; i < node.childNodes.length; i++)
        this.hiliteWords(node.childNodes[i]);
    }
    if(node.nodeType == 3) { // NODE_TEXT
      if((nv = node.nodeValue) && (regs = matchRegex.exec(nv))) {
      	//find the slide's section element and save it in our list of matching slides
      	var secnode = node.parentNode;
      	while (secnode.nodeName != 'SECTION') {
      		secnode = secnode.parentNode;
      	}
      	
      	var slideIndex = Reveal.getIndices(secnode);
      	var slidelen = matchingSlides.length;
      	var alreadyAdded = false;
      	for (var i=0; i < slidelen; i++) {
      		if ( (matchingSlides[i].h === slideIndex.h) && (matchingSlides[i].v === slideIndex.v) ) {
      			alreadyAdded = true;
      		}
      	}
      	if (! alreadyAdded) {
      		matchingSlides.push(slideIndex);
      	}
      	
        if(!wordColor[regs[0].toLowerCase()]) {
          wordColor[regs[0].toLowerCase()] = colors[colorIdx++ % colors.length];
        }

        var match = document.createElement(hiliteTag);
        match.appendChild(document.createTextNode(regs[0]));
        match.style.backgroundColor = wordColor[regs[0].toLowerCase()];
        match.style.fontStyle = "inherit";
        match.style.color = "#000";

        var after = node.splitText(regs.index);
        after.nodeValue = after.nodeValue.substring(regs[0].length);
        node.parentNode.insertBefore(match, after);
      }
    }
  };

  // remove highlighting
  this.remove = function()
  {
    var arr = document.getElementsByTagName(hiliteTag);
    while(arr.length && (el = arr[0])) {
      el.parentNode.replaceChild(el.firstChild, el);
    }
  };

  // start highlighting at target node
  this.apply = function(input)
  {
    if(input == undefined || !input) return;
    this.remove();
    this.setRegex(input);
    this.hiliteWords(targetNode);
    return matchingSlides;
  };

}