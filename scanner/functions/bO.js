function bO(t){for(var e="",r=!1,n,i=0;i<t.length;++i)if(n=t[i],r){switch(n){case"n":e+=`
`;break;default:e+=n}r=!1}else n==="\\"?r=!0:e+=n;return e}