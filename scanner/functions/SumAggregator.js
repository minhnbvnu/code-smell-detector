function SumAggregator(field) {
        this.field_ = field;
        this.init = function () {
            this.sum_ = null;
        };
        this.accumulate = function (item) {
            var val = item[this.field_];
            if (val != null && val !== "" && !isNaN(val)) {
                this.sum_ += parseFloat(val);
            }
        };
        this.storeResult = function (groupTotals) {
            if (!groupTotals.sum) {
                groupTotals.sum = {};
            }
            groupTotals.sum[this.field_] = this.sum_;
        };
    }