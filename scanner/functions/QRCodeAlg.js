function QRCodeAlg(data, errorCorrectLevel) {
	  this.typeNumber = -1; //版本
	  this.errorCorrectLevel = errorCorrectLevel;
	  this.modules = null;  //二维矩阵，存放最终结果
	  this.moduleCount = 0; //矩阵大小
	  this.dataCache = null; //数据缓存
	  this.rsBlocks = null; //版本数据信息
	  this.totalDataCount = -1; //可使用的数据量
	  this.data = data;
	  this.utf8bytes = getUTF8Bytes(data);
	  this.make();
	}