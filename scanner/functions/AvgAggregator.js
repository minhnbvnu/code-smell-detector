function AvgAggregator(field) {
        this.field_ = field;
        this.init = function () {
            this.count_ = 0;
            this.nonNullCount_ = 0;
            this.sum_ = 0;
        };
        this.accumulate = function (item) {
            var val = item[this.field_];
            this.count_++;
            if (val != null && val !== "" && !isNaN(val)) {
                this.nonNullCount_++;
                this.sum_ += parseFloat(val);
            }
        };
        this.storeResult = function (groupTotals) {
            if (!groupTotals.avg) {
                groupTotals.avg = {};
            }
            if (this.nonNullCount_ !== 0) {
                groupTotals.avg[this.field_] = this.sum_ / this.nonNullCount_;
            }
        };
    }