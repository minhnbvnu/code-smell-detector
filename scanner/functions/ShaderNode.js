function ShaderNode(includefiles) {
					this.childs = [];
					this.text = "";
					this.parent = null;
					this.name = null;
					this.noCompile = false;
					this.includefiles = null;
					this.condition = null;
					this.conditionType = 0;
					this.useFuns = "";
					this.z = 0;
					this.src = null;
					this.includefiles = includefiles;
				}