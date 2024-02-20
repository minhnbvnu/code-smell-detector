function AstWalker(childrenWalkers, pre, post, options, state) {
            this.childrenWalkers = childrenWalkers;
            this.pre = pre;
            this.post = post;
            this.options = options;
            this.state = state;
        }