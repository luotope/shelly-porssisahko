let C_HIST=24,C_ERRC=3,C_ERRD=120,C_DEF={mode:0,m0:{cmd:0},m1:{lim:0},m2:{per:24,cnt:0,lim:-999,sq:0,m:999},vat:24,day:0,night:0,bk:0,err:0,out:0,fh:0,inv:0},a={s:{v:"2.6.1",st:0,cmd:0,chkTs:0,errCnt:0,errTs:0,upTs:0,timeOK:0,configOK:0,fCmdTs:0,p:{ts:0,now:0,low:0,high:0,avg:0}},p:[],h:[],c:C_DEF},l=!1,i=!1;function o(t,e){e-=t;return 0<=e&&e<3600}function c(t){return Math.floor((t?t.getTime():Date.now())/1e3)}function n(t,e,s){let n=t.toString();for(;n.length<e;)n=s?s+n:" "+n;return n}function f(t){return t.getDate()}function m(t,e){var s=new Date;console.log(s.toISOString().substring(11)+": "+(e?e+" - ":""),t)}function A(){var t=new Date;a.s.timeOK=2e3<t.getFullYear()?1:0,!a.s.upTs&&a.s.timeOK&&(a.s.upTs=c(t))}function u(t){Shelly.call("KVS.Get",{key:"porssi-config"},function(e,t,s,n){a.c=e?e.value:{};{e=function(t){a.s.configOK=t?1:0,a.s.chkTs=0,n&&(l=!1,d())};let t=0;if(C_DEF){for(var r in C_DEF)if(void 0===a.c[r])a.c[r]=C_DEF[r],t++;else if("object"==typeof C_DEF[r])for(var i in C_DEF[r])void 0===a.c[r][i]&&(a.c[r][i]=C_DEF[r][i],t++);C_DEF=null,0<t?Shelly.call("KVS.Set",{key:"porssi-config",value:a.c},function(t,e,s,n){n&&n(0===e)},e):e&&e(!0)}else e&&e(!0)}},t)}function d(){var t,e;if(!l)if(l=!0,A(),a.s.configOK)if(function(){let t=new Date,e=!1;e=a.s.timeOK&&(0===a.s.p.ts||f(new Date(1e3*a.s.p.ts))!==f(t)),a.s.errCnt>=C_ERRC&&c(t)-a.s.errTs<C_ERRD?(C_ERRD,c(t),a.s.errTs,e=!1):a.s.errCnt>=C_ERRC&&(a.s.errCnt=0);return e}()){let e=new Date;try{let t=e.getFullYear()+"-"+n(e.getMonth()+1,2,"0")+"-"+n(f(e),2,"0")+"T00:00:00%2b02:00";var s=t.replace("T00:00:00","T23:59:59");let l={url:"https://dashboard.elering.ee/api/nps/price/csv?fields=fi&start="+t+"&end="+s,timeout:5,ssl_ca:"*"};e=null,t=null,Shelly.call("HTTP.GET",l,function(e,t,s){l=null;try{if(0!==t||null==e||200!==e.code||!e.body_b64)throw new Error("conn.err ("+s+") "+JSON.stringify(e));{e.headers=null,s=e.message=null,a.p=[],a.s.p.high=-999,a.s.p.low=999,e.body_b64=atob(e.body_b64),e.body_b64=e.body_b64.substring(e.body_b64.indexOf("\n")+1);let t=0;for(;0<=t;){e.body_b64=e.body_b64.substring(t);var n=[t=0,0];if(0===(t=e.body_b64.indexOf('"',t)+1))break;n[0]=Number(e.body_b64.substring(t,e.body_b64.indexOf('"',t))),t=e.body_b64.indexOf('"',t)+2,t=e.body_b64.indexOf(';"',t)+2,n[1]=Number(e.body_b64.substring(t,e.body_b64.indexOf('"',t)).replace(",",".")),n[1]=n[1]/10*(100+(0<n[1]?a.c.vat:0))/100;var r=new Date(1e3*n[0]).getHours();n[1]+=7<=r&&r<22?a.c.day:a.c.night,a.p.push(n),a.s.p.avg+=n[1],n[1]>a.s.p.high&&(a.s.p.high=n[1]),n[1]<a.s.p.low&&(a.s.p.low=n[1]),t=e.body_b64.indexOf("\n",t)}e=null,a.s.p.avg=0<a.p.length?a.s.p.avg/a.p.length:0;var i=new Date,o=new Date(1e3*a.p[0][0]);if(f(o)!==f(i))throw new Error("date err "+i.toString()+" - "+o.toString());a.s.p.ts=c(i),a.s.p.now=v()}}catch(t){a.s.errCnt+=1,a.s.errTs=c(),a.s.p.ts=0,a.p=[],m(t)}b()})}catch(t){m(t),b()}}else t=new Date,(e=new Date(1e3*a.s.chkTs)).getHours()!==t.getHours()||e.getFullYear()!==t.getFullYear()||0<a.s.fCmdTs&&a.s.fCmdTs-c(t)<0?b():l=!1;else u(!0)}function b(){var t,e,s,n,r=new Date;i=!1;try{a.s.timeOK&&0<a.s.p.ts&&f(new Date(1e3*a.s.p.ts))===f(r)?(a.s.p.now=v(),0===a.c.mode?(i=1===a.c.m0.cmd,a.s.st=1):1===a.c.mode?(i=a.s.p.now<=("avg"==a.c.m1.lim?a.s.p.avg:a.c.m1.lim),a.s.st=i?2:3):2===a.c.mode&&(i=function(){if(0!=a.c.m2.cn){var n=[];for(g=0;g<24;g+=a.c.m2.per){var r=[];for(ind=g;ind<g+a.c.m2.per;ind++)r.push(ind);if(a.c.m2.sq){let e=999,s=0;for(h=0;h<=r.length-a.c.m2.cnt;h++){let t=0;for(p=h;p<h+a.c.m2.cnt;p++)t+=a.p[r[p]][1];t/a.c.m2.cnt<e&&(e=t/a.c.m2.cnt,s=h)}for(h=s;h<s+a.c.m2.cnt;h++)n.push(r[h])}else{for(h=1;h<r.length;h++){var t=r[h];for(p=h-1;0<=p&&a.p[t][1]<a.p[r[p]][1];p--)r[p+1]=r[p];r[p+1]=t}for(h=0;h<a.c.m2.cnt;h++)n.push(r[h])}}var s=c();let e=!1;for(let t=0;t<n.length;t++)if(o(a.p[n[t]][0],s)){e=!0;break}return g=null,h=null,p=null,e}}(),a.s.st=i?5:4,!i&&a.s.p.now<=("avg"==a.c.m2.lim?a.s.p.avg:a.c.m2.lim)&&(i=!0,a.s.st=6),i)&&a.s.p.now>("avg"==a.c.m2.m?a.s.p.avg:a.c.m2.m)&&(i=!1,a.s.st=11)):a.s.timeOK?(a.s.st=7,t=1<<r.getHours(),(a.c.bk&t)==t&&(i=!0)):(i=1===a.c.err,a.s.st=8),a.s.timeOK&&(0<a.c.fh&&(e=1<<r.getHours(),(a.c.fh&e)==e)&&(i=!0,a.s.st=10),0<a.s.fCmdTs)&&(0<a.s.fCmdTs-c(r)?(i=!0,a.s.st=9):a.s.fCmdTs=0),a.c.inv&&(i=!i),s=function(t){t&&(a.s.chkTs=c()),l=!1},n="{id:"+a.c.out+",on:"+(i?"true":"false")+"}",Shelly.call("Switch.Set",n,function(t,e,s,n){if(0===e){for(a.s.cmd=i?1:0;a.h.length>=C_HIST;)a.h.splice(0,1);a.h.push([c(),i?1:0]),n&&n(!0)}else n&&n(!1)},s)}catch(t){m(t),l=!1}}let g=0,h=0,p=0;function v(){var e=c();for(let t=0;t<a.p.length;t++)if(o(a.p[t][0],e))return a.p[t][1];throw new Error("no price")}m("shelly-porssisahko v."+a.s.v),m("URL: http://"+(Shelly.getComponentStatus("wifi").sta_ip??"192.168.33.1")+"/script/"+Shelly.getCurrentScriptId()),HTTPServer.registerEndpoint("",function(s,n){try{if(l)return s=null,n.code=503,void n.send();var r=function(t){var e={},s=t.split("&");for(let t=0;t<s.length;t++){var n=s[t].split("=");e[n[0]]=n[1]}return e}(s.query);s=null;let t="application/json",e=(n.code=200,!0);var i="text/html",o="text/javascript";"s"===r.r?(A(),n.body=JSON.stringify(a),e=!1):"r"===r.r?(u(a.s.configOK=!1),a.s.p.ts=0,n.code=204,e=!1):"f"===r.r&&r.ts?(a.s.fCmdTs=Number(r.ts),a.s.chkTs=0,n.code=204,e=!1):r.r?"s.js"===r.r?(n.body=atob("H4sIAAAAAAAACo1W4W7bNhB+FYXrAhJmCKft/thjjLbJ1nVJO9RegSEIFkaiI8Y06Ygnt4art8mb5MV2lBRHCZx0f2yL/O7uu7vvTrYakr8/H0tCOH6N4/d1kCAPMp+Wc+1AXJe6WI211Sn4ggLjh29/l5TJg3XFx5M3k6N/x5PP8pT8eXuzcs4E0HB7c3vjCI9Hwfj8SpUBn94bBypR1uqkUFfKbY5W1jw60SbJlV2a+cKoBN1Ze3uTRMSVmgVvrdog/yesjqqMU8kikquBe3cxv6hiXpYBSgct24RGBmjprxRHuxm6NzrzISgWfd7eYDQwVt3BawjadFF/qdnM790hfg6JCmAeXgCUSR32QS3myN7MTUPvjJ98OuzU+HFBIwp/f4gZu7YccwXRrTOA5gEUaLn0Jkv6/N3bsTw943NddxCb7RfaTdSFVGHl0gT7vm6QO1LC7i4h8fv7dwqSgLrYi74wNONfjcv8V2F9qrBmTuQq5BKGS1UkSl4HSn4iPWBDtbtLlUhznc50Jnf6jBMiZQNI9yJEGOd08X5ycry7q74qA8nCL0qLlA9XTs1NeqhAUegRkcPcYqKtXcX1Utl3Hitg0ME4LcwCJuoySNpy8856lTWJ1XJtU6XbuItQXgQojLvcfo1n+tunacyL9fYZht8+H2+spUQAlkhMfXGk0hxLdwBCZdnREtHHcT6QLyVprtylJhw6zEBgPy81CJOxijGOTmOIPzLEoDsayxvqTEOs4eaabSHR4LBVRvaH5tfWTFjtLiEfml6PtUen5qxpwkR/g1GsKt12wwZTDZhO5y4UKROQa0enpUtjsWiG3WLr+CkAjejj+4Kt6wgF5lcx3nG2UAXm8tFnWhR67pf6XW5s1gkX8Vu00TYYuIo9hmK1Pjz6Uis27rMeGRUS9YI+F1almtYyRhlhgzZHd9IijNUK1rJRInaiUR/f2WdDLfxsRLHsqiNaqUVM9ikxIpYNHpuQo6LwRfQOqLck2g8S0tMCvkGFoouaYevUO1xhWugIxoOq4i2fNmMMGieqTTryNi3vplGKDc2UGmTN1ha3PEhXWjssNJSFS172X+NoG9FMNI4pSD1qzI24wlVC2eDusekkKqlF87WfDXb6PMVmDTaHyH7zEAXD68SgqtqIDxNSPRKT7hqwxu/+Fr/nL9aqGiQv1l18lVA8fsCxYudN2JhqdV/MrRRap+jkw/jTR9GMv5muYrHZ+UM2e/tdHk+YdENXHAcW9/BhXL4442gJommgjlPhx822YSj8bIxjD/QlJ33CKvFiTWvoCeopp3HdPAs/79Xo3zDsP1oVlLWRJyZueZwLVEmUyj6LiwiR731ZhGc5YG9I4/XEuBL0D9BUjTYGY41Fzp43GJBopEdEbKJYa8Kzlq82lp3Cbkvx/hab0iOosftyRCjXjJcL7JQ+9n7ReT3UL6WwMA5XQ4AVymRpgrkw1sBKkvq31WR4N2zwaElstg3u/iHEXdG8eKFeEINf+q/iq1RENeG0NXdRKiy+kx+8LHDUnl4D/N6ymuL/GWtXP2CemyzT+Dcn6LoGvgR6nz/f169xtQxxZ44Kff0BPWV6iQsAa32Pomz4H0CijZAoCgAA"),t=o):"s.css"===r.r?(n.body=atob("H4sIAAAAAAAACo1VS2/jNhD+K8QGBZJsJEvJOnUktGhPCxRF0Ut7KXqgyKHEmiIFkvJjA//3Dqmns1m0F1ucF795fMPN/T25J64Bpc5JZ6xz0tFmb0gQ37I78kuPIiKd8VQZkpDG+67YbP4ZJamQaBiEDqW19E1fpcy0s8HmG7F/lQy0g4J8/u0P8rMQYA35DBosVeT3vlKSTSbk8JRm5H6DTq+kMqfEyS9S1wV+Ww42QVFJLnji5wdC0YYZZWxBboCJTOSTLjhTtq+t6TVH7SN7gm1WEiU1JA3IuvEFydNP0JZEGO3DNQgvS19miaCtVOeC/AmWU01L0tJTcpTcNwX59GKD3XjKs+y7oLa11BiD0N6bknSU84h8253QpIu4b7z0ChDd6tIRxuCPCXpv2ugVHZjpztf2WboL9lTJWicOlCiIUHBKQPOSeDj5JKoKYkOaIUgq1AljcOk6Rc+DeZR7WjlUdMZJL01wAUW9PEB5Xb6cVuyFzS5FUYEwFh6mIxUebGyG9qCxtB8+lMt1aKNg5TxbK6A2dNY3kzZkqgzFCArEgN27NXRt9BwqUbQCtdZWyrD9my4/pt9vQ73mfmRY8ec81nAcKjtaYqOcUZJjws80221Lwnrrwnh1RmJmdr55TBTvvpqBpZCYqFG9R6xfEqk5nNAEu2O6BVDIENGskOVxqq4qL4Qo5xmfpth0lEl/js6xQgVrgO2Bf7wqy38HGvIvvgoTI3x8k+l8a75K6nFwNd26DbWVOIrhN/HQoswDxlF9qx16CxsZEj6is+t0nMFY4QQOeJubGj1VN32MpVmYO5xH/EiJcB6b5y3VrqMW48wdnhKfBnkUI+5JdWxk6NY0EZTLHlFsQ1epli0d2hqw5i4OGLVEaiF1dLuQn/ZwFpa24MiQUJgI/ItokCxIaYs70sPt03PGob5Dn8tAjZQx4nkhpHU+YY1UHIlV1RPrj2PSlVFY1QNYLxlVE8kxhW+TFXmftCY0UUVm4Zbg0gIbyW6OEXkLXNLb9Xrb4bq6C+AjvBbRvcOyq8m/rGzXmbxOe22c9rDVluLHCZ43+7D4sqtgdh0sPgmLb458rRSmPjT+f2Q8DOFbwx+5PJDXZYGXS2uWG12Y/rg+1kOlaBeetenr66IsmN/Bu34iBh6xUPTVCsc3cVo7Qq7XDUaPExtxQaDL0dIuGh7zXbay3I1PT9r6PJvTHCs46bAa+VivyO9gbrfroswYW7XIx65OqurhxiWs5e9P7gX50vX+L3/u4Ieqx27rv9++hHlg9eVfkoq6D6gIAAA="),t="text/css"):"status"===r.r?(n.body=atob("H4sIAAAAAAAACqVSS07DMBC9iuUVLJo2CyQWqSV2CCEVCS4wsVPi1LFDZtqS++QMXCAXw/k0VZrSDYvxYt6bN++NHBHEJmHSAOKa50xKLiIqfamheQwfV2KTZrBHZitqAa3WuJC5Eq+ggABsEATDUM/cYWIZJkZTMvKRTsLivanTXfNjWaotwUTVuuMljVFT26b2z8hSUInJQqSqKgo9EnKnkpHxoQ2MiLZbJ6JlF1tESh9O2bfmm/nyo/FCOsMnIMkWC1lePsyAnMKVb8biran1wdtsY1kglgFznbloGfuVfsrb6fdOLsyJxZ9cPOkdzJrP7YVm3c0g28nETlV9tuIcrN92LYG5kaDXTTWSKzX8w/YfBlvlS49npx3liq+egbLUBYky+XrBO+4l/I8C2mOQIb+PlgP8CzzDzy3QAgAA"),t=i):"status.js"===r.r?(n.body=atob("H4sIAAAAAAAACoVW7W7qNhi+ldSnQ/ESUmBHk9rEoO18qFN71KMVaZMQGm5iGp8Gm2MbOgT510vpnXBje50PIIxuKoX49fvx+PGT115nzDhz0vGH8B+TTrikymGE6pWIXUz6a6NWaz51l5InTueMEG2oYdiazspHkyr57Aj27HxSSioXCekk1FCEi1yqjPA5UYH2KXzHviGdSAXzIGPi0aS+JO537aJ3uh3PEoQDLgRT18Mvt4QHYBmgr9uX7cvt7fYFXaGvd7/dI7/hr80qY0EsM6nqiEfFmABvxZKd80wmrJH9y93HT3/dD38f0cDOjWtHIZ8bfmbAASxYAyM/879Z4vawh5z44umPFGrsCmjTCHMvCQE82gzuh78My0p2OA4Um2c0Zi76QSN/KtWMmo/A0ZDPmGuJtAO3y376kQfTD7NkqLF/1sX46igP9lwK9ZYD5LhP29ftqzCMCyawBYVrVAldHa1mcsP0E6dqKa+c87VdG10+HqwtL5cWPaj+Nc2WXNRuWYOCA7cbmmVs75fyx/TfjpMDqriYygaqyV36jS60Y6h64towYxaQrOTmFC9x+gS0QOq2M/HcTmTLGj1AKaSkxklpkQF5b2ew/sCpjQCBcmbkN1rEUSqCINgTuGwCvdm+roQoMa52GN/av8W8hGk3qAjT21cIct2dIw4eWQkQt08F76fxBZgvfu7YT+893jGMuggqzLevfGlVgIGTJVOaS6CGB0t/NMYhvK89kGOp9FbLYIDt2ncf3sXQRL33ofHsbC+YM4XX9s2dkdE4rN0YMSGLjFe7hMzz8CyYL3TqsiJ9MaO/43Xpfnl56QvIXSfQ8KwjMqte+nbhHgsTaki0rpHsy2kop72dly0HCKFrjGYjNh6PuuPQXNTTESzJBYg7A5TWON9nE5BNNLPJErzNhnOWaXYCRBfCasRFUEGMJjaocDOEtbthJyKm1bLYtAUWlShNhbLdxjDwumNibWH1rA/QdaDM29hyIBfSz89sN7Gq3WyG8NwU0LVcKA0SWVeinTdEi1BY7QEQc9YNm5u/b8UggmqNSUG1GfsZaYgyGXVATRXsA0HBb8e23s2me2BNLBvERdBfUGHtBhmfDaqWc1Ub8GZzKE4JyONskTDtGnwiSS9opIDhUYITEUdle1VZUO00bXWjyGBC7E9YdNRCTWcM+6ZP9E7zYNX7l8QyKcozLiWTyIAu7DlE0Pk6O9gR8sZODdBUCtN+ZtArzdWDzJLQtu38fC0G6IHGT49KLkRy9Y4l9q+cRP2JnxLXfjxbM3HijGpN0JQb1G/0y8weGXl0YZL+BHvWF+YtMSc6eNOJDdCfRbXS7iH4VX0UnlKWR9J8XskSrhAnV2r1q4IUBJUGWirjuswHuvsGpNRmVk++vQ6klQZbrRjUDWOYsZO1olN+dL6CqK2OiwuLI6cOhJTaFQRFFjHskCv+j6eGuks0J4hjQNwAVWfU3HZZOPCApNoiuX6Lr2PcHhF5vF9fnucxNbHtoutYCi3hKsOKixS0VWgvpA952NG637guoSHPqMO4A8dZIrWm/3FRKq9G5uBmVA3mu6fykK4GdhF5HsIx5H/49b5u/Pk/26VbmEAKAAA="),t=o):"config"===r.r?(n.body=atob("H4sIAAAAAAAACp1U7W6bMBR9FQtpavuDJqFRW03EEj9ahaSBaqGd9tMxbnEwNsUmXfd7j5Jn6AvwYjPhI4GtrToJhLi+x+f6nnNth3QDMENSTgyFwcqAP26u3OVVYA/0CrQVWjHSJCQAY0PHMv2GdfB5dDmEfrRGuVQoRXoB2pIwghWg4SQRIYH2oAo0yF26UmiDACu2kSpedyjK03wHEvoj6S8ysVrEvNgWW64I5YQDsWM7wKiXlExwRHC8Ej/LHSjftNClpoiLVw6cm/suzwa1POBLm05ppkSCYpmr8n94YVrWV7BHheilReFB/D2y9y1M1GgILcscXhwiOH2MVA9Td7fivEdZkuv+5ZzTkrQEreJ2eVpslX4oQx+fnGQZ9L2Bf33doG9RHAtzh4wlabZ/iLQsO3Gh3bVAeYbSB/Pi99L1pzPnbvkfXnivxmRo4iSEoK7z/TKmrhc435yZ86kippQrlKE16iqejExGk74U7/LPnPnS98BUu8ddLJwABHee535uPJw14mvtKNGfDstMic4WqaKCgw1iua5rDK1xNzSy4Mjqhi7hZTdwDs+7gTHs7XIGz3pM0GpHE0SNX4KcK5qU85YV2177LBPzvZNbyC3RqXFcbGllsLeVt0z51PraoRyBtGRi+h4AZk+viqaGadkavWr0QjeUJjQqlX4LlXyssXFwPok2pCp6lSvV9ilAjBHOEaxF/7dRAt9duJ7nB39lKdxw7G+JDk05jyLDpOY7mFgJ7VX2AVpwzCiOJ0fPlIfi+VSkhB8bA+PkqNpuGRHGXpriJc5oqmBGnmby2NBtMbHgD/TxdC2NE22HavkPMP/LnhcGAAA="),t=i):"config.js"===r.r?(n.body=atob("H4sIAAAAAAAACoVV3W7bNhR+FZsrXLJWGFkremGZMbalwLAmDVBnRe9mWj6yCesvEu3W8PQ2eZO82A5J2ZESY72Rfb5zSJ6f7yMPCeheKvqjcCfLHghZ7bOIMnF10OX+oGK6y9Wy5/eFqLTUMBj008HA/mUHs0I7nEfhQ0XJL2m+BMK4yjIo/7y/vRG3d9cf/5ndf+GpLCgFT+LW80leaJVnvZ1MtiDIm4OsydWbA9STS+e5mjOvvZ8L1NyYzpFvdQtHy8Eq2yEcrSHawBIdaE9JY5IxIS5qJ9uL0XLwUu5bMFoOztRq3Y63dmj6JgUhYZyX1Bgg/BAmwfsQhkMmh2I+UVmx1T29L7BGm8Mi/0F6ainIN1OsKZkSMgTGC7mcaVlqGnjEJ6zuzV07F5tOMyUvoUhkBL8lCSXfiEcWpGlUvP5JZEzY+VTdQTaNY9+o5ovNYDSZABPC/DRnvAyK1+0glzKUZWcCaJ+ZQOpfROmyE5j6HKFzsaOLRKVtFow4Ao0zuCigbDsDjsDJGWW660Tg5KweuhkEvHo4l0BwkXY3eT78RWaBzQz15Nd1JHW0pqiTKM+qPAHTChwAsLoOgTLvj99nvNhWJsRtV8mdIbtcLj/uINM3qtKAA6UkSlS0IZ7VJg7v6gC8KMHEXEMst4mmLDRy7QrSMRTDP2/TBZiDrcYjAxG5WxEh8Fhosp9aaCxpC8NdreSERbtqZJ6V3dHV0qPxoO7Ea0FOR2Pfs4I7Lmsp0SxDzR09LTEajxXd0ddRpPEuNsjoZ3YbZv4/xQcDy3FhPv9aDp+huA3CnczHBYWWz+I10ZvKHIfFWYofQyx5RdQitndk7anPHVI3fiSuuJV6zVOV0RPPn1e0mM6aJdWDOEf1YybBcyZBO5MThoilTCXkd6l0bwX6WmpJ//5yM3x7WRbR5aevMz4DPd3AXpAiL6tKXSDdY7UiAyeKt8O/ZnefeaVLla1UvKeasTDwfXxQeIR8mrY2nQ3JtBSmcL2GjBqmywTwWiT3MkkAbzett31M0zxYNdbjFHYKm39V5RrGPXO7sjmr2fglXnH9Q1vfSZ3NCU0Izp+nUFVyZXR6ZEVeRj9Xpn013StalHlamLS3mVbp0+PTY/n0OMZuZtskwbcU31FM25/g5yRONrXTjZMceXxtJJzl3ym7HMGvww/+O3j3wWc4N3g9C9e2eKArYejruYoC/z0e5HpM7j718T5r1YhtYNig+j+qwLxvAAgAAA=="),t=o):n.code=404:(n.body=atob("H4sIAAAAAAAACo1SzY7TMBB+FeMDakWTihvajb1CsAf2xAFxRa49bWbr2sYzaVUh3oZn2Bfoi+E02Z8srODieOYbf983k2leuWj5mKDlnddNfwpvwkZB0M0O2AjbmkzAquN19U43jOxBfz7dZSKk0692e7prlkN2eBDMDtQe4ZBiZmFjYAis5AEdt8rBHi1U52CBARmNr8gaD+qt1I3DvbDeECmOaQjRqb9rFvChghKG8SGl4nwC2piO+nV/XoqbrlCITxTZ+ChmjRFthrVqmRNdLJe3OCD1GgWbvCl9f1uVeWz1E6RZGj0fJR6FRttmRc9i3WBIHYt+yiobh3EYkTm3ZlYVseGOyqDBbqHYHb73BKRF480KvFjHPKm/F6jOsP6C3jTL4T51UI0/4TyM6pFCv9zEP00XyjVuXjY5xR9Mvi+r1G3L8b9OB56p0+EkmzGxLgXE4uP1V3XA4OKh9tEaxhjqmHGDocZgfeeAZrJHfBuJ5fzSAwunyvJ3u6K3sBkMw7WHPlKgtKsnqRnMFyYlCO5Di94NFavojvWTbF+U4fsN9fCPvcmC1JRFDqaLPtWUrSq2r+BCXmUl30CdIXljYSb7xuVCyonmjOY/F5b+oPQYtoWwIIXAK0l89EAtAMu+vD4veC8kqS6xPMsN1wl9SYz2i836lmTZ8XHGvwHYLtlMJgQAAA=="),t=i),n.headers=[["Content-Type",t]],e&&n.headers.push(["Content-Encoding","gzip"])}catch(t){m(t),n.code=500}n.send()}),Timer.set(1e4,!0,d),d();