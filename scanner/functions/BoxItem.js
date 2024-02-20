function BoxItem(data, conversion, options) {
    this.props = {
      dot: {
        width: 0,
        height: 0
      },
      line: {
        width: 0,
        height: 0
      }
    };

    // validate data
    if (data) {
      if (data.start == undefined) {
        throw new Error('Property "start" missing in item ' + data);
      }
    }

    Item.call(this, data, conversion, options);
  }