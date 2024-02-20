function Shader2X(vs, ps, saveName, nameMap) {
			this._params2dQuick1 = null;
			this._params2dQuick2 = null;
			this._shaderValueWidth = NaN;
			this._shaderValueHeight = NaN;
			Shader2X.__super.call(this, vs, ps, saveName, nameMap);
		}