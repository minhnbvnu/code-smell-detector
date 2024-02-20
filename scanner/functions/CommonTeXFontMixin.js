function CommonTeXFontMixin(Base) {
        var _a;
        return _a = (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            class_1.prototype.getDelimiterData = function (n) {
                return this.getChar('-smallop', n) || this.getChar('-size4', n);
            };
            return class_1;
        }(Base)),
            _a.NAME = 'TeX',
            _a.defaultVariants = __spreadArray(__spreadArray([], __read(Base.defaultVariants), false), [
                ['-smallop', 'normal'],
                ['-largeop', 'normal'],
                ['-size3', 'normal'],
                ['-size4', 'normal'],
                ['-tex-calligraphic', 'italic'],
                ['-tex-bold-calligraphic', 'bold-italic'],
                ['-tex-oldstyle', 'normal'],
                ['-tex-bold-oldstyle', 'bold'],
                ['-tex-mathit', 'italic'],
                ['-tex-variant', 'normal']
            ], false),
            _a.defaultCssFonts = __assign(__assign({}, Base.defaultCssFonts), { '-smallop': ['serif', false, false], '-largeop': ['serif', false, false], '-size3': ['serif', false, false], '-size4': ['serif', false, false], '-tex-calligraphic': ['cursive', true, false], '-tex-bold-calligraphic': ['cursive', true, true], '-tex-oldstyle': ['serif', false, false], '-tex-bold-oldstyle': ['serif', false, true], '-tex-mathit': ['serif', true, false] }),
            _a.defaultSizeVariants = ['normal', '-smallop', '-largeop', '-size3', '-size4', '-tex-variant'],
            _a.defaultStretchVariants = ['-size4'],
            _a;
    }