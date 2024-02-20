function delegate_a3(area, key, $each, $id) {
    if ($id == null) {
      $id = Object(external_window_Recore_["xId"])($each, key);
    }
    var iter = area.c(A.a3, true).w({
      $id: $id,
      $each: $each,
      'item': $each,
      'index': key
    });
    return Object(external_window_Recore_["X"])(iter, render5);
  }