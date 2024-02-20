function hyphenateStyleName(name) {
              return name.replace(uppercasePattern, "-$1").toLowerCase().replace(msPattern$1, "-ms-");
            }