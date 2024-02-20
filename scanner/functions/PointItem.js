function PointItem(data, conversion, options) {
    this.props = {
      dot: {
        top: 0,
        width: 0,
        height: 0
      },
      content: {
        height: 0,
        marginLeft: 0
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