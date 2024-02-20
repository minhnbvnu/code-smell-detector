function checkFooDiv(e) {
        expect(e.childNodes.length).toBe(1);
        expectNode(e.firstChild, TEXT_NODE_TYPE, 'foo');
      }