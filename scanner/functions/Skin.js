function Skin(name) {
	      this.attachments = new Array();
	      this.bones = Array();
	      this.constraints = new Array();
	      if (name == null) throw new Error("name cannot be null.");
	      this.name = name;
	    }