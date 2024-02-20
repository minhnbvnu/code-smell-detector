function upgradeTemplate(template, constructor) {
      newInstance = template;
      Object.setPrototypeOf(template, constructor.prototype);
      new constructor();
      newInstance = null;
    }