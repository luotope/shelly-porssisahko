let C_HIST=24,C_ERRC=3,C_ERRD=120,C_DEF={mode:0,m0:{cmd:0},m1:{lim:0},m2:{per:24,cnt:0,lim:-999,sq:0,m:999},vat:24,day:0,night:0,bk:0,err:0,out:0,fh:0,inv:0},a={s:{v:"2.7.1",st:0,cmd:0,chkTs:0,errCnt:0,errTs:0,upTs:0,timeOK:0,configOK:0,fCmdTs:0,tz:"%2b02:00",p:{ts:0,now:0,low:0,high:0,avg:0}},p:[],h:[],c:C_DEF},l=!1,o=!1;function i(t,s){s-=t;return 0<=s&&s<3600}function c(t){return Math.floor((t?t.getTime():Date.now())/1e3)}function r(t,s,e){let r=t.toString();for(;r.length<s;)r=e?e+r:" "+r;return r}function u(t){return t.getDate()}function f(t){let s=t.toUTCString();s=+(s=s.substring(5+s.indexOf(""+t.getFullYear()))).substring(0,s.indexOf(":"));t=t.getHours()-s;let e=r(Math.abs(t),2,"0")+":00";(e=t<0?"-"+e:0<t?"%2b"+e:"Z")!==a.s.tz&&(a.s.p.ts=0),a.s.tz=e}function m(t,s){console.log((new Date).toISOString().substring(11)+": "+(s?s+" - ":""),t)}function d(){var t=new Date;a.s.timeOK=2e3<t.getFullYear()?1:0,!a.s.upTs&&a.s.timeOK&&(a.s.upTs=c(t))}function p(t){Shelly.call("KVS.Get",{key:"porssi-config"},function(s,t,e,r){a.c=s?s.value:{};{s=function(t){a.s.configOK=t?1:0,a.s.chkTs=0,r&&(l=!1,b())};let t=0;if(C_DEF){for(var n in C_DEF)if(void 0===a.c[n])a.c[n]=C_DEF[n],t++;else if("object"==typeof C_DEF[n])for(var o in C_DEF[n])void 0===a.c[n][o]&&(a.c[n][o]=C_DEF[n][o],t++);C_DEF=null,0<t?Shelly.call("KVS.Set",{key:"porssi-config",value:a.c},function(t,s,e,r){r&&r(0===s)},s):s&&s(!0)}else s&&s(!0)}},t)}function b(){if(!l)if(l=!0,d(),a.s.configOK)if(function(){let t=new Date,s=!1;s=a.s.timeOK&&(0===a.s.p.ts||u(new Date(1e3*a.s.p.ts))!==u(t)),a.s.errCnt>=C_ERRC&&c(t)-a.s.errTs<C_ERRD?(C_ERRD,c(t),a.s.errTs,s=!1):a.s.errCnt>=C_ERRC&&(a.s.errCnt=0);return s}()){let s=new Date;f(s);try{let t=s.getFullYear()+"-"+r(1+s.getMonth(),2,"0")+"-"+r(u(s),2,"0")+"T00:00:00"+a.s.tz;var e=t.replace("T00:00:00","T23:59:59");let l={url:"https://dashboard.elering.ee/api/nps/price/csv?fields=fi&start="+t+"&end="+e,timeout:5,ssl_ca:"*"};s=null,t=null,Shelly.call("HTTP.GET",l,function(s,t,e){l=null;try{if(0!==t||null==s||200!==s.code||!s.body_b64)throw Error("conn.err ("+e+") "+JSON.stringify(s));{s.headers=null,e=s.message=null,a.p=[],a.s.p.high=-999,a.s.p.low=999,s.body_b64=atob(s.body_b64),s.body_b64=s.body_b64.substring(1+s.body_b64.indexOf("\n"));let t=0;for(;0<=t;){s.body_b64=s.body_b64.substring(t);var r=[t=0,0];if(0===(t=1+s.body_b64.indexOf('"',t)))break;r[0]=+s.body_b64.substring(t,s.body_b64.indexOf('"',t)),t=2+s.body_b64.indexOf('"',t),t=2+s.body_b64.indexOf(';"',t),r[1]=+(""+s.body_b64.substring(t,s.body_b64.indexOf('"',t)).replace(",",".")),r[1]=r[1]/10*(100+(0<r[1]?a.c.vat:0))/100;var n=new Date(1e3*r[0]).getHours();r[1]+=7<=n&&n<22?a.c.day:a.c.night,a.p.push(r),a.s.p.avg+=r[1],r[1]>a.s.p.high&&(a.s.p.high=r[1]),r[1]<a.s.p.low&&(a.s.p.low=r[1]),t=s.body_b64.indexOf("\n",t)}s=null,a.s.p.avg=0<a.p.length?a.s.p.avg/a.p.length:0;var o=new Date,i=new Date(1e3*a.p[0][0]);if(u(i)!==u(o))throw Error("date err "+o.toString()+" - "+i.toString());a.s.p.ts=c(o),a.s.p.now=S()}}catch(t){a.s.errCnt+=1,a.s.errTs=c(),a.s.p.ts=0,a.p=[],m(t)}g()})}catch(t){m(t),g()}}else!function(){if(0==a.s.chkTs)return 1;var t=new Date,s=new Date(1e3*a.s.chkTs);return s.getHours()!=t.getHours()||s.getFullYear()!=t.getFullYear()||0<a.s.fCmdTs&&a.s.fCmdTs-c(t)<0}()?l=!1:g();else p(!0)}function g(){var t,s,e,r,n=new Date;f(n),o=!1;try{0===a.c.mode?(o=1===a.c.m0.cmd,a.s.st=1):a.s.timeOK&&0<a.s.p.ts&&u(new Date(1e3*a.s.p.ts))===u(n)?(a.s.p.now=S(),1===a.c.mode?(o=a.s.p.now<=("avg"==a.c.m1.lim?a.s.p.avg:a.c.m1.lim),a.s.st=o?2:3):2===a.c.mode&&(o=function(){if(0!=a.c.m2.cn){var r=[];for(A=0;A<24;A+=a.c.m2.per){var n=[];for(ind=A;ind<A+a.c.m2.per;ind++)n.push(ind);if(a.c.m2.sq){let s=999,e=0;for(h=0;h<=n.length-a.c.m2.cnt;h++){let t=0;for(v=h;v<h+a.c.m2.cnt;v++)t+=a.p[n[v]][1];t/a.c.m2.cnt<s&&(s=t/a.c.m2.cnt,e=h)}for(h=e;h<e+a.c.m2.cnt;h++)r.push(n[h])}else{for(h=1;h<n.length;h++){var t=n[h];for(v=h-1;0<=v&&a.p[t][1]<a.p[n[v]][1];v--)n[v+1]=n[v];n[v+1]=t}for(h=0;h<a.c.m2.cnt;h++)r.push(n[h])}}var e=c();let s=!1;for(let t=0;t<r.length;t++)if(i(a.p[r[t]][0],e)){s=!0;break}return A=null,h=null,v=null,s}}(),a.s.st=o?5:4,!o&&a.s.p.now<=("avg"==a.c.m2.lim?a.s.p.avg:a.c.m2.lim)&&(o=!0,a.s.st=6),o)&&a.s.p.now>("avg"==a.c.m2.m?a.s.p.avg:a.c.m2.m)&&(o=!1,a.s.st=11)):a.s.timeOK?(a.s.st=7,t=1<<n.getHours(),(a.c.bk&t)==t&&(o=!0)):(o=1===a.c.err,a.s.st=8),a.s.timeOK&&(0<a.c.fh&&(s=1<<n.getHours(),(a.c.fh&s)==s)&&(o=!0,a.s.st=10),0<a.s.fCmdTs)&&(0<a.s.fCmdTs-c(n)?(o=!0,a.s.st=9):a.s.fCmdTs=0),a.c.inv&&(o=!o),e=function(t){t&&(a.s.chkTs=c()),l=!1},r="{id:"+a.c.out+",on:"+(o?"true":"false")+"}",Shelly.call("Switch.Set",r,function(t,s,e,r){if(0===s){for(a.s.cmd=o?1:0;a.h.length>=C_HIST;)a.h.splice(0,1);a.h.push([c(),o?1:0]),r&&r(!0)}else r&&r(!1)},e)}catch(t){m(t),l=!1}}let A=0,h=0,v=0;function S(){var s=c();for(let t=0;t<a.p.length;t++)if(i(a.p[t][0],s))return a.p[t][1];throw Error("no price")}m("shelly-porssisahko v."+a.s.v),m("URL: http://"+(Shelly.getComponentStatus("wifi").sta_ip??"192.168.33.1")+"/script/"+Shelly.getCurrentScriptId()),HTTPServer.registerEndpoint("",function(e,r){try{if(l)return e=null,r.code=503,void r.send();var n=function(t){var s={},e=t.split("&");for(let t=0;t<e.length;t++){var r=e[t].split("=");s[r[0]]=r[1]}return s}(e.query);e=null;let t="application/json",s=(r.code=200,!0);var o="text/html",i="text/javascript";"s"===n.r?(d(),r.body=JSON.stringify(a),s=!1):"r"===n.r?(p(a.s.configOK=!1),a.s.p.ts=0,r.code=204,s=!1):"f"===n.r&&n.ts?(a.s.fCmdTs=+(""+n.ts),a.s.chkTs=0,r.code=204,s=!1):n.r?"s.js"===n.r?(r.body=atob("H4sIAAAAAAAACo1W4W7bNhB+FYXrAhJmCKft/thjjLbJ1nVJM9RegSEIFkaiI8Y06Ygnt4art8mb5MV2lBRHCZx2f2yL/O7uu7vvTrYakr8/HUtCOH6N4/dNkCAPMp+Wc+1A3JS6WI211Sn4ggLjh29/l5TJg3XFx5M3k6N/x5NP8oz8eXe7cs4E0HB3e3frCI9Hwfj8WpUBn94bBypR1uqkUNfKbY5W1jw50SbJlV2a+cKoBN1Ze3ebRMS1mgVvrdog/yesjqqMU8kikquBe/cxP6tiXpYBSgct24RGBmjprxVHuxm6NzrzISgWfd7dYjQwVt3DawjadFF/qdnM790jfg6JCmAeXwCUSR32US3myN7MTUPvnJ+cHnZq/LSgEYW/P8SMXVuOuYLo1hlA8wAKtFx6kyV9/u7tWJ6d87muO4jN9gvtJupSqrByaYJ9XzfIHSlhd5eQ+P3tGwVJQF3uRV8YmvEvxmX+i7A+VVgzJ3IVcgnDpSoSJW8CJT+RHrCh2t2lSqS5Tmc6kzt9xgmRsgGkexEijHO6eD85Od7dVV+UgWThF6VFyocrp+YmPVSgKPSIyGFuMdHWruJ6qew7jxUw6GCcFmYBE3UVJG25eWe9yprEarm2qdJt3EUoLwMUxl3R/d5WAJ7pr6fTmBljGH77fLyxlhIBWCIx9cWRSnMs3QEIlWVHS0Qfx/lAvpSkuXJXmnDoMAOB/bzSIEzGKsY4Oo0h/sgQg+5oLG+oMw2xhptrtoVEg8NWGdkfml9bM2G1u4J8aHo91h6dmfOmCRP9FUaxqnTbDRtMNWA6nbtQpExArh2dli6NpaIZdout46cANKJP7wu2riMUmF/FeMfZQhWYy0efaVHouV/qd7mxWSdcxG/RRttg4Cr2GIrV+vDoc63YuM96ZFRI1Av6XFiValrLGGWEDdoc3UsLG1srWMtGidiJRn18Z58NtfCzEcWyq45opRYx2efEiFg2eGpCjorCF9E7oN6SaD9ISE8L+AoVSi5qhq1T73CFaaEjGA+qird82owxaJyoNunI27S8m0YpNjRTapA1W1vc8iBdae2w0FAWLnnZf42jbUQz0TimIPWoMTfiGlcJZYP7x6aTqKQWzdd+Ntjp8xSbNdgcIvvNQxQMrxODqmojPk5I9UhMumvAGr/7W/xevFirapC8WHfxVULx+BHHil00YWOq1UMxt1JonaKTD+PTj6IZfzNdxWKzi8ds9va7PJ4x6YauOA4s7uHDuHxxxtESRNNAHafCj5ttw1D42RjHHuhLTvqEVeLFmhLSwz1UG5ygqnKs/hbgRYP4DQP+o1VBWRtzYuJ+x4lAfUSR7LO4ghD53pdF+G507App4xpXgv4BmqrRxmCssbzZ9w0GJBrpERGbKNaa8F3LVxvLTkm3pfhwi+3oEVTXQzkilGvGywX2SB97v+i8GOrXUVgYh0shwAoFsjTBXBprYCVJ/dtqMrwfM3iyHjZ7Brf+EOKWaF65UK+GwS/9V/ElKqKOcM6auygSFt/Gj14T2ObnFwB/sKym+E/G2tUPmOcmyzT+wQm6roEvgT7kz/f1a1wqQ9yWo0LffEBPmV7i6GOtH1CUDf8DqXDfEiIKAAA="),t=i):"s.css"===n.r?(r.body=atob("H4sIAAAAAAAACo1VS2/jNhD+K8QGBZJsJEvJOnUktGhPCxRF0Ut7KXqgyKHEmiIFkvJjA//3Dqmns1m0F1ucF795fMPN/T25J64Bpc5JZ6xz0tFmb0gQ37I78kuPIiKd8VQZkpDG+67YbP4ZJamQaBiEDqW19E1fpcy0s8HmG7F/lQy0g4J8/u0P8rMQYA35DBosVeT3vlKSTSbk8JRm5H6DTq+kMqfEyS9S1wV+Ww42QVFJLnji5wdC0YYZZWxBboCJTOSTLjhTtq+t6TVH7SN7gm1WEiU1JA3IuvEFydNP0JZEGO3DNQgvS19miaCtVOeC/AmWU01L0tJTcpTcNwX59GKD3XjKs+y7oLa11BiD0N6bknSU84h8253QpIu4b7z0ChDd6tIRxuCPCXpv2ugVHZjpztf2WboL9lTJWicOlCiIUHBKQPOSeDj5JKoKYkOaIUgq1AljcOk6Rc+DeZR7WjlUdMZJL01wAUW9PEB5Xb6cVuyFzS5FUYEwFh6mIxUebGyG9qCxtB8+lMt1aKNg5TxbK6A2dNY3kzZkqgzFCArEgN27NXRt9BwqUbQCtdZWyrD9my4/pt9vQ73mfmRY8ec81nAcKjtaYqOcUZJjws80221Lwnrrwnh1RmJmdr55TBTvvpqBpZCYqFG9R6xfEqk5nNAEu2O6BVDIENGskOVxqq4qL4Qo5xmfpth0lEl/js6xQgVrgO2Bf7wqy38HGvIvvgoTI3x8k+l8a75K6nFwNd26DbWVOIrhN/HQoswDxlF9qx16CxsZEj6is+t0nMFY4QQOeJubGj1VN32MpVmYO5xH/EiJcB6b5y3VrqMW48wdnhKfBnkUI+5JdWxk6NY0EZTLHlFsQ1epli0d2hqw5i4OGLVEaiF1dLuQn/ZwFpa24MiQUJgI/ItokCxIaYs70sPt03PGob5Dn8tAjZQx4nkhpHU+YY1UHIlV1RPrj2PSlVFY1QNYLxlVE8kxhW+TFXmftCY0UUVm4Zbg0gIbyW6OEXkLXNLb9Xrb4bq6C+AjvBbRvcOyq8m/rGzXmbxOe22c9rDVluLHCZ43+7D4sqtgdh0sPgmLb458rRSmPjT+f2Q8DOFbwx+5PJDXZYGXS2uWG12Y/rg+1kOlaBeetenr66IsmN/Bu34iBh6xUPTVCsc3cVo7Qq7XDUaPExtxQaDL0dIuGh7zXbay3I1PT9r6PJvTHCs46bAa+VivyO9gbrfroswYW7XIx65OqurhxiWs5e9P7gX50vX+L3/u4Ieqx27rv9++hHlg9eVfkoq6D6gIAAA="),t="text/css"):"status"===n.r?(r.body=atob("H4sIAAAAAAAACqVSS07DMBC9iuUVLJo2CyQWqSV2CCEVCS4wsVPi1LFDZtqS++QMXCAXw/k0VZrSDYvxYt6bN++NHBHEJmHSAOKa50xKLiIqfamheQwfV2KTZrBHZitqAa3WuJC5Eq+ggABsEATDUM/cYWIZJkZTMvKRTsLivanTXfNjWaotwUTVuuMljVFT26b2z8hSUInJQqSqKgo9EnKnkpHxoQ2MiLZbJ6JlF1tESh9O2bfmm/nyo/FCOsMnIMkWC1lePsyAnMKVb8biran1wdtsY1kglgFznbloGfuVfsrb6fdOLsyJxZ9cPOkdzJrP7YVm3c0g28nETlV9tuIcrN92LYG5kaDXTTWSKzX8w/YfBlvlS49npx3liq+egbLUBYky+XrBO+4l/I8C2mOQIb+PlgP8CzzDzy3QAgAA"),t=o):"status.js"===n.r?(r.body=atob("H4sIAAAAAAAACoVW7W7qNhi+ldSnQ/ESUmBHk9rEoO18qFN71KMVaZMQGm5iGp8Gm2MbOgT510vpnXBje50PIIxuKoX49fvx+PGT115nzDhz0vGH8B+TTrikymGE6pWIXUz6a6NWaz51l5InTueMEG2oYdiazspHkyr57HxSSioXCekk1FCEizyq9PY5UYH2KXzHviGdSAXzIGPi0aS+JO537aJ3uh3PEoQDLgRT18Mvt4QHYBmgr9uX7cvt7fYFXaGvd7/dI7/hr80qY0EsM6nqiEfFmABvxZKd80wmrJH9y93HT3/dD38f0cDOjWtHIZ8bfmbAASxYAyM/879Z4vawh5z44umPFGrsCmjTCHMvCQE82gzuh78My0p2OA4Um2c0Zi76QSN/KtWMmo/A0ZDPmCvYs2MHbpf99CMPph9myVBj/6yL8dVRHuy5FOotB8hxn7av21dhGBdMYAsK16gSujpazeSG6SdO1VJeOedruza6fDxYW14uLXpQ/WuaLbmo3bIGBQduNzTL2N4v5Y/pvx0nB1RxMZUNVJO79BtdaMdQ9cS1YcYsIFnJzSle4vQJaIHUbWfiuZ3IljV6gFJISY2T0iID8t7OYP2BUxsBAuXMyG+0iKNUBEGwJ3DZBHqzfV0JUWJc7TC+tX+LeQnTblARprevEOS6O0ccPLISIG6fCt5P4wswX/zcsZ/ee7xjGHURVJhvX/nSqgADJ0umNJdADQ+W/miMQ3hXeyDHUumtlsEA27XvPbyLoYl670Pj2dleMGcKr+2bOyOjcVi7MWJCFhmvdgmZ5+FZMF/o1GVF+mJGf8fr0v3y8tIXkLtOoOFZR2RWvfTtwj0WJtSQaF0j2ZfTUE57Oy9bDhBC1xjNRmw8HnXHobmopyNYkgsQdwYorXG+zyYgm2hmkyV4mw3nLNPsBIguhNWIi6CCGE1sUOFmCGt3w05ETKtlsWkLLCpRmgplu41h4HXHxNrC6lkfoOtAmbex5UAupJ+f2W5iVbvZDOG5KaBruVAaJLKuRDtviBahsNoDIOasGzY3f9+KQQTVGpOCajP2M9IQZTLqgJoq2AeCgt+Obb2bTffAmlg2iIugv6DC2g0yPhtULeeqNuDN5lCcEpDH2SJh2jX4RJJe0EgBw6MEJyKOyvaqsqDaadrqRpHBhNifsOiohZrOGPZNn+id5sGq9y+JZVKUZ1xKJpEBXdhziKDzdXawI29s1ABNpTDtZwat0lw9yCwJbdfOz9digB5o/PSo5EIkV+9YYv/KSdSf+Clx7cezJRMnzqjWBE25Qf1Gu8zsiZFHFybpT7BnfWHe8nKigTed2AD9WVQr7R6CX9VH4SlheSTN55Uq4fZwcqVWvipIQU9poKUyrst8YLtvQEltZuXk29tAWkmw1YpB3DCGGTtZCzrlR8craNrKuLirOHLqQEgpXUFQZBHDBrni/3hqiLtEc4I4BsQNUHVEzW2ThfMOSKotkuu3+DrG7RGRx/v15XkeUxPbJrqOpdASbjKsuEdBV4XuQvqQhx2t+43bEhryjDqMO3CaJVJr+h/3pPJmZA4uRtVgvnsqz+hqYBeR5yGcQv6HX+/rvp//A1zTqns7CgAA"),t=i):"config"===n.r?(r.body=atob("H4sIAAAAAAAACp1U7W6bMBR9FQtpavuDJqFRW03EEj9ahaSBaqGd9tMxbnEwNsUmXfd7j5Jn6AvwYjPhI4GtrToJhLi+x+f6nnNth3QDMENSTgyFwcqAP26u3OVVYA/0CrQVWjHSJCQAY0PHMv2GdfB5dDmEfrRGuVQoRXoB2pIwghWg4SQRIYH2oAo0yF26UmiDACu2kSpedyjK03wHEvoj6S8ysVrEvNgWW64I5YQDsWM7wKiXlExwRHC8Ej/LHSjftNClpoiLVw6cm/suzwa1POBLm05ppkSCYpmr8n94YVrWV7BHheilReFB/D2y9y1M1GgILcscXhwiOH2MVA9Td7fivEdZkuv+5ZzTkrQEreJ2eVpslX4oQx+fnGQZ9L2Bf33doG9RHAtzh4wlabZ/iLQsO3Gh3bVAeYbSB/Pi99L1pzPnbvkfXnivxmRo4iSEoK7z/TKmrhc435yZ86kippQrlKE16iqejExGk74U7/LPnPnS98BUu8ddLJwABHee535uPJw14mvtKNGfDstMic4WqaKCgw1iua5rDK1xNzSy4Mjqhi7hZTdwDs+7gTHs7XIGz3pM0GpHE0SNX4KcK5qU85YV2177LBPzvZNbyC3RqXFcbGllsLeVt0z51PraoRyBtGRi+h4AZk+viqaGadkavWr0QjeUJjQqlX4LlXyssXFwPok2pCp6lSvV9ilAjBHOEaxF/7dRAt9duJ7nB39lKdxw7G+JDk05jyLDpOY7mFgJ7VX2AVpwzCiOJ0fPlIfi+VSkhB8bA+PkqNpuGRHGXpriJc5oqmBGnmby2NBtMbHgD/TxdC2NE22HavkPMP/LnhcGAAA="),t=o):"config.js"===n.r?(r.body=atob("H4sIAAAAAAAACoVVbW/bNhD+KzZXuGStMLJW9INlxtiWAsWaLECdFf020/LJJqy3SLRbw9O/yT/JH9uRlB0pMdYvsu+54/F49zzkIQHdS0R/FO5k2QMhq30WUSauDrrcH1RMd7la9vy+EJWWGgaDfjIY2L/sYFZoh/MofKgo+SXNl0AYV1kG5af72xtxe3f98Z/Z/ReeyoJS8CSmnk/yQqs86+1ksgVB3hxkTa7eHKCeXDrP1Zx57XwuUHNjOke+1S0cLQerbIdwtIZoA0t0oD0ljUnGhLionWwvRsvBS7lvwWg5OFOrdTve2qHpmxSEhHFeUmOA8EOYBO9DGA6ZHIr5RGXFVvf0vsAz2hoW+Q/SU0tBvpnDmiNTQobAeCGXMy1LTQOP+ITVvblr52LTaabkJRSJjOC3JKHkG/HIgjSNitc/iYwJO1+q28iWcewb1XyxGYwmE2BCmJ9mj5dB8bod5EqGsuxMAO0zE0j9iyhddgJTnyN0LnZ0kai0zYIRR6BxBhcFlG1nwBE4OaNMd50InJzVQ7eCgFcP5woILtJukufNX1QW2MpQT35dR1JHa4o6ifKsyhMwrcABAKvrECjz/vh9xottZUJcukruDNnlcvlxB5m+UZUGHCglUaKiDfGsNnF4VwfgRQkm5hpiuU00ZaGRa1eQjqEYPnQsswqPDEDkbkWEwE2hqX1qobGkLQxzWsEJi3a1yDwruqOrpUbjQdWJ13Kcjsa+Z+V2XNbSoVmGijt6WlI0Hiu5o6+jR+NdbJDPz9w2vPx/gg8GluHCfP61DD5DcBuEmczHBYWWzeI1zZuTOQaLswQ/hljqiqhFa+/I2VOfO5Ru/EhbcSv1mqcqoyeWP69o8Zw1S6oHcY7ox0qC50qCdiUnDBFLmUrI71Lp3gr0tdSS/v3lZvj2siyiy89fZ3wGerqBvSBFXlaVukCyx2pFBk4Sb4d/zu7+4pUuVbZS8Z5qxsLA9/E54RHyadpKOhuSaSnMwfUaMmp4LhPAS5HcyyQBvNu03vaxTPNc1Xgep69T2PyrKtcw7pm7lc1ZzcYv8YrrH9r6TtpsdmhCcP48haqSK6PSIyvyMvq5Lu2b6d7QoszTwpS9zbRKnx6fHsunxzF2M9smCb6k+Ipi2f4EP4002dTONk5yZPG1kW+Wf6fscgS/Dj/47+DdB5/h1OD1JFzT4oGuhEnkufME/nvcxnWY3H3u413WOiE2gWF76v8A7GSWEfwHAAA="),t=i):r.code=404:(r.body=atob("H4sIAAAAAAAACo1SzY7TMBB+FeMDakWTihvajb1CsAf2xAFxRa49bWbr2sYzaVUh3oZn2Bfoi+E02Z8srODieOYbf983k2leuWj5mKDlnddNfwpvwkZB0M0O2AjbmkzAquN19U43jOxBfz7dZSKk0692e7prlkN2eBDMDtQe4ZBiZmFjYAis5AEdt8rBHi1U52CBARmNr8gaD+qt1I3DvbDeECmOaQjRqb9rFvChghKG8SGl4nwC2piO+nV/XoqbrlCITxTZ+ChmjRFthrVqmRNdLJe3OCD1GgWbvCl9f1uVeWz1E6RZGj0fJR6FRttmRc9i3WBIHYt+yiobh3EYkTm3ZlYVseGOyqDBbqHYHb73BKRF480KvFjHPKm/F6jOsP6C3jTL4T51UI0/4TyM6pFCv9zEP00XyjVuXjY5xR9Mvi+r1G3L8b9OB56p0+EkmzGxLgXE4uP1V3XA4OKh9tEaxhjqmHGDocZgfeeAZrJHfBuJ5fzSAwunyvJ3u6K3sBkMw7WHPlKgtKsnqRnMFyYlCO5Di94NFavojvWTbF+U4fsN9fCPvcmC1JRFDqaLPtWUrSq2r+BCXmUl30CdIXljYSb7xuVCyonmjOY/F5b+oPQYtoWwIIXAK0l89EAtAMu+vD4veC8kqS6xPMsN1wl9SYz2i836lmTZ8XHGvwHYLtlMJgQAAA=="),t=o),r.headers=[["Content-Type",t]],s&&r.headers.push(["Content-Encoding","gzip"])}catch(t){m(t),r.code=500}r.send()}),Timer.set(1e4,!0,b),b();