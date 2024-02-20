function XMLElement(parent, name, attributes) {
      XMLElement.__super__.constructor.call(this, parent);
      if (name == null) {
        throw new Error("Missing element name");
      }
      this.name = this.stringify.eleName(name);
      this.children = [];
      this.instructions = [];
      this.attributes = {};
      if (attributes != null) {
        this.attribute(attributes);
      }
    }