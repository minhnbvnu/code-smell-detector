function toDataView(data) {
    if (data instanceof DataView) {
      return data;
    }
    if (ArrayBuffer.isView(data)) {
      return new DataView(data.buffer);
    }
    if (data instanceof ArrayBuffer) {
      return new DataView(data);
    }
    throw new Error("toDataView");
  }