function createFormData(input) {
      const formData = new FormData();

      for (const [name, value] of input) {
        formData.append(name, value);
      }

      return formData;
    }