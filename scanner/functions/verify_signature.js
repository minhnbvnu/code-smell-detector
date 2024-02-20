function verify_signature(file_data) {
  var match = PATTERN.exec(file_data);
  if (!match)
    return exports.SIGN_UNSIGNED;
  // Replace the signature with the TOKEN, then hash and see if it matches
  // the value in the file.  For backwards compatibility, also try with
  // OLDTOKEN if that doesn't match.
  var k, token, with_token, actual_md5, expected_md5 = match[1];
  for (k in TOKENS) {
    token = TOKENS[k];
    with_token = file_data.replace(PATTERN, '@'+'generated '+token);
    actual_md5 = md5_hash_hex(with_token, 'utf8');
    if (expected_md5 === actual_md5)
      return exports.SIGN_OK;
  }
  return exports.SIGN_INVALID;
}