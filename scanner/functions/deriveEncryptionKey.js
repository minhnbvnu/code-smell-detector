async function deriveEncryptionKey(password, salt, iterations, digest) {
  return new Promise((resolve, reject) =>
    pbkdf2(
      password,
      salt,
      iterations,
      secretbox.keyLength,
      digest,
      (err, key) => (err ? reject(err) : resolve(key)),
    ),
  );
}