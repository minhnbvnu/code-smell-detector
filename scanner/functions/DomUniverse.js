function DomUniverse () {
      var clone$1 = function (element) {
        return Element.fromDom(element.dom().cloneNode(false));
      };
      var document = function (element) {
        return element.dom().ownerDocument;
      };
      var isBoundary = function (element) {
        if (!isElement(element)) {
          return false;
        }
        if (name(element) === 'body') {
          return true;
        }
        return contains(TagBoundaries, name(element));
      };
      var isEmptyTag = function (element) {
        if (!isElement(element)) {
          return false;
        }
        return contains([
          'br',
          'img',
          'hr',
          'input'
        ], name(element));
      };
      var isNonEditable = function (element) {
        return isElement(element) && get$1(element, 'contenteditable') === 'false';
      };
      var comparePosition = function (element, other) {
        return element.dom().compareDocumentPosition(other.dom());
      };
      var copyAttributesTo = function (source, destination) {
        var as = clone(source);
        setAll(destination, as);
      };
      return {
        up: constant({
          selector: ancestor$1,
          closest: closest$1,
          predicate: ancestor,
          all: parents
        }),
        down: constant({
          selector: descendants$1,
          predicate: descendants
        }),
        styles: constant({
          get: get$2,
          getRaw: getRaw,
          set: set$1,
          remove: remove$1
        }),
        attrs: constant({
          get: get$1,
          set: set,
          remove: remove,
          copyTo: copyAttributesTo
        }),
        insert: constant({
          before: before,
          after: after,
          afterAll: after$1,
          append: append,
          appendAll: append$1,
          prepend: prepend,
          wrap: wrap
        }),
        remove: constant({
          unwrap: unwrap,
          remove: remove$2
        }),
        create: constant({
          nu: Element.fromTag,
          clone: clone$1,
          text: Element.fromText
        }),
        query: constant({
          comparePosition: comparePosition,
          prevSibling: prevSibling,
          nextSibling: nextSibling
        }),
        property: constant({
          children: children,
          name: name,
          parent: parent,
          document: document,
          isText: isText,
          isComment: isComment,
          isElement: isElement,
          getText: get$3,
          setText: set$2,
          isBoundary: isBoundary,
          isEmptyTag: isEmptyTag,
          isNonEditable: isNonEditable
        }),
        eq: eq,
        is: is$1
      };
    }