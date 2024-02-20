function typeIsPseudo(type, stream) {
      return type == ":" && stream.match(/^[a-z-]+/, false);
    }