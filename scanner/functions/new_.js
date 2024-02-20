function new_(constructor, argumentList) {
          if (!(constructor instanceof Function)) {
            throw new TypeError("new_ called with constructor type " + typeof constructor + " which is not a function");
          }
          var dummy = createNamedFunction(constructor.name || "unknownFunctionName", function() {
          });
          dummy.prototype = constructor.prototype;
          var obj = new dummy();
          var r = constructor.apply(obj, argumentList);
          return r instanceof Object ? r : obj;
        }