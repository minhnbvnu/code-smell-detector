function c9(t){if(typeof t=="number")return t;if(ks(t))return Yg;if(Gr(t)){var e=typeof t.valueOf=="function"?t.valueOf():t;t=Gr(e)?e+"":e}if(typeof t!="string")return t===0?t:+t;t=i9(t);var r=a9.test(t);return r||o9.test(t)?l9(t.slice(2),r?2:8):s9.test(t)?Yg:+t}