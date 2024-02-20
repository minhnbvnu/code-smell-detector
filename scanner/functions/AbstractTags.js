function AbstractTags() {
            this.counter = 0;
            this.allCounter = 0;
            this.configuration = null;
            this.ids = {};
            this.allIds = {};
            this.labels = {};
            this.allLabels = {};
            this.redo = false;
            this.refUpdate = false;
            this.currentTag = new TagInfo();
            this.history = [];
            this.stack = [];
            this.enTag = function (node, tag) {
                var nf = this.configuration.nodeFactory;
                var cell = nf.create('node', 'mtd', [node]);
                var row = nf.create('node', 'mlabeledtr', [tag, cell]);
                var table = nf.create('node', 'mtable', [row], {
                    side: this.configuration.options['tagSide'],
                    minlabelspacing: this.configuration.options['tagIndent'],
                    displaystyle: true
                });
                return table;
            };
        }