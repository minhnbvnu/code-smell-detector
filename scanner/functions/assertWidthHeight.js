function assertWidthHeight(description, size, expectedWidth, expectedHeight) {
    if (typeof expectedWidth === "number") {
      assert.strictEqual(size.width, expectedWidth, `${description}: width`);
    }
    if (typeof expectedHeight === "number") {
      assert.strictEqual(size.height, expectedHeight, `${description}: height`);
    }
  }