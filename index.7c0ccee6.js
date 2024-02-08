// For semistandard.
/* global FileReader */ /* global Image */ /* global Blob */ /* global URL */ /* global XMLSerializer */ function ClearCircle({ x, y, radius, ctx }) {
    // ctx.fillStyle = 'rgba(0, 0, 0, 0)';
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
}
function FillCircle({ x, y, radius, color, ctx }) {
    console.log(`FillCircle().x: ${x}, y: ${y}, radius: ${radius}, color: ${color}`);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
}
function DrawImage({ canvas, ctx, img, imgSize, u, v, radiusU, borderU, fontSizeU, offsetU, offsetV }) {
    ctx.drawImage(img, 0, 0, imgSize, imgSize);
    ClearCircle({
        x: u * imgSize,
        y: v * imgSize,
        radius: (radiusU + borderU) * imgSize,
        ctx
    });
    FillCircle({
        x: u * imgSize,
        y: v * imgSize,
        radius: radiusU * imgSize,
        color: "red",
        ctx
    });
    // Add number to the badge,
    const textSizePX = fontSizeU * imgSize;
    ctx.fillStyle = "white";
    ctx.font = `700 ${textSizePX}px "gg sans", "Noto Sans", "Helvetica Neue", Helvetica, Arial, sans-serif`;
    const text = document.getElementById("badge-text").value;
    const metrics = ctx.measureText(text);
    const textWidth = metrics.width;
    const textHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    const method = "centering";
    if (method === "centering") {
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
    }
    let centerX = u * imgSize;
    centerX += offsetU * imgSize;
    let centerY = v * imgSize;
    centerY += offsetV * imgSize;
    if (method === "metrics") {
        centerX -= textWidth / 2;
        centerY += textHeight / 2;
    }
    ctx.fillText(text, centerX, centerY);
}
function DrawImageOverlay({ canvas, ctx, img, imgSize, alpha }) {
    console.log(`DrawImageOverlay().imgSize: ${imgSize}, alpha: ${alpha}, img.width: ${img.width}, img.height: ${img.height}`);
    ctx.globalAlpha = alpha;
    ctx.drawImage(img, 0, 0, imgSize, imgSize);
    ctx.globalAlpha = 1;
}
function DrawOutlineOverlay({ canvas, ctx, imgSize, alpha, roundness }) {
    const offScreenCanvas = document.createElement("canvas");
    offScreenCanvas.width = imgSize;
    offScreenCanvas.height = imgSize;
    const offCtx = offScreenCanvas.getContext("2d");
    // Fill the background with semitransparent color
    offCtx.fillStyle = `rgba(54, 57, 63, ${alpha})`;
    offCtx.fillRect(0, 0, imgSize, imgSize);
    // Set composite operation for transparent cut-out
    offCtx.globalCompositeOperation = "destination-out";
    // Calculate radius for rounded corners
    const radius = imgSize / 2 * roundness;
    const fullCircle = roundness === 1;
    if (!fullCircle) {
        // Draw path for rounded rectangle
        offCtx.beginPath();
        offCtx.moveTo(radius, 0);
        offCtx.lineTo(imgSize - radius, 0);
        offCtx.arc(imgSize - radius, radius, radius, 1.5 * Math.PI, 2 * Math.PI);
        offCtx.lineTo(imgSize, imgSize - radius);
        offCtx.arc(imgSize - radius, imgSize - radius, radius, 0, 0.5 * Math.PI);
        offCtx.lineTo(radius, imgSize);
        offCtx.arc(radius, imgSize - radius, radius, 0.5 * Math.PI, Math.PI);
        offCtx.lineTo(0, radius);
        offCtx.arc(radius, radius, radius, Math.PI, 1.5 * Math.PI);
        offCtx.closePath();
    } else {
        // Draw a circle for roundness = 1
        offCtx.beginPath();
        offCtx.arc(imgSize / 2, imgSize / 2, radius, 0, 2 * Math.PI);
    }
    offCtx.fillStyle = "rgba(255, 255, 255, 1)";
    offCtx.fill();
    // Reset composite operation to default
    offCtx.globalCompositeOperation = "source-over";
    ctx.drawImage(offScreenCanvas, 0, 0, imgSize, imgSize);
}
function SVGDrawImage({ svg/*: SVGElement */ , svgSize, img/*: Image */ , u, v, fontSizeU, offsetU, offsetV, radius, border }) {
    // Create mask:
    const mask = document.createElementNS("http://www.w3.org/2000/svg", "mask");
    mask.setAttribute("id", "image-mask");
    // Mask's full-opacity rectangle:
    const maskRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    maskRect.setAttribute("x", "0");
    maskRect.setAttribute("y", "0");
    maskRect.setAttribute("width", "100%");
    maskRect.setAttribute("height", "100%");
    maskRect.setAttribute("fill", "white");
    mask.appendChild(maskRect);
    // Mask's transparent circle:
    const maskCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    maskCircle.setAttribute("cx", u * svgSize);
    maskCircle.setAttribute("cy", v * svgSize);
    maskCircle.setAttribute("r", (radius + border) * svgSize);
    maskCircle.setAttribute("fill", "black");
    mask.appendChild(maskCircle);
    svg.appendChild(mask);
    // Draw the image with mask applied:
    const image = document.createElementNS("http://www.w3.org/2000/svg", "image");
    image.setAttribute("x", "0");
    image.setAttribute("y", "0");
    image.setAttribute("width", "100%");
    image.setAttribute("height", "100%");
    image.setAttribute("href", img.src);
    image.setAttribute("mask", "url(#image-mask)");
    svg.appendChild(image);
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", u * svgSize);
    circle.setAttribute("cy", v * svgSize);
    circle.setAttribute("r", radius * svgSize);
    // Set color
    circle.setAttribute("fill", "red");
    svg.appendChild(circle);
    // Add number to the badge,
    const text = document.getElementById("badge-text").value;
    const textSizePX = fontSizeU * svgSize;
    const textX = u * svgSize + offsetU * svgSize;
    let textY = v * svgSize + offsetV * svgSize;
    textY += radius / 2 * svgSize;
    const textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
    textElement.setAttribute("x", textX);
    textElement.setAttribute("y", textY);
    textElement.setAttribute("fill", "white");
    textElement.setAttribute("text-anchor", "middle");
    // textElement.setAttribute('dominant-baseline', 'middle');
    // textElement.setAttribute('alignment-baseline', 'middle');
    // textElement.setAttribute('alignment-baseline', 'central');
    // textElement.setAttribute('alignment-baseline', 'mathematical ');
    textElement.setAttribute("vertical-align", "middle");
    textElement.setAttribute("font-size", `${textSizePX}px`);
    textElement.setAttribute("font-weight", "700");
    textElement.setAttribute("font-family", '"gg sans", "Noto Sans", "Helvetica Neue", Helvetica, Arial, sans-serif');
    textElement.textContent = text;
    svg.appendChild(textElement);
    svg.style.display = "block";
}
function ClearSVG({ svg }) {
    while(svg.firstChild)svg.removeChild(svg.firstChild);
}
function SVGDrawImageOverlay({ svg, img, alpha }) {
    const image = document.createElementNS("http://www.w3.org/2000/svg", "image");
    image.setAttribute("x", "0");
    image.setAttribute("y", "0");
    image.setAttribute("width", "100%");
    image.setAttribute("height", "100%");
    image.setAttribute("href", img.src);
    image.setAttribute("opacity", alpha);
    svg.appendChild(image);
}
function SVGDrawOutlineOverlay({ svg, svgSize, alpha, roundness }) {
    const mask = document.createElementNS("http://www.w3.org/2000/svg", "mask");
    mask.setAttribute("id", "outline-overlay-image-mask");
    // Mask's full-opacity rectangle:
    const visibleRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    visibleRect.setAttribute("x", "0");
    visibleRect.setAttribute("y", "0");
    visibleRect.setAttribute("width", "100%");
    visibleRect.setAttribute("height", "100%");
    visibleRect.setAttribute("fill", "white");
    mask.appendChild(visibleRect);
    const transparentRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    transparentRect.setAttribute("x", "0");
    transparentRect.setAttribute("y", "0");
    transparentRect.setAttribute("width", "100%");
    transparentRect.setAttribute("height", "100%");
    transparentRect.setAttribute("fill", "black");
    // Add corner radius
    transparentRect.setAttribute("rx", `${roundness * svgSize / 2}px`);
    transparentRect.setAttribute("ry", `${roundness * svgSize / 2}px`);
    mask.appendChild(transparentRect);
    svg.appendChild(mask);
    // Draw a rect with the mask applied
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", "0");
    rect.setAttribute("y", "0");
    rect.setAttribute("opacity", alpha);
    rect.setAttribute("width", "100%");
    rect.setAttribute("height", "100%");
    rect.setAttribute("fill", "rgba(54, 57, 63)");
    rect.setAttribute("mask", "url(#outline-overlay-image-mask)");
    svg.appendChild(rect);
}
class State {
    constructor(){
        this.mainImage = new Image();
        this.overlayImage = new Image();
        this._imageOverlayAlpha = 0.5;
        this._outlineOverlayAlpha = 0.5;
        this._outlineRoundness = 0;
        this._u = 0;
        this._v = 0;
        this._normalizedRadius = 0;
        this._normalizedBorder = 0;
        this._badgeText = "1";
        this._normalizedFontSize = 0;
        this._uTextOffset = 0;
        this._vTextOffset = 0;
        this.dirty = false;
    }
    GetImageWH() {
        return {
            w: this.mainImage.width,
            h: this.mainImage.height
        };
    }
    _RedrawEverything() {
        const canvas = document.getElementById("canvas");
        canvas.width = 256;
        canvas.height = 256;
        canvas.style.display = "block";
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        DrawImage({
            canvas,
            ctx,
            img: this.mainImage,
            imgSize: 256,
            u: this.u,
            v: this.v,
            fontSizeU: this.normalizedFontSize,
            offsetU: this.uTextOffset,
            offsetV: this.vTextOffset,
            radiusU: this.normalizedRadius,
            borderU: this.normalizedBorder
        });
        const canvasOverlay = document.getElementById("canvas-overlay");
        canvasOverlay.style.display = "block";
        canvasOverlay.width = 256;
        canvasOverlay.height = 256;
        const ctxOverlay = canvasOverlay.getContext("2d");
        ctxOverlay.clearRect(0, 0, canvas.width, canvas.height);
        DrawImageOverlay({
            canvas: canvasOverlay,
            ctx: ctxOverlay,
            img: this.overlayImage,
            imgSize: 256,
            alpha: this.imageOverlayAlpha
        });
        DrawOutlineOverlay({
            canvas: canvasOverlay,
            ctx: ctxOverlay,
            imgSize: 256,
            alpha: this.outlineOverlayAlpha,
            roundness: this.outlineRoundness
        });
        const svg = document.getElementById("svg");
        svg.style.display = "block";
        svg.setAttribute("width", 256);
        svg.setAttribute("height", 256);
        ClearSVG({
            svg
        });
        SVGDrawImage({
            svg,
            svgSize: 256,
            img: this.mainImage,
            u: this.u,
            v: this.v,
            fontSizeU: this.normalizedFontSize,
            offsetU: this.uTextOffset,
            offsetV: this.vTextOffset,
            radius: this.normalizedRadius,
            border: this.normalizedBorder
        });
        const svgOverlay = document.getElementById("svg-overlay");
        svgOverlay.style.display = "block";
        ClearSVG({
            svg: svgOverlay
        });
        SVGDrawImageOverlay({
            svg: svgOverlay,
            img: this.overlayImage,
            alpha: this.imageOverlayAlpha
        });
        SVGDrawOutlineOverlay({
            svg: svgOverlay,
            svgSize: 256,
            alpha: this.outlineOverlayAlpha,
            roundness: this.outlineRoundness
        });
        console.log(`_RedrawEverything().x: ${this.x}, y: ${this.y}, u: ${this.u}, v: ${this.v}`);
        const mainImage = this.mainImage;
        function SetOrDisable(id, value) {
            if (mainImage.width === 0) {
                document.getElementById(id).value = "0";
                document.getElementById(id).disabled = true;
            } else {
                document.getElementById(id).value = value;
                document.getElementById(id).disabled = false;
            }
        }
        document.getElementById("image-overlay-alpha").value = this.imageOverlayAlpha;
        document.getElementById("outline-overlay-alpha").value = this.outlineOverlayAlpha;
        document.getElementById("outline-overlay-roundness").value = this.outlineRoundness;
        SetOrDisable("x", this.x);
        SetOrDisable("y", this.y);
        document.getElementById("u").value = this.u;
        document.getElementById("v").value = this.v;
        document.getElementById("normalized-radius").value = this.normalizedRadius;
        document.getElementById("normalized-border").value = this.normalizedBorder;
        SetOrDisable("pixel-radius", this.pixelRadius);
        SetOrDisable("pixel-border", this.pixelBorder);
        document.getElementById("badge-text").value = this.badgeText;
        document.getElementById("normalized-font-size").value = this.normalizedFontSize;
        document.getElementById("normalized-offset-u").value = this.uTextOffset;
        document.getElementById("normalized-offset-v").value = this.vTextOffset;
        SetOrDisable("pixel-font-size", this.pixelFontSize);
        SetOrDisable("pixel-offset-x", this.xTextOffset);
        SetOrDisable("pixel-offset-y", this.yTextOffset);
        console.log(this);
    }
    MarkDirty() {
        if (this.dirty) return;
        this.dirty = true;
        // Since the image size might have changed, recompute all the computed values that depends on the image size.
        this.u = 1.0 * this.u;
        this.v = 1.0 * this.v;
        this.normalizedRadius = 1.0 * this.normalizedRadius;
        this.normalizedBorder = 1.0 * this.normalizedBorder;
        setTimeout(()=>{
            this._RedrawEverything();
            this.dirty = false;
        }, 0);
    }
    set imageOverlayAlpha(value) {
        this._imageOverlayAlpha = value;
    }
    get imageOverlayAlpha() {
        return this._imageOverlayAlpha;
    }
    set outlineOverlayAlpha(value) {
        this._outlineOverlayAlpha = value;
    }
    get outlineOverlayAlpha() {
        return this._outlineOverlayAlpha;
    }
    set outlineRoundness(value) {
        this._outlineRoundness = value;
    }
    get outlineRoundness() {
        return this._outlineRoundness;
    }
    set x(value) {
        this._u = value / this.GetImageWH().w;
    }
    get x() {
        return this._u * this.GetImageWH().w;
    }
    set y(value) {
        this._v = value / this.GetImageWH().h;
    }
    get y() {
        return this._v * this.GetImageWH().h;
    }
    set u(value) {
        this._u = value;
    }
    get u() {
        return this._u;
    }
    set v(value) {
        this._v = value;
    }
    get v() {
        return this._v;
    }
    set pixelRadius(value) {
        this._normalizedRadius = value / this.GetImageWH().w;
    }
    get pixelRadius() {
        return this._normalizedRadius * this.GetImageWH().w;
    }
    set normalizedRadius(value) {
        this._normalizedRadius = value;
    }
    get normalizedRadius() {
        return this._normalizedRadius;
    }
    set pixelBorder(value) {
        this._normalizedBorder = value / this.GetImageWH().w;
    }
    get pixelBorder() {
        return this._normalizedBorder * this.GetImageWH().w;
    }
    set normalizedBorder(value) {
        this._normalizedBorder = value;
    }
    get normalizedBorder() {
        return this._normalizedBorder;
    }
    set badgeText(value) {
        this._badgeText = value;
    }
    get badgeText() {
        return this._badgeText;
    }
    set normalizedFontSize(value) {
        this._normalizedFontSize = value;
    }
    get normalizedFontSize() {
        return this._normalizedFontSize;
    }
    set pixelFontSize(value) {
        this._normalizedFontSize = value / this.GetImageWH().w;
    }
    get pixelFontSize() {
        return this._normalizedFontSize * this.GetImageWH().w;
    }
    set uTextOffset(value) {
        this._uTextOffset = value;
    }
    get uTextOffset() {
        return this._uTextOffset;
    }
    set xTextOffset(value) {
        this._uTextOffset = value / this.GetImageWH().w;
    }
    get xTextOffset() {
        return this._uTextOffset * this.GetImageWH().w;
    }
    set vTextOffset(value) {
        this._vTextOffset = value;
    }
    get vTextOffset() {
        return this._vTextOffset;
    }
    set yTextOffset(value) {
        this._vTextOffset = value / this.GetImageWH().h;
    }
    get yTextOffset() {
        return this._vTextOffset * this.GetImageWH().h;
    }
}
async function LoadBlobAsImage(blob) {
    return new Promise((resolve, reject)=>{
        const img = new Image();
        function handleLoad() {
            img.removeEventListener("load", handleLoad);
            img.removeEventListener("error", handleError);
            resolve(img);
        }
        function handleError(error) {
            img.removeEventListener("load", handleLoad);
            img.removeEventListener("error", handleError);
            reject(error);
        }
        img.addEventListener("load", handleLoad);
        img.addEventListener("error", handleError);
        img.src = URL.createObjectURL(blob);
    });
}
async function LoadImageAsBlob(image /* Image */ ) {
    console.log(`LoadImageAsBlob().image: ${image}, image.width: ${image.width}, image.height: ${image.height}`);
    console.log(`image instanceof Image: ${image instanceof Image}`);
    return new Promise((resolve, reject)=>{
        // Define the processImage function to be used in the load event listener
        const processImage = ()=>{
            const canvas = document.createElement("canvas");
            canvas.width = image.width;
            canvas.height = image.height;
            console.log(`LoadImageAsBlob().processImage().image.width: ${image.width}, image.height: ${image.height}`);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            canvas.toBlob((blob)=>{
                resolve(blob);
            }, "image/png");
            // Clean up: Remove the event listener after processing the image
            image.removeEventListener("load", processImage);
            image.removeEventListener("error", handleError);
        };
        // Define the handleError function to be used in the error event listener
        const handleError = (error)=>{
            reject(error);
            // Clean up: Remove the event listener if there's an error
            image.removeEventListener("load", processImage);
            image.removeEventListener("error", handleError);
        };
        if (image.complete && image.naturalHeight !== 0) // If the image is already loaded, process it immediately
        processImage();
        else {
            // If the image is not yet loaded, wait for it to load
            image.addEventListener("load", processImage);
            image.addEventListener("error", handleError);
        }
    });
}
/// /////////////////////////////////////////////////////////////////////////////
window.badgerState = new State();
/// /////////////////////////////////////////////////////////////////////////////
document.getElementById("upload-image").addEventListener("change", function(e) {
    const reader = new FileReader();
    reader.onload = function(event) {
        window.badgerState.mainImage = new Image();
        window.badgerState.mainImage.onload = function() {
            window.badgerState.MarkDirty();
        };
        window.badgerState.mainImage.src = event.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
});
document.getElementById("upload-image-overlay").addEventListener("change", function(e) {
    window.badgerState.overlayImage = new Image();
    const reader = new FileReader();
    reader.onload = function(event) {
        window.badgerState.overlayImage = new Image();
        window.badgerState.overlayImage.onload = function() {
            window.badgerState.MarkDirty();
        };
        window.badgerState.overlayImage.src = event.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
});
document.getElementById("download-image").addEventListener("click", function(e) {
    const canvas = document.getElementById("canvas");
    const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    const link = document.createElement("a");
    link.download = "badger-badger-pfp.png";
    link.href = image;
    link.click();
});
document.getElementById("download-svg").addEventListener("click", function(e) {
    const svg = document.getElementById("svg");
    const svgData = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([
        svgData
    ], {
        type: "image/svg+xml"
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "badger-badger-pfp.svg";
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
});
document.getElementById("download-svg-as-png").addEventListener("click", function(e) {
    const svg = document.getElementById("svg");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = function() {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        const link = document.createElement("a");
        link.download = "badger-badger-pfp-svg.png";
        link.href = image;
        link.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
});
/// /////////////////////////////////////////////////////////////////////////////
for (const eventName of [
    "input",
    "change"
]){
    document.getElementById("image-overlay-alpha").addEventListener(eventName, function(e) {
        window.badgerState.imageOverlayAlpha = parseFloat(e.target.value);
        window.badgerState.MarkDirty();
    });
    document.getElementById("outline-overlay-alpha").addEventListener(eventName, function(e) {
        window.badgerState.outlineOverlayAlpha = parseFloat(e.target.value);
        window.badgerState.MarkDirty();
    });
    document.getElementById("outline-overlay-roundness").addEventListener(eventName, function(e) {
        window.badgerState.outlineRoundness = parseFloat(e.target.value);
        window.badgerState.MarkDirty();
    });
    document.getElementById("x").addEventListener(eventName, function(e) {
        window.badgerState.x = parseFloat(e.target.value);
        window.badgerState.MarkDirty();
    });
    document.getElementById("y").addEventListener(eventName, function(e) {
        window.badgerState.y = parseFloat(e.target.value);
        window.badgerState.MarkDirty();
    });
    document.getElementById("u").addEventListener(eventName, function(e) {
        window.badgerState.u = parseFloat(e.target.value);
        window.badgerState.MarkDirty();
    });
    document.getElementById("v").addEventListener(eventName, function(e) {
        window.badgerState.v = parseFloat(e.target.value);
        window.badgerState.MarkDirty();
    });
    document.getElementById("pixel-radius").addEventListener(eventName, function(e) {
        window.badgerState.pixelRadius = parseFloat(e.target.value);
        window.badgerState.MarkDirty();
    });
    document.getElementById("normalized-radius").addEventListener(eventName, function(e) {
        window.badgerState.normalizedRadius = parseFloat(e.target.value);
        window.badgerState.MarkDirty();
    });
    document.getElementById("pixel-border").addEventListener(eventName, function(e) {
        window.badgerState.pixelBorder = parseFloat(e.target.value);
        window.badgerState.MarkDirty();
    });
    document.getElementById("normalized-border").addEventListener(eventName, function(e) {
        window.badgerState.normalizedBorder = parseFloat(e.target.value);
        window.badgerState.MarkDirty();
    });
    document.getElementById("badge-text").addEventListener(eventName, function(e) {
        window.badgerState.badgeText = e.target.value;
        window.badgerState.MarkDirty();
    });
    document.getElementById("pixel-font-size").addEventListener(eventName, function(e) {
        window.badgerState.pixelFontSize = parseFloat(e.target.value);
        window.badgerState.MarkDirty();
    });
    document.getElementById("normalized-font-size").addEventListener(eventName, function(e) {
        window.badgerState.normalizedFontSize = parseFloat(e.target.value);
        window.badgerState.MarkDirty();
    });
    document.getElementById("pixel-offset-x").addEventListener(eventName, function(e) {
        window.badgerState.xTextOffset = parseFloat(e.target.value);
        window.badgerState.MarkDirty();
    });
    document.getElementById("normalized-offset-u").addEventListener(eventName, function(e) {
        window.badgerState.uTextOffset = parseFloat(e.target.value);
        window.badgerState.MarkDirty();
    });
    document.getElementById("pixel-offset-y").addEventListener(eventName, function(e) {
        window.badgerState.yTextOffset = parseFloat(e.target.value);
        window.badgerState.MarkDirty();
    });
    document.getElementById("normalized-offset-v").addEventListener(eventName, function(e) {
        window.badgerState.vTextOffset = parseFloat(e.target.value);
        window.badgerState.MarkDirty();
    });
}
/// /////////////////////////////////////////////////////////////////////////////
document.getElementById("outline-overlay-roundness-server-default").addEventListener("click", function(e) {
    window.badgerState.outlineRoundness = 0.66;
    window.badgerState.MarkDirty();
});
document.getElementById("outline-overlay-roundness-user-default").addEventListener("click", function(e) {
    window.badgerState.outlineRoundness = 1;
    window.badgerState.MarkDirty();
});
document.getElementById("outline-overlay-roundness-clear").addEventListener("click", function(e) {
    window.badgerState.outlineRoundness = 0;
    window.badgerState.MarkDirty();
});
document.getElementById("lower-right").addEventListener("click", function(e) {
    window.badgerState.u = 1 - 21.25 / 128;
    window.badgerState.v = 1 - 21 / 128;
    window.badgerState.MarkDirty();
});
document.getElementById("lower-left").addEventListener("click", function(e) {
    window.badgerState.u = 21.25 / 128;
    window.badgerState.v = 1 - 21 / 128;
    window.badgerState.MarkDirty();
});
document.getElementById("upper-left").addEventListener("click", function(e) {
    window.badgerState.u = 21.25 / 128;
    window.badgerState.v = 21 / 128;
    window.badgerState.MarkDirty();
});
document.getElementById("upper-right").addEventListener("click", function(e) {
    window.badgerState.u = 1 - 21.25 / 128;
    window.badgerState.v = 21 / 128;
    window.badgerState.MarkDirty();
});
document.getElementById("lower-right-inner").addEventListener("click", function(e) {
    window.badgerState.u = 0.5 + Math.sqrt(2) / 4 - window.badgerState.normalizedRadius;
    window.badgerState.v = 0.5 + Math.sqrt(2) / 4 - window.badgerState.normalizedRadius;
    window.badgerState.MarkDirty();
});
document.getElementById("lower-left-inner").addEventListener("click", function(e) {
    window.badgerState.u = 0.5 - Math.sqrt(2) / 4 + window.badgerState.normalizedRadius;
    window.badgerState.v = 0.5 + Math.sqrt(2) / 4 - window.badgerState.normalizedRadius;
    window.badgerState.MarkDirty();
});
document.getElementById("upper-left-inner").addEventListener("click", function(e) {
    window.badgerState.u = 0.5 - Math.sqrt(2) / 4 + window.badgerState.normalizedRadius;
    window.badgerState.v = 0.5 - Math.sqrt(2) / 4 + window.badgerState.normalizedRadius;
    window.badgerState.MarkDirty();
});
document.getElementById("upper-right-inner").addEventListener("click", function(e) {
    window.badgerState.u = 0.5 + Math.sqrt(2) / 4 - window.badgerState.normalizedRadius;
    window.badgerState.v = 0.5 - Math.sqrt(2) / 4 + window.badgerState.normalizedRadius;
    window.badgerState.MarkDirty();
});
document.getElementById("default-radius").addEventListener("click", function(e) {
    window.badgerState.normalizedRadius = 21 / 128;
    window.badgerState.normalizedBorder = 0.25 - 21 / 128;
    window.badgerState.MarkDirty();
});
document.getElementById("default-contents").addEventListener("click", function(e) {
    window.badgerState.normalizedFontSize = 30 / 128;
    window.badgerState.badgeText = "1";
    window.badgerState.uTextOffset = 0;
    window.badgerState.vTextOffset = 0;
    window.badgerState.MarkDirty();
});
document.getElementById("sample-pfp").addEventListener("click", async function(e) {
    console.log("sample-pfp.click");
    const imageElement = document.getElementById("sample-pfp-image");
    console.log(`imageElement: ${imageElement}`);
    const blob = await LoadImageAsBlob(imageElement);
    console.log(`blob instanceof Blob: ${blob instanceof Blob}`);
    window.badgerState.mainImage = await LoadBlobAsImage(blob);
    window.badgerState.MarkDirty();
});
document.getElementById("clear-pfp").addEventListener("click", async function(e) {
    window.badgerState.mainImage = new Image();
    window.badgerState.MarkDirty();
});
document.getElementById("sample-pfp-overlay").addEventListener("click", async function(e) {
    const blob = await LoadImageAsBlob(document.getElementById("sample-pfp-overlay-image"));
    window.badgerState.overlayImage = await LoadBlobAsImage(blob);
    window.badgerState.MarkDirty();
});
document.getElementById("clear-pfp-overlay").addEventListener("click", async function(e) {
    window.badgerState.overlayImage = new Image();
    window.badgerState.MarkDirty();
});
/// /////////////////////////////////////////////////////////////////////////////
document.getElementById("lower-right").click();
document.getElementById("default-radius").click();
document.getElementById("default-contents").click();

//# sourceMappingURL=index.7c0ccee6.js.map
