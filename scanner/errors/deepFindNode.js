function deepFindNode(nodes) {
        if (nodes.length) {
          for(let i = 0; i < nodes.length; i++) {
            
            let node = nodes[i];
            if (isHideStyle(node) || (getArgtype($this.includeElement) === 'function' && $this.includeElement(node, drawBlock) == false)) continue;
            let childNodes = node.childNodes;
            let hasChildText = false;
            let background = getStyle(node, 'backgroundImage');
            let backgroundHasurl = background.match(/url\(.+?\)/);
            
            backgroundHasurl = backgroundHasurl && backgroundHasurl.length;

            for(let j = 0; j < childNodes.length; j++) {
              if (childNodes[j].nodeType === 3 && childNodes[j].textContent.trim().length) {
                hasChildText = true;
                break;
              }
            }

            if ((includeElement(ELEMENTS, node) || 
              backgroundHasurl ||
              (node.nodeType === 3 && node.textContent.trim().length) || hasChildText ||
              isCustomCardBlock(node)) && !$this.inHeader(node)) {
                const {t, l, w, h} = getRect(node);
                
                if (w > 0 && h > 0 && l >= 0 && l < win_w && win_h - t >= 20 && t >= 0) {
                  const {
                    paddingTop,
                    paddingLeft,
                    paddingBottom,
                    paddingRight
                  } = getPadding(node);
                  drawBlock({
                    width: wPercent(w - paddingLeft - paddingRight), 
                    height: hPercent(h - paddingTop - paddingBottom), 
                    top: hPercent(t + paddingTop), 
                    left: wPercent(l + paddingLeft),
                    radius: getStyle(node, 'border-radius')
                  });
                }
            } else if (childNodes && childNodes.length) {
              if (!hasChildText) {
                deepFindNode(childNodes);
              }
            }
          }
        }
      }