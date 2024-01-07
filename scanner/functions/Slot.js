function Slot(data, bone) {
	      this.deform = new Array();
	      if (data == null) throw new Error("data cannot be null.");
	      if (bone == null) throw new Error("bone cannot be null.");
	      this.data = data;
	      this.bone = bone;
	      this.color = new spine.Color();
	      this.darkColor = data.darkColor == null ? null : new spine.Color();
	      this.setToSetupPose();
	    }