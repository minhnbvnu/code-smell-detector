function FlashRuntime() {
            var pool = {},
                clients = {},
                destory = this.destory,
                me = this,
                jsreciver = Base.guid('webuploader_');
    
            Runtime.apply( me, arguments );
            me.type = type;
    
    
            // 这个方法的调用者，实际上是RuntimeClient
            me.exec = function( comp, fn/*, args...*/ ) {
                var client = this,
                    uid = client.uid,
                    args = Base.slice( arguments, 2 ),
                    instance;
    
                clients[ uid ] = client;
    
                if ( components[ comp ] ) {
                    if ( !pool[ uid ] ) {
                        pool[ uid ] = new components[ comp ]( client, me );
                    }
    
                    instance = pool[ uid ];
    
                    if ( instance[ fn ] ) {
                        return instance[ fn ].apply( instance, args );
                    }
                }
    
                return me.flashExec.apply( client, arguments );
            };
    
            function handler( evt, obj ) {
                var type = evt.type || evt,
                    parts, uid;
    
                parts = type.split('::');
                uid = parts[ 0 ];
                type = parts[ 1 ];
    
                // console.log.apply( console, arguments );
    
                if ( type === 'Ready' && uid === me.uid ) {
                    me.trigger('ready');
                } else if ( clients[ uid ] ) {
                    clients[ uid ].trigger( type.toLowerCase(), evt, obj );
                }
    
                // Base.log( evt, obj );
            }
    
            // flash的接受器。
            window[ jsreciver ] = function() {
                var args = arguments;
    
                // 为了能捕获得到。
                setTimeout(function() {
                    handler.apply( null, args );
                }, 1 );
            };
    
            this.jsreciver = jsreciver;
    
            this.destory = function() {
                // @todo 删除池子中的所有实例
                return destory && destory.apply( this, arguments );
            };
    
            this.flashExec = function( comp, fn ) {
                var flash = me.getFlash(),
                    args = Base.slice( arguments, 2 );
    
                return flash.exec( this.uid, comp, fn, args );
            };
    
            // @todo
        }