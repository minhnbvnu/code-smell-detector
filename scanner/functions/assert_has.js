function assert_has(short_name, json, result, result2) {
    var long_name = mime[short_name];
    this.test.assertFalse(json[0].data.hasOwnProperty(short_name),
            "toJSON()   representation doesn't use " + short_name);
    this.test.assertTrue(json[0].data.hasOwnProperty(long_name),
            'toJSON()   representation uses ' + long_name);
    this.test.assertTrue(result.data.hasOwnProperty(long_name),
            'toJSON()   original embedded JSON keeps ' + long_name);
    this.test.assertTrue(result2.data.hasOwnProperty(long_name),
            'fromJSON() embedded ' + short_name + ' gets mime key ' + long_name);
}