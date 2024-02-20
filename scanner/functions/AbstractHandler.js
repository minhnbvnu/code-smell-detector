function AbstractHandler(adaptor, priority) {
            if (priority === void 0) {
                priority = 5;
            }
            this.documentClass = DefaultMathDocument;
            this.adaptor = adaptor;
            this.priority = priority;
        }