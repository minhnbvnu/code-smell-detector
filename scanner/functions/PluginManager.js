function PluginManager(less) {
            this.less = less;
            this.visitors = [];
            this.preProcessors = [];
            this.postProcessors = [];
            this.installedPlugins = [];
            this.fileManagers = [];
            this.iterator = -1;
            this.pluginCache = {};
            this.Loader = new less.PluginLoader(less);
        }