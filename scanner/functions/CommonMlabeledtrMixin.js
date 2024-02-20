function CommonMlabeledtrMixin(Base) {
        return (function (_super) {
            __extends(class_2, _super);
            function class_2() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(class_2.prototype, "numCells", {
                get: function () {
                    return Math.max(0, this.childNodes.length - 1);
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(class_2.prototype, "labeled", {
                get: function () {
                    return true;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(class_2.prototype, "tableCells", {
                get: function () {
                    return this.childNodes.slice(1);
                },
                enumerable: false,
                configurable: true
            });
            class_2.prototype.getChild = function (i) {
                return this.childNodes[i + 1];
            };
            class_2.prototype.getChildBBoxes = function () {
                return this.childNodes.slice(1).map(function (cell) { return cell.getBBox(); });
            };
            return class_2;
        }(Base));
    }