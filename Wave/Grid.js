function Grid(id) {
    this.canvas = new Canvas(id);
    this.span = new Span(40, 40);
}
// Initial

// Set
Grid.prototype.SetSize = function (width, height) {
    this.canvas.SetCanvasSize(width, height);
    
    this.SetGridSpan(new Span(width / 10, height / 10));    // グリッド幅はCanvasサイズを10分割とする
}

Grid.prototype.SetGridSpan = function (span) {
    this.span = span;
}

Grid.prototype.GetGridSpan = function () {
    return this.span;
}

// Draw
Grid.prototype.Draw = function (colorback, colorgrid) {
    this.DrawBack(colorback);
    this.DrawGrid(colorgrid);
}

// DrawBack
Grid.prototype.DrawBack = function (color) {
    this.canvas.FillRect(color);
}

// DrawGrid
Grid.prototype.DrawGrid = function (color) {
    this.DrawGrid2(0, 0, this.canvas.GetCanvasWidth(), this.canvas.GetCanvasHeight(), color);
}

Grid.prototype.DrawGrid2 = function (sx, sy, ex, ey, color) {
    this.DrawGridX(sx, sy, ex, ey, this.span.hi, color);
    this.DrawGridY(sx, sy, ex, ey, this.span.lo, color);
}

Grid.prototype.DrawGridX = function (sx, sy, ex, ey, width, color) {
    var l = sx;
    while (l < ex) {
        this.canvas.LineDash(l, sy, l, ey, color, 1);
        l += width;
    }
}

Grid.prototype.DrawGridY = function (sx, sy, ex, ey, height, color) {
    var l = sy;
    while (l < ey) {
        this.canvas.LineDash(sx, l, ex, l, color, 1);
        l += height;
    }
}
