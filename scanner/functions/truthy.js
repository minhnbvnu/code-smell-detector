function truthy(val) {
       return isString(val) ? val.length : !!val;
     }