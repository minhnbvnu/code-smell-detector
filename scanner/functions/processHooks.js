function processHooks( test, module ) {
			if ( module.parentModule ) {
				processHooks( test, module.parentModule );
			}
			if ( module.testEnvironment &&
				QUnit.objectType( module.testEnvironment[ handler ] ) === "function" ) {
				hooks.push( test.queueHook( module.testEnvironment[ handler ], handler ) );
			}
		}