function colored(color, str) {
      return showColors ? (ansi[color] + str + ansi.none) : str;
    }