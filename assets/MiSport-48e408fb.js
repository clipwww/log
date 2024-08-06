import{d as f,_ as S,f as H,T as V,h as j,C as O,i as R,S as F,k as E,r as q}from"./index-7ebb4176.js";import{C as L,T as N}from"./ContributionChart-1c48828a.js";import{d as w,q as b,Y as D,Z as z,_ as M,L as y,M as v,N as T,S as k,f as C,P as p,a1 as G,F as $,X as A,Q as t,R as l,V as W}from"./index-668e3e2e.js";import"./on-popup-reopen-dfed5c31.js";const I=w({components:{ContributionChart:L},props:{id:{type:String,default:"js-contribution"},logs:{type:Array,required:!0}},setup(e){const _=b(()=>S(e.logs,a=>f(a.startTime).dayOfYear())),h=D({contributions:b(()=>{const a=f(e.logs[0].startTime).startOf("year"),m=a.isLeapYear()?366:365,x=a.isoWeekday()%7;return Array(x).fill("").map(()=>({date:"",value:-1,items:[]})).concat(Array(m).fill("").map((o,s)=>{var i;const n=a.add(s,"day"),g=((i=_.value[s+1])==null?void 0:i.length)??0,r=_.value[s+1]||[];return{date:n.toISOString(),value:g,items:r}}))})}),u=D({date:"",items:[]});function c({date:a,items:m}){u.date=a,u.items=m}function d(a){return f(a).format("YYYY/MM/DD (ddd)")}return{...z(h),dayDetails:u,formatDate:d,onClick:c}}});function P(e,_,h,u,c,d){const a=y("ContributionChart");return v(),T(a,{id:e.id,key:e.id,contributions:e.contributions,onBlockClick:e.onClick},null,8,["id","contributions","onBlockClick"])}const Q=M(I,[["render",P]]),X=w({components:{TimeHeatmapChart:N},props:{id:{type:String,default:"js-heatmap"},logs:{type:Array,required:!0}},setup(e){const _=b(()=>{const c=S(e.logs,a=>f(a.startTime).weekday()),d=[];return Array(7).fill("").forEach((a,m)=>{Array(24).fill("").forEach((x,o)=>{var g;const s=(g=c[m])==null?void 0:g.filter(r=>f(r.startTime).isSame(f(r.startTime).hour(o),"hour")),n=(s==null?void 0:s.length)??0;d.push({weekday:+m,hour:o,value:n,logs:s})})}),d});function h(c){return f().weekday(c).format("ddd")}function u(c){const d=f().startOf("day");return d.hour(c).format("HH:mm")+"~"+d.hour(c+1).format("HH:mm")}return{dataset:_,formatDate:H,formatWeekDay:h,formatHour:u}}});function Z(e,_,h,u,c,d){const a=y("TimeHeatmapChart");return v(),T(a,{id:e.id,dataset:e.dataset},null,8,["id","dataset"])}const J=M(X,[["render",Z]]),K=w({components:{VanTabs:V,VanTab:j,VanCell:O,VanCellGroup:R,VanSkeleton:F,SportContributionChart:Q,SportTimeHeatmapChart:J},setup(){const{state:e,isReady:_}=E(q("mi/sport"),{success:!1,resultMessage:"",resultCode:"",resultException:"",items:[]}),h=b(()=>e.value.items),u=b(()=>{const o=S(h.value,s=>f(s.startTime).year());return Object.keys(o).sort((s,n)=>+s>+n?-1:1).map(s=>({id:+s,logs:o[s]}))});function c(o,s){return f(o).format(s)}function d(o){switch(o){case 1:return"戶外跑";case 6:return"健走";case 9:return"戶外騎乘";case 14:return"游泳";case 16:return"自由訓練";default:return o}}function a(o){const s=o.reduce((B,Y)=>B+=Y.sportTime,0),n=60,g=n*60,r=Math.floor(s%60),i=Math.floor(s/n%60);return{h:Math.floor(s/g),m:`${i}`.padStart(2,"0"),s:`${r}`.padStart(2,"0")}}function m(o){return o.reduce((s,n)=>s+=n.calories,0)}function x(o){const s=Math.floor(o/60),n=o-s*60;return{m:s,s:`${n}`.padStart(2,"0")}}return{isReady:_,arrayByYear:u,logs:h,formatDate:c,formatType:d,formatSportTime:x,getAllSportTime:a,getAllCalories:m}}}),U={class:"max-w-2xl mx-auto"},tt={class:"text-center"},et={class:"mt-3 mb-1"},st={class:"text-center mt-4 text-gray-500"},ot={class:"mb-1"},at=t("span",{class:"ml-1 mr-2"},"時",-1),rt=t("span",{class:"ml-1 mr-2"},"分",-1),nt=t("span",{class:"ml-1 mr-2"},"秒",-1),it={class:"text-center pl-2 pr-5 border-r w-20"},ct={class:"text-xs text-gray-500"},lt={class:"text-gray-700 mb-1"},dt={class:"font-bold text-xl"},ut={class:"text-center"},mt={class:"text-xs"},pt={class:"text-xs ml-2"},ft={class:"flex items-center justify-around"},_t={class:"flex flex-col items-center justify-center px-2"},ht=t("div",{class:"flex items-center text-orange-500"},[t("svg",{class:"iconify iconify--mdi mr-1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","aria-hidden":"true",role:"img",width:"1em",height:"1em",preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 24 24"},[t("path",{d:"M19.03 7.39l1.42-1.42c-.45-.51-.9-.97-1.41-1.41L17.62 6c-1.55-1.26-3.5-2-5.62-2a9 9 0 0 0 0 18c5 0 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61M13 14h-2V7h2v7m2-13H9v2h6V1z",fill:"currentColor"})]),t("span",null,"時間")],-1),yt={class:"text-center mt-1"},gt={class:"text-2xl font-bold mr-1"},vt=t("span",{class:"text-gray-500 mr-1"},"m",-1),Ct={class:"text-2xl font-bold mr-1"},xt=t("span",{class:"text-gray-500 mr-1"},"s",-1),Tt={class:"flex flex-col items-center justify-center px-2"},bt=t("div",{class:"flex items-center text-orange-500"},[t("svg",{class:"iconify iconify--mdi mr-1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","aria-hidden":"true",role:"img",width:"1em",height:"1em",preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 24 24"},[t("path",{d:"M17.66 11.2c-.23-.3-.51-.56-.77-.82c-.67-.6-1.43-1.03-2.07-1.66C13.33 7.26 13 4.85 13.95 3c-.95.23-1.78.75-2.49 1.32c-2.59 2.08-3.61 5.75-2.39 8.9c.04.1.08.2.08.33c0 .22-.15.42-.35.5c-.23.1-.47.04-.66-.12a.58.58 0 0 1-.14-.17c-1.13-1.43-1.31-3.48-.55-5.12C5.78 10 4.87 12.3 5 14.47c.06.5.12 1 .29 1.5c.14.6.41 1.2.71 1.73c1.08 1.73 2.95 2.97 4.96 3.22c2.14.27 4.43-.12 6.07-1.6c1.83-1.66 2.47-4.32 1.53-6.6l-.13-.26c-.21-.46-.77-1.26-.77-1.26m-3.16 6.3c-.28.24-.74.5-1.1.6c-1.12.4-2.24-.16-2.9-.82c1.19-.28 1.9-1.16 2.11-2.05c.17-.8-.15-1.46-.28-2.23c-.12-.74-.1-1.37.17-2.06c.19.38.39.76.63 1.06c.77 1 1.98 1.44 2.24 2.8c.04.14.06.28.06.43c.03.82-.33 1.72-.93 2.27z",fill:"currentColor"})]),t("span",null,"熱量")],-1),kt={class:"text-center mt-1"},St={class:"text-2xl font-bold mr-1"},wt=t("span",{class:"text-gray-500"},"kcal",-1),Mt={class:"pt-4"};function Dt(e,_,h,u,c,d){const a=y("SportContributionChart"),m=y("van-cell"),x=y("van-cell-group"),o=y("van-tab"),s=y("van-tabs"),n=y("SportTimeHeatmapChart"),g=y("van-skeleton");return v(),k("div",{class:G(e.isReady?"":"py-4")},[C(g,{title:"",row:10,loading:!e.isReady,round:""},{default:p(()=>[C(s,{type:"card","offset-top":5,sticky:""},{default:p(()=>[C(o,{title:"資料"},{default:p(()=>[C(s,{"offset-top":35,"line-height":1,sticky:"",border:""},{default:p(()=>[(v(!0),k($,null,A(e.arrayByYear,r=>(v(),T(o,{title:`${r.id}`,key:r.id},{default:p(()=>[t("div",U,[C(x,{border:""},{title:p(()=>[t("div",tt,l(r.id),1),t("div",et,[(v(),T(a,{id:`js-contribution-${r.id}`,key:r.id,logs:r.logs},null,8,["id","logs"]))]),t("div",st,[t("div",ot,[W(" 累積時數: "),t("span",null,l(e.getAllSportTime(r.logs).h),1),at,t("span",null,l(e.getAllSportTime(r.logs).m),1),rt,t("span",null,l(e.getAllSportTime(r.logs).s),1),nt]),t("div",null,"累積消耗熱量: "+l(e.getAllCalories(r.logs))+" kcal",1)])]),default:p(()=>[(v(!0),k($,null,A(r.logs,i=>(v(),T(m,{center:"",border:"",key:i.id},{icon:p(()=>[t("div",it,[t("div",ct,l(e.formatDate(i.startTime,"YYYY")),1),t("div",lt,l(e.formatDate(i.startTime,"MMMM")),1),t("div",dt,l(e.formatDate(i.startTime,"D")),1)])]),title:p(()=>[t("div",ut,[t("span",mt,l(e.formatType(i.type)),1),t("span",pt,l(e.formatDate(i.startTime,"HH:mm:ss")),1)]),t("div",ft,[t("div",_t,[ht,t("div",yt,[t("span",gt,l(e.formatSportTime(i.sportTime).m),1),vt,t("span",Ct,l(e.formatSportTime(i.sportTime).s),1),xt])]),t("div",Tt,[bt,t("div",kt,[t("span",St,l(i.calories),1),wt])])])]),_:2},1024))),128))]),_:2},1024)])]),_:2},1032,["title"]))),128))]),_:1})]),_:1}),C(o,{title:"時間熱圖"},{default:p(()=>[t("div",Mt,[C(n,{logs:e.logs},null,8,["logs"])])]),_:1})]),_:1})]),_:1},8,["loading"])],2)}const Vt=M(K,[["render",Dt]]);export{Vt as default};