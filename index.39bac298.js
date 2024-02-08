function e({svg:e}){for(;e.firstChild;)e.removeChild(e.firstChild)}async function t(e){return new Promise((t,a)=>{let i=new Image;function n(){i.removeEventListener("load",n),i.removeEventListener("error",r),t(i)}function r(e){i.removeEventListener("load",n),i.removeEventListener("error",r),a(e)}i.addEventListener("load",n),i.addEventListener("error",r),i.src=URL.createObjectURL(e)})}async function a(e){return new Promise((t,a)=>{let i=()=>{let a=document.createElement("canvas");a.width=e.width,a.height=e.height,console.log(`LoadImageAsBlob().image.width: ${e.width}, image.height: ${e.height}`),a.getContext("2d").drawImage(e,0,0,a.width,a.height),a.toBlob(e=>{t(e)},"image/png"),e.removeEventListener("load",i),e.removeEventListener("error",n)},n=t=>{a(t),e.removeEventListener("load",i),e.removeEventListener("error",n)};e.complete&&0!==e.naturalHeight?i():(e.addEventListener("load",i),e.addEventListener("error",n))})}for(const t of(window.badgerState=new class{constructor(){this.mainImage=new Image,this.overlayImage=new Image,this._imageOverlayAlpha=.5,this._outlineOverlayAlpha=.5,this._outlineRoundness=0,this._u=0,this._v=0,this._normalizedRadius=0,this._normalizedBorder=0,this._badgeText="1",this._normalizedFontSize=0,this._uTextOffset=0,this._vTextOffset=0,this.dirty=!1}GetImageWH(){return{w:this.mainImage.width,h:this.mainImage.height}}_RedrawEverything(){let t=document.getElementById("canvas");t.width=256,t.height=256,t.style.display="block";let a=t.getContext("2d");a.clearRect(0,0,t.width,t.height),function({canvas:e,ctx:t,img:a,imgSize:i,u:n,v:r,radiusU:d,borderU:o,fontSizeU:l,offsetU:s,offsetV:g}){t.drawImage(a,0,0,i,i),function({x:e,y:t,radius:a,ctx:i}){i.globalCompositeOperation="destination-out",i.beginPath(),i.arc(e,t,a,0,2*Math.PI),i.fill(),i.globalCompositeOperation="source-over"}({x:n*i,y:r*i,radius:(d+o)*i,ctx:t}),function({x:e,y:t,radius:a,color:i,ctx:n}){console.log(`FillCircle().x: ${e}, y: ${t}, radius: ${a}, color: ${i}`),n.fillStyle=i,n.beginPath(),n.arc(e,t,a,0,2*Math.PI),n.fill()}({x:n*i,y:r*i,radius:d*i,color:"red",ctx:t}),t.fillStyle="white",t.font=`700 ${l*i}px "gg sans", "Noto Sans", "Helvetica Neue", Helvetica, Arial, sans-serif`;let u=document.getElementById("badge-text").value,m=t.measureText(u);m.width,m.actualBoundingBoxAscent,m.actualBoundingBoxDescent,t.textAlign="center",t.textBaseline="middle";let w=n*i;w+=s*i;let c=r*i;c+=g*i,t.fillText(u,w,c)}({canvas:t,ctx:a,img:this.mainImage,imgSize:256,u:this.u,v:this.v,fontSizeU:this.normalizedFontSize,offsetU:this.uTextOffset,offsetV:this.vTextOffset,radiusU:this.normalizedRadius,borderU:this.normalizedBorder});let i=document.getElementById("canvas-overlay");i.style.display="block",i.width=256,i.height=256;let n=i.getContext("2d");n.clearRect(0,0,t.width,t.height),function({canvas:e,ctx:t,img:a,imgSize:i,alpha:n}){console.log(`DrawImageOverlay().imgSize: ${i}, alpha: ${n}, img.width: ${a.width}, img.height: ${a.height}`),t.globalAlpha=n,t.drawImage(a,0,0,i,i),t.globalAlpha=1}({canvas:i,ctx:n,img:this.overlayImage,imgSize:256,alpha:this.imageOverlayAlpha}),function({canvas:e,ctx:t,imgSize:a,alpha:i,roundness:n}){let r=document.createElement("canvas");r.width=a,r.height=a;let d=r.getContext("2d");d.fillStyle=`rgba(54, 57, 63, ${i})`,d.fillRect(0,0,a,a),d.globalCompositeOperation="destination-out";let o=a/2*n;1===n?(d.beginPath(),d.arc(a/2,a/2,o,0,2*Math.PI)):(d.beginPath(),d.moveTo(o,0),d.lineTo(a-o,0),d.arc(a-o,o,o,1.5*Math.PI,2*Math.PI),d.lineTo(a,a-o),d.arc(a-o,a-o,o,0,.5*Math.PI),d.lineTo(o,a),d.arc(o,a-o,o,.5*Math.PI,Math.PI),d.lineTo(0,o),d.arc(o,o,o,Math.PI,1.5*Math.PI),d.closePath()),d.fillStyle="rgba(255, 255, 255, 1)",d.fill(),d.globalCompositeOperation="source-over",t.drawImage(r,0,0,a,a)}({canvas:i,ctx:n,imgSize:256,alpha:this.outlineOverlayAlpha,roundness:this.outlineRoundness});let r=document.getElementById("svg");r.style.display="block",r.setAttribute("width",256),r.setAttribute("height",256),e({svg:r}),function({svg:e,svgSize:t,img:a,u:i,v:n,fontSizeU:r,offsetU:d,offsetV:o,radius:l,border:s}){let g=document.createElementNS("http://www.w3.org/2000/svg","mask");g.setAttribute("id","image-mask");let u=document.createElementNS("http://www.w3.org/2000/svg","rect");u.setAttribute("x","0"),u.setAttribute("y","0"),u.setAttribute("width","100%"),u.setAttribute("height","100%"),u.setAttribute("fill","white"),g.appendChild(u);let m=document.createElementNS("http://www.w3.org/2000/svg","circle");m.setAttribute("cx",i*t),m.setAttribute("cy",n*t),m.setAttribute("r",(l+s)*t),m.setAttribute("fill","black"),g.appendChild(m),e.appendChild(g);let w=document.createElementNS("http://www.w3.org/2000/svg","image");w.setAttribute("x","0"),w.setAttribute("y","0"),w.setAttribute("width","100%"),w.setAttribute("height","100%"),w.setAttribute("href",a.src),w.setAttribute("mask","url(#image-mask)"),e.appendChild(w);let c=document.createElementNS("http://www.w3.org/2000/svg","circle");c.setAttribute("cx",i*t),c.setAttribute("cy",n*t),c.setAttribute("r",l*t),c.setAttribute("fill","red"),e.appendChild(c);let h=document.getElementById("badge-text").value,v=n*t+o*t;v+=l/2*t;let b=document.createElementNS("http://www.w3.org/2000/svg","text");b.setAttribute("x",i*t+d*t),b.setAttribute("y",v),b.setAttribute("fill","white"),b.setAttribute("text-anchor","middle"),b.setAttribute("vertical-align","middle"),b.setAttribute("font-size",`${r*t}px`),b.setAttribute("font-weight","700"),b.setAttribute("font-family",'"gg sans", "Noto Sans", "Helvetica Neue", Helvetica, Arial, sans-serif'),b.textContent=h,e.appendChild(b),e.style.display="block"}({svg:r,svgSize:256,img:this.mainImage,u:this.u,v:this.v,fontSizeU:this.normalizedFontSize,offsetU:this.uTextOffset,offsetV:this.vTextOffset,radius:this.normalizedRadius,border:this.normalizedBorder});let d=document.getElementById("svg-overlay");d.style.display="block",e({svg:d}),function({svg:e,img:t,alpha:a}){let i=document.createElementNS("http://www.w3.org/2000/svg","image");i.setAttribute("x","0"),i.setAttribute("y","0"),i.setAttribute("width","100%"),i.setAttribute("height","100%"),i.setAttribute("href",t.src),i.setAttribute("opacity",a),e.appendChild(i)}({svg:d,img:this.overlayImage,alpha:this.imageOverlayAlpha}),function({svg:e,svgSize:t,alpha:a,roundness:i}){let n=document.createElementNS("http://www.w3.org/2000/svg","mask");n.setAttribute("id","outline-overlay-image-mask");let r=document.createElementNS("http://www.w3.org/2000/svg","rect");r.setAttribute("x","0"),r.setAttribute("y","0"),r.setAttribute("width","100%"),r.setAttribute("height","100%"),r.setAttribute("fill","white"),n.appendChild(r);let d=document.createElementNS("http://www.w3.org/2000/svg","rect");d.setAttribute("x","0"),d.setAttribute("y","0"),d.setAttribute("width","100%"),d.setAttribute("height","100%"),d.setAttribute("fill","black"),d.setAttribute("rx",`${i*t/2}px`),d.setAttribute("ry",`${i*t/2}px`),n.appendChild(d),e.appendChild(n);let o=document.createElementNS("http://www.w3.org/2000/svg","rect");o.setAttribute("x","0"),o.setAttribute("y","0"),o.setAttribute("opacity",a),o.setAttribute("width","100%"),o.setAttribute("height","100%"),o.setAttribute("fill","rgba(54, 57, 63)"),o.setAttribute("mask","url(#outline-overlay-image-mask)"),e.appendChild(o)}({svg:d,svgSize:256,alpha:this.outlineOverlayAlpha,roundness:this.outlineRoundness}),console.log(`_RedrawEverything().x: ${this.x}, y: ${this.y}, u: ${this.u}, v: ${this.v}`);let o=this.mainImage;function l(e,t){0===o.width?(document.getElementById(e).value="0",document.getElementById(e).disabled=!0):(document.getElementById(e).value=t,document.getElementById(e).disabled=!1)}document.getElementById("image-overlay-alpha").value=this.imageOverlayAlpha,document.getElementById("outline-overlay-alpha").value=this.outlineOverlayAlpha,document.getElementById("outline-overlay-roundness").value=this.outlineRoundness,l("x",this.x),l("y",this.y),document.getElementById("u").value=this.u,document.getElementById("v").value=this.v,document.getElementById("normalized-radius").value=this.normalizedRadius,document.getElementById("normalized-border").value=this.normalizedBorder,l("pixel-radius",this.pixelRadius),l("pixel-border",this.pixelBorder),document.getElementById("badge-text").value=this.badgeText,document.getElementById("normalized-font-size").value=this.normalizedFontSize,document.getElementById("normalized-offset-u").value=this.uTextOffset,document.getElementById("normalized-offset-v").value=this.vTextOffset,l("pixel-font-size",this.pixelFontSize),l("pixel-offset-x",this.xTextOffset),l("pixel-offset-y",this.yTextOffset),console.log(this)}MarkDirty(){this.dirty||(this.dirty=!0,this.u=1*this.u,this.v=1*this.v,this.normalizedRadius=1*this.normalizedRadius,this.normalizedBorder=1*this.normalizedBorder,setTimeout(()=>{this._RedrawEverything(),this.dirty=!1},0))}set imageOverlayAlpha(e){this._imageOverlayAlpha=e}get imageOverlayAlpha(){return this._imageOverlayAlpha}set outlineOverlayAlpha(e){this._outlineOverlayAlpha=e}get outlineOverlayAlpha(){return this._outlineOverlayAlpha}set outlineRoundness(e){this._outlineRoundness=e}get outlineRoundness(){return this._outlineRoundness}set x(e){this._u=e/this.GetImageWH().w}get x(){return this._u*this.GetImageWH().w}set y(e){this._v=e/this.GetImageWH().h}get y(){return this._v*this.GetImageWH().h}set u(e){this._u=e}get u(){return this._u}set v(e){this._v=e}get v(){return this._v}set pixelRadius(e){this._normalizedRadius=e/this.GetImageWH().w}get pixelRadius(){return this._normalizedRadius*this.GetImageWH().w}set normalizedRadius(e){this._normalizedRadius=e}get normalizedRadius(){return this._normalizedRadius}set pixelBorder(e){this._normalizedBorder=e/this.GetImageWH().w}get pixelBorder(){return this._normalizedBorder*this.GetImageWH().w}set normalizedBorder(e){this._normalizedBorder=e}get normalizedBorder(){return this._normalizedBorder}set badgeText(e){this._badgeText=e}get badgeText(){return this._badgeText}set normalizedFontSize(e){this._normalizedFontSize=e}get normalizedFontSize(){return this._normalizedFontSize}set pixelFontSize(e){this._normalizedFontSize=e/this.GetImageWH().w}get pixelFontSize(){return this._normalizedFontSize*this.GetImageWH().w}set uTextOffset(e){this._uTextOffset=e}get uTextOffset(){return this._uTextOffset}set xTextOffset(e){this._uTextOffset=e/this.GetImageWH().w}get xTextOffset(){return this._uTextOffset*this.GetImageWH().w}set vTextOffset(e){this._vTextOffset=e}get vTextOffset(){return this._vTextOffset}set yTextOffset(e){this._vTextOffset=e/this.GetImageWH().h}get yTextOffset(){return this._vTextOffset*this.GetImageWH().h}},document.getElementById("upload-image").addEventListener("change",function(e){let t=new FileReader;t.onload=function(e){window.badgerState.mainImage=new Image,window.badgerState.mainImage.onload=function(){window.badgerState.MarkDirty()},window.badgerState.mainImage.src=e.target.result},t.readAsDataURL(e.target.files[0])}),document.getElementById("upload-image-overlay").addEventListener("change",function(e){window.badgerState.overlayImage=new Image;let t=new FileReader;t.onload=function(e){window.badgerState.overlayImage=new Image,window.badgerState.overlayImage.onload=function(){window.badgerState.MarkDirty()},window.badgerState.overlayImage.src=e.target.result},t.readAsDataURL(e.target.files[0])}),document.getElementById("download-image").addEventListener("click",function(e){let t=document.getElementById("canvas").toDataURL("image/png").replace("image/png","image/octet-stream"),a=document.createElement("a");a.download="badger-badger-pfp.png",a.href=t,a.click()}),document.getElementById("download-svg").addEventListener("click",function(e){let t=document.getElementById("svg"),a=new XMLSerializer().serializeToString(t),i=new Blob([a],{type:"image/svg+xml"}),n=URL.createObjectURL(i),r=document.createElement("a");r.download="badger-badger-pfp.svg",r.href=n,r.click(),URL.revokeObjectURL(n)}),document.getElementById("download-svg-as-png").addEventListener("click",function(e){let t=document.getElementById("svg"),a=new XMLSerializer().serializeToString(t),i=document.createElement("canvas");i.width=256,i.height=256;let n=i.getContext("2d"),r=new Image;r.onload=function(){n.drawImage(r,0,0,i.width,i.height);let e=i.toDataURL("image/png").replace("image/png","image/octet-stream"),t=document.createElement("a");t.download="badger-badger-pfp-svg.png",t.href=e,t.click()},r.src="data:image/svg+xml;base64,"+btoa(a)}),["input","change"]))document.getElementById("image-overlay-alpha").addEventListener(t,function(e){window.badgerState.imageOverlayAlpha=parseFloat(e.target.value),window.badgerState.MarkDirty()}),document.getElementById("outline-overlay-alpha").addEventListener(t,function(e){window.badgerState.outlineOverlayAlpha=parseFloat(e.target.value),window.badgerState.MarkDirty()}),document.getElementById("outline-overlay-roundness").addEventListener(t,function(e){window.badgerState.outlineRoundness=parseFloat(e.target.value),window.badgerState.MarkDirty()}),document.getElementById("x").addEventListener(t,function(e){window.badgerState.x=parseFloat(e.target.value),window.badgerState.MarkDirty()}),document.getElementById("y").addEventListener(t,function(e){window.badgerState.y=parseFloat(e.target.value),window.badgerState.MarkDirty()}),document.getElementById("u").addEventListener(t,function(e){window.badgerState.u=parseFloat(e.target.value),window.badgerState.MarkDirty()}),document.getElementById("v").addEventListener(t,function(e){window.badgerState.v=parseFloat(e.target.value),window.badgerState.MarkDirty()}),document.getElementById("pixel-radius").addEventListener(t,function(e){window.badgerState.pixelRadius=parseFloat(e.target.value),window.badgerState.MarkDirty()}),document.getElementById("normalized-radius").addEventListener(t,function(e){window.badgerState.normalizedRadius=parseFloat(e.target.value),window.badgerState.MarkDirty()}),document.getElementById("pixel-border").addEventListener(t,function(e){window.badgerState.pixelBorder=parseFloat(e.target.value),window.badgerState.MarkDirty()}),document.getElementById("normalized-border").addEventListener(t,function(e){window.badgerState.normalizedBorder=parseFloat(e.target.value),window.badgerState.MarkDirty()}),document.getElementById("badge-text").addEventListener(t,function(e){window.badgerState.badgeText=e.target.value,window.badgerState.MarkDirty()}),document.getElementById("pixel-font-size").addEventListener(t,function(e){window.badgerState.pixelFontSize=parseFloat(e.target.value),window.badgerState.MarkDirty()}),document.getElementById("normalized-font-size").addEventListener(t,function(e){window.badgerState.normalizedFontSize=parseFloat(e.target.value),window.badgerState.MarkDirty()}),document.getElementById("pixel-offset-x").addEventListener(t,function(e){window.badgerState.xTextOffset=parseFloat(e.target.value),window.badgerState.MarkDirty()}),document.getElementById("normalized-offset-u").addEventListener(t,function(e){window.badgerState.uTextOffset=parseFloat(e.target.value),window.badgerState.MarkDirty()}),document.getElementById("pixel-offset-y").addEventListener(t,function(e){window.badgerState.yTextOffset=parseFloat(e.target.value),window.badgerState.MarkDirty()}),document.getElementById("normalized-offset-v").addEventListener(t,function(e){window.badgerState.vTextOffset=parseFloat(e.target.value),window.badgerState.MarkDirty()});document.getElementById("outline-overlay-roundness-server-default").addEventListener("click",function(e){window.badgerState.outlineRoundness=.66,window.badgerState.MarkDirty()}),document.getElementById("outline-overlay-roundness-user-default").addEventListener("click",function(e){window.badgerState.outlineRoundness=1,window.badgerState.MarkDirty()}),document.getElementById("outline-overlay-roundness-clear").addEventListener("click",function(e){window.badgerState.outlineRoundness=0,window.badgerState.MarkDirty()}),document.getElementById("lower-right").addEventListener("click",function(e){window.badgerState.u=1-21.25/128,window.badgerState.v=1-21/128,window.badgerState.MarkDirty()}),document.getElementById("lower-left").addEventListener("click",function(e){window.badgerState.u=21.25/128,window.badgerState.v=1-21/128,window.badgerState.MarkDirty()}),document.getElementById("upper-left").addEventListener("click",function(e){window.badgerState.u=21.25/128,window.badgerState.v=21/128,window.badgerState.MarkDirty()}),document.getElementById("upper-right").addEventListener("click",function(e){window.badgerState.u=1-21.25/128,window.badgerState.v=21/128,window.badgerState.MarkDirty()}),document.getElementById("lower-right-inner").addEventListener("click",function(e){window.badgerState.u=.5+Math.sqrt(2)/4-window.badgerState.normalizedRadius,window.badgerState.v=.5+Math.sqrt(2)/4-window.badgerState.normalizedRadius,window.badgerState.MarkDirty()}),document.getElementById("lower-left-inner").addEventListener("click",function(e){window.badgerState.u=.5-Math.sqrt(2)/4+window.badgerState.normalizedRadius,window.badgerState.v=.5+Math.sqrt(2)/4-window.badgerState.normalizedRadius,window.badgerState.MarkDirty()}),document.getElementById("upper-left-inner").addEventListener("click",function(e){window.badgerState.u=.5-Math.sqrt(2)/4+window.badgerState.normalizedRadius,window.badgerState.v=.5-Math.sqrt(2)/4+window.badgerState.normalizedRadius,window.badgerState.MarkDirty()}),document.getElementById("upper-right-inner").addEventListener("click",function(e){window.badgerState.u=.5+Math.sqrt(2)/4-window.badgerState.normalizedRadius,window.badgerState.v=.5-Math.sqrt(2)/4+window.badgerState.normalizedRadius,window.badgerState.MarkDirty()}),document.getElementById("default-radius").addEventListener("click",function(e){window.badgerState.normalizedRadius=21/128,window.badgerState.normalizedBorder=.25-21/128,window.badgerState.MarkDirty()}),document.getElementById("default-contents").addEventListener("click",function(e){window.badgerState.normalizedFontSize=30/128,window.badgerState.badgeText="1",window.badgerState.uTextOffset=0,window.badgerState.vTextOffset=0,window.badgerState.MarkDirty()}),document.getElementById("sample-pfp").addEventListener("click",async function(e){let i=await a(document.getElementById("sample-pfp-image"));window.badgerState.mainImage=await t(i),window.badgerState.MarkDirty()}),document.getElementById("clear-pfp").addEventListener("click",async function(e){window.badgerState.mainImage=new Image,window.badgerState.MarkDirty()}),document.getElementById("sample-pfp-overlay").addEventListener("click",async function(e){let i=await a(document.getElementById("sample-pfp-overlay-image"));window.badgerState.overlayImage=await t(i),window.badgerState.MarkDirty()}),document.getElementById("clear-pfp-overlay").addEventListener("click",async function(e){window.badgerState.overlayImage=new Image,window.badgerState.MarkDirty()}),document.getElementById("lower-right").click(),document.getElementById("default-radius").click(),document.getElementById("default-contents").click();
//# sourceMappingURL=index.39bac298.js.map
