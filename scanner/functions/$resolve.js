function $resolve(value){var record=this,then,wrapper;if(record.d)return;record.d=true;record=record.r||record;try{if(then=isThenable(value)){wrapper={r:record,d:false};then.call(value,ctx($resolve,wrapper,1),ctx($reject,wrapper,1))}else{record.v=value;record.s=1;notify(record)}}catch(err){$reject.call(wrapper||{r:record,d:false},err)}}