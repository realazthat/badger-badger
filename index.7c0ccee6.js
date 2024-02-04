// For semistandard.
/* global FileReader */ /* global Image */ function ClearCircle({ x, y, radius, ctx }) {
    // ctx.fillStyle = 'rgba(0, 0, 0, 0)';
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
}
function FillCircle({ x, y, radius, color, ctx }) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
}
document.getElementById("uploadImageOverlay").addEventListener("change", function(e) {
    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.getElementById("canvas-overlay");
            const ctx /*: CanvasRenderingContext2D */  = canvas.getContext("2d");
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.globalAlpha = 0.5;
            ctx.drawImage(img, 0, 0);
            canvas.style.display = "block";
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
});
function DrawImage({ canvas, img }) {
    const ctx /*: CanvasRenderingContext2D */  = canvas.getContext("2d");
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    const imageSize = img.width;
    const UVToImgSpace = ({ u, v })=>({
            x: u * imageSize,
            y: v * imageSize
        });
    const UToImgSpace = ({ u })=>u * imageSize;
    const circleCenterUV = {
        u: 1 - 21.25 / 128,
        v: 1 - 21 / 128
    };
    const circleCenterXY = UVToImgSpace(circleCenterUV);
    const lilCircleRadiusU = 21 / 128;
    const bigCircleRadiusU = 0.25;
    const lilCircleRadiusX = UToImgSpace({
        u: lilCircleRadiusU
    });
    const bigCircleRadiusX = UToImgSpace({
        u: bigCircleRadiusU
    });
    console.log("circleCenterXY:", circleCenterXY);
    console.log("lilCircleRadiusX:", lilCircleRadiusX);
    console.log("bigCircleRadiusX:", bigCircleRadiusX);
    ClearCircle({
        x: circleCenterXY.x,
        y: circleCenterXY.y,
        radius: bigCircleRadiusX,
        ctx
    });
    FillCircle({
        x: circleCenterXY.x,
        y: circleCenterXY.y,
        radius: lilCircleRadiusX,
        color: "red",
        ctx
    });
    // Add number to the badge,
    const textSizePX = Math.round(30 / 128 * imageSize);
    ctx.fillStyle = "white";
    // ctx.font = `${textSizePX}px Arial`;
    ctx.font = `700 ${textSizePX}px "gg sans", "Noto Sans", "Helvetica Neue", Helvetica, Arial, sans-serif`;
    ctx.fillText("1", circleCenterXY.x - textSizePX / 3, circleCenterXY.y + textSizePX / 3);
    canvas.style.display = "block";
}
document.getElementById("uploadImage").addEventListener("change", function(e) {
    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.getElementById("canvas");
            DrawImage({
                canvas,
                img
            });
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
});
document.getElementById("downloadImage").addEventListener("click", function(e) {
    const canvas = document.getElementById("canvas");
    const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    const link = document.createElement("a");
    link.download = "discord-pfp.png";
    link.href = image;
    link.click();
});

//# sourceMappingURL=index.7c0ccee6.js.map
