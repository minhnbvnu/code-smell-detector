function pushComment(i,o){return function(s,u,C,_,w,P){var B={type:s?"Block":"Line",value:u,start:C,end:_};i.locations&&(B.loc=new xe(this,w,P)),i.ranges&&(B.range=[C,_]),o.push(B)}}