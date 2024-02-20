function TransportError(reason, description, context) {
            var _this;

            _classCallCheck(this, TransportError);

            _this = _super.call(this, reason);
            _this.description = description;
            _this.context = context;
            _this.type = "TransportError";
            return _this;
        }