function Skeleton(data) {
	      this._updateCache = new Array();
	      this.updateCacheReset = new Array();
	      this.time = 0;
	      this.scaleX = 1;
	      this.scaleY = 1;
	      this.x = 0;
	      this.y = 0;
	      if (data == null) throw new Error("data cannot be null.");
	      this.data = data;
	      this.bones = new Array();
	      for (var i = 0; i < data.bones.length; i++) {
	        var boneData = data.bones[i];
	        var bone = void 0;
	        if (boneData.parent == null) bone = new spine.Bone(boneData, this, null);else {
	          var parent_1 = this.bones[boneData.parent.index];
	          bone = new spine.Bone(boneData, this, parent_1);
	          parent_1.children.push(bone);
	        }
	        this.bones.push(bone);
	      }
	      this.slots = new Array();
	      this.drawOrder = new Array();
	      for (var i = 0; i < data.slots.length; i++) {
	        var slotData = data.slots[i];
	        var bone = this.bones[slotData.boneData.index];
	        var slot = new spine.Slot(slotData, bone);
	        this.slots.push(slot);
	        this.drawOrder.push(slot);
	      }
	      this.ikConstraints = new Array();
	      for (var i = 0; i < data.ikConstraints.length; i++) {
	        var ikConstraintData = data.ikConstraints[i];
	        this.ikConstraints.push(new spine.IkConstraint(ikConstraintData, this));
	      }
	      this.transformConstraints = new Array();
	      for (var i = 0; i < data.transformConstraints.length; i++) {
	        var transformConstraintData = data.transformConstraints[i];
	        this.transformConstraints.push(new spine.TransformConstraint(transformConstraintData, this));
	      }
	      this.pathConstraints = new Array();
	      for (var i = 0; i < data.pathConstraints.length; i++) {
	        var pathConstraintData = data.pathConstraints[i];
	        this.pathConstraints.push(new spine.PathConstraint(pathConstraintData, this));
	      }
	      this.color = new spine.Color(1, 1, 1, 1);
	      this.updateCache();
	    }