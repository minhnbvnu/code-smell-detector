function insertStyle(i,o){var s=o.insertionPoint,u=findPrevNode(o);if(!1!==u&&u.parent)u.parent.insertBefore(i,u.node);else if(s&&"number"==typeof s.nodeType){var C=s,_=C.parentNode;_&&_.insertBefore(i,C.nextSibling)}else ya().appendChild(i)}