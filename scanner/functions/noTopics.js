function noTopics(source) {
        var TOPICS_PROPERTY_NAME = "browsingTopics";
        if (Document instanceof Object === false) {
          return;
        }
        if (!Object.prototype.hasOwnProperty.call(Document.prototype, TOPICS_PROPERTY_NAME) || Document.prototype[TOPICS_PROPERTY_NAME] instanceof Function === false) {
          return;
        }
        Document.prototype[TOPICS_PROPERTY_NAME] = function () {
          return noopPromiseResolve("[]");
        };
        hit(source);
      }