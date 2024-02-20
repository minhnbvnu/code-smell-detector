function roundTrip (key, inArray) {
    return decode(encode(key, inArray), inArray);
}