function sha512sum(content) {
  const sum = crypto.createHash("sha512");
  sum.update(content);
  return sum.digest("hex");
}