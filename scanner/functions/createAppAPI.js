function createAppAPI(render, hydrate) {
    return function createApp(rootComponent, rootProps = null) {
      if (!isFunction(rootComponent)) {
        rootComponent = extend({}, rootComponent);
      }
      if (rootProps != null && !isObject(rootProps)) {
        warn(`root props passed to app.mount() must be an object.`);
        rootProps = null;
      }
      const context = createAppContext();
      {
        Object.defineProperty(context.config, "unwrapInjectedRef", {
          get() {
            return true;
          },
          set() {
            warn(
              `app.config.unwrapInjectedRef has been deprecated. 3.3 now always unwraps injected refs in Options API.`
            );
          }
        });
      }
      const installedPlugins = /* @__PURE__ */ new Set();
      let isMounted = false;
      const app = context.app = {
        _uid: uid$1++,
        _component: rootComponent,
        _props: rootProps,
        _container: null,
        _context: context,
        _instance: null,
        version,
        get config() {
          return context.config;
        },
        set config(v) {
          {
            warn(
              `app.config cannot be replaced. Modify individual options instead.`
            );
          }
        },
        use(plugin, ...options) {
          if (installedPlugins.has(plugin)) {
            warn(`Plugin has already been applied to target app.`);
          } else if (plugin && isFunction(plugin.install)) {
            installedPlugins.add(plugin);
            plugin.install(app, ...options);
          } else if (isFunction(plugin)) {
            installedPlugins.add(plugin);
            plugin(app, ...options);
          } else {
            warn(
              `A plugin must either be a function or an object with an "install" function.`
            );
          }
          return app;
        },
        mixin(mixin) {
          {
            if (!context.mixins.includes(mixin)) {
              context.mixins.push(mixin);
            } else {
              warn(
                "Mixin has already been applied to target app" + (mixin.name ? `: ${mixin.name}` : "")
              );
            }
          }
          return app;
        },
        component(name, component) {
          {
            validateComponentName(name, context.config);
          }
          if (!component) {
            return context.components[name];
          }
          if (context.components[name]) {
            warn(`Component "${name}" has already been registered in target app.`);
          }
          context.components[name] = component;
          return app;
        },
        directive(name, directive) {
          {
            validateDirectiveName(name);
          }
          if (!directive) {
            return context.directives[name];
          }
          if (context.directives[name]) {
            warn(`Directive "${name}" has already been registered in target app.`);
          }
          context.directives[name] = directive;
          return app;
        },
        mount(rootContainer, isHydrate, isSVG) {
          if (!isMounted) {
            if (rootContainer.__vue_app__) {
              warn(
                `There is already an app instance mounted on the host container.
 If you want to mount another app on the same host container, you need to unmount the previous app by calling \`app.unmount()\` first.`
              );
            }
            const vnode = createVNode(rootComponent, rootProps);
            vnode.appContext = context;
            {
              context.reload = () => {
                render(cloneVNode(vnode), rootContainer, isSVG);
              };
            }
            if (isHydrate && hydrate) {
              hydrate(vnode, rootContainer);
            } else {
              render(vnode, rootContainer, isSVG);
            }
            isMounted = true;
            app._container = rootContainer;
            rootContainer.__vue_app__ = app;
            {
              app._instance = vnode.component;
              devtoolsInitApp(app, version);
            }
            return getExposeProxy(vnode.component) || vnode.component.proxy;
          } else {
            warn(
              `App has already been mounted.
If you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. \`const createMyApp = () => createApp(App)\``
            );
          }
        },
        unmount() {
          if (isMounted) {
            render(null, app._container);
            {
              app._instance = null;
              devtoolsUnmountApp(app);
            }
            delete app._container.__vue_app__;
          } else {
            warn(`Cannot unmount an app that is not mounted.`);
          }
        },
        provide(key, value) {
          if (key in context.provides) {
            warn(
              `App already provides property with key "${String(key)}". It will be overwritten with the new value.`
            );
          }
          context.provides[key] = value;
          return app;
        },
        runWithContext(fn) {
          currentApp = app;
          try {
            return fn();
          } finally {
            currentApp = null;
          }
        }
      };
      return app;
    };
  }