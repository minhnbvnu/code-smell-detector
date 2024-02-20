function getAPI() {
    // export public properties
    var publicAPI = {
      myThing: {},
      myArray: [],
      myBoolean: true,
      myDate: new Date(),
      myNull: null,
      myNumber: 1337,
      myObject: {},
      myRegExp: /\s/,
      myString: 'test',
      myUndefined: undefined
    };

    // add public methods
    exportMyMethod(publicAPI);

    // return api
    return publicAPI;
  }