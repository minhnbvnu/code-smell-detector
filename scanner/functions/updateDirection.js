function updateDirection() {
      getRTL();
      DOCUMENT_DIR = document.documentElement.getAttribute('dir');
      for (let i = 0; i < DIR_INSTANCES.length; i++) {
        setRTL(DIR_INSTANCES[i]);
      }
    }