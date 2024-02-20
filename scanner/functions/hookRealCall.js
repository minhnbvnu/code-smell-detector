function hookRealCall(realCallClassName) {
    Java.perform(function () {
        console.log(" ...........  hookRealCall  : " + realCallClassName)
        var RealCall = Java.use(realCallClassName)
        if ("" != Cls_CallBack) {
            //异步
            RealCall[M_Call_enqueue].overload(Cls_CallBack).implementation = function (callback) {
                // console.log("-------------------------------------HOOK SUCCESS 异步--------------------------------------------------")
				var realCallBack = Java.use(callback.$className)
                realCallBack[M_CallBack_onResponse].overload(Cls_Call,Cls_Response).implementation = function(call, response){
                    var newResponse = buildNewResponse(response)
                    this[M_CallBack_onResponse](call,newResponse)
                }
                this[M_Call_enqueue](callback)
                realCallBack.$dispose
            }
        }
        //同步  
        RealCall[M_Call_execute].overload().implementation = function () {
            // console.log("-------------------------------------HOOK SUCCESS 同步--------------------------------------------------")
            var response = this[M_Call_execute]()
            var newResponse = buildNewResponse(response)
            return newResponse;
        }
    })
}