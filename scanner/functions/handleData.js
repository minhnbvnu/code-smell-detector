function handleData(data){
    data = data || '';
    if(typeof data === 'string'){
      return data;
    }else if (typeof data === 'object') {
      return JSON.stringify(data, null, "  ")
    }
  }