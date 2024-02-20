function LiveScriptMode(){
      var that;
      this.$tokenizer = new (require('../tokenizer')).Tokenizer(LiveScriptMode.Rules);
      if (that = require('../mode/matching_brace_outdent')) {
        this.$outdent = new that.MatchingBraceOutdent;
      }
      this.$id = "ace/mode/livescript";
      this.$behaviour = new (require("./behaviour/cstyle").CstyleBehaviour)();
    }