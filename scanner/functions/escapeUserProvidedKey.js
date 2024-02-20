function escapeUserProvidedKey(text) {
              return text.replace(userProvidedKeyEscapeRegex, "$&/");
            }