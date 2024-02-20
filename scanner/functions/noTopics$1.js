function noTopics$1(source) {
      var TOPICS_PROPERTY_NAME = 'browsingTopics';
      if (Document instanceof Object === false) {
        return;
      }
      if (!Object.prototype.hasOwnProperty.call(Document.prototype, TOPICS_PROPERTY_NAME) || Document.prototype[TOPICS_PROPERTY_NAME] instanceof Function === false) {
        return;
      }

      // document.browsingTopics() is async function so it's better to return noopPromiseResolve()
      // https://github.com/patcg-individual-drafts/topics#the-api-and-how-it-works
      Document.prototype[TOPICS_PROPERTY_NAME] = function () {
        return noopPromiseResolve('[]');
      };
      hit(source);
    }