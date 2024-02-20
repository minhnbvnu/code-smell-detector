function memcmp(data, data_off, str, size) {
    for (var i = 0; i < size; i++)
      if (data[data_off + i] != str.charCodeAt(i)) return true;
    return false;
  }