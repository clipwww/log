import{u as Bt,a as Pe,c as Xe,C as Ze,_ as J,d as Y,b as St,g as Mt,e as Je,f as Qe,T as Tt,h as Pt,S as Ot,i as Dt,j as Et,k as Rt,r as At}from"./index-7ebb4176.js";import{n as ve,t as Z,u as et,o as It,a as tt,b as zt,w as ne,g as jt,p as rt,r as U,c as pe,d as F,e as at,f as y,T as Oe,h as De,i as Ft,j as ot,k as Ee,v as Re,l as ye,m as xe,q as E,s as Ce,x as Ae,y as Lt,z as qt,A as Nt,F as N,B as nt,H as st,I as lt,C as Vt,D as Ht,E as Yt,G as Ut,J as Wt,K as Ue,_ as W,L as P,M as S,N as V,O as Gt,P as k,Q as D,R,S as I,U as Kt,V as ke,W as Xt,X,Y as G,Z as $e,$ as Zt,a0 as Jt,a1 as Qt}from"./index-668e3e2e.js";import{L as er,c as oe,r as tr,C as we}from"./LineChart-d5c35017.js";import{P as rr,c as ar}from"./on-popup-reopen-dfed5c31.js";import{T as or,C as nr}from"./ContributionChart-1c48828a.js";let sr=2e3;const lr=()=>++sr,ir={show:Boolean,zIndex:ve,overlay:Z,duration:ve,teleport:[String,Object],lockScroll:Z,lazyRender:Z,beforeClose:Function,overlayStyle:Object,overlayClass:et,transitionAppear:Boolean,closeOnClickOverlay:Z};let fe=0;const We="van-overflow-hidden";function dr(r,d){const u=Bt(),v="01",f="10",p=_=>{u.move(_);const x=u.deltaY.value>0?f:v,w=jt(_.target,r.value),{scrollHeight:C,offsetHeight:M,scrollTop:O}=w;let A="11";O===0?A=M>=C?"00":"01":O+M>=C&&(A="10"),A!=="11"&&u.isVertical()&&!(parseInt(A,2)&parseInt(x,2))&&rt(_,!0)},l=()=>{document.addEventListener("touchstart",u.start),document.addEventListener("touchmove",p,{passive:!1}),fe||document.body.classList.add(We),fe++},c=()=>{fe&&(document.removeEventListener("touchstart",u.start),document.removeEventListener("touchmove",p),fe--,fe||document.body.classList.remove(We))},b=()=>d()&&l(),g=()=>d()&&c();It(b),tt(g),zt(g),ne(d,_=>{_?l():c()})}function Ie(r){const d=U(!1);return ne(r,u=>{u&&(d.value=u)},{immediate:!0}),u=>()=>d.value?u():null}const[ur,cr]=pe("overlay"),fr={show:Boolean,zIndex:ve,duration:ve,className:et,lockScroll:Z,lazyRender:Z,customStyle:Object};var vr=F({name:ur,props:fr,setup(r,{slots:d}){const u=U(),v=Ie(()=>r.show||!r.lazyRender),f=l=>{r.lockScroll&&rt(l,!0)},p=v(()=>{var l;const c=De(Ft(r.zIndex),r.customStyle);return ot(r.duration)&&(c.animationDuration=`${r.duration}s`),Ee(y("div",{ref:u,style:c,class:[cr(),r.className]},[(l=d.default)==null?void 0:l.call(d)]),[[Re,r.show]])});return at("touchmove",f,{target:u}),()=>y(Oe,{name:"van-fade",appear:!0},{default:p})}});const pr=ye(vr),yr=De({},ir,{round:Boolean,position:xe("center"),closeIcon:xe("cross"),closeable:Boolean,transition:String,iconPrefix:String,closeOnPopstate:Boolean,closeIconPosition:xe("top-right"),safeAreaInsetTop:Boolean,safeAreaInsetBottom:Boolean}),[hr,Ge]=pe("popup");var _r=F({name:hr,inheritAttrs:!1,props:yr,emits:["open","close","opened","closed","keydown","update:show","clickOverlay","clickCloseIcon"],setup(r,{emit:d,attrs:u,slots:v}){let f,p;const l=U(),c=U(),b=Ie(()=>r.show||!r.lazyRender),g=E(()=>{const h={zIndex:l.value};if(ot(r.duration)){const j=r.position==="center"?"animationDuration":"transitionDuration";h[j]=`${r.duration}s`}return h}),_=()=>{f||(f=!0,l.value=r.zIndex!==void 0?+r.zIndex:lr(),d("open"))},x=()=>{f&&ar(r.beforeClose,{done(){f=!1,d("close"),d("update:show",!1)}})},w=h=>{d("clickOverlay",h),r.closeOnClickOverlay&&x()},C=()=>{if(r.overlay)return y(pr,{show:r.show,class:r.overlayClass,zIndex:l.value,duration:r.duration,customStyle:r.overlayStyle,role:r.closeOnClickOverlay?"button":void 0,tabindex:r.closeOnClickOverlay?0:void 0,onClick:w},{default:v["overlay-content"]})},M=h=>{d("clickCloseIcon",h),x()},O=()=>{if(r.closeable)return y(lt,{role:"button",tabindex:0,name:r.closeIcon,class:[Ge("close-icon",r.closeIconPosition),st],classPrefix:r.iconPrefix,onClick:M},null)};let A;const L=()=>{A&&clearTimeout(A),A=setTimeout(()=>{d("opened")})},z=()=>d("closed"),Q=h=>d("keydown",h),le=b(()=>{var h;const{round:j,position:ae,safeAreaInsetTop:ie,safeAreaInsetBottom:he}=r;return Ee(y("div",nt({ref:c,style:g.value,role:"dialog",tabindex:0,class:[Ge({round:j,[ae]:ae}),{"van-safe-area-top":ie,"van-safe-area-bottom":he}],onKeydown:Q},u),[(h=v.default)==null?void 0:h.call(v),O()]),[[Re,r.show]])}),re=()=>{const{position:h,transition:j,transitionAppear:ae}=r,ie=h==="center"?"van-fade":`van-popup-slide-${h}`;return y(Oe,{name:j||ie,appear:ae,onAfterEnter:L,onAfterLeave:z},{default:le})};return ne(()=>r.show,h=>{h&&!f&&(_(),u.tabindex===0&&Ce(()=>{var j;(j=c.value)==null||j.focus()})),!h&&f&&(f=!1,d("close"))}),Pe({popupRef:c}),dr(c,()=>r.show&&r.lockScroll),at("popstate",()=>{r.closeOnPopstate&&(x(),p=!1)}),Ae(()=>{r.show&&_()}),Lt(()=>{p&&(d("update:show",!0),p=!1)}),tt(()=>{r.show&&r.teleport&&(x(),p=!0)}),qt(rr,()=>r.show),()=>r.teleport?y(Nt,{to:r.teleport},{default:()=>[C(),re()]}):y(N,null,[C(),re()])}});const br=ye(_r),[mr,Ke]=pe("tag"),gr={size:String,mark:Boolean,show:Z,type:xe("default"),color:String,plain:Boolean,round:Boolean,textColor:String,closeable:Boolean};var xr=F({name:mr,props:gr,emits:["close"],setup(r,{slots:d,emit:u}){const v=l=>{l.stopPropagation(),u("close",l)},f=()=>r.plain?{color:r.textColor||r.color,borderColor:r.color}:{color:r.textColor,background:r.color},p=()=>{var l;const{type:c,mark:b,plain:g,round:_,size:x,closeable:w}=r,C={mark:b,plain:g,round:_};x&&(C[x]=x);const M=w&&y(lt,{name:"cross",class:[Ke("close"),st],onClick:v},null);return y("span",{style:f(),class:Ke([C,c])},[(l=d.default)==null?void 0:l.call(d),M])};return()=>y(Oe,{name:r.closeable?"van-fade":void 0},{default:()=>[r.show?p():null]})}});const it=ye(xr),[dt,kr]=pe("collapse"),ut=Symbol(dt),Cr={border:Z,accordion:Boolean,modelValue:{type:[String,Number,Array],default:""}};var $r=F({name:dt,props:Cr,emits:["change","update:modelValue"],setup(r,{emit:d,slots:u}){const{linkChildren:v,children:f}=Vt(ut),p=g=>{d("change",g),d("update:modelValue",g)},l=(g,_)=>{const{accordion:x,modelValue:w}=r;p(x?g===w?"":g:_?w.concat(g):w.filter(C=>C!==g))},c=(g={})=>{if(r.accordion)return;typeof g=="boolean"&&(g={expanded:g});const{expanded:_,skipDisabled:x}=g,C=f.filter(M=>M.disabled&&x?M.expanded.value:_??!M.expanded.value).map(M=>M.itemName.value);p(C)},b=g=>{const{accordion:_,modelValue:x}=r;return _?x===g:x.includes(g)};return Pe({toggleAll:c}),v({toggle:l,isExpanded:b}),()=>{var g;return y("div",{class:[kr(),{[Ht]:r.border}]},[(g=u.default)==null?void 0:g.call(u)])}}});const wr=ye($r),[Br,ge]=pe("collapse-item"),Sr=["icon","title","value","label","right-icon"],Mr=De({},Xe,{name:ve,isLink:Z,disabled:Boolean,readonly:Boolean,lazyRender:Z});var Tr=F({name:Br,props:Mr,setup(r,{slots:d}){const u=U(),v=U(),{parent:f,index:p}=Yt(ut);if(!f)return;const l=E(()=>{var O;return(O=r.name)!=null?O:p.value}),c=E(()=>f.isExpanded(l.value)),b=U(c.value),g=Ie(()=>b.value||!r.lazyRender),_=()=>{c.value?u.value&&(u.value.style.height=""):b.value=!1};ne(c,(O,A)=>{if(A===null)return;O&&(b.value=!0),(O?Ce:Wt)(()=>{if(!v.value||!u.value)return;const{offsetHeight:z}=v.value;if(z){const Q=`${z}px`;u.value.style.height=O?"0":Q,Ut(()=>{u.value&&(u.value.style.height=O?Q:"0")})}else _()})});const x=(O=!c.value)=>{f.toggle(l.value,O)},w=()=>{!r.disabled&&!r.readonly&&x()},C=()=>{const{border:O,disabled:A,readonly:L}=r,z=Ue(r,Object.keys(Xe));return L&&(z.isLink=!1),(A||L)&&(z.clickable=!1),y(Ze,nt({role:"button",class:ge("title",{disabled:A,expanded:c.value,borderless:!O}),"aria-expanded":String(c.value),onClick:w},z),Ue(d,Sr))},M=g(()=>{var O;return Ee(y("div",{ref:u,class:ge("wrapper"),onTransitionend:_},[y("div",{ref:v,class:ge("content")},[(O=d.default)==null?void 0:O.call(d)])]),[[Re,b.value]])});return Pe({toggle:x,expanded:c,itemName:l}),()=>y("div",{class:[ge({border:p.value&&r.border})]},[C(),M()])}});const Pr=ye(Tr),Or=F({components:{LineChart:er},props:{id:{type:String,default:"js-line"},records:{type:Array,required:!0}},setup(r){const d=E(()=>{const f=J(r.records,p=>Y(p.date).year());return Object.keys(f).map(p=>({id:+p,records:f[p]}))}),u=E(()=>[{type:"line",label:"總票數",data:d.value.map(f=>f.records.reduce((p,l)=>p+=l.tickets,0)),borderColor:oe[3],backgroundColor:oe[3],fill:!1},{type:"line",label:"總場數",data:d.value.map(f=>f.records.length),borderColor:oe[2],backgroundColor:oe[2],fill:!1}]),v=E(()=>d.value.map(f=>`${f.id}`));return{datasets:u,labels:v}}});function Dr(r,d,u,v,f,p){const l=P("LineChart");return S(),V(l,{id:r.id,key:r.id,datasets:r.datasets,labels:r.labels},null,8,["id","datasets","labels"])}const Er=W(Or,[["render",Dr]]),Rr=F({components:{VanCell:Ze,VanTag:it},props:{record:{type:Object,required:!0},format:{type:String,default:"YYYY/MM/DD HH:mm"},size:{type:String,default:"large"},hideTitle:{type:Boolean,default:!1},index:{type:Number}},setup(r){function d(u){return Y(u).format(r.format)}return{formatDateTime:d}}}),Ar={class:"mr-3 bg-gray-100 rounded-full w-7 h-7 text-xs flex items-center justify-center font-medium"},Ir={key:0,class:"font-normal"},zr={class:"mb-2"},jr={class:"text-sm"},Fr={class:"text-xs mt-2"},Lr={class:"text-right text-gray-500 ml-1"},qr={class:"text-xs"};function Nr(r,d,u,v,f,p){const l=P("van-tag"),c=P("van-cell");return S(),V(c,{center:"",border:"",size:r.size},Gt({title:k(()=>[r.hideTitle?Kt("",!0):(S(),I("div",Ir,R(r.record.title),1))]),label:k(()=>[D("div",zr,[y(l,{class:"mr-2",plain:"",type:"default"},{default:k(()=>[ke(R(r.record.area),1)]),_:1}),y(l,{class:"mr-2",plain:"",type:"primary"},{default:k(()=>[ke(R(r.record.version),1)]),_:1}),y(l,{plain:"",type:"success"},{default:k(()=>[ke(R(r.record.theater),1)]),_:1})]),D("div",jr,R(r.record.memo),1),D("div",Fr,R(r.formatDateTime(r.record.date)),1)]),extra:k(()=>[D("div",Lr,[D("div",null,"x "+R(r.record.tickets),1),D("div",qr,"$ "+R(r.record.cost),1)])]),_:2},[r.index?{name:"icon",fn:k(()=>[D("span",Ar,R(r.index),1)]),key:"0"}:void 0]),1032,["size"])}const ct=W(Rr,[["render",Nr]]);var ft={exports:{}};/*!
 * chartjs-plugin-datalabels v0.7.0
 * https://chartjs-plugin-datalabels.netlify.com
 * (c) 2019 Chart.js Contributors
 * Released under the MIT license
 */(function(r,d){(function(u,v){r.exports=v(tr())})(St,function(u){u=u&&u.hasOwnProperty("default")?u.default:u;var v=u.helpers,f=function(){if(typeof window<"u"){if(window.devicePixelRatio)return window.devicePixelRatio;var e=window.screen;if(e)return(e.deviceXDPI||1)/(e.logicalXDPI||1)}return 1}(),p={toTextLines:function(e){var o=[],t;for(e=[].concat(e);e.length;)t=e.pop(),typeof t=="string"?o.unshift.apply(o,t.split(`
`)):Array.isArray(t)?e.push.apply(e,t):v.isNullOrUndef(e)||o.unshift(""+t);return o},toFontString:function(e){return!e||v.isNullOrUndef(e.size)||v.isNullOrUndef(e.family)?null:(e.style?e.style+" ":"")+(e.weight?e.weight+" ":"")+e.size+"px "+e.family},textSize:function(e,o,t){var a=[].concat(o),n=a.length,s=e.font,i=0,m;for(e.font=t.string,m=0;m<n;++m)i=Math.max(e.measureText(a[m]).width,i);return e.font=s,{height:n*t.lineHeight,width:i}},parseFont:function(e){var o=u.defaults.global,t=v.valueOrDefault(e.size,o.defaultFontSize),a={family:v.valueOrDefault(e.family,o.defaultFontFamily),lineHeight:v.options.toLineHeight(e.lineHeight,t),size:t,style:v.valueOrDefault(e.style,o.defaultFontStyle),weight:v.valueOrDefault(e.weight,null),string:""};return a.string=p.toFontString(a),a},bound:function(e,o,t){return Math.max(e,Math.min(o,t))},arrayDiff:function(e,o){var t=e.slice(),a=[],n,s,i,m;for(n=0,i=o.length;n<i;++n)m=o[n],s=t.indexOf(m),s===-1?a.push([m,1]):t.splice(s,1);for(n=0,i=t.length;n<i;++n)a.push([t[n],-1]);return a},rasterize:function(e){return Math.round(e*f)/f}};function l(e,o){var t=o.x,a=o.y;if(t===null)return{x:0,y:-1};if(a===null)return{x:1,y:0};var n=e.x-t,s=e.y-a,i=Math.sqrt(n*n+s*s);return{x:i?n/i:0,y:i?s/i:-1}}function c(e,o,t,a,n){switch(n){case"center":t=a=0;break;case"bottom":t=0,a=1;break;case"right":t=1,a=0;break;case"left":t=-1,a=0;break;case"top":t=0,a=-1;break;case"start":t=-t,a=-a;break;case"end":break;default:n*=Math.PI/180,t=Math.cos(n),a=Math.sin(n);break}return{x:e,y:o,vx:t,vy:a}}var b=0,g=1,_=2,x=4,w=8;function C(e,o,t){var a=b;return e<t.left?a|=g:e>t.right&&(a|=_),o<t.top?a|=w:o>t.bottom&&(a|=x),a}function M(e,o){for(var t=e.x0,a=e.y0,n=e.x1,s=e.y1,i=C(t,a,o),m=C(n,s,o),$,B,T;!(!(i|m)||i&m);)$=i||m,$&w?(B=t+(n-t)*(o.top-a)/(s-a),T=o.top):$&x?(B=t+(n-t)*(o.bottom-a)/(s-a),T=o.bottom):$&_?(T=a+(s-a)*(o.right-t)/(n-t),B=o.right):$&g&&(T=a+(s-a)*(o.left-t)/(n-t),B=o.left),$===i?(t=B,a=T,i=C(t,a,o)):(n=B,s=T,m=C(n,s,o));return{x0:t,x1:n,y0:a,y1:s}}function O(e,o){var t=o.anchor,a=e,n,s;return o.clamp&&(a=M(a,o.area)),t==="start"?(n=a.x0,s=a.y0):t==="end"?(n=a.x1,s=a.y1):(n=(a.x0+a.x1)/2,s=(a.y0+a.y1)/2),c(n,s,e.vx,e.vy,o.align)}var A={arc:function(e,o){var t=(e.startAngle+e.endAngle)/2,a=Math.cos(t),n=Math.sin(t),s=e.innerRadius,i=e.outerRadius;return O({x0:e.x+a*s,y0:e.y+n*s,x1:e.x+a*i,y1:e.y+n*i,vx:a,vy:n},o)},point:function(e,o){var t=l(e,o.origin),a=t.x*e.radius,n=t.y*e.radius;return O({x0:e.x-a,y0:e.y-n,x1:e.x+a,y1:e.y+n,vx:t.x,vy:t.y},o)},rect:function(e,o){var t=l(e,o.origin),a=e.x,n=e.y,s=0,i=0;return e.horizontal?(a=Math.min(e.x,e.base),s=Math.abs(e.base-e.x)):(n=Math.min(e.y,e.base),i=Math.abs(e.base-e.y)),O({x0:a,y0:n+i,x1:a+s,y1:n,vx:t.x,vy:t.y},o)},fallback:function(e,o){var t=l(e,o.origin);return O({x0:e.x,y0:e.y,x1:e.x,y1:e.y,vx:t.x,vy:t.y},o)}},L=u.helpers,z=p.rasterize;function Q(e){var o=e.borderWidth||0,t=e.padding,a=e.size.height,n=e.size.width,s=-n/2,i=-a/2;return{frame:{x:s-t.left-o,y:i-t.top-o,w:n+t.width+o*2,h:a+t.height+o*2},text:{x:s,y:i,w:n,h:a}}}function le(e){var o=e._model.horizontal,t=e._scale||o&&e._xScale||e._yScale;if(!t)return null;if(t.xCenter!==void 0&&t.yCenter!==void 0)return{x:t.xCenter,y:t.yCenter};var a=t.getBasePixel();return o?{x:a,y:null}:{x:null,y:a}}function re(e){return e instanceof u.elements.Arc?A.arc:e instanceof u.elements.Point?A.point:e instanceof u.elements.Rectangle?A.rect:A.fallback}function h(e,o,t){var a=t.backgroundColor,n=t.borderColor,s=t.borderWidth;!a&&(!n||!s)||(e.beginPath(),L.canvas.roundedRect(e,z(o.x)+s/2,z(o.y)+s/2,z(o.w)-s,z(o.h)-s,t.borderRadius),e.closePath(),a&&(e.fillStyle=a,e.fill()),n&&s&&(e.strokeStyle=n,e.lineWidth=s,e.lineJoin="miter",e.stroke()))}function j(e,o,t){var a=t.lineHeight,n=e.w,s=e.x,i=e.y+a/2;return o==="center"?s+=n/2:(o==="end"||o==="right")&&(s+=n),{h:a,w:n,x:s,y:i}}function ae(e,o,t){var a=e.shadowBlur,n=t.stroked,s=z(t.x),i=z(t.y),m=z(t.w);n&&e.strokeText(o,s,i,m),t.filled&&(a&&n&&(e.shadowBlur=0),e.fillText(o,s,i,m),a&&n&&(e.shadowBlur=a))}function ie(e,o,t,a){var n=a.textAlign,s=a.color,i=!!s,m=a.font,$=o.length,B=a.textStrokeColor,T=a.textStrokeWidth,q=B&&T,K;if(!(!$||!i&&!q))for(t=j(t,n,m),e.font=m.string,e.textAlign=n,e.textBaseline="middle",e.shadowBlur=a.textShadowBlur,e.shadowColor=a.textShadowColor,i&&(e.fillStyle=s),q&&(e.lineJoin="round",e.lineWidth=T,e.strokeStyle=B),K=0,$=o.length;K<$;++K)ae(e,o[K],{stroked:q,filled:i,w:t.w,x:t.x,y:t.y+t.h*K})}var he=function(e,o,t,a){var n=this;n._config=e,n._index=a,n._model=null,n._rects=null,n._ctx=o,n._el=t};L.extend(he.prototype,{_modelize:function(e,o,t,a){var n=this,s=n._index,i=L.options.resolve,m=p.parseFont(i([t.font,{}],a,s)),$=i([t.color,u.defaults.global.defaultFontColor],a,s);return{align:i([t.align,"center"],a,s),anchor:i([t.anchor,"center"],a,s),area:a.chart.chartArea,backgroundColor:i([t.backgroundColor,null],a,s),borderColor:i([t.borderColor,null],a,s),borderRadius:i([t.borderRadius,0],a,s),borderWidth:i([t.borderWidth,0],a,s),clamp:i([t.clamp,!1],a,s),clip:i([t.clip,!1],a,s),color:$,display:e,font:m,lines:o,offset:i([t.offset,0],a,s),opacity:i([t.opacity,1],a,s),origin:le(n._el),padding:L.options.toPadding(i([t.padding,0],a,s)),positioner:re(n._el),rotation:i([t.rotation,0],a,s)*(Math.PI/180),size:p.textSize(n._ctx,o,m),textAlign:i([t.textAlign,"start"],a,s),textShadowBlur:i([t.textShadowBlur,0],a,s),textShadowColor:i([t.textShadowColor,$],a,s),textStrokeColor:i([t.textStrokeColor,$],a,s),textStrokeWidth:i([t.textStrokeWidth,0],a,s)}},update:function(e){var o=this,t=null,a=null,n=o._index,s=o._config,i,m,$,B=L.options.resolve([s.display,!0],e,n);B&&(i=e.dataset.data[n],m=L.valueOrDefault(L.callback(s.formatter,[i,e]),i),$=L.isNullOrUndef(m)?[]:p.toTextLines(m),$.length&&(t=o._modelize(B,$,s,e),a=Q(t))),o._model=t,o._rects=a},geometry:function(){return this._rects?this._rects.frame:{}},rotation:function(){return this._model?this._model.rotation:0},visible:function(){return this._model&&this._model.opacity},model:function(){return this._model},draw:function(e,o){var t=this,a=e.ctx,n=t._model,s=t._rects,i;this.visible()&&(a.save(),n.clip&&(i=n.area,a.beginPath(),a.rect(i.left,i.top,i.right-i.left,i.bottom-i.top),a.clip()),a.globalAlpha=p.bound(0,n.opacity,1),a.translate(z(o.x),z(o.y)),a.rotate(n.rotation),h(a,s.frame,n),ie(a,n.lines,s.text,n),a.restore())}});var vt=u.helpers,pt=Number.MIN_SAFE_INTEGER||-9007199254740991,yt=Number.MAX_SAFE_INTEGER||9007199254740991;function de(e,o,t){var a=Math.cos(t),n=Math.sin(t),s=o.x,i=o.y;return{x:s+a*(e.x-s)-n*(e.y-i),y:i+n*(e.x-s)+a*(e.y-i)}}function je(e,o){var t=yt,a=pt,n=o.origin,s,i,m,$,B;for(s=0;s<e.length;++s)i=e[s],m=i.x-n.x,$=i.y-n.y,B=o.vx*m+o.vy*$,t=Math.min(t,B),a=Math.max(a,B);return{min:t,max:a}}function _e(e,o){var t=o.x-e.x,a=o.y-e.y,n=Math.sqrt(t*t+a*a);return{vx:(o.x-e.x)/n,vy:(o.y-e.y)/n,origin:e,ln:n}}var Fe=function(){this._rotation=0,this._rect={x:0,y:0,w:0,h:0}};vt.extend(Fe.prototype,{center:function(){var e=this._rect;return{x:e.x+e.w/2,y:e.y+e.h/2}},update:function(e,o,t){this._rotation=t,this._rect={x:o.x+e.x,y:o.y+e.y,w:o.w,h:o.h}},contains:function(e){var o=this,t=1,a=o._rect;return e=de(e,o.center(),-o._rotation),!(e.x<a.x-t||e.y<a.y-t||e.x>a.x+a.w+t*2||e.y>a.y+a.h+t*2)},intersects:function(e){var o=this._points(),t=e._points(),a=[_e(o[0],o[1]),_e(o[0],o[3])],n,s,i;for(this._rotation!==e._rotation&&a.push(_e(t[0],t[1]),_e(t[0],t[3])),n=0;n<a.length;++n)if(s=je(o,a[n]),i=je(t,a[n]),s.max<i.min||i.max<s.min)return!1;return!0},_points:function(){var e=this,o=e._rect,t=e._rotation,a=e.center();return[de({x:o.x,y:o.y},a,t),de({x:o.x+o.w,y:o.y},a,t),de({x:o.x+o.w,y:o.y+o.h},a,t),de({x:o.x,y:o.y+o.h},a,t)]}});function Le(e,o,t){var a=o.positioner(e,o),n=a.vx,s=a.vy;if(!n&&!s)return{x:a.x,y:a.y};var i=t.w,m=t.h,$=o.rotation,B=Math.abs(i/2*Math.cos($))+Math.abs(m/2*Math.sin($)),T=Math.abs(i/2*Math.sin($))+Math.abs(m/2*Math.cos($)),q=1/Math.max(Math.abs(n),Math.abs(s));return B*=n*q,T*=s*q,B+=o.offset*n,T+=o.offset*s,{x:a.x+B,y:a.y+T}}function ht(e,o){var t,a,n,s;for(t=e.length-1;t>=0;--t)for(n=e[t].$layout,a=t-1;a>=0&&n._visible;--a)s=e[a].$layout,s._visible&&n._box.intersects(s._box)&&o(n,s);return e}function _t(e){var o,t,a,n,s,i;for(o=0,t=e.length;o<t;++o)a=e[o],n=a.$layout,n._visible&&(s=a.geometry(),i=Le(a._el._model,a.model(),s),n._box.update(i,s,a.rotation()));return ht(e,function(m,$){var B=m._hidable,T=$._hidable;B&&T||T?$._visible=!1:B&&(m._visible=!1)})}var ue={prepare:function(e){var o=[],t,a,n,s,i;for(t=0,n=e.length;t<n;++t)for(a=0,s=e[t].length;a<s;++a)i=e[t][a],o.push(i),i.$layout={_box:new Fe,_hidable:!1,_visible:!0,_set:t,_idx:a};return o.sort(function(m,$){var B=m.$layout,T=$.$layout;return B._idx===T._idx?T._set-B._set:T._idx-B._idx}),this.update(o),o},update:function(e){var o=!1,t,a,n,s,i;for(t=0,a=e.length;t<a;++t)n=e[t],s=n.model(),i=n.$layout,i._hidable=s&&s.display==="auto",i._visible=n.visible(),o|=i._hidable;o&&_t(e)},lookup:function(e,o){var t,a;for(t=e.length-1;t>=0;--t)if(a=e[t].$layout,a&&a._visible&&a._box.contains(o))return e[t];return null},draw:function(e,o){var t,a,n,s,i,m;for(t=0,a=o.length;t<a;++t)n=o[t],s=n.$layout,s._visible&&(i=n.geometry(),m=Le(n._el._view,n.model(),i),s._box.update(m,i,n.rotation()),n.draw(e,m))}},be=u.helpers,bt=function(e){if(be.isNullOrUndef(e))return null;var o=e,t,a,n;if(be.isObject(e))if(!be.isNullOrUndef(e.label))o=e.label;else if(!be.isNullOrUndef(e.r))o=e.r;else for(o="",t=Object.keys(e),n=0,a=t.length;n<a;++n)o+=(n!==0?", ":"")+t[n]+": "+e[t[n]];return""+o},mt={align:"center",anchor:"center",backgroundColor:null,borderColor:null,borderRadius:0,borderWidth:0,clamp:!1,clip:!1,color:void 0,display:!0,font:{family:void 0,lineHeight:1.2,size:void 0,style:void 0,weight:null},formatter:bt,labels:void 0,listeners:{},offset:4,opacity:1,padding:{top:4,right:4,bottom:4,left:4},rotation:0,textAlign:"start",textStrokeColor:void 0,textStrokeWidth:0,textShadowBlur:0,textShadowColor:void 0},ce=u.helpers,H="$datalabels",qe="$default";function gt(e,o){var t=e.datalabels,a={},n=[],s,i;return t===!1?null:(t===!0&&(t={}),o=ce.merge({},[o,t]),s=o.labels||{},i=Object.keys(s),delete o.labels,i.length?i.forEach(function(m){s[m]&&n.push(ce.merge({},[o,s[m],{_key:m}]))}):n.push(o),a=n.reduce(function(m,$){return ce.each($.listeners||{},function(B,T){m[T]=m[T]||{},m[T][$._key||qe]=B}),delete $.listeners,m},{}),{labels:n,listeners:a})}function Se(e,o,t){if(o){var a=t.$context,n=t.$groups,s;o[n._set]&&(s=o[n._set][n._key],s&&ce.callback(s,[a])===!0&&(e[H]._dirty=!0,t.update(a)))}}function xt(e,o,t,a){var n,s;!t&&!a||(t?a?t!==a&&(s=n=!0):s=!0:n=!0,s&&Se(e,o.leave,t),n&&Se(e,o.enter,a))}function kt(e,o){var t=e[H],a=t._listeners,n,s;if(!(!a.enter&&!a.leave)){if(o.type==="mousemove")s=ue.lookup(t._labels,o);else if(o.type!=="mouseout")return;n=t._hovered,t._hovered=s,xt(e,a,n,s)}}function Ct(e,o){var t=e[H],a=t._listeners.click,n=a&&ue.lookup(t._labels,o);n&&Se(e,a,n)}function $t(e){if(!e.animating){for(var o=u.animationService.animations,t=0,a=o.length;t<a;++t)if(o[t].chart===e)return;e.render({duration:1,lazy:!0})}}u.defaults.global.plugins.datalabels=mt;var Ne={id:"datalabels",beforeInit:function(e){e[H]={_actives:[]}},beforeUpdate:function(e){var o=e[H];o._listened=!1,o._listeners={},o._datasets=[],o._labels=[]},afterDatasetUpdate:function(e,o,t){var a=o.index,n=e[H],s=n._datasets[a]=[],i=e.isDatasetVisible(a),m=e.data.datasets[a],$=gt(m,t),B=o.meta.data||[],T=e.ctx,q,K,Ve,He,Me,Ye,ee,te;for(T.save(),q=0,Ve=B.length;q<Ve;++q)if(ee=B[q],ee[H]=[],i&&ee&&!ee.hidden&&!ee._model.skip)for(K=0,He=$.labels.length;K<He;++K)Me=$.labels[K],Ye=Me._key,te=new he(Me,T,ee,q),te.$groups={_set:a,_key:Ye||qe},te.$context={active:!1,chart:e,dataIndex:q,dataset:m,datasetIndex:a},te.update(te.$context),ee[H].push(te),s.push(te);T.restore(),ce.merge(n._listeners,$.listeners,{merger:function(me,Te,wt){Te[me]=Te[me]||{},Te[me][o.index]=wt[me],n._listened=!0}})},afterUpdate:function(e,o){e[H]._labels=ue.prepare(e[H]._datasets,o)},afterDatasetsDraw:function(e){ue.draw(e,e[H]._labels)},beforeEvent:function(e,o){if(e[H]._listened)switch(o.type){case"mousemove":case"mouseout":kt(e,o);break;case"click":Ct(e,o);break}},afterEvent:function(e){var o=e[H],t=o._actives,a=o._actives=e.lastActive||[],n=p.arrayDiff(t,a),s,i,m,$,B,T,q;for(s=0,i=n.length;s<i;++s)if(B=n[s],B[1])for(q=B[0][H]||[],m=0,$=q.length;m<$;++m)T=q[m],T.$context.active=B[1]===1,T.update(T.$context);(o._dirty||n.length)&&(ue.update(o._labels),$t(e)),delete o._dirty}};return u.plugins.register(Ne),Ne})})(ft);var Vr=ft.exports;const Be=Mt(Vr);we.plugins.unregister(Be);const Hr=F({props:{id:{type:String,required:!0},data:{type:Array,required:!0},labels:{type:Array,required:!0},title:{type:String},type:{type:String,default:"bar"}},setup(r,{emit:d}){const u=U(null),v=Je("(min-width: 768px)");ne(()=>r.data,()=>{f()}),Ae(()=>{f()});async function f(){await Ce(),u.value&&u.value.clear();const p=document.getElementById(r.id).getContext("2d");u.value=new we(p,{plugins:[Be],type:r.type,data:{datasets:[{data:r.data,backgroundColor:oe}],labels:r.labels},options:{responsive:!0,aspectRatio:v.value?1.5:.8,title:{display:!!r.title,text:r.title},legend:{display:!1},tooltips:{enabled:!1},scales:{yAxes:[{ticks:{min:0,stepSize:1}}],xAxes:[{ticks:{min:0,stepSize:1}}]},plugins:{datalabels:{textAlign:"end",align:"center",color:"#000000",textStrokeColor:"#ffffff",textStrokeWidth:3,formatter(l){return l>0?l:""}}},onClick(l,c){var _,x,w;const b=(_=c==null?void 0:c[0])==null?void 0:_._index,g=(w=(x=c==null?void 0:c[0])==null?void 0:x._view)==null?void 0:w.label;isNaN(b)||d("bar-click",{index:b,label:g})}}})}return{}}}),Yr=["id"];function Ur(r,d,u,v,f,p){return S(),I("canvas",{id:r.id,key:r.id},null,8,Yr)}const ze=W(Hr,[["render",Ur]]),Wr=F({components:{VanPopup:br,MovieRecordCell:ct},props:{records:{type:Array,required:!0}},setup(r,{emit:d}){return{show:E({get(){return r.records.length>0},set(v){v||d("update:records",[])}})}}});const Gr={class:"pb-8 overflow-y-auto h-calc"};function Kr(r,d,u,v,f,p){const l=P("MovieRecordCell"),c=P("van-popup");return S(),V(c,{show:r.show,"onUpdate:show":d[0]||(d[0]=b=>r.show=b),round:"",position:"bottom",style:{height:"90%"},closeable:""},{default:k(()=>[Xt(r.$slots,"title",{},void 0,!0),D("div",Gr,[(S(!0),I(N,null,X(r.records,(b,g)=>(S(),V(l,{record:b,index:r.records.length-g,key:`${b.date}_${b.title}`},null,8,["record","index"]))),128))])]),_:3},8,["show"])}const se=W(Wr,[["render",Kr],["__scopeId","data-v-8cde3ed1"]]),Xr=F({components:{BarChart:ze,MovieRecordsPopup:se},props:{id:{type:String,required:!0},records:{type:Array,required:!0}},setup(r){const d=Array(12).fill("").map((c,b)=>b),u=U(0),v=U([]),f=E(()=>J(r.records,c=>Y(c.date).month())),p=G({data:E(()=>{const c=Object.keys(f.value).map(b=>({month:+b,value:f.value[b].length}));return d.map(b=>{var g;return((g=c.find(_=>_.month===b))==null?void 0:g.value)??0})}),labels:d.map(c=>Y().month(c).format("MMM"))});function l({index:c}){u.value=c+1,v.value=f.value[c]}return{...$e(p),showMonth:u,showRecords:v,onClick:l}}}),Zr={class:"text-center py-2"};function Jr(r,d,u,v,f,p){const l=P("BarChart"),c=P("MovieRecordsPopup");return S(),I(N,null,[y(l,{id:r.id,data:r.data,labels:r.labels,onBarClick:r.onClick},null,8,["id","data","labels","onBarClick"]),y(c,{records:r.showRecords,"onUpdate:records":d[0]||(d[0]=b=>r.showRecords=b)},{title:k(()=>[D("div",Zr,R(r.showMonth)+"月",1)]),_:1},8,["records"])],64)}const Qr=W(Xr,[["render",Jr]]),ea=F({components:{TimeHeatmapChart:or,MovieRecordsPopup:se},props:{id:{type:String,default:"js-heatmap"},records:{type:Array,required:!0}},setup(r){const d=E(()=>{const l=J(r.records,b=>Y(b.date).weekday()),c=[];return Array(7).fill("").forEach((b,g)=>{Array(24).fill("").forEach((_,x)=>{var M;const w=(M=l[g])==null?void 0:M.filter(O=>Y(O.date).isSame(Y(O.date).hour(x),"hour")),C=(w==null?void 0:w.length)??0;c.push({weekday:+g,hour:x,value:C,records:w})})}),c}),u=G({weekday:0,hour:0,records:[]});function v(l){return Y().weekday(l).format("ddd")}function f(l){const c=Y().startOf("day");return c.hour(l).format("HH:mm")+"~"+c.hour(l+1).format("HH:mm")}function p(l){u.weekday=l.weekday,u.hour=l.hour,u.records=l.records}return{dataset:d,dayDetails:u,formatDate:Qe,formatWeekDay:v,formatHour:f,onClick:p}}}),ta={class:"text-center py-2"};function ra(r,d,u,v,f,p){const l=P("TimeHeatmapChart"),c=P("MovieRecordsPopup");return S(),I(N,null,[y(l,{id:r.id,dataset:r.dataset,onBlockClick:r.onClick},null,8,["id","dataset","onBlockClick"]),y(c,{records:r.dayDetails.records,"onUpdate:records":d[0]||(d[0]=b=>r.dayDetails.records=b)},{title:k(()=>[D("div",ta,[D("div",null,R(r.formatWeekDay(r.dayDetails.weekday))+" "+R(r.formatHour(r.dayDetails.hour)),1)])]),_:1},8,["records"])],64)}const aa=W(ea,[["render",ra]]),oa=F({props:{records:{type:Array,required:!0}},setup(r){const d=G({totalCount:E(()=>r.records.length),totalCost:E(()=>r.records.reduce((u,v)=>u+=v.cost,0)),totalTicks:E(()=>r.records.reduce((u,v)=>u+=v.tickets,0))});return{...$e(d)}}}),na={class:"text-xs"};function sa(r,d,u,v,f,p){return S(),I("div",na," 看了 "+R(r.totalCount)+" 場電影，一共 "+R(r.totalTicks)+" 張電影票，花了 "+R(r.totalCost.toLocaleString())+" 新台幣 ",1)}const la=W(oa,[["render",sa]]);we.plugins.unregister(Be);const ia=F({props:{id:{type:String,required:!0},title:{type:String},data:{type:Array,required:!0},labels:{type:Array,required:!0}},setup(r,{emit:d}){const u=U(null),v=Je("(min-width: 768px)");ne(()=>r.data,()=>{f()}),Ae(()=>{f()});async function f(){await Ce(),u.value&&u.value.clear();const p=document.getElementById(r.id).getContext("2d");u.value=new we(p,{plugins:[Be],type:"pie",data:{datasets:[{data:r.data,backgroundColor:oe}],labels:r.labels},options:{responsive:!0,aspectRatio:v.value?1.5:r.labels.length>10?.7:1,title:{display:!!r.title,text:r.title},tooltips:{callbacks:{label(l,c){var w;const b=l.index,g=r.data[b],_=r.data.reduce((C,M)=>C+=+M,0),x=g/_*100;return`${(w=c.labels)==null?void 0:w[b]}: ${g} (${x.toFixed(0)}%)`}}},plugins:{datalabels:{color:"#000000",textStrokeColor:"#ffffff",textStrokeWidth:3,formatter(l){const c=r.data.reduce((g,_)=>g+=+_,0);return l/c*100<10?"":l}}},onClick(l,c){var _,x,w;const b=(_=c==null?void 0:c[0])==null?void 0:_._index,g=(w=(x=c==null?void 0:c[0])==null?void 0:x._view)==null?void 0:w.label;isNaN(b)||d("pie-click",{index:b,label:g})}}})}return{}}}),da=["id"];function ua(r,d,u,v,f,p){return S(),I("canvas",{id:r.id,key:r.id},null,8,da)}const ca=W(ia,[["render",ua]]),fa=F({components:{PieChart:ca,MovieRecordsPopup:se},props:{id:{type:String,default:"js-area-pie"},records:{type:Array,required:!0}},setup(r){const d=E(()=>J(r.records,p=>p.area)),u=G({data:E(()=>Object.keys(d.value).map(p=>d.value[p].length)),labels:E(()=>Object.keys(d.value))}),v=G({label:"",records:[]});function f({label:p}){v.label=p,v.records=d.value[p]}return{dataset:u,areaDetails:v,onClick:f}}}),va={class:"text-center py-2"};function pa(r,d,u,v,f,p){const l=P("PieChart"),c=P("MovieRecordsPopup");return S(),I(N,null,[y(l,{id:r.id,data:r.dataset.data,labels:r.dataset.labels,onPieClick:r.onClick},null,8,["id","data","labels","onPieClick"]),y(c,{records:r.areaDetails.records,"onUpdate:records":d[0]||(d[0]=b=>r.areaDetails.records=b)},{title:k(()=>[D("div",va,R(r.areaDetails.label),1)]),_:1},8,["records"])],64)}const ya=W(fa,[["render",pa]]),ha=F({components:{BarChart:ze,MovieRecordsPopup:se},props:{id:{type:String,default:"js-theater-bar"},records:{type:Array,required:!0}},setup(r){const d=E(()=>J(r.records,l=>l.theater)),u=E(()=>Object.keys(d.value).map(l=>({label:l,data:d.value[l].length})).sort((l,c)=>l.data<c.data?1:-1)),v=G({data:E(()=>u.value.map(l=>l.data)),labels:E(()=>u.value.map(l=>l.label))}),f=G({label:"",records:[]});function p({label:l}){f.label=l,f.records=d.value[l]}return{dataset:v,theaterDetails:f,onClick:p}}}),_a={class:"text-center py-2"};function ba(r,d,u,v,f,p){const l=P("BarChart"),c=P("MovieRecordsPopup");return S(),I(N,null,[(S(),V(l,{type:"horizontalBar",id:r.id,key:r.id,data:r.dataset.data,labels:r.dataset.labels,onBarClick:r.onClick},null,8,["id","data","labels","onBarClick"])),y(c,{records:r.theaterDetails.records,"onUpdate:records":d[0]||(d[0]=b=>r.theaterDetails.records=b)},{title:k(()=>[D("div",_a,R(r.theaterDetails.label),1)]),_:1},8,["records"])],64)}const ma=W(ha,[["render",ba]]),ga=F({components:{BarChart:ze,MovieRecordsPopup:se},props:{id:{type:String,required:!0},records:{type:Array,required:!0}},setup(r){const d=E(()=>J(r.records,l=>l.version)),u=E(()=>Object.keys(d.value).map(l=>({label:l,data:d.value[l].length})).sort((l,c)=>l.data<c.data?1:-1)),v=G({data:E(()=>u.value.map(l=>l.data)),labels:E(()=>u.value.map(l=>l.label))}),f=G({label:"",records:[]});function p({label:l}){f.label=l,f.records=d.value[l]}return{...$e(v),versionDetails:f,onClick:p}}}),xa={class:"text-center py-2"};function ka(r,d,u,v,f,p){const l=P("BarChart"),c=P("MovieRecordsPopup");return S(),I(N,null,[y(l,{type:"horizontalBar",id:r.id,data:r.data,labels:r.labels,onBarClick:r.onClick},null,8,["id","data","labels","onBarClick"]),y(c,{records:r.versionDetails.records,"onUpdate:records":d[0]||(d[0]=b=>r.versionDetails.records=b)},{title:k(()=>[D("div",xa,R(r.versionDetails.label),1)]),_:1},8,["records"])],64)}const Ca=W(ga,[["render",ka]]),$a=F({components:{ContributionChart:nr,MovieRecordsPopup:se},props:{id:{type:String,default:"js-contribution"},records:{type:Array,required:!0}},setup(r){const d=E(()=>J(r.records,l=>Y(l.date).dayOfYear())),u=G({contributions:E(()=>{const l=Y(r.records[0].date).startOf("year"),c=l.isLeapYear()?366:365,b=l.isoWeekday()%7;return Array(b).fill("").map(()=>({date:"",value:-1,records:[]})).concat(Array(c).fill("").map((g,_)=>{var M;const x=l.add(_,"day"),w=((M=d.value[_+1])==null?void 0:M.length)??0,C=d.value[_+1]||[];return{date:x.toISOString(),value:w,records:C}}))})}),v=G({date:"",records:[]});function f({date:l,records:c}){v.date=l,v.records=c}function p(l){return Y(l).format("YYYY/MM/DD (ddd)")}return{...$e(u),dayDetails:v,formatDate:p,onClick:f}}}),wa={class:"text-center py-2"};function Ba(r,d,u,v,f,p){const l=P("ContributionChart"),c=P("MovieRecordsPopup");return S(),I(N,null,[(S(),V(l,{id:r.id,key:r.id,contributions:r.contributions,onBlockClick:r.onClick},null,8,["id","contributions","onBlockClick"])),y(c,{records:r.dayDetails.records,"onUpdate:records":d[0]||(d[0]=b=>r.dayDetails.records=b)},{title:k(()=>[D("div",wa,R(r.formatDate(r.dayDetails.date)),1)]),_:1},8,["records"])],64)}const Sa=W($a,[["render",Ba]]),Ma=F({components:{VanTabs:Tt,VanTab:Pt,VanSkeleton:Ot,VanCellGroup:Dt,VanCollapse:wr,VanCollapseItem:Pr,VanTag:it,MovieRecordCell:ct,FrequencyBarChart:Qr,MovieTimeHeatmapChart:aa,TotalAnalytics:la,AreaPieChart:ya,TheaterBarChart:ma,VersionBarChart:Ca,MovieContributionChart:Sa,MovieLineChart:Er},setup(){var x;const r=Zt(),d=Et(),{state:u,isReady:v}=Rt(At("movie"),{success:!1,resultMessage:"",resultCode:"",resultException:"",items:[]}),f=U(((x=r.query.tab)==null?void 0:x.toString())||"data"),p=U(""),l=U(Y().year()),c=E(()=>u.value.items),b=E(()=>{const w=J(c.value,C=>Y(C.date).year());return Object.keys(w).sort((C,M)=>+C>+M?-1:1).map(C=>({id:+C,records:w[C]}))}),g=E(()=>b.value.find(w=>w.id===l.value)),_=E(()=>{const w=J(c.value,C=>C.title);return Object.keys(w).map(C=>({title:C,count:w[C].length,records:c.value.filter(M=>C===M.title)})).filter(C=>C.count>1).sort((C,M)=>C.count>M.count?-1:1)});return Jt(()=>{d.value=`Log | Movie | ${f.value}`}),{isReady:v,activeTab:f,activeCollapse:p,records:c,arrayByYear:b,arrayByTitle:_,filterYear:l,filterArrayByYear:g,formatDate:Qe}}}),Ta={class:"text-center my-2"},Pa={class:"max-w-2xl mx-auto"},Oa={class:"text-center"},Da={class:"mt-3 mb-1"},Ea={class:"max-w-2xl mx-auto px-2"},Ra=D("div",{class:"text-center text-xs my-2"},"累積下來每個月各看了幾場電影",-1),Aa={class:"text-center text-xs my-2"},Ia={class:"max-w-2xl mx-auto px-2"},za={class:"max-w-2xl mx-auto px-2"},ja={class:"max-w-2xl mx-auto px-2"},Fa={class:"max-w-2xl mx-auto px-2"},La={class:"max-w-2xl mx-auto"},qa={class:"flex items-center"},Na={class:"text-xs"},Va={class:"-mx-3 -my-4"};function Ha(r,d,u,v,f,p){const l=P("TotalAnalytics"),c=P("MovieContributionChart"),b=P("MovieRecordCell"),g=P("van-cell-group"),_=P("van-tab"),x=P("van-tabs"),w=P("MovieLineChart"),C=P("FrequencyBarChart"),M=P("MovieTimeHeatmapChart"),O=P("TheaterBarChart"),A=P("VersionBarChart"),L=P("AreaPieChart"),z=P("van-tag"),Q=P("van-collapse-item"),le=P("van-collapse"),re=P("van-skeleton");return S(),I("div",{class:Qt(r.isReady?"pb-16":"py-4")},[y(re,{title:"",row:10,loading:!r.isReady,round:""},{default:k(()=>[y(x,{active:r.activeTab,"onUpdate:active":d[1]||(d[1]=h=>r.activeTab=h),sticky:"",border:""},{default:k(()=>[y(_,{title:"資料",name:"data",to:{query:{tab:"data"}}},{default:k(()=>[D("div",Ta,[y(l,{records:r.records},null,8,["records"])]),y(x,{"offset-top":44,"line-height":1,scrollspy:"",sticky:"",border:""},{default:k(()=>[(S(!0),I(N,null,X(r.arrayByYear,h=>(S(),V(_,{title:`${h.id}`,key:h.id},{default:k(()=>[D("div",Pa,[y(g,{border:""},{title:k(()=>[D("div",Oa,R(h.id),1),D("div",Da,[y(c,{id:`js-contribution-${h.id}`,records:h.records},null,8,["id","records"])]),y(l,{records:h.records},null,8,["records"])]),default:k(()=>[(S(!0),I(N,null,X(h.records,j=>(S(),V(b,{record:j,key:`${j.date}_${j.title}`},null,8,["record"]))),128))]),_:2},1024)])]),_:2},1032,["title"]))),128))]),_:1})]),_:1}),y(_,{title:"場數",name:"frequency",to:{query:{tab:"frequency"}}},{default:k(()=>[D("div",Ea,[y(x,{"line-height":1,border:""},{default:k(()=>[y(_,{title:"全部"},{default:k(()=>[y(w,{id:"total",records:r.records},null,8,["records"]),Ra,y(C,{id:"js-frequency-all",records:r.records},null,8,["records"])]),_:1}),(S(!0),I(N,null,X(r.arrayByYear,h=>(S(),V(_,{title:`${h.id}`,key:h.id},{default:k(()=>[D("div",Aa,R(h.id)+" 每個月各看了幾場電影",1),y(C,{id:`js-frequency-${h.id}`,records:h.records},null,8,["id","records"])]),_:2},1032,["title"]))),128))]),_:1})])]),_:1}),y(_,{title:"時間",name:"time",to:{query:{tab:"time"}}},{default:k(()=>[D("div",Ia,[y(x,{"line-height":1,border:""},{default:k(()=>[y(_,{title:"全部"},{default:k(()=>[y(M,{id:"js-heatmap-all",records:r.records},null,8,["records"])]),_:1}),(S(!0),I(N,null,X(r.arrayByYear,h=>(S(),V(_,{title:`${h.id}`,key:h.id},{default:k(()=>[y(M,{id:`js-heatmap-${h.id}`,records:h.records},null,8,["id","records"])]),_:2},1032,["title"]))),128))]),_:1})])]),_:1}),y(_,{title:"影廳",name:"theater",to:{query:{tab:"theater"}}},{default:k(()=>[D("div",za,[y(x,{"line-height":1,border:""},{default:k(()=>[y(_,{title:"全部"},{default:k(()=>[y(O,{id:"js-theater-bar-all",records:r.records},null,8,["records"])]),_:1}),(S(!0),I(N,null,X(r.arrayByYear,h=>(S(),V(_,{title:`${h.id}`,key:h.id},{default:k(()=>[y(O,{id:`js-theater-bar-${h.id}`,records:h.records},null,8,["id","records"])]),_:2},1032,["title"]))),128))]),_:1})])]),_:1}),y(_,{title:"版本",name:"version",to:{query:{tab:"version"}}},{default:k(()=>[D("div",ja,[y(x,{"line-height":1,border:""},{default:k(()=>[y(_,{title:"全部"},{default:k(()=>[y(A,{id:"js-version-bar-all",records:r.records},null,8,["records"])]),_:1}),(S(!0),I(N,null,X(r.arrayByYear,h=>(S(),V(_,{title:`${h.id}`,key:h.id},{default:k(()=>[y(A,{id:`js-version-bar-${h.id}`,records:h.records},null,8,["id","records"])]),_:2},1032,["title"]))),128))]),_:1})])]),_:1}),y(_,{title:"國別",name:"area",to:{query:{tab:"area"}}},{default:k(()=>[D("div",Fa,[y(x,{"line-height":1,border:""},{default:k(()=>[y(_,{title:"全部"},{default:k(()=>[y(L,{id:"js-area-pie-all",records:r.records},null,8,["records"])]),_:1}),(S(!0),I(N,null,X(r.arrayByYear,h=>(S(),V(_,{title:`${h.id}`,key:h.id},{default:k(()=>[y(L,{id:`js-area-pie-${h.id}`,records:h.records},null,8,["id","records"])]),_:2},1032,["title"]))),128))]),_:1})])]),_:1}),y(_,{title:"多刷",name:"secondtime",to:{query:{tab:"secondtime"}}},{default:k(()=>[D("div",La,[y(le,{modelValue:r.activeCollapse,"onUpdate:modelValue":d[0]||(d[0]=h=>r.activeCollapse=h),accordion:""},{default:k(()=>[(S(!0),I(N,null,X(r.arrayByTitle,h=>(S(),V(Q,{key:h.title,name:h.title},{title:k(()=>[D("div",qa,[y(z,{class:"mr-2",type:"primary",plain:"",size:"medium"},{default:k(()=>[ke("x "+R(h.count),1)]),_:2},1024),D("span",Na,R(h.title),1)])]),default:k(()=>[D("div",Va,[(S(!0),I(N,null,X(h.records,j=>(S(),V(b,{record:j,key:`${j.date}_${j.title}`,hideTitle:"",size:"mini"},null,8,["record"]))),128))])]),_:2},1032,["name"]))),128))]),_:1},8,["modelValue"])])]),_:1})]),_:1},8,["active"])]),_:1},8,["loading"])],2)}const Xa=W(Ma,[["render",Ha]]);export{Xa as default};
