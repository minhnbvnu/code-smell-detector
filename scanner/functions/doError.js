function doError(path) {
	    throw path.buildCodeFrameError("Decorators are not officially supported yet in 6.x pending a proposal update.\nHowever, if you need to use them you can install the legacy decorators transform with:\n\nnpm install babel-plugin-transform-decorators-legacy --save-dev\n\nand add the following line to your .babelrc file:\n\n{\n  \"plugins\": [\"transform-decorators-legacy\"]\n}\n\nThe repo url is: https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy.\n    ");
	  }