console.log("Script loaded");
const canvas1 = document.getElementById('canvas1');
const ctx1 = canvas1.getContext('2d');
console.log(canvas1);

canvas1.width = 800;
canvas1.height = 600;

const canvas2 = document.getElementById('canvas2');
const ctx2 = canvas2.getContext('2d');

canvas2.width = 800;
canvas2.height = 600;

const canvas3 = document.getElementById('canvas3');
const ctx3 = canvas3.getContext('2d');

canvas3.width = 800;
canvas3.height = 600;

updateGraphs = () => {
    fetch("http://localhost:3000/api")
    .then(response => response.json())
    .then(data => {
        updateGraph1(data[0]);
        updateGraph2(data[1]);
        updateGraph3(data[2]);
    });
}

updateGraph1 = (data1) => {
    colorText(ctx1, "#fff", "uh", 0, 40);
    colorRect(ctx1, "#0f0", 0, 40, data1[0] * 50, 100);
    colorText(ctx1, "#fff", "wha-", 0, 180);
    colorRect(ctx1, "#f00", 0, 180, data1[1] * 50, 100);
    colorText(ctx1, "#fff", "whuhhh", 0, 320);
    colorRect(ctx1, "#00f", 0, 320, data1[2] * 50, 100);
    colorText(ctx1, "#fff", "doo wahhhh", 0, 460);
    colorRect(ctx1, "#ff0", 0, 460, data1[3] * 50, 100);
}

updateGraph2 = (data2) => {
    
}

updateGraph3 = (data3) => {
    
}

colorRect = (ctx, color, x, y, width, height) => {
    ctx.fillStyle = color;
    ctx.fillRect(x,y,width,height);
}

colorText = (ctx, color, message, x, y) => {
    ctx.font = "24px serif";
    ctx.fillStyle = color;
    ctx.fillText(message, x, y);
}

updateGraphs();
setInterval(updateGraphs, 5000);