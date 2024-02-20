function firstChange() {
    second = [];
    third = [];
    checked[0] = selectedIndex;
    var firstCity = city[selectedIndex];
    if (firstCity.hasOwnProperty('sub')) {
      creatList(firstCity.sub, second);

      var secondCity = city[selectedIndex].sub[0]
      if (secondCity.hasOwnProperty('sub')) {
        creatList(secondCity.sub, third);
      } else {
        third = [{text: '', value: 0}];
        checked[2] = 0;
      }
    } else {
      second = [{text: '', value: 0}];
      third = [{text: '', value: 0}];
      checked[1] = 0;
      checked[2] = 0;
    }

    picker.refillColumn(1, second);
    picker.refillColumn(2, third);
    picker.scrollColumn(1, 0)
    picker.scrollColumn(2, 0)
  }