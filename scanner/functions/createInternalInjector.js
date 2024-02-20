function createInternalInjector(cache, factory) {

    function getService(serviceName, caller) {
      if (cache.hasOwnProperty(serviceName)) {
        if (cache[serviceName] === INSTANTIATING) {
          throw $injectorMinErr('cdep', 'Circular dependency found: {0}',
                    serviceName + ' <- ' + path.join(' <- '));
        }
        return cache[serviceName];
      } else {
        try {
          path.unshift(serviceName);
          cache[serviceName] = INSTANTIATING;
          return cache[serviceName] = factory(serviceName, caller);
        } catch (err) {
          if (cache[serviceName] === INSTANTIATING) {
            delete cache[serviceName];
          }
          throw err;
        } finally {
          path.shift();
        }
      }
    }


    function injectionArgs(fn, locals, serviceName) {
      var args = [],
          $inject = createInjector.$$annotate(fn, strictDi, serviceName);

      for (var i = 0, length = $inject.length; i < length; i++) {
        var key = $inject[i];
        if (typeof key !== 'string') {
          throw $injectorMinErr('itkn',
                  'Incorrect injection token! Expected service name as string, got {0}', key);
        }
        args.push(locals && locals.hasOwnProperty(key) ? locals[key] :
                                                         getService(key, serviceName));
      }
      return args;
    }

    function isClass(func) {
      // IE 9-11 do not support classes and IE9 leaks with the code below.
      if (msie <= 11) {
        return false;
      }
      // Workaround for MS Edge.
      // Check https://connect.microsoft.com/IE/Feedback/Details/2211653
      return typeof func === 'function'
        && /^(?:class\s|constructor\()/.test(Function.prototype.toString.call(func));
    }

    function invoke(fn, self, locals, serviceName) {
      if (typeof locals === 'string') {
        serviceName = locals;
        locals = null;
      }

      var args = injectionArgs(fn, locals, serviceName);
      if (isArray(fn)) {
        fn = fn[fn.length - 1];
      }

      if (!isClass(fn)) {
        // http://jsperf.com/angularjs-invoke-apply-vs-switch
        // #5388
        return fn.apply(self, args);
      } else {
        args.unshift(null);
        return new (Function.prototype.bind.apply(fn, args))();
      }
    }


    function instantiate(Type, locals, serviceName) {
      // Check if Type is annotated and use just the given function at n-1 as parameter
      // e.g. someModule.factory('greeter', ['$window', function(renamed$window) {}]);
      var ctor = (isArray(Type) ? Type[Type.length - 1] : Type);
      var args = injectionArgs(Type, locals, serviceName);
      // Empty object at position 0 is ignored for invocation with `new`, but required.
      args.unshift(null);
      return new (Function.prototype.bind.apply(ctor, args))();
    }


    return {
      invoke: invoke,
      instantiate: instantiate,
      get: getService,
      annotate: createInjector.$$annotate,
      has: function(name) {
        return providerCache.hasOwnProperty(name + providerSuffix) || cache.hasOwnProperty(name);
      }
    };
  }