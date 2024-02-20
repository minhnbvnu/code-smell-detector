function is_valid_autocomplete(autocomplete) {
    if (autocomplete === true) {
      return false;
    } else if (!autocomplete) {
      return true;
    }
    const tokens = autocomplete.trim().toLowerCase().split(regex_whitespaces);
    if (typeof tokens[0] === "string" && tokens[0].startsWith("section-")) {
      tokens.shift();
    }
    if (address_type_tokens.has(tokens[0])) {
      tokens.shift();
    }
    if (autofill_field_name_tokens.has(tokens[0])) {
      tokens.shift();
    } else {
      if (contact_type_tokens.has(tokens[0])) {
        tokens.shift();
      }
      if (autofill_contact_field_name_tokens.has(tokens[0])) {
        tokens.shift();
      } else {
        return false;
      }
    }
    if (tokens[0] === "webauthn") {
      tokens.shift();
    }
    return tokens.length === 0;
  }