function _fnCreateCookie ( sName, sValue, iSecs, sBaseName, fnCallback )
		{
			var date = new Date();
			date.setTime( date.getTime()+(iSecs*1000) );
			
			/* 
			 * Shocking but true - it would appear IE has major issues with having the path not having
			 * a trailing slash on it. We need the cookie to be available based on the path, so we
			 * have to append the file name to the cookie name. Appalling. Thanks to vex for adding the
			 * patch to use at least some of the path
			 */
			var aParts = window.location.pathname.split('/');
			var sNameFile = sName + '_' + aParts.pop().replace(/[\/:]/g,"").toLowerCase();
			var sFullCookie, oData;
			
			if ( fnCallback !== null )
			{
				oData = (typeof $.parseJSON === 'function') ? 
					$.parseJSON( sValue ) : eval( '('+sValue+')' );
				sFullCookie = fnCallback( sNameFile, oData, date.toGMTString(),
					aParts.join('/')+"/" );
			}
			else
			{
				sFullCookie = sNameFile + "=" + encodeURIComponent(sValue) +
					"; expires=" + date.toGMTString() +"; path=" + aParts.join('/')+"/";
			}
			
			/* Are we going to go over the cookie limit of 4KiB? If so, try to delete a cookies
			 * belonging to DataTables.
			 */
			var
				aCookies =document.cookie.split(';'),
				iNewCookieLen = sFullCookie.split(';')[0].length,
				aOldCookies = [];
			
			if ( iNewCookieLen+document.cookie.length+10 > 4096 ) /* Magic 10 for padding */
			{
				for ( var i=0, iLen=aCookies.length ; i<iLen ; i++ )
				{
					if ( aCookies[i].indexOf( sBaseName ) != -1 )
					{
						/* It's a DataTables cookie, so eval it and check the time stamp */
						var aSplitCookie = aCookies[i].split('=');
						try {
							oData = eval( '('+decodeURIComponent(aSplitCookie[1])+')' );
		
							if ( oData && oData.iCreate )
							{
								aOldCookies.push( {
									"name": aSplitCookie[0],
									"time": oData.iCreate
								} );
							}
						}
						catch( e ) {}
					}
				}
		
				// Make sure we delete the oldest ones first
				aOldCookies.sort( function (a, b) {
					return b.time - a.time;
				} );
		
				// Eliminate as many old DataTables cookies as we need to
				while ( iNewCookieLen + document.cookie.length + 10 > 4096 ) {
					if ( aOldCookies.length === 0 ) {
						// Deleted all DT cookies and still not enough space. Can't state save
						return;
					}
					
					var old = aOldCookies.pop();
					document.cookie = old.name+"=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path="+
						aParts.join('/') + "/";
				}
			}
			
			document.cookie = sFullCookie;
		}