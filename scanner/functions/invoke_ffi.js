function invoke_ffi(index,a1,a2){var sp=stackSave();try{return dynCall_ffi(index,a1,a2)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}