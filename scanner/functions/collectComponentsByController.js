function collectComponentsByController(map, controller, components) {
    components.forEach((component) => {
      let target = targetForComponent(component);

      if (target === undefined || target instanceof Controller) {
        /**
         * If our parent is already added, don't add ourself again.
         *
         * This is to prevent something like this:
         *
         *    {{!-- app/templates/application.hbs}}
         *    <Parent>
         *      <Child />
         *    </Parent>
         *
         * Without this check, both the parent and the yielded child will be
         * considered "top level" since they both have the controller as their
         * target.
         */
        if (target !== controller) {
          if (!map.has(target)) {
            map.set(target, []);
          }

          map.get(target).push(component);
        }

        collectComponentsByController(map, target, getChildViews(component));
      } else {
        collectComponentsByController(
          map,
          controller,
          getChildViews(component)
        );
      }
    });
  }