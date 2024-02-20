function objlit(type) {
    if (type == "{") return contCommasep(objprop, "}");
  }