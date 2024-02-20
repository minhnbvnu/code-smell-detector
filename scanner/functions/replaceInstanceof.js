function replaceInstanceof(all, subject, type) {
        repeatJavaReplacement = true;
        return "__instanceof" + addAtom("(" + subject + ", " + type + ")", "B")
      }