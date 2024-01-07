function PathConstraint(data, skeleton) {
	      this.position = 0;
	      this.spacing = 0;
	      this.rotateMix = 0;
	      this.translateMix = 0;
	      this.spaces = new Array();
	      this.positions = new Array();
	      this.world = new Array();
	      this.curves = new Array();
	      this.lengths = new Array();
	      this.segments = new Array();
	      this.active = false;
	      if (data == null) throw new Error("data cannot be null.");
	      if (skeleton == null) throw new Error("skeleton cannot be null.");
	      this.data = data;
	      this.bones = new Array();
	      for (var i = 0, n = data.bones.length; i < n; i++) this.bones.push(skeleton.findBone(data.bones[i].name));
	      this.target = skeleton.findSlot(data.target.name);
	      this.position = data.position;
	      this.spacing = data.spacing;
	      this.rotateMix = data.rotateMix;
	      this.translateMix = data.translateMix;
	    }