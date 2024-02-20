function BitFieldClass() {
        var names = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            names[_i] = arguments[_i];
        }
        var Bits = (function (_super) {
            __extends(Bits, _super);
            function Bits() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return Bits;
        }(BitField));
        Bits.allocate.apply(Bits, __spreadArray([], __read(names), false));
        return Bits;
    }