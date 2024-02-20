function ShaderCompile(name, vs, ps, nameMap) {
			//this._nameMap=null;
			//this._VS=null;
			//this._PS=null;
			var _$this = this;
			function _compile(script) {
				var includefiles = [];
				var top = new ShaderNode(includefiles);
				_$this._compileToTree(top, script.split('\n'), 0, includefiles);
				return top;
			};
			var startTime = Browser.now();
			this._VS = _compile(vs);
			this._PS = _compile(ps);
			this._nameMap = nameMap;
			if ((Browser.now() - startTime) > 2)
				console.log("ShaderCompile use time:" + (Browser.now() - startTime) + "  size:" + vs.length + "/" + ps.length);
		}