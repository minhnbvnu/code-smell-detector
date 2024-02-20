function RepeatItem() {
      var self = this;
      this.scope = scope.$new();
      this.id = 'item' + (nextItemId++);
      transclude(this.scope, function(clone) {
        self.element = clone;
        self.element.data('$$collectionRepeatItem', self);
        // TODO destroy
        self.node = clone[0];
        // Batch style setting to lower repaints
        self.node.style[ionic.CSS.TRANSFORM] = 'translate3d(-9999px,-9999px,0)';
        self.node.style.cssText += ' height: 0px; width: 0px;';
        ionic.Utils.disconnectScope(self.scope);
        containerNode.appendChild(self.node);
        self.images = clone[0].getElementsByTagName('img');
      });
    }