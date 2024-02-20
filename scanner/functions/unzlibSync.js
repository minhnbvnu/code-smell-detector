function unzlibSync(data, out) {
    return inflt((zlv(data), data.subarray(2, -4)), out);
}