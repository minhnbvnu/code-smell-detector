function TransformConstraint(data, skeleton) {
	      this.rotateMix = 0;
	      this.translateMix = 0;
	      this.scaleMix = 0;
	      this.shearMix = 0;
	      this.temp = new spine.Vector2();
	      this.active = false;
	      if (data == null) throw new Error("data cannot be null.");
	      if (skeleton == null) throw new Error("skeleton cannot be null.");
	      this.data = data;
	      this.rotateMix = data.rotateMix;
	      this.translateMix = data.translateMix;
	      this.scaleMix = data.scaleMix;
	      this.shearMix = data.shearMix;
	      this.bones = new Array();
	      for (var i = 0; i < data.bones.length; i++) this.bones.push(skeleton.findBone(data.bones[i].name));
	      this.target = skeleton.findBone(data.target.name);
	    }