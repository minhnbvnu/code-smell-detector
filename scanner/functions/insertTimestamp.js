function insertTimestamp(timestamps, values, ts, key, value) {
  // Find number that equals the timestamp
  const targetIndex = timestamps.findIndex(x => Math.abs(x - ts) < Number.EPSILON);
  if (targetIndex !== -1) {
    // Add to existing entry
    const primitives = values[targetIndex];
    if (!primitives[key]) {
      primitives[key] = [];
    }

    primitives[key].push(value);
  } else {
    // Insert new entry
    let insertIndex = timestamps.findIndex(x => x > ts);
    if (insertIndex === -1) {
      insertIndex = timestamps.length;
    }

    timestamps.splice(insertIndex, 0, ts);
    const primitives = {
      [key]: [value]
    };
    values.splice(insertIndex, 0, primitives);
  }
}