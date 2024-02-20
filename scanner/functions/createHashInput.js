function createHashInput(container, hashId, type, offset){
	if(type===BOOL){
		var c=checkbox(hashId);
		c.offset=offset+4;
		c.addEventListener('change', setBoolean);
		if(tempFile.readU32(offset+4))
			c.checked=true;
		addEditorRow(container, hashId, c);
		return 8;
	}else if(type===S32){
		var inp=inputNumber(hashId, 0, 0xffffffff, tempFile.readU32(offset+4));
		inp.offset=offset+4;
		inp.addEventListener('change', setS32);
		addEditorRow(container, hashId, inp);
		return 8;
	}else if(type===F32){
		var inp=inputNumber(hashId, 0, 0xffffffff, tempFile.readF32(offset+4));
		inp.offset=offset+4;
		inp.addEventListener('change', setF32);
		addEditorRow(container, hashId, inp);
		return 8;
	}else if(type===VECTOR2F){
		createHashInput(container, hashId+'[x]', F32, offset);
		createHashInput(container, hashId+'[y]', F32, offset+8);
		return 16;
	}else if(type===VECTOR3F){
		createHashInput(container, hashId+'[x]', F32, offset);
		createHashInput(container, hashId+'[y]', F32, offset+8);
		createHashInput(container, hashId+'[z]', F32, offset+16);
		return 24;
	}else if(type===VECTOR4F){
		createHashInput(container, hashId+'[x]', F32, offset);
		createHashInput(container, hashId+'[y]', F32, offset+8);
		createHashInput(container, hashId+'[z]', F32, offset+16);
		createHashInput(container, hashId+'[t]', F32, offset+24);
		return 32;
	}else if(type===STRING){
		var inp=input(hashId, SavegameEditor._readString(offset+4));
		inp.offset=offset+4;
		inp.maxLength=32;
		inp.addEventListener('change', setString);
		addEditorRow(container, hashId, inp);
		return 0x20;
	}else if(type===STRING64){
		var inp=input(hashId, SavegameEditor._readString64(offset+4));
		inp.offset=offset+4;
		inp.maxLength=64;
		inp.addEventListener('change', setString64);
		addEditorRow(container, hashId, inp);
		return 0x80;
	}else if(type===STRING256){
		var inp=input(hashId, SavegameEditor._readString256(offset+4));
		inp.offset=offset+4;
		inp.maxLength=256;
		inp.addEventListener('change', setString256);
		addEditorRow(container, hashId, inp);
		return 0x0200;
	}else if(type && type%2===0){ /* array */
		var hash=tempFile.readU32(offset);
		var nextHash=hash;
		var i=0;
		var size=0;
		while(nextHash===hash){
			size=createHashInput(container, hashId+'['+i+']', type-1, offset+i*size);
			i++;
			nextHash=tempFile.readU32(offset+i*size);
		}
	}else{
		addEditorRow(container, hashId+' (unknown)');
	}
}