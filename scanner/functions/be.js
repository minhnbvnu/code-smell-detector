function be(t,e,i,n,o,r,s){var a;return t<100&&t>=0?(a=new Date(t+400,e,i,n,o,r,s),isFinite(a.getFullYear())&&a.setFullYear(t)):a=new Date(t,e,i,n,o,r,s),a}