function RangeItem(data, conversion, options) {
    this.props = {
      content: {
        width: 0
      }
    };
    this.overflow = false; // if contents can overflow (css styling), this flag is set to true

    // validate data
    if (data) {
      if (data.start == undefined) {
        throw new Error('Property "start" missing in item ' + data.id);
      }
      if (data.end == undefined) {
        throw new Error('Property "end" missing in item ' + data.id);
      }
    }

    Item.call(this, data, conversion, options);
  }