function cantSend(obj, assert) {
    try {
      EmberDebug.inspect(obj);
      assert.ok(false);
    } catch (e) {
      // Intentionally empty
    }
  }