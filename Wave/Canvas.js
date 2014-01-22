
function Canvas(id) {
    this.id = id;
    this.canvas = document.getElementById(id);
    this.context = canvas.getContext("2d");
    this.SetCanvasSize(200, 100);
}

Canvas.prototype.GetCanvasWidth = function () { return this.canvas.width; }
Canvas.prototype.GetCanvasHeight = function () { return this.canvas.height; }

Canvas.prototype.SetCanvasSize = function (witdh, height) {
    this.canvas.width = witdh;
    this.canvas.height = height;
}

Canvas.prototype.Clear = function () {
    this.context.clearRect(0, 0, this.GetCanvasWidth(), this.GetCanvasHeight());   
}

Canvas.prototype.FillRect = function (color) {
    this.FillRect2(0, 0, this.GetCanvasWidth(), this.GetCanvasHeight(), color);
}

Canvas.prototype.FillRect2 = function (sx, sy, ex, ey, color) {
    this.context.fillStyle = color;
    this.context.beginPath();
    this.context.fillRect(sx, sy, (ex - sx), (ey - sy));
    this.context.closePath();
}

Canvas.prototype.Line = function (sx, sy, ex, ey, color, line) {
    this.context.beginPath();
    if (this.context.setLineDash !== undefined) this.context.setLineDash([0, 0]);
    else if (this.context.mozDash !== undefined) this.context.mozDash = [0, 0];
    this.context.strokeStyle = color;
    this.context.lineWidth = line;
    this.context.moveTo(sx, sy);
    this.context.lineTo(ex, ey);
    this.context.closePath();
    this.context.stroke();
}

Canvas.prototype.LineDash = function (sx, sy, ex, ey, color, line) {
    this.context.beginPath();
    if (this.context.setLineDash !== undefined) this.context.setLineDash([5, 4]);
    else if (this.context.mozDash !== undefined) this.context.mozDash = [10, 5];
    this.context.strokeStyle = color;
    this.context.lineWidth = line;
    this.context.moveTo(sx, sy);
    this.context.lineTo(ex, ey);
    this.context.closePath();
    this.context.stroke();
}

Canvas.prototype.Prot = function (sx, sy, r, color) {
    this.context.beginPath();
    this.context.fillStyle = color;
    this.context.arc(sx, sy, r, 0, 360, false);
    this.context.fill();
}