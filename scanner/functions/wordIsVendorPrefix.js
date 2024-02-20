function wordIsVendorPrefix(word) {
      return word.toLowerCase().match(vendorPrefixesRegexp);
    }