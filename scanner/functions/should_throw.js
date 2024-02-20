function should_throw(val, name) {
            if (!name) {
                name = ((typeof val == "object" && val) ? "object" : format_value(val))
            }
            assert.throws(function() {
              indexedDB.open('test', val);
            }, TypeError, null, "Calling open() with version argument " + name + " should throw TypeError.");
        }