function outerEquality(e1, e2) {
        var diff = [];
        
        // do the tags agree?
        if(e1.nodeType===1 && e2.nodeType===1) {
          if(e1.nodeName !== e2.nodeName) {
            diff.push(["nodeName",e1.nodeName,e2.nodeName]);
          }
        }

        // do the attributes agree?
        if(e1.attributes && e2.attributes) {
          var attributes = e1.attributes,
              len = attributes.length,
              a, a1, a2, attr;
          
          // attribute insertion/modification diff
          for (a=0; a<len; a++) {
            attr = attributes[a].nodeName;
            a1 = e1.getAttribute(attr);
            a2 = e2.getAttribute(attr);
            if(a1==a2) continue;
            diff.push([attr,a1,a2]);
          }
          
          // attribute removal diff
          attributes = e2.attributes;
          len = attributes.length;
          for (a=0; a<len; a++) {
            attr = attributes[a].nodeName;
            a1 = e1.getAttribute(attr);
            a2 = e2.getAttribute(attr);
            if(a1==a2) continue;
            diff.push([attr,a1,a2]);
          }
        }
        return diff;
      }