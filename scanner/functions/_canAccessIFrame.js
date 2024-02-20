function _canAccessIFrame(iframe){
					var html=null;
					try{
						var doc=iframe.contentDocument || iframe.contentWindow.document;
						html=doc.body.innerHTML;
					}catch(err){/* do nothing */}
					return(html!==null);
				}