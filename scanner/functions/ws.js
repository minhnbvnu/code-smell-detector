function Ws(t,n,e,i,r,o){if(Ti(this,"type","recaptcha"),this.b=this.c=null,this.m=!1,this.l=n,this.a=e||{theme:"light",type:"image"},this.g=[],this.a[Rf])throw new Pi("argument-error","sitekey should not be provided for reCAPTCHA as one is automatically provisioned for the current project.");if(this.h="invisible"===this.a[_f],!Dt(n)||!this.h&&Dt(n).hasChildNodes())throw new Pi("argument-error","reCAPTCHA container is either not found or already contains inner elements!");this.u=new mr(t,o||null,r||null),this.o=i||function(){return null};var a=this;this.i=[];var s=this.a[Pf];this.a[Pf]=function(t){if(Gs(a,t),"function"==typeof s)s(t);else if("string"==typeof s){var n=oi(s,uu);"function"==typeof n&&n(t)}};var u=this.a[Cf];this.a[Cf]=function(){if(Gs(a,null),"function"==typeof u)u();else if("string"==typeof u){var t=oi(u,uu);"function"==typeof t&&t()}}}