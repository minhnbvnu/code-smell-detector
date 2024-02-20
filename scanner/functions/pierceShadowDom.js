function pierceShadowDom(selector, hostElements) {
        var targets = [];
        var innerHostsAcc = [];
        hostElements.forEach(function (host) {
          var simpleElems = host.querySelectorAll(selector);
          targets = targets.concat([].slice.call(simpleElems));
          var shadowRootElem = host.shadowRoot;
          var shadowChildren = shadowRootElem.querySelectorAll(selector);
          targets = targets.concat([].slice.call(shadowChildren));
          innerHostsAcc.push(findHostElements(shadowRootElem));
        });
        var innerHosts = flatten(innerHostsAcc);
        return {
          targets: targets,
          innerHosts: innerHosts
        };
      }