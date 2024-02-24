function ATInternetSmartTag(source) {
      var setNoopFuncWrapper = {
        set: noopFunc
      };
      var sendNoopFuncWrapper = {
        send: noopFunc
      };
      var ecommerceWrapper = {
        displayCart: {
          products: setNoopFuncWrapper,
          cart: setNoopFuncWrapper
        },
        updateCart: {
          cart: setNoopFuncWrapper
        },
        displayProduct: {
          products: setNoopFuncWrapper
        },
        displayPageProduct: {
          products: setNoopFuncWrapper
        },
        addProduct: {
          products: setNoopFuncWrapper
        },
        removeProduct: {
          products: setNoopFuncWrapper
        }
      };

      // eslint-disable-next-line new-cap, func-names
      var tag = function tag() {};
      tag.prototype = {
        setConfig: noopFunc,
        setParam: noopFunc,
        dispatch: noopFunc,
        customVars: setNoopFuncWrapper,
        publisher: setNoopFuncWrapper,
        order: setNoopFuncWrapper,
        click: sendNoopFuncWrapper,
        clickListener: sendNoopFuncWrapper,
        internalSearch: {
          set: noopFunc,
          send: noopFunc
        },
        ecommerce: ecommerceWrapper,
        identifiedVisitor: {
          unset: noopFunc
        },
        page: {
          set: noopFunc,
          send: noopFunc
        },
        selfPromotion: {
          add: noopFunc,
          send: noopFunc
        },
        privacy: {
          setVisitorMode: noopFunc,
          getVisitorMode: noopFunc,
          hit: noopFunc
        },
        richMedia: {
          add: noopFunc,
          send: noopFunc,
          remove: noopFunc,
          removeAll: noopFunc
        }
      };
      var smartTagWrapper = {
        Tracker: {
          Tag: tag
        }
      };
      window.ATInternet = smartTagWrapper;
      hit(source);
    }