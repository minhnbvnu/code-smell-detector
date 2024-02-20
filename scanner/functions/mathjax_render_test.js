function mathjax_render_test(input_string, result, message){
      casper.thenEvaluate(function (text){
        window._test_result = null;
        require(['base/js/mathjaxutils'],function(mathjaxutils){
          window._test_result = mathjaxutils.remove_math(text);
        });
      }, {text: input_string});
      casper.waitFor(function() {
        return casper.evaluate(function(){
          return window._test_result!==null;
        });
      });
      casper.then(function(){
        var return_val = casper.evaluate(function(){
          var blah = window._test_result;
          delete window._test_result;
          return blah;
        });
        this.test.assertEquals(return_val[0], result[0], message+" markdown");
        this.test.assertEquals(return_val[1].length, result[1].length, message+" math instance count");
        for(var i=0; i<return_val[1].length; i++){
          this.test.assertEquals(return_val[1][i], result[1][i], message+" math instance "+i);
        };
      });
    }