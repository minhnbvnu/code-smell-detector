function getWrappersByIndex(index) {
        var elements = node.getElementsByTagName('*'), wrappers = [];
        index = typeof index === 'number' ? '' + index : null;
        for (var i = 0; i < elements.length; i++) {
          var element = elements[i], dataIndex = element.getAttribute('data-mce-index');
          if (dataIndex !== null && dataIndex.length && hasClass(element)) {
            if (dataIndex === index || index === null) {
              wrappers.push(element);
            }
          }
        }
        return wrappers;
      }