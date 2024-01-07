function IkConstraint(data, skeleton) {
	      this.bendDirection = 0;
	      this.compress = false;
	      this.stretch = false;
	      this.mix = 1;
	      this.softness = 0;
	      this.active = false;
	      if (data == null) throw new Error("data cannot be null.");
	      if (skeleton == null) throw new Error("skeleton cannot be null.");
	      this.data = data;
	      this.mix = data.mix;
	      this.softness = data.softness;
	      this.bendDirection = data.bendDirection;
	      this.compress = data.compress;
	      this.stretch = data.stretch;
	      this.bones = new Array();
	      for (var i = 0; i < data.bones.length; i++) this.bones.push(skeleton.findBone(data.bones[i].name));
	      this.target = skeleton.findBone(data.target.name);
	    }