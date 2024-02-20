function getState() {
      if (!NVR.getLogin().isUseEventServer) return "disabled";
      return connText[authState];
    }