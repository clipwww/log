!function(e){function t(t){for(var n,o,i=t[0],d=t[1],u=t[2],s=0,b=[];s<i.length;s++)o=i[s],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&b.push(a[o][0]),a[o]=0;for(n in d)Object.prototype.hasOwnProperty.call(d,n)&&(e[n]=d[n]);for(l&&l(t);b.length;)b.shift()();return c.push.apply(c,u||[]),r()}function r(){for(var e,t=0;t<c.length;t++){for(var r=c[t],n=!0,i=1;i<r.length;i++){var d=r[i];0!==a[d]&&(n=!1)}n&&(c.splice(t--,1),e=o(o.s=r[0]))}return e}var n={},a={app:0},c=[];function o(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=e,o.c=n,o.d=function(e,t,r){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)o.d(r,n,function(t){return e[t]}.bind(null,n));return r},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/movie-record/";var i=window.webpackJsonp=window.webpackJsonp||[],d=i.push.bind(i);i.push=t,i=i.slice();for(var u=0;u<i.length;u++)t(i[u]);var l=d;c.push([0,"chunk-vendors"]),r()}({0:function(e,t,r){e.exports=r("cd49")},8976:function(e,t,r){},"90eb":function(e,t,r){"use strict";r("8976")},a41b:function(e,t,r){},cd49:function(e,t,r){"use strict";r.r(t),r("e260"),r("e6cf"),r("cca6"),r("a79d");var n=r("7a23"),a=(r("99af"),{class:"bg-gray-400 lg:p-4 p-1 min-h-screen"}),c={key:0,class:"bg-white p-8 rounded"},o=Object(n.g)('<div class="flex-1 space-y-2 py-1"><div class="h-4 bg-gray-300 rounded w-3/4"></div><div class="space-y-2"><div class="h-4 bg-gray-300 rounded"></div><div class="h-4 bg-gray-300 rounded w-5/6"></div></div></div>',1),i={key:1,class:"bg-white rounded lg:p-4 p-2"},d={class:"flex mb-8"},u=Object(n.h)("div",{class:"border border-r-0 px-4 p-3 whitespace-no-wrap bg-gray-700 text-white rounded-l"},"選擇年份",-1),l=Object(n.h)("option",{value:""},"全部",-1),s={key:0},b={class:"text-2xl text-center"},f={key:1},p=Object(n.h)("h2",{class:"text-2xl text-center"},"總共",-1),j={class:"lg:flex items-start my-8"},O={class:"lg:w-1/2 lg:mb-0 mb-4 lg:p-4 p-0"},v={class:"lg:w-1/2 lg:p-4 p-0"},h=Object(n.h)("h4",{class:"text-center mb-2"},"二刷以上的電影",-1),y={class:"lg:flex items-center"},m={class:"mr-2"},g={class:"text-xl text-red-600"};r("4de4"),r("7db0"),r("d81d"),r("b64b");var x=r("16ce"),w=r("6edf"),k=r.n(w),C=r("5a0c"),A=r.n(C),M=r("5087"),L=r.n(M),_=r("04ee"),q=r.n(_),D=r("7e21"),Y=r.n(D),B=r("5e77"),S=r.n(B),I=r("8d82"),R=r.n(I);function H(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return A()(e).format(t?"YYYY/MM/DD HH:mm":"YYYY/MM/DD")}A.a.locale(L.a),A.a.extend(q.a),A.a.extend(Y.a),A.a.extend(S.a),A.a.extend(R.a),r("d3b7");var T=Object(n.G)("data-v-645c2e9e");Object(n.r)("data-v-645c2e9e");var P={class:"my-4 text-center"},E={class:"lg:flex items-center my-8"},G={class:"lg:w-1/2 lg:mb-0 mb-4 lg:p-4 p-0"},F={class:"lg:w-1/2 lg:p-4 p-0"},z={class:"lg:flex items-center my-8"},W={class:"lg:w-1/2 lg:mb-0 mb-4 lg:p-4 p-0"},J={class:"lg:w-1/2 lg:p-4 p-0"},V={class:"my-4"};Object(n.q)();var $=T((function(e,t,r,a,c,o){var i=Object(n.w)("ContributionChart"),d=Object(n.w)("TotalAnalytics"),u=Object(n.w)("AreaPieChart"),l=Object(n.w)("TheaterPieChart"),s=Object(n.w)("FrequencyBarChart"),b=Object(n.w)("VersionBarChart"),f=Object(n.w)("TimeHeatmapChart");return Object(n.p)(),Object(n.e)(n.a,null,[e.hideContributionChart?Object(n.f)("",!0):(Object(n.p)(),Object(n.e)(i,{key:0,id:"js-contribution-".concat(e.id),class:"my-4",records:e.records},null,8,["id","records"])),Object(n.h)("div",P,[Object(n.h)(d,{records:e.records},null,8,["records"])]),Object(n.h)("div",E,[Object(n.h)("div",G,[Object(n.h)(u,{id:"js-area-pie-".concat(e.id),records:e.records},null,8,["id","records"])]),Object(n.h)("div",F,[Object(n.h)(l,{id:"js-theater-pie-".concat(e.id),records:e.records},null,8,["id","records"])])]),Object(n.h)("div",z,[Object(n.h)("div",W,[Object(n.h)(s,{id:"js-frequency-".concat(e.id),records:e.records},null,8,["id","records"])]),Object(n.h)("div",J,[Object(n.h)(b,{id:"js-version-".concat(e.id),records:e.records},null,8,["id","records"])])]),Object(n.h)("div",V,[Object(n.h)(f,{id:"js-heatmap-".concat(e.id),records:e.records},null,8,["id","records"])])],64)})),N=Object(n.G)("data-v-29d3366a");Object(n.r)("data-v-29d3366a");var U={class:"mx-auto relative"},X={class:"w-full overflow-x-auto"},K={class:"border rounded"},Q={class:"p-2 bg-gray-600 text-white rounded-t flex items-center justify-between"},Z=Object(n.h)("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","aria-hidden":"true",focusable:"false",role:"img",class:"iconify iconify--mdi",width:"1em",height:"1em",preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 24 24",style:{transform:"rotate(360deg)"}},[Object(n.h)("path",{d:"M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41z",fill:"currentColor"})],-1),ee={class:"px-2 rounded-b"},te={key:0,class:"p-2"},re=Object(n.h)("div",{class:"text-xs text-gray-400"},"這裡什麼都沒有唷",-1);Object(n.q)();var ne=N((function(e,t,r,a,c,o){var i=Object(n.w)("MovieRecordItem");return Object(n.p)(),Object(n.e)("div",U,[Object(n.h)("div",X,[(Object(n.p)(),Object(n.e)("svg",{id:e.id,key:e.id,width:62*e.rectWidth,height:10*e.rectWidth},null,8,["id","width","height"]))]),Object(n.F)(Object(n.h)("div",K,[Object(n.h)("div",Q,[Object(n.h)("div",null,Object(n.x)(e.formatDate(e.dayDetails.date,!1)),1),Object(n.h)("div",{class:"font-bold cursor-pointer text-xl",onClick:t[1]||(t[1]=function(t){return e.dayDetails.show=!1})},[Z])]),Object(n.h)("div",ee,[(Object(n.p)(!0),Object(n.e)(n.a,null,Object(n.u)(e.dayDetails.records,(function(e){return Object(n.p)(),Object(n.e)(i,{format:"HH:mm",key:"".concat(e.date,"_").concat(e.title),record:e},null,8,["record"])})),128)),e.dayDetails.records.length?Object(n.f)("",!0):(Object(n.p)(),Object(n.e)("div",te,[re]))])],512),[[n.B,e.dayDetails.show]])])})),ae=(r("cb29"),r("4160"),r("159b"),r("5530")),ce=r("2909"),oe=(r("96cf"),r("1da1")),ie=r("5698"),de=Object(n.G)("data-v-2e13e7be");Object(n.r)("data-v-2e13e7be");var ue={class:"my-4"},le={class:"flex items-center"},se={class:"inline-block font-bold mr-2"},be={class:"inline-block bg-gray-400 mr-2 rounded px-2 text-xs"},fe={class:"text-xs"},pe={key:0,class:"mr-2"},je={class:"text-xs text-gray-500"};Object(n.q)();var Oe=de((function(e,t,r,a,c,o){return Object(n.p)(),Object(n.e)("div",ue,[Object(n.h)("div",le,[Object(n.h)("div",se,Object(n.x)(e.formatDateTime(e.record.date)),1),Object(n.h)("div",be,Object(n.x)(e.record.version),1),Object(n.h)("div",fe,Object(n.x)(e.record.theater),1)]),e.hideTitle?Object(n.f)("",!0):(Object(n.p)(),Object(n.e)("div",pe,Object(n.x)(e.record.title),1)),Object(n.h)("div",je,Object(n.x)(e.record.memo),1)])})),ve=Object(n.i)({props:{record:{type:Object,required:!0},format:{type:String,default:"YYYY/MM/DD HH:mm"},hideTitle:{type:Boolean,default:!1}},setup:function(e){return{formatDateTime:function(t){return A()(t).format(e.format)}}}});ve.render=Oe,ve.__scopeId="data-v-2e13e7be";var he=ve,ye=Object(n.i)({components:{MovieRecordItem:he},props:{id:{type:String,default:"js-contribution"},records:{type:Array,required:!0}},setup:function(e){var t=Array(12).fill("").map((function(e,t){return A()().month(t).format("MMM")})),r=Array(7).fill("").map((function(e,t){return A()().weekday(t).format("dd")})).filter((function(e,t){return t%2==1})),a=Object(n.c)((function(){var t=k()(e.records,(function(e){return A()(e.date).startOf("day").toISOString()})),r=[];return Object.keys(t).forEach((function(e){var n=A()(e).dayOfYear();r[n]={date:e,count:t[e].length,records:t[e]}})),r})),c=Object(n.s)({contributions:Object(n.c)((function(){var t=A()(e.records[0].date).startOf("year"),r=t.isLeapYear()?366:365,n=t.isoWeekday()%7;return Array(n).fill("").map((function(){return{date:"",value:-1,records:[]}})).concat(Array(r).fill("").map((function(e,r){var n,c,o,i,d=t.add(r,"day"),u=null!==(n=null===(c=a.value[r+1])||void 0===c?void 0:c.count)&&void 0!==n?n:0,l=null!==(o=null===(i=a.value[r+1])||void 0===i?void 0:i.records)&&void 0!==o?o:[];return{date:d.toISOString(),value:u,records:l}})))}))}),o=Object(n.s)({show:!1,date:"",records:[]});function i(){var n=ie.d("#".concat(e.id)),a=n.append("g").attr("class","mainChart").attr("transform","translate(".concat(20,", ").concat(20,")")).selectAll("rect").data(c.contributions),i=ie.b().domain([-1,0,1,2,3,4,5]).range(["#fff","#eee","#d6e685","#8cc665","#44a340","#1e6823"]);a.enter().append("rect").attr("height",15).attr("width",15).attr("fill",(function(e){return i(e.value)})).attr("y",(function(e,t){return t%7*17})).attr("x",(function(e,t){return 17*~~(t/7)})).attr("title",(function(e){return e.date})).attr("cursor",(function(e){return e.value>=0?"pointer":"initial"})).on("click",(function(e,t){t.value<0?o.show=!1:(o.show=!0,o.date=t.date,o.records=Object(ce.a)(t.records).reverse())})),n.append("g").attr("class","xAxis").selectAll("text").data(t).enter().append("text").text((function(e){return e})).attr("x",(function(e,t){return 17*t*4.333+32})).attr("y",12).style("text-anchor","middle").style("font-size",12),n.append("g").attr("class","yAxis").selectAll("text").data(r).enter().append("text").text((function(e){return e})).attr("y",(function(e,t){return 34*t+47})).attr("x",12).style("text-anchor","middle").style("font-size",12)}return Object(n.C)((function(){return c.contributions}),Object(oe.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(n.l)();case 2:i();case 3:case"end":return e.stop()}}),e)})))),Object(n.C)((function(){return o.show}),(function(e){e||(o.date="",o.records=[])})),Object(n.n)((function(){i()})),Object(ae.a)(Object(ae.a)({},Object(n.y)(c)),{},{rectWidth:15,dayDetails:o,formatDate:H})}});ye.render=ne,ye.__scopeId="data-v-29d3366a";var me=ye,ge=Object(n.G)("data-v-fca27b88");Object(n.r)("data-v-fca27b88");var xe=Object(n.h)("h4",{class:"text-center"},"電影國別",-1);Object(n.q)();var we=ge((function(e,t,r,a,c,o){var i=Object(n.w)("PieChart");return Object(n.p)(),Object(n.e)(n.a,null,[xe,Object(n.h)(i,{id:e.id,data:e.dataset.data,labels:e.dataset.labels},null,8,["id","data","labels"])],64)})),ke=Object(n.G)("data-v-2ee473b9")((function(e,t,r,a,c,o){return Object(n.p)(),Object(n.e)("canvas",{id:e.id,key:e.id},null,8,["id"])})),Ce=(r("13d5"),r("b680"),r("30ef")),Ae=r.n(Ce),Me=r("a9be"),Le=r.n(Me),_e=["rgb(255, 99, 132)","rgb(54, 162, 235)","rgb(75, 192, 192)","rgb(255, 159, 64)","rgb(153, 102, 255)","rgb(255, 205, 86)","#81E6D9","#718096","#742A2A","#68D391","#2C5282","#6B46C1"];Ae.a.plugins.unregister(Le.a);var qe=Object(n.i)({props:{id:{type:String,required:!0},title:{type:String},data:{type:Array,required:!0},labels:{type:Array,required:!0}},setup:function(e){var t=Object(n.t)(null),r=Object(x.c)("(min-width: 768px)");function a(){return c.apply(this,arguments)}function c(){return(c=Object(oe.a)(regeneratorRuntime.mark((function a(){var c;return regeneratorRuntime.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,Object(n.l)();case 2:t.value&&t.value.clear(),c=document.getElementById(e.id).getContext("2d"),t.value=new Ae.a(c,{plugins:[Le.a],type:"pie",data:{datasets:[{data:e.data,backgroundColor:_e}],labels:e.labels},options:{responsive:!0,aspectRatio:r.value?1.5:e.labels.length>10?.7:1,title:{display:!!e.title,text:e.title},tooltips:{callbacks:{label:function(t,r){var n,a=t.index,c=e.data[a],o=c/e.data.reduce((function(e,t){return e+ +t}),0)*100;return"".concat(null===(n=r.labels)||void 0===n?void 0:n[a],": ").concat(c," (").concat(o.toFixed(0),"%)")}}},plugins:{datalabels:{color:"#000000",textStrokeColor:"#ffffff",textStrokeWidth:3,formatter:function(t){return t/e.data.reduce((function(e,t){return e+ +t}),0)*100<10?"":t}}}}});case 5:case"end":return a.stop()}}),a)})))).apply(this,arguments)}return Object(n.C)((function(){return e.data}),(function(){a()})),Object(n.n)((function(){a()})),{}}});qe.render=ke,qe.__scopeId="data-v-2ee473b9";var De=qe,Ye=Object(n.i)({components:{PieChart:De},props:{id:{type:String,default:"js-area-pie"},records:{type:Array,required:!0}},setup:function(e){var t=Object(n.c)((function(){return k()(e.records,(function(e){return e.area}))}));return{dataset:Object(n.s)({data:Object(n.c)((function(){return Object.keys(t.value).map((function(e){return t.value[e].length}))})),labels:Object(n.c)((function(){return Object.keys(t.value)}))})}}});Ye.render=we,Ye.__scopeId="data-v-fca27b88";var Be=Ye,Se=Object(n.G)("data-v-54422f2c");Object(n.r)("data-v-54422f2c");var Ie=Object(n.h)("h4",{class:"text-center"},"影城",-1);Object(n.q)();var Re=Se((function(e,t,r,a,c,o){var i=Object(n.w)("PieChart");return Object(n.p)(),Object(n.e)(n.a,null,[Ie,Object(n.h)(i,{id:e.id,key:e.id,data:e.dataset.data,labels:e.dataset.labels},null,8,["id","data","labels"])],64)})),He=Object(n.i)({components:{PieChart:De},props:{id:{type:String,default:"js-theater-pie"},records:{type:Array,required:!0}},setup:function(e){var t=Object(n.c)((function(){return k()(e.records,(function(e){return e.theater}))}));return{dataset:Object(n.s)({data:Object(n.c)((function(){return Object.keys(t.value).map((function(e){return t.value[e].length}))})),labels:Object(n.c)((function(){return Object.keys(t.value)}))})}}});He.render=Re,He.__scopeId="data-v-54422f2c";var Te=He,Pe=Object(n.G)("data-v-4fcd3004");Object(n.r)("data-v-4fcd3004");var Ee=Object(n.h)("h4",{class:"text-center"},"各月看電影的次數",-1);Object(n.q)();var Ge=Pe((function(e,t,r,a,c,o){var i=Object(n.w)("BarChart");return Object(n.p)(),Object(n.e)(n.a,null,[Ee,Object(n.h)(i,{id:e.id,data:e.data,labels:e.labels},null,8,["id","data","labels"])],64)})),Fe=Object(n.G)("data-v-410b3a7b")((function(e,t,r,a,c,o){return Object(n.p)(),Object(n.e)("canvas",{id:e.id,key:e.id},null,8,["id"])}));Ae.a.plugins.unregister(Le.a);var ze=Object(n.i)({props:{id:{type:String,required:!0},data:{type:Array,required:!0},labels:{type:Array,required:!0},title:{type:String}},setup:function(e){var t=Object(n.t)(null),r=Object(x.c)("(min-width: 768px)");function a(){return c.apply(this,arguments)}function c(){return(c=Object(oe.a)(regeneratorRuntime.mark((function a(){var c;return regeneratorRuntime.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,Object(n.l)();case 2:t.value&&t.value.clear(),c=document.getElementById(e.id).getContext("2d"),t.value=new Ae.a(c,{plugins:[Le.a],type:"bar",data:{datasets:[{data:e.data,backgroundColor:_e}],labels:e.labels},options:{responsive:!0,aspectRatio:r.value?1.5:1,title:{display:!!e.title,text:e.title},legend:{display:!1},tooltips:{enabled:!1},scales:{yAxes:[{ticks:{min:0,stepSize:1}}]},plugins:{datalabels:{textAlign:"start",align:"top",color:"#000000",textStrokeColor:"#ffffff",textStrokeWidth:3,formatter:function(e){return e>0?e:""}}}}});case 5:case"end":return a.stop()}}),a)})))).apply(this,arguments)}return Object(n.C)((function(){return e.data}),(function(){a()})),Object(n.n)((function(){a()})),{}}});ze.render=Fe,ze.__scopeId="data-v-410b3a7b";var We=ze,Je=Object(n.i)({components:{BarChart:We},props:{id:{type:String,required:!0},records:{type:Array,required:!0}},setup:function(e){var t=Array(12).fill("").map((function(e,t){return t})),r=Object(n.c)((function(){return k()(e.records,(function(e){return A()(e.date).month()}))})),a=Object(n.s)({data:Object(n.c)((function(){var e=Object.keys(r.value).map((function(e){return{month:+e,value:r.value[e].length}}));return t.map((function(t){var r,n;return null!==(r=null===(n=e.find((function(e){return e.month===t})))||void 0===n?void 0:n.value)&&void 0!==r?r:0}))})),labels:t.map((function(e){return A()().month(e).format("MMM")}))});return Object(ae.a)({},Object(n.y)(a))}});Je.render=Ge,Je.__scopeId="data-v-4fcd3004";var Ve=Je,$e=Object(n.G)("data-v-22822d82");Object(n.r)("data-v-22822d82");var Ne=Object(n.h)("h4",{class:"text-center"},"各版本的次數",-1);Object(n.q)();var Ue=$e((function(e,t,r,a,c,o){var i=Object(n.w)("BarChart");return Object(n.p)(),Object(n.e)(n.a,null,[Ne,Object(n.h)(i,{id:e.id,data:e.data,labels:e.labels},null,8,["id","data","labels"])],64)})),Xe=Object(n.i)({components:{BarChart:We},props:{id:{type:String,required:!0},records:{type:Array,required:!0}},setup:function(e){var t=Object(n.c)((function(){return k()(e.records,(function(e){return e.version}))})),r=Object(n.s)({data:Object(n.c)((function(){return Object.keys(t.value).map((function(e){return t.value[e].length}))})),labels:Object.keys(t.value).map((function(e){return e}))});return Object(ae.a)({},Object(n.y)(r))}});Xe.render=Ue,Xe.__scopeId="data-v-22822d82";var Ke=Xe,Qe=Object(n.G)("data-v-5628848b");Object(n.r)("data-v-5628848b");var Ze={class:"lg:flex items-start"},et={class:"lg:p-4 p-0 lg:w-1/2"},tt=Object(n.h)("h4",{class:"text-center"},"看電影的時間",-1),rt={class:"lg:mt-0 mt-2 lg:p-4 p-0 lg:w-1/2"},nt={class:"border rounded"},at={class:"p-2 bg-gray-600 text-white rounded-t flex items-center justify-between"},ct=Object(n.h)("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","aria-hidden":"true",focusable:"false",role:"img",class:"iconify iconify--mdi",width:"1em",height:"1em",preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 24 24",style:{transform:"rotate(360deg)"}},[Object(n.h)("path",{d:"M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41z",fill:"currentColor"})],-1),ot={class:"px-2 rounded-b"},it={key:0,class:"p-2"},dt=Object(n.h)("div",{class:"text-xs text-gray-400"},"這裡什麼都沒有唷",-1);Object(n.q)();var ut=Qe((function(e,t,r,a,c,o){var i=Object(n.w)("MovieRecordItem");return Object(n.p)(),Object(n.e)("div",Ze,[Object(n.h)("div",et,[tt,(Object(n.p)(),Object(n.e)("svg",{id:e.id,class:"w-full",height:e.svgHeight},null,8,["id","height"]))]),Object(n.h)("div",rt,[Object(n.F)(Object(n.h)("div",nt,[Object(n.h)("div",at,[Object(n.h)("div",null,Object(n.x)(e.formatWeekDay(e.dayDetails.weekday))+" "+Object(n.x)(e.formatHour(e.dayDetails.hour)),1),Object(n.h)("div",{class:"font-bold cursor-pointer text-xl",onClick:t[1]||(t[1]=function(t){return e.dayDetails.show=!1})},[ct])]),Object(n.h)("div",ot,[(Object(n.p)(!0),Object(n.e)(n.a,null,Object(n.u)(e.dayDetails.records,(function(e){return Object(n.p)(),Object(n.e)(i,{format:"YYYY/MM/DD HH:mm",key:"".concat(e.date,"_").concat(e.title),record:e},null,8,["record"])})),128)),e.dayDetails.records.length?Object(n.f)("",!0):(Object(n.p)(),Object(n.e)("div",it,[dt]))])],512),[[n.B,e.dayDetails.show]])])])})),lt=Object(n.i)({components:{MovieRecordItem:he},props:{id:{type:String,default:"js-heatmap"},records:{type:Array,required:!0}},setup:function(e){var t=10,r=20,a=20,c=45,o=528+t+a,i=o-t-a,d=Array(7).fill("").map((function(e,t){return A()().weekday(t).format("ddd")})),u=Object(x.d)().width,l=Object(x.b)(f,1e3),s=Object(n.s)({dataset:Object(n.c)((function(){var t=k()(e.records,(function(e){return A()(e.date).weekday()})),r=[];return Array(7).fill("").forEach((function(e,n){Array(24).fill("").forEach((function(e,a){var c,o,i=null===(c=t[n])||void 0===c?void 0:c.filter((function(e){return A()(e.date).isSame(A()(e.date).hour(a),"hour")})),d=null!==(o=null==i?void 0:i.length)&&void 0!==o?o:0;r.push({weekday:+n,hour:a,value:d,records:i})}))})),r}))}),b=Object(n.s)({show:!1,weekday:0,hour:0,records:[]});function f(){return p.apply(this,arguments)}function p(){return(p=Object(oe.a)(regeneratorRuntime.mark((function a(){var o,u,l,f,p,j,O,v,h,y,m;return regeneratorRuntime.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,Object(n.l)();case 2:ie.e("#".concat(e.id," > *")).remove(),l=ie.d("#".concat(e.id)),f=null==l||null===(o=l.node())||void 0===o||null===(u=o.getBoundingClientRect())||void 0===u?void 0:u.width,p=f-c-r,j=Math.floor(p/d.length),(O=l.append("g").attr("class","heatMap").attr("transform","translate(".concat(c,", ").concat(t,")"))).append("g").attr("class","dayLabel").selectAll("text").data(d).enter().append("text").text((function(e){return e})).attr("x",(function(e,t){return t*j+5})).attr("y",i+22*.7).style("text-anchor","middle").style("font-size",12).attr("transform","translate(".concat(j/2,", 0)")),v=ie.c().domain([A()().startOf("day"),A()().add(1,"day").startOf("day")]).range([0,i]),h=ie.a(v).ticks(24).tickFormat(ie.f("%H:%M")),O.append("g").attr("class","timeLabel").call(h),y=ie.b().domain([0,8]).range(["#eee","#d6e685","#8cc665","#44a340","#1e6823","#18541c","#134016","#0d2d0f"]),m=O.append("g").attr("class","rect").selectAll("rect").data(s.dataset).enter().append("rect").attr("x",(function(e){return e.weekday*j+5})).attr("y",(function(e){return 22*e.hour})).attr("weekday",(function(e){return e.weekday})).attr("hour",(function(e){return e.hour})).attr("rx",5).attr("ry",5).attr("width",j).attr("height",22).attr("stroke","#fff").attr("stroke-width","2px").style("fill","#eee").attr("cursor",(function(e){return e.value>=0?"pointer":"initial"})).on("click",(function(e,t){t.value<0?b.show=!1:(b.show=!0,b.weekday=t.weekday,b.hour=t.hour,b.records=t.records)})),O.append("g").selectAll("rect").data(s.dataset).enter().append("text").attr("x",(function(e){return e.weekday*j+j/2})).attr("y",(function(e){return 22*e.hour+11+5})).text((function(e){return e.value?e.value:""})).style("font-size",12).style("text-shadow","1px 1px #fff, -1px -1px #fff , 0 -1px #fff, -1px 0 #fff, 1px 0 #fff, 0 1px #fff").attr("fill","#000"),m.transition().duration(400).style("fill",(function(e){return y(e.value)}));case 16:case"end":return a.stop()}}),a)})))).apply(this,arguments)}return Object(n.C)((function(){return s.dataset}),(function(){f()})),Object(n.C)(u,(function(){l()})),Object(n.n)((function(){f()})),{svgHeight:o,dayDetails:b,formatDate:H,formatWeekDay:function(e){return A()().weekday(e).format("ddd")},formatHour:function(e){var t=A()().startOf("day");return t.hour(e).format("HH:mm")+"~"+t.hour(e+1).format("HH:mm")}}}});lt.render=ut,lt.__scopeId="data-v-5628848b";var st=lt,bt=Object(n.G)("data-v-15399268");Object(n.r)("data-v-15399268");var ft={class:"text-xs"};Object(n.q)();var pt=bt((function(e,t,r,a,c,o){return Object(n.p)(),Object(n.e)("div",ft," 看了 "+Object(n.x)(e.totalCount)+" 場電影，一共 "+Object(n.x)(e.totalTicks)+" 張電影票，花了 "+Object(n.x)(e.totalCost.toLocaleString())+" 新台幣 ",1)})),jt=Object(n.i)({props:{records:{type:Array,required:!0}},setup:function(e){var t=Object(n.s)({totalCount:Object(n.c)((function(){return e.records.length})),totalCost:Object(n.c)((function(){return e.records.reduce((function(e,t){return e+t.cost}),0)})),totalTicks:Object(n.c)((function(){return e.records.reduce((function(e,t){return e+t.tickets}),0)}))});return Object(ae.a)({},Object(n.y)(t))}});jt.render=pt,jt.__scopeId="data-v-15399268";var Ot=jt,vt=Object(n.i)({components:{ContributionChart:me,AreaPieChart:Be,TheaterPieChart:Te,FrequencyBarChart:Ve,VersionBarChart:Ke,TimeHeatmapChart:st,TotalAnalytics:Ot},props:{id:{type:String,required:!0},records:{type:Array,required:!0},hideContributionChart:{type:Boolean,default:!1}},setup:function(){return{}}});vt.render=$,vt.__scopeId="data-v-645c2e9e";var ht=vt,yt=Object(n.G)("data-v-01562e24");Object(n.r)("data-v-01562e24");var mt=Object(n.h)("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","aria-hidden":"true",focusable:"false",role:"img",class:"iconify iconify--ph",width:"1em",height:"1em",preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 256 256",style:{transform:"rotate(360deg)"}},[Object(n.h)("path",{d:"M96 220a12 12 0 0 1-8.485-20.485L159.029 128L87.515 56.485a12 12 0 0 1 16.97-16.97l80 80a12 12 0 0 1 0 16.97l-80 80A11.963 11.963 0 0 1 96 220z",fill:"currentColor"})],-1);Object(n.q)();var gt=yt((function(e,t,r,a,c,o){return Object(n.p)(),Object(n.e)("div",null,[Object(n.h)("div",{class:"flex items-center justify-between cursor-pointer px-2",onClick:t[1]||(t[1]=function(t){return e.show=!e.show})},[Object(n.v)(e.$slots,"title"),Object(n.h)("div",{class:["transition-transform duration-200 ease-linear",{"is-active":e.show}]},[mt],2)]),Object(n.h)(n.b,{name:"fade"},{default:yt((function(){return[Object(n.F)(Object(n.h)("div",null,[Object(n.v)(e.$slots,"default")],512),[[n.B,e.show]])]})),_:3})])})),xt=Object(n.i)({setup:function(){return{show:Object(n.t)(!1)}}});r("90eb"),xt.render=gt,xt.__scopeId="data-v-01562e24";var wt=xt,kt=Object(n.G)("data-v-638abd34")((function(e,t,r,a,c,o){return Object(n.p)(),Object(n.e)("canvas",{id:e.id,key:e.id},null,8,["id"])})),Ct=Object(n.i)({props:{id:{type:String,required:!0},records:{type:Array,required:!0}},setup:function(e){var t=Object(n.t)(null),r=Object(x.c)("(min-width: 768px)"),a=Object(n.c)((function(){var t=k()(e.records,(function(e){return A()(e.date).year()}));return Object.keys(t).map((function(e){return{id:+e,records:t[e]}}))}));function c(){return o.apply(this,arguments)}function o(){return(o=Object(oe.a)(regeneratorRuntime.mark((function c(){var o;return regeneratorRuntime.wrap((function(c){for(;;)switch(c.prev=c.next){case 0:return c.next=2,Object(n.l)();case 2:t.value&&t.value.clear(),o=document.getElementById(e.id).getContext("2d"),t.value=new Ae.a(o,{type:"bar",data:{datasets:[{type:"line",label:"總花費",data:a.value.map((function(e){return e.records.reduce((function(e,t){return e+t.cost}),0)})),borderColor:_e[0],backgroundColor:_e[0],fill:!1},{type:"line",label:"總票數",data:a.value.map((function(e){return e.records.reduce((function(e,t){return e+t.tickets}),0)})),borderColor:_e[3],backgroundColor:_e[3],fill:!1},{type:"line",label:"總場數",data:a.value.map((function(e){return e.records.length})),borderColor:_e[2],backgroundColor:_e[2],fill:!1},{type:"line",label:"平均每張票花費",data:a.value.map((function(e){var t=e.records;return+(t.reduce((function(e,t){return e+t.cost}),0)/t.reduce((function(e,t){return e+t.tickets}),0)).toFixed(2)||0})),borderColor:_e[1],backgroundColor:_e[1],fill:!1},{type:"line",label:"平均每次花費",data:a.value.map((function(e){var t=e.records;return+(t.reduce((function(e,t){return e+t.cost}),0)/t.length).toFixed(2)||0})),borderColor:_e[4],backgroundColor:_e[4],fill:!1}],labels:a.value.map((function(e){return e.id}))},options:{responsive:!0,aspectRatio:r.value?1.5:1,title:{display:!1},legend:{display:!0},tooltips:{enabled:!0,mode:"index",intersect:!1,callbacks:{}},scales:{yAxes:[{ticks:{min:0}}]}}});case 5:case"end":return c.stop()}}),c)})))).apply(this,arguments)}return Object(n.C)((function(){return e.records}),(function(){c()})),Object(n.n)((function(){c()})),{}}});Ct.render=kt,Ct.__scopeId="data-v-638abd34";var At=Ct,Mt=Object(n.i)({name:"App",components:{Dashboard:ht,MovieRecordItem:he,CollapseItem:wt,LineChart:At},setup:function(){var e,t=Object(x.a)((e="https://mechakucha-api.herokuapp.com/my-movie-record",new Promise((function(t,r){var n=new XMLHttpRequest;n.addEventListener("progress",(function(e){e.lengthComputable&&(e.loaded,e.total)})),n.addEventListener("load",(function(){return t(JSON.parse(n.response))})),n.addEventListener("error",(function(e){return r(e)})),n.addEventListener("abort",(function(e){return r(e)})),n.open("GET",e),n.send()}))),{success:!1,resultMessage:"",resultCode:"",resultException:"",items:[]}),r=t.state,a=t.ready,c=Object(n.t)(A()().year()),o=Object(n.c)((function(){return r.value.items})),i=Object(n.c)((function(){var e=k()(o.value,(function(e){return A()(e.date).year()}));return Object.keys(e).sort((function(e,t){return+e>+t?-1:1})).map((function(t){return{id:+t,records:e[t]}}))})),d=Object(n.c)((function(){return i.value.find((function(e){return e.id===c.value}))})),u=Object(n.c)((function(){var e=k()(o.value,(function(e){return e.title}));return Object.keys(e).map((function(t){return{title:t,count:e[t].length,records:o.value.filter((function(e){return t===e.title}))}})).filter((function(e){return e.count>1})).sort((function(e,t){return e.count>t.count?-1:1}))}));return{ready:a,records:o,arrayByYear:i,arrayByTitle:u,filterYear:c,filterArrayByYear:d,formatDate:H}}});Mt.render=function(e,t,r,x,w,k){var C=Object(n.w)("Dashboard"),A=Object(n.w)("LineChart"),M=Object(n.w)("MovieRecordItem"),L=Object(n.w)("CollapseItem");return Object(n.p)(),Object(n.e)("div",a,[e.ready?(Object(n.p)(),Object(n.e)("div",i,[Object(n.h)("div",d,[u,Object(n.F)(Object(n.h)("select",{"onUpdate:modelValue":t[1]||(t[1]=function(t){return e.filterYear=t}),class:"w-full border p-2 rounded-none bg-white rounded-r"},[l,(Object(n.p)(!0),Object(n.e)(n.a,null,Object(n.u)(e.arrayByYear,(function(e){return Object(n.p)(),Object(n.e)("option",{key:e.id,value:e.id},Object(n.x)(e.id),9,["value"])})),128))],512),[[n.A,e.filterYear,void 0,{number:!0}]])]),e.filterArrayByYear?(Object(n.p)(),Object(n.e)("div",s,[Object(n.h)("h2",b,Object(n.x)(e.filterArrayByYear.id),1),Object(n.h)(C,{id:"".concat(e.filterArrayByYear.id),records:e.filterArrayByYear.records},null,8,["id","records"])])):(Object(n.p)(),Object(n.e)("div",f,[p,Object(n.h)(C,{id:"total",records:e.records,hideContributionChart:""},null,8,["records"]),Object(n.h)("div",j,[Object(n.h)("div",O,[Object(n.h)(A,{id:"total",records:e.records},null,8,["records"])]),Object(n.h)("div",v,[h,(Object(n.p)(!0),Object(n.e)(n.a,null,Object(n.u)(e.arrayByTitle,(function(e){return Object(n.p)(),Object(n.e)("div",{key:e.title,class:"border rounded mb-3 p-2"},[Object(n.h)(L,null,{title:Object(n.E)((function(){return[Object(n.h)("div",y,[Object(n.h)("div",m,Object(n.x)(e.title),1),Object(n.h)("div",g,Object(n.x)(e.count)+" 次",1)])]})),default:Object(n.E)((function(){return[(Object(n.p)(!0),Object(n.e)(n.a,null,Object(n.u)(e.records,(function(e){return Object(n.p)(),Object(n.e)(M,{key:"".concat(e.date,"_").concat(e.title),record:e,hideTitle:""},null,8,["record"])})),128))]})),_:2},1024)])})),128))])])]))])):(Object(n.p)(),Object(n.e)("div",c,[(Object(n.p)(),Object(n.e)(n.a,null,Object(n.u)(5,(function(e){return Object(n.h)("div",{key:e,class:"animate-pulse space-x-4"},[o])})),64))]))])};var Lt=Mt,_t=r("9483");Object(_t.a)("".concat("/movie-record/","service-worker.js"),{ready:function(){},registered:function(){},cached:function(){},updatefound:function(){},updated:function(){},offline:function(){},error:function(e){}}),r("def6"),r("a41b"),Object(n.d)(Lt).mount("#app")},def6:function(e,t,r){}});