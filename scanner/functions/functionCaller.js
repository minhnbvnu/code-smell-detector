function functionCaller(name, context, index, currentFileInfo) {
            this.name = name.toLowerCase();
            this.index = index;
            this.context = context;
            this.currentFileInfo = currentFileInfo;
            this.func = context.frames[0].functionRegistry.get(this.name);
        }