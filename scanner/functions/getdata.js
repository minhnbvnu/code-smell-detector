function getdata(data){if(!data)return null;if(data.name.substr(-4)===".bin"){if(data.data)return char_codes(data.data);if(data.asNodeBuffer&&has_buf)return data.asNodeBuffer();if(data._data&&data._data.getContent)return Array.prototype.slice.call(data._data.getContent())}else{if(data.data)return data.name.substr(-4)!==".bin"?debom_xml(data.data):char_codes(data.data);if(data.asNodeBuffer&&has_buf)return debom_xml(data.asNodeBuffer().toString("binary"));if(data.asBinary)return debom_xml(data.asBinary());if(data._data&&data._data.getContent)return debom_xml(cc2str(Array.prototype.slice.call(data._data.getContent(),0)))}return null}