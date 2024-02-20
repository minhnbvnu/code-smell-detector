function Component(props, context, updater) {
              this.props = props;
              this.context = context;
              this.refs = emptyObject;
              this.updater = updater || ReactNoopUpdateQueue;
            }