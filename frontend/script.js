console.log("Script loaded");
const canvas1 = document.getElementById('canvas1');
const ctx1 = canvas1.getContext('2d');
console.log(canvas1);

canvas1.width = 800;
canvas1.height = 600;

const canvas2 = document.getElementById('canvas2');
const ctx2 = canvas2.getContext('2d');

canvas2.width = 800;
canvas2.height = 300;

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
    colorRect(ctx1, "#b09e99", 0, 40, data1[0] * 50, 100);
    colorText(ctx1, "#fff", "wha-", 0, 180);
    colorRect(ctx1, "#fad4c0", 0, 180, data1[1] * 50, 100);
    colorText(ctx1, "#fff", "whuhhh", 0, 320);
    colorRect(ctx1, "#64b6ac", 0, 320, data1[2] * 50, 100);
    colorText(ctx1, "#fff", "doo wahhhh", 0, 460);
    colorRect(ctx1, "#c0fdfb", 0, 460, data1[3] * 50, 100);
}

updateGraph2 = (data2) => {
    colorText(ctx2, "#fff", "What the dog doin?", 0, 40);
    colorRect(ctx2, "#b09e99", 0, 40, data2[0] * 50, 100);
    colorText(ctx2, "#fff", "How the dog doin?", 0, 180);
    colorRect(ctx2, "#fad4c0", 0, 180, data2[1] * 50, 100);
}

updateGraph3 = (data3) => {
    colorText(ctx3, "#fff", "Yes", 0, 40);
    colorRect(ctx3, "#b09e99", 0, 40, data3[0] * 50, 100);
    colorText(ctx3, "#fff", "No", 0, 180);
    colorRect(ctx3, "#fad4c0", 0, 180, data3[1] * 50, 100);
    colorText(ctx3, "#fff", "*liard sounds*", 0, 320);
    colorRect(ctx3, "#64b6ac", 0, 320, data3[2] * 50, 100);
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