var e=function(e){var t,n=Object.prototype,r=n.hasOwnProperty,a=Object.defineProperty||function(e,t,n){e[t]=n.value},i="function"==typeof Symbol?Symbol:{},o=i.iterator||"@@iterator",d=i.asyncIterator||"@@asyncIterator",l=i.toStringTag||"@@toStringTag";function s(e,t,n){return Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{s({},"")}catch(e){s=function(e,t,n){return e[t]=n}}function u(e,n,r,i){var o,d,l=Object.create((n&&n.prototype instanceof f?n:f).prototype);return a(l,"_invoke",{value:(o=new L(i||[]),d=c,function(n,a){if(d===h)throw Error("Generator is already running");if(d===m){if("throw"===n)throw a;return A()}for(o.method=n,o.arg=a;;){var i=o.delegate;if(i){var l=function e(n,r){var a=r.method,i=n.iterator[a];if(t===i)return r.delegate=null,"throw"===a&&n.iterator.return&&(r.method="return",r.arg=t,e(n,r),"throw"===r.method)||"return"!==a&&(r.method="throw",r.arg=TypeError("The iterator does not provide a '"+a+"' method")),w;var o=g(i,n.iterator,r.arg);if("throw"===o.type)return r.method="throw",r.arg=o.arg,r.delegate=null,w;var d=o.arg;return d?d.done?(r[n.resultName]=d.value,r.next=n.nextLoc,"return"!==r.method&&(r.method="next",r.arg=t),r.delegate=null,w):d:(r.method="throw",r.arg=TypeError("iterator result is not an object"),r.delegate=null,w)}(i,o);if(l){if(l===w)continue;return l}}if("next"===o.method)o.sent=o._sent=o.arg;else if("throw"===o.method){if(d===c)throw d=m,o.arg;o.dispatchException(o.arg)}else"return"===o.method&&o.abrupt("return",o.arg);d=h;var s=g(e,r,o);if("normal"===s.type){if(d=o.done?m:"suspendedYield",s.arg===w)continue;return{value:s.arg,done:o.done}}"throw"===s.type&&(d=m,o.method="throw",o.arg=s.arg)}})}),l}function g(e,t,n){try{return{type:"normal",arg:e.call(t,n)}}catch(e){return{type:"throw",arg:e}}}e.wrap=u;var c="suspendedStart",h="executing",m="completed",w={};function f(){}function v(){}function y(){}var p={};s(p,o,function(){return this});var b=Object.getPrototypeOf,E=b&&b(b(k([])));E&&E!==n&&r.call(E,o)&&(p=E);var S=y.prototype=f.prototype=Object.create(p);function x(e){["next","throw","return"].forEach(function(t){s(e,t,function(e){return this._invoke(t,e)})})}function I(e,t){var n;a(this,"_invoke",{value:function(a,i){function o(){return new t(function(n,o){!function n(a,i,o,d){var l=g(e[a],e,i);if("throw"===l.type)d(l.arg);else{var s=l.arg,u=s.value;return u&&"object"==typeof u&&r.call(u,"__await")?t.resolve(u.__await).then(function(e){n("next",e,o,d)},function(e){n("throw",e,o,d)}):t.resolve(u).then(function(e){s.value=e,o(s)},function(e){return n("throw",e,o,d)})}}(a,i,n,o)})}return n=n?n.then(o,o):o()}})}function z(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function B(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function L(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(z,this),this.reset(!0)}function k(e){if(e){var n=e[o];if(n)return n.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var a=-1,i=function n(){for(;++a<e.length;)if(r.call(e,a))return n.value=e[a],n.done=!1,n;return n.value=t,n.done=!0,n};return i.next=i}}return{next:A}}function A(){return{value:t,done:!0}}return v.prototype=y,a(S,"constructor",{value:y,configurable:!0}),a(y,"constructor",{value:v,configurable:!0}),v.displayName=s(y,l,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===v||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,y):(e.__proto__=y,s(e,l,"GeneratorFunction")),e.prototype=Object.create(S),e},e.awrap=function(e){return{__await:e}},x(I.prototype),s(I.prototype,d,function(){return this}),e.AsyncIterator=I,e.async=function(t,n,r,a,i){void 0===i&&(i=Promise);var o=new I(u(t,n,r,a),i);return e.isGeneratorFunction(n)?o:o.next().then(function(e){return e.done?e.value:o.next()})},x(S),s(S,l,"Generator"),s(S,o,function(){return this}),s(S,"toString",function(){return"[object Generator]"}),e.keys=function(e){var t=Object(e),n=[];for(var r in t)n.push(r);return n.reverse(),function e(){for(;n.length;){var r=n.pop();if(r in t)return e.value=r,e.done=!1,e}return e.done=!0,e}},e.values=k,L.prototype={constructor:L,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(B),!e)for(var n in this)"t"===n.charAt(0)&&r.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=t)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var n=this;function a(r,a){return d.type="throw",d.arg=e,n.next=r,a&&(n.method="next",n.arg=t),!!a}for(var i=this.tryEntries.length-1;i>=0;--i){var o=this.tryEntries[i],d=o.completion;if("root"===o.tryLoc)return a("end");if(o.tryLoc<=this.prev){var l=r.call(o,"catchLoc"),s=r.call(o,"finallyLoc");if(l&&s){if(this.prev<o.catchLoc)return a(o.catchLoc,!0);if(this.prev<o.finallyLoc)return a(o.finallyLoc)}else if(l){if(this.prev<o.catchLoc)return a(o.catchLoc,!0)}else if(s){if(this.prev<o.finallyLoc)return a(o.finallyLoc)}else throw Error("try statement without catch or finally")}}},abrupt:function(e,t){for(var n=this.tryEntries.length-1;n>=0;--n){var a=this.tryEntries[n];if(a.tryLoc<=this.prev&&r.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var i=a;break}}i&&("break"===e||"continue"===e)&&i.tryLoc<=t&&t<=i.finallyLoc&&(i=null);var o=i?i.completion:{};return(o.type=e,o.arg=t,i)?(this.method="next",this.next=i.finallyLoc,w):this.complete(o)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),w},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.finallyLoc===e)return this.complete(n.completion,n.afterLoc),B(n),w}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.tryLoc===e){var r=n.completion;if("throw"===r.type){var a=r.arg;B(n)}return a}}throw Error("illegal catch attempt")},delegateYield:function(e,n,r){return this.delegate={iterator:k(e),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=t),w}},e}({});try{regeneratorRuntime=e}catch(t){"object"==typeof globalThis?globalThis.regeneratorRuntime=e:Function("r","regeneratorRuntime = r")(e)}function t({svg:e}){for(;e.firstChild;)e.removeChild(e.firstChild)}async function n(e){return new Promise((t,n)=>{let r=new Image;function a(){r.removeEventListener("load",a),r.removeEventListener("error",i),t(r)}function i(e){r.removeEventListener("load",a),r.removeEventListener("error",i),n(e)}r.addEventListener("load",a),r.addEventListener("error",i),r.src=URL.createObjectURL(e)})}async function r(e){return console.log(`LoadImageAsBlob().image: ${e}, image.width: ${e.width}, image.height: ${e.height}`),console.log(`image instanceof Image: ${e instanceof Image}`),await new Promise((t,n)=>{let r=()=>{let n=document.createElement("canvas");n.width=e.width,n.height=e.height,console.log(`LoadImageAsBlob().processImage().image.width: ${e.width}, image.height: ${e.height}`),n.getContext("2d").drawImage(e,0,0,n.width,n.height),n.toBlob(e=>{t(e)},"image/png"),e.removeEventListener("load",r),e.removeEventListener("error",a)},a=t=>{n(t),e.removeEventListener("load",r),e.removeEventListener("error",a)};e.complete&&0!==e.naturalHeight?r():(e.addEventListener("load",r),e.addEventListener("error",a))})}for(const e of(window.badgerState=new class{constructor(){this.mainImage=new Image,this.overlayImage=new Image,this._imageOverlayAlpha=.5,this._outlineOverlayAlpha=.5,this._outlineRoundness=0,this._u=0,this._v=0,this._normalizedRadius=0,this._normalizedBorder=0,this._badgeText="1",this._normalizedFontSize=0,this._uTextOffset=0,this._vTextOffset=0,this.dirty=!1}GetImageWH(){return{w:this.mainImage.width,h:this.mainImage.height}}_RedrawEverything(){let e=document.getElementById("canvas");e.width=256,e.height=256,e.style.display="block";let n=e.getContext("2d");n.clearRect(0,0,e.width,e.height),function({canvas:e,ctx:t,img:n,imgSize:r,u:a,v:i,radiusU:o,borderU:d,fontSizeU:l,offsetU:s,offsetV:u}){t.drawImage(n,0,0,r,r),function({x:e,y:t,radius:n,ctx:r}){r.globalCompositeOperation="destination-out",r.beginPath(),r.arc(e,t,n,0,2*Math.PI),r.fill(),r.globalCompositeOperation="source-over"}({x:a*r,y:i*r,radius:(o+d)*r,ctx:t}),function({x:e,y:t,radius:n,color:r,ctx:a}){console.log(`FillCircle().x: ${e}, y: ${t}, radius: ${n}, color: ${r}`),a.fillStyle=r,a.beginPath(),a.arc(e,t,n,0,2*Math.PI),a.fill()}({x:a*r,y:i*r,radius:o*r,color:"red",ctx:t}),t.fillStyle="white",t.font=`700 ${l*r}px "gg sans", "Noto Sans", "Helvetica Neue", Helvetica, Arial, sans-serif`;let g=document.getElementById("badge-text").value,c=t.measureText(g);c.width,c.actualBoundingBoxAscent,c.actualBoundingBoxDescent,t.textAlign="center",t.textBaseline="middle";let h=a*r;h+=s*r;let m=i*r;m+=u*r,t.fillText(g,h,m)}({canvas:e,ctx:n,img:this.mainImage,imgSize:256,u:this.u,v:this.v,fontSizeU:this.normalizedFontSize,offsetU:this.uTextOffset,offsetV:this.vTextOffset,radiusU:this.normalizedRadius,borderU:this.normalizedBorder});let r=document.getElementById("canvas-overlay");r.style.display="block",r.width=256,r.height=256;let a=r.getContext("2d");a.clearRect(0,0,e.width,e.height),function({canvas:e,ctx:t,img:n,imgSize:r,alpha:a}){console.log(`DrawImageOverlay().imgSize: ${r}, alpha: ${a}, img.width: ${n.width}, img.height: ${n.height}`),t.globalAlpha=a,t.drawImage(n,0,0,r,r),t.globalAlpha=1}({canvas:r,ctx:a,img:this.overlayImage,imgSize:256,alpha:this.imageOverlayAlpha}),function({canvas:e,ctx:t,imgSize:n,alpha:r,roundness:a}){let i=document.createElement("canvas");i.width=n,i.height=n;let o=i.getContext("2d");o.fillStyle=`rgba(54, 57, 63, ${r})`,o.fillRect(0,0,n,n),o.globalCompositeOperation="destination-out";let d=n/2*a;1===a?(o.beginPath(),o.arc(n/2,n/2,d,0,2*Math.PI)):(o.beginPath(),o.moveTo(d,0),o.lineTo(n-d,0),o.arc(n-d,d,d,1.5*Math.PI,2*Math.PI),o.lineTo(n,n-d),o.arc(n-d,n-d,d,0,.5*Math.PI),o.lineTo(d,n),o.arc(d,n-d,d,.5*Math.PI,Math.PI),o.lineTo(0,d),o.arc(d,d,d,Math.PI,1.5*Math.PI),o.closePath()),o.fillStyle="rgba(255, 255, 255, 1)",o.fill(),o.globalCompositeOperation="source-over",t.drawImage(i,0,0,n,n)}({canvas:r,ctx:a,imgSize:256,alpha:this.outlineOverlayAlpha,roundness:this.outlineRoundness});let i=document.getElementById("svg");i.style.display="block",i.setAttribute("width",256),i.setAttribute("height",256),t({svg:i}),function({svg:e,svgSize:t,img:n,u:r,v:a,fontSizeU:i,offsetU:o,offsetV:d,radius:l,border:s}){let u=document.createElementNS("http://www.w3.org/2000/svg","mask");u.setAttribute("id","image-mask");let g=document.createElementNS("http://www.w3.org/2000/svg","rect");g.setAttribute("x","0"),g.setAttribute("y","0"),g.setAttribute("width","100%"),g.setAttribute("height","100%"),g.setAttribute("fill","white"),u.appendChild(g);let c=document.createElementNS("http://www.w3.org/2000/svg","circle");c.setAttribute("cx",r*t),c.setAttribute("cy",a*t),c.setAttribute("r",(l+s)*t),c.setAttribute("fill","black"),u.appendChild(c),e.appendChild(u);let h=document.createElementNS("http://www.w3.org/2000/svg","image");h.setAttribute("x","0"),h.setAttribute("y","0"),h.setAttribute("width","100%"),h.setAttribute("height","100%"),h.setAttribute("href",n.src),h.setAttribute("mask","url(#image-mask)"),e.appendChild(h);let m=document.createElementNS("http://www.w3.org/2000/svg","circle");m.setAttribute("cx",r*t),m.setAttribute("cy",a*t),m.setAttribute("r",l*t),m.setAttribute("fill","red"),e.appendChild(m);let w=document.getElementById("badge-text").value,f=a*t+d*t;f+=l/2*t;let v=document.createElementNS("http://www.w3.org/2000/svg","text");v.setAttribute("x",r*t+o*t),v.setAttribute("y",f),v.setAttribute("fill","white"),v.setAttribute("text-anchor","middle"),v.setAttribute("vertical-align","middle"),v.setAttribute("font-size",`${i*t}px`),v.setAttribute("font-weight","700"),v.setAttribute("font-family",'"gg sans", "Noto Sans", "Helvetica Neue", Helvetica, Arial, sans-serif'),v.textContent=w,e.appendChild(v),e.style.display="block"}({svg:i,svgSize:256,img:this.mainImage,u:this.u,v:this.v,fontSizeU:this.normalizedFontSize,offsetU:this.uTextOffset,offsetV:this.vTextOffset,radius:this.normalizedRadius,border:this.normalizedBorder});let o=document.getElementById("svg-overlay");o.style.display="block",t({svg:o}),function({svg:e,img:t,alpha:n}){let r=document.createElementNS("http://www.w3.org/2000/svg","image");r.setAttribute("x","0"),r.setAttribute("y","0"),r.setAttribute("width","100%"),r.setAttribute("height","100%"),r.setAttribute("href",t.src),r.setAttribute("opacity",n),e.appendChild(r)}({svg:o,img:this.overlayImage,alpha:this.imageOverlayAlpha}),function({svg:e,svgSize:t,alpha:n,roundness:r}){let a=document.createElementNS("http://www.w3.org/2000/svg","mask");a.setAttribute("id","outline-overlay-image-mask");let i=document.createElementNS("http://www.w3.org/2000/svg","rect");i.setAttribute("x","0"),i.setAttribute("y","0"),i.setAttribute("width","100%"),i.setAttribute("height","100%"),i.setAttribute("fill","white"),a.appendChild(i);let o=document.createElementNS("http://www.w3.org/2000/svg","rect");o.setAttribute("x","0"),o.setAttribute("y","0"),o.setAttribute("width","100%"),o.setAttribute("height","100%"),o.setAttribute("fill","black"),o.setAttribute("rx",`${r*t/2}px`),o.setAttribute("ry",`${r*t/2}px`),a.appendChild(o),e.appendChild(a);let d=document.createElementNS("http://www.w3.org/2000/svg","rect");d.setAttribute("x","0"),d.setAttribute("y","0"),d.setAttribute("opacity",n),d.setAttribute("width","100%"),d.setAttribute("height","100%"),d.setAttribute("fill","rgba(54, 57, 63)"),d.setAttribute("mask","url(#outline-overlay-image-mask)"),e.appendChild(d)}({svg:o,svgSize:256,alpha:this.outlineOverlayAlpha,roundness:this.outlineRoundness}),console.log(`_RedrawEverything().x: ${this.x}, y: ${this.y}, u: ${this.u}, v: ${this.v}`);let d=this.mainImage;function l(e,t){0===d.width?(document.getElementById(e).value="0",document.getElementById(e).disabled=!0):(document.getElementById(e).value=t,document.getElementById(e).disabled=!1)}document.getElementById("image-overlay-alpha").value=this.imageOverlayAlpha,document.getElementById("outline-overlay-alpha").value=this.outlineOverlayAlpha,document.getElementById("outline-overlay-roundness").value=this.outlineRoundness,l("x",this.x),l("y",this.y),document.getElementById("u").value=this.u,document.getElementById("v").value=this.v,document.getElementById("normalized-radius").value=this.normalizedRadius,document.getElementById("normalized-border").value=this.normalizedBorder,l("pixel-radius",this.pixelRadius),l("pixel-border",this.pixelBorder),document.getElementById("badge-text").value=this.badgeText,document.getElementById("normalized-font-size").value=this.normalizedFontSize,document.getElementById("normalized-offset-u").value=this.uTextOffset,document.getElementById("normalized-offset-v").value=this.vTextOffset,l("pixel-font-size",this.pixelFontSize),l("pixel-offset-x",this.xTextOffset),l("pixel-offset-y",this.yTextOffset),console.log(this)}MarkDirty(){this.dirty||(this.dirty=!0,this.u=1*this.u,this.v=1*this.v,this.normalizedRadius=1*this.normalizedRadius,this.normalizedBorder=1*this.normalizedBorder,setTimeout(()=>{this._RedrawEverything(),this.dirty=!1},0))}set imageOverlayAlpha(e){this._imageOverlayAlpha=e}get imageOverlayAlpha(){return this._imageOverlayAlpha}set outlineOverlayAlpha(e){this._outlineOverlayAlpha=e}get outlineOverlayAlpha(){return this._outlineOverlayAlpha}set outlineRoundness(e){this._outlineRoundness=e}get outlineRoundness(){return this._outlineRoundness}set x(e){this._u=e/this.GetImageWH().w}get x(){return this._u*this.GetImageWH().w}set y(e){this._v=e/this.GetImageWH().h}get y(){return this._v*this.GetImageWH().h}set u(e){this._u=e}get u(){return this._u}set v(e){this._v=e}get v(){return this._v}set pixelRadius(e){this._normalizedRadius=e/this.GetImageWH().w}get pixelRadius(){return this._normalizedRadius*this.GetImageWH().w}set normalizedRadius(e){this._normalizedRadius=e}get normalizedRadius(){return this._normalizedRadius}set pixelBorder(e){this._normalizedBorder=e/this.GetImageWH().w}get pixelBorder(){return this._normalizedBorder*this.GetImageWH().w}set normalizedBorder(e){this._normalizedBorder=e}get normalizedBorder(){return this._normalizedBorder}set badgeText(e){this._badgeText=e}get badgeText(){return this._badgeText}set normalizedFontSize(e){this._normalizedFontSize=e}get normalizedFontSize(){return this._normalizedFontSize}set pixelFontSize(e){this._normalizedFontSize=e/this.GetImageWH().w}get pixelFontSize(){return this._normalizedFontSize*this.GetImageWH().w}set uTextOffset(e){this._uTextOffset=e}get uTextOffset(){return this._uTextOffset}set xTextOffset(e){this._uTextOffset=e/this.GetImageWH().w}get xTextOffset(){return this._uTextOffset*this.GetImageWH().w}set vTextOffset(e){this._vTextOffset=e}get vTextOffset(){return this._vTextOffset}set yTextOffset(e){this._vTextOffset=e/this.GetImageWH().h}get yTextOffset(){return this._vTextOffset*this.GetImageWH().h}},document.getElementById("upload-image").addEventListener("change",function(e){let t=new FileReader;t.onload=function(e){window.badgerState.mainImage=new Image,window.badgerState.mainImage.onload=function(){window.badgerState.MarkDirty()},window.badgerState.mainImage.src=e.target.result},t.readAsDataURL(e.target.files[0])}),document.getElementById("upload-image-overlay").addEventListener("change",function(e){window.badgerState.overlayImage=new Image;let t=new FileReader;t.onload=function(e){window.badgerState.overlayImage=new Image,window.badgerState.overlayImage.onload=function(){window.badgerState.MarkDirty()},window.badgerState.overlayImage.src=e.target.result},t.readAsDataURL(e.target.files[0])}),document.getElementById("download-image").addEventListener("click",function(e){let t=document.getElementById("canvas").toDataURL("image/png").replace("image/png","image/octet-stream"),n=document.createElement("a");n.download="badger-badger-pfp.png",n.href=t,n.click()}),document.getElementById("download-svg").addEventListener("click",function(e){let t=document.getElementById("svg"),n=new XMLSerializer().serializeToString(t),r=new Blob([n],{type:"image/svg+xml"}),a=URL.createObjectURL(r),i=document.createElement("a");i.download="badger-badger-pfp.svg",i.href=a,i.click(),URL.revokeObjectURL(a)}),document.getElementById("download-svg-as-png").addEventListener("click",function(e){let t=document.getElementById("svg"),n=new XMLSerializer().serializeToString(t),r=document.createElement("canvas");r.width=256,r.height=256;let a=r.getContext("2d"),i=new Image;i.onload=function(){a.drawImage(i,0,0,r.width,r.height);let e=r.toDataURL("image/png").replace("image/png","image/octet-stream"),t=document.createElement("a");t.download="badger-badger-pfp-svg.png",t.href=e,t.click()},i.src="data:image/svg+xml;base64,"+btoa(n)}),["input","change"]))document.getElementById("image-overlay-alpha").addEventListener(e,function(e){window.badgerState.imageOverlayAlpha=parseFloat(e.target.value),window.badgerState.MarkDirty()}),document.getElementById("outline-overlay-alpha").addEventListener(e,function(e){window.badgerState.outlineOverlayAlpha=parseFloat(e.target.value),window.badgerState.MarkDirty()}),document.getElementById("outline-overlay-roundness").addEventListener(e,function(e){window.badgerState.outlineRoundness=parseFloat(e.target.value),window.badgerState.MarkDirty()}),document.getElementById("x").addEventListener(e,function(e){window.badgerState.x=parseFloat(e.target.value),window.badgerState.MarkDirty()}),document.getElementById("y").addEventListener(e,function(e){window.badgerState.y=parseFloat(e.target.value),window.badgerState.MarkDirty()}),document.getElementById("u").addEventListener(e,function(e){window.badgerState.u=parseFloat(e.target.value),window.badgerState.MarkDirty()}),document.getElementById("v").addEventListener(e,function(e){window.badgerState.v=parseFloat(e.target.value),window.badgerState.MarkDirty()}),document.getElementById("pixel-radius").addEventListener(e,function(e){window.badgerState.pixelRadius=parseFloat(e.target.value),window.badgerState.MarkDirty()}),document.getElementById("normalized-radius").addEventListener(e,function(e){window.badgerState.normalizedRadius=parseFloat(e.target.value),window.badgerState.MarkDirty()}),document.getElementById("pixel-border").addEventListener(e,function(e){window.badgerState.pixelBorder=parseFloat(e.target.value),window.badgerState.MarkDirty()}),document.getElementById("normalized-border").addEventListener(e,function(e){window.badgerState.normalizedBorder=parseFloat(e.target.value),window.badgerState.MarkDirty()}),document.getElementById("badge-text").addEventListener(e,function(e){window.badgerState.badgeText=e.target.value,window.badgerState.MarkDirty()}),document.getElementById("pixel-font-size").addEventListener(e,function(e){window.badgerState.pixelFontSize=parseFloat(e.target.value),window.badgerState.MarkDirty()}),document.getElementById("normalized-font-size").addEventListener(e,function(e){window.badgerState.normalizedFontSize=parseFloat(e.target.value),window.badgerState.MarkDirty()}),document.getElementById("pixel-offset-x").addEventListener(e,function(e){window.badgerState.xTextOffset=parseFloat(e.target.value),window.badgerState.MarkDirty()}),document.getElementById("normalized-offset-u").addEventListener(e,function(e){window.badgerState.uTextOffset=parseFloat(e.target.value),window.badgerState.MarkDirty()}),document.getElementById("pixel-offset-y").addEventListener(e,function(e){window.badgerState.yTextOffset=parseFloat(e.target.value),window.badgerState.MarkDirty()}),document.getElementById("normalized-offset-v").addEventListener(e,function(e){window.badgerState.vTextOffset=parseFloat(e.target.value),window.badgerState.MarkDirty()});document.getElementById("outline-overlay-roundness-server-default").addEventListener("click",function(e){window.badgerState.outlineRoundness=.66,window.badgerState.MarkDirty()}),document.getElementById("outline-overlay-roundness-user-default").addEventListener("click",function(e){window.badgerState.outlineRoundness=1,window.badgerState.MarkDirty()}),document.getElementById("outline-overlay-roundness-clear").addEventListener("click",function(e){window.badgerState.outlineRoundness=0,window.badgerState.MarkDirty()}),document.getElementById("lower-right").addEventListener("click",function(e){window.badgerState.u=1-21.25/128,window.badgerState.v=1-21/128,window.badgerState.MarkDirty()}),document.getElementById("lower-left").addEventListener("click",function(e){window.badgerState.u=21.25/128,window.badgerState.v=1-21/128,window.badgerState.MarkDirty()}),document.getElementById("upper-left").addEventListener("click",function(e){window.badgerState.u=21.25/128,window.badgerState.v=21/128,window.badgerState.MarkDirty()}),document.getElementById("upper-right").addEventListener("click",function(e){window.badgerState.u=1-21.25/128,window.badgerState.v=21/128,window.badgerState.MarkDirty()}),document.getElementById("lower-right-inner").addEventListener("click",function(e){window.badgerState.u=.5+Math.sqrt(2)/4-window.badgerState.normalizedRadius,window.badgerState.v=.5+Math.sqrt(2)/4-window.badgerState.normalizedRadius,window.badgerState.MarkDirty()}),document.getElementById("lower-left-inner").addEventListener("click",function(e){window.badgerState.u=.5-Math.sqrt(2)/4+window.badgerState.normalizedRadius,window.badgerState.v=.5+Math.sqrt(2)/4-window.badgerState.normalizedRadius,window.badgerState.MarkDirty()}),document.getElementById("upper-left-inner").addEventListener("click",function(e){window.badgerState.u=.5-Math.sqrt(2)/4+window.badgerState.normalizedRadius,window.badgerState.v=.5-Math.sqrt(2)/4+window.badgerState.normalizedRadius,window.badgerState.MarkDirty()}),document.getElementById("upper-right-inner").addEventListener("click",function(e){window.badgerState.u=.5+Math.sqrt(2)/4-window.badgerState.normalizedRadius,window.badgerState.v=.5-Math.sqrt(2)/4+window.badgerState.normalizedRadius,window.badgerState.MarkDirty()}),document.getElementById("default-radius").addEventListener("click",function(e){window.badgerState.normalizedRadius=21/128,window.badgerState.normalizedBorder=.25-21/128,window.badgerState.MarkDirty()}),document.getElementById("default-contents").addEventListener("click",function(e){window.badgerState.normalizedFontSize=30/128,window.badgerState.badgeText="1",window.badgerState.uTextOffset=0,window.badgerState.vTextOffset=0,window.badgerState.MarkDirty()}),document.getElementById("sample-pfp").addEventListener("click",async function(e){let t=document.getElementById("sample-pfp-image"),a=await r(t);window.badgerState.mainImage=await n(a),window.badgerState.MarkDirty()}),document.getElementById("clear-pfp").addEventListener("click",async function(e){window.badgerState.mainImage=new Image,window.badgerState.MarkDirty()}),document.getElementById("sample-pfp-overlay").addEventListener("click",async function(e){let t=await r(document.getElementById("sample-pfp-overlay-image"));window.badgerState.overlayImage=await n(t),window.badgerState.MarkDirty()}),document.getElementById("clear-pfp-overlay").addEventListener("click",async function(e){window.badgerState.overlayImage=new Image,window.badgerState.MarkDirty()}),document.getElementById("lower-right").click(),document.getElementById("default-radius").click(),document.getElementById("default-contents").click();
//# sourceMappingURL=index.f0ffe438.js.map
