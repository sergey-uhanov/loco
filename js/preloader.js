(()=>{"use strict";const e=e=>`[${e}]`,t=e=>Array.isArray(e)?e:[e],r=(e,t,r)=>{let l=0,o=!1;return{init:()=>{l<=0&&(e(),o=!0),l+=1},reset:()=>{l>0&&(l-=1),l<=0&&o&&t()},clearAndReset:()=>{l=0,o=!1,r?.(),t()},initIsCalled:()=>o}},l="data-noscroll-target-scroll-disabled",o="data-noscroll-target-scroll-scrollbar-width-adjustment",n="data-noscroll-target-scrollbar-width-adjustment",a="data-noscroll-target-scrollable",d="data-noscroll-global-styles",i="--noscroll-target-scrollbar-width",c="--noscroll-target-padding-right",{adjustScrollbarWidth:s,removeScrollbarWidthAdjustment:u,updateAllScrollbarWidthAdjustment:b,disableScroll:m,enableScroll:g,disablePageScroll:h,enablePageScroll:S,pageScrollIsDisabled:y,createPageScrollToggler:p,markScrollable:A,unmarkScrollable:v}=(s=>{const u=e=>{t(e).forEach((e=>{e.removeAttribute(n);const t=window.getComputedStyle(e);e.style.setProperty(c,t.paddingRight),e.setAttribute(n,"")}))},b=e=>{t(e).forEach((e=>{let t=!1;e.removeAttribute(o),null!==e.getAttribute(l)&&(t=!0,e.removeAttribute(l)),e.style.setProperty(i,`${(e=>{if((e=>e===document.body)(e)){const e=document.documentElement.clientWidth;return window.innerWidth-e}const t=e.style.borderLeftWidth,r=e.style.borderRightWidth;e.style.borderLeftWidth="0px",e.style.borderRightWidth="0px";const l=e.offsetWidth-e.clientWidth;return e.style.borderLeftWidth=t,e.style.borderRightWidth=r,l})(e)}px`),t&&e.setAttribute(l,"");const r=window.getComputedStyle(e);e.style.setProperty(c,r.paddingRight),e.setAttribute(o,"")}))},m=()=>{u([...document.querySelectorAll(e(n))]),b([...document.querySelectorAll(e(o))])},g=function(e){let t,r,l;return(...o)=>{t?(clearTimeout(r),r=setTimeout((()=>{Date.now()-l>=200&&(e(...o),l=Date.now())}),Math.max(200-(Date.now()-l),0))):(e(...o),l=Date.now(),t=!0)}}(m),{init:h,reset:S}=r((()=>{window.addEventListener("resize",g),s?.onInitScrollDisable?.()}),(()=>{window.removeEventListener("resize",g),s?.onResetScrollDisable?.()})),y=(t,{scrollbarWidthAdjustment:r=!0}={})=>{(()=>{if(document.querySelector(e(d)))return;const t=e(l),r=`    \n    ${t} {\n        overflow: hidden !important;\n    }\n    \n    ${t} ${e(n)},\n    ${t}${e(o)} {\n        padding-right: calc(var(${c}) + var(${i})) !important;\n    }\n    `,a=document.createElement("style");a.setAttribute(d,""),a.appendChild(document.createTextNode(r)),document.head.appendChild(a)})(),h(),s?.onScrollDisable?.(t),r&&b(t),t.setAttribute(l,"")},p=e=>{null!==e.getAttribute(l)&&(S(),s?.onScrollEnable?.(e),(e=>{t(e).forEach((e=>{e.removeAttribute(o),e.style.removeProperty(i),e.style.removeProperty(c)}))})(e),e.removeAttribute(l))},{init:A,reset:v,initIsCalled:w}=r((()=>y(document.body)),(()=>p(document.body)));return{adjustScrollbarWidth:u,removeScrollbarWidthAdjustment:e=>{t(e).forEach((e=>{e.removeAttribute(n),e.style.removeProperty(c)}))},updateAllScrollbarWidthAdjustment:m,disableScroll:y,enableScroll:p,disablePageScroll:A,enablePageScroll:v,pageScrollIsDisabled:w,createPageScrollToggler:()=>{let e=!1;const t={disablePageScroll(){e||(A(),e=!0)},enablePageScroll(){e&&(v(),e=!1)},togglePageScroll(){e?t.enablePageScroll():t.disablePageScroll()}};return t},markScrollable:e=>{t(e).forEach((e=>{e.setAttribute(a,"")}))},unmarkScrollable:e=>{t(e).forEach((e=>{e.removeAttribute(a)}))}}})();var w=document.querySelector(".preloader__number"),f=document.querySelector(".preloader"),P=0;h();var W=setInterval((function(){P+=1,w.textContent=" ".concat(P,"%"),100===P&&clearInterval(W)}),50);window.addEventListener("load",(function(){clearInterval(W),w.textContent="LIGHT",setTimeout((function(){f.style.display="none",S()}),1e3)}))})();
//# sourceMappingURL=preloader.js.map