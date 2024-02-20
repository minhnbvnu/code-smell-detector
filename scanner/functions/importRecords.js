function importRecords() {
    $`freecdn db --import <<< "
      SnVzdCBSZWFkIHRoZSBJbnN0cnVjdGlvbnMgKl5fXio= https://a.foo.com/1_1.gif
      SnVzdCBSZWFkIHRoZSBJbnN0cnVjdGlvbnMgKl5fXio= https://b.foo.com/2_2.gif
      T2YgQ291cnNlIEkgU3RpbGwgTG92ZSBZb3UgQC1fLUA= https://x.bar.com/111.png
      T2YgQ291cnNlIEkgU3RpbGwgTG92ZSBZb3UgQC1fLUA= https://y.bar.com/222.png"
    `
  }