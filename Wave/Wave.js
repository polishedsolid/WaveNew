//---------------------------------------
// Class Span
//---------------------------------------
function Span(h, l) {
    this.hi = h;
    this.lo = l;
}

Span.prototype.GetCenter = function() {
    return (this.hi - this.lo) / 2;
}

Span.prototype.GetHeight = function () {
    return Math.abs(this.hi - this.lo);
}

//---------------------------------------
// Class XY
//---------------------------------------
function XY(x, y1, y2) {
    this.x = x;
    this.y1 = y1;
    this.y2 = y2;
}

XY.prototype.IsShrink = function () {
	return (this.y1 != this.y2) ? true : false;
}

//---------------------------------------
// Class Data Array
//---------------------------------------
function DataArray() {
    this.dataarray = [];
}

DataArray.prototype.Push = function (data) {
    this.dataarray.push(data);
}

DataArray.prototype.Get = function (index) {
    return this.dataarray[index];
}

DataArray.prototype.GetLength = function() {
    return this.dataarray.length;
}

//---------------------------------------
// Class Wave
//---------------------------------------
function Wave(id) {
    this.canvas = new Canvas(id);
    this.span = new Span(10000, -10000);
    this.dataarray = new DataArray();
    this.dataarraydot = new DataArray();
    this.SetSamp();
    this.SetTimeDiv();
}

// Set
Wave.prototype.SetSize = function (width, height) {
    this.canvas.SetCanvasSize(width, height);
}

Wave.prototype.SetSamp = function () {
	this.samp = sampleCtrl.GetNum();
}

Wave.prototype.SetTimeDiv = function () {
	this.timediv = timedivCtrl.GetNum();
}

// Set Data
Wave.prototype.SetData = function (data) {
	if (data != undefined) this.dataarray = data;

	//// test
	new TestData(this.canvas.canvas.width, this.dataarray);

	var calc = new Calc(this.samp, this.timediv, this.canvas.GetCanvasWidth() / 10, this.canvas.GetCanvasWidth(), this.canvas.GetCanvasHeight(), this.span);
	this.dataarraydot = calc.Exec(this.dataarray);
}

Wave.prototype.Draw = function (color, line, prot) {

	var now;
	var old;

	old = this.dataarraydot.Get(0);
	for (var i = 1; i < this.dataarraydot.GetLength(); i++) {
		now = this.dataarraydot.Get(i);
		if (now.IsShrink()) {
			this.canvas.Line(old.x, old.y1, old.x, old.y2, color, line);
		} else {
			this.canvas.Line(old.x, old.y1, now.x, now.y1, color, line);
			if (prot == true) this.canvas.Prot(now.x, now.y1, 3, color);
		}
		old = now;
	}
}

//---------------------------------------
// Class Calc
//---------------------------------------
function Calc(samp, timediv, gridspan, canvaswidth, canvasheight, span) {
    this.samp = samp;
    this.timediv = timediv;
    this.gridspan = gridspan;
    this.canvaswidth = canvaswidth;
    this.canvasheight = canvasheight;
    this.span = span;

    this.dotosamp = timediv / gridspan;
    this.isshrink = this.IsShrink(samp, this.dotosamp);
    this.data = new function () { this.min = 0; this.max = 0; };
    this.src = 0;
    this.dst = (this.isshrink) ? this.dotosamp : this.samp;
    this.add = (this.isshrink) ? this.samp : this.dotosamp;
    this.isdraw = false;
}

Calc.prototype.IsShrink = function (samp, dotsamp) {
    return (samp < dotsamp) ? true : false;
}

Calc.prototype.Exec = function (dataarray) {
	return (this.isshrink) ? this.Shrink(dataarray) : this.Expand(dataarray);
}

Calc.prototype.Shrink = function (dataarray) {
	var dataarraydot = new DataArray();
	var x = 0;
	this.First(dataarray.Get(0))
	for (var i = 1; i < dataarray.GetLength(); i++) {
		if (this.Next(dataarray.Get(i))) {
			dataarraydot.Push(new XY(x++, this.GetDotPosition(this.data.max), this.GetDotPosition(this.data.min)));
			if (x > this.canvaswidth) break;
			this.swap();
		}
	}

	return dataarraydot;
}

Calc.prototype.Expand = function (dataarray) {
	var dataarraydot = new DataArray();
	var x = 0;
	this.First(dataarray.Get(0))
	dataarraydot.Push(new XY(x, this.GetDotPosition(this.data.min), this.GetDotPosition(this.data.min)));

	for (var i = 1; i < dataarray.GetLength(); i++) {
		while (!this.Next(dataarray.Get(i))) { x++; }
		dataarraydot.Push(new XY(x, this.GetDotPosition(dataarray.Get(i)), this.GetDotPosition(dataarray.Get(i))));
		if (x > this.canvaswidth) break;
	}

	return dataarraydot;
}


Calc.prototype.First = function (d) {
    this.isdraw = false;
    this.src = 0;
    this.data.max = d;
    this.data.min = d;
}

Calc.prototype.Next = function (d) {
	this.src += this.add;
	this.Compless(d);
    if (this.src > this.dst) {
        this.isdraw = true;
        this.src -= this.dst;
        return true;
    }
    return false;
}

Calc.prototype.Compless = function (d) {
    if (this.data.max < d) { this.data.max = d; }
    if (this.data.min > d) { this.data.min = d; }

    return this.data;
}

Calc.prototype.GetDotPosition = function (data) {
	var canvasheight = this.canvasheight;
	var spanheight = this.span.GetHeight();
	var spancenter = this.span.GetCenter();

	return (canvasheight / 2) - ((canvasheight * data) / spanheight);
}

Calc.prototype.swap = function () {
	this.data.max = [this.data.min, this.data.min = this.data.max][0];
}

//---------------------------------------
// Class Test Data Create
//---------------------------------------
function TestData(size, dataarray) {
    for (var i = 0; i < size ; i++) {
        //var d = this.GetRandom();
        var d = this.GetSine(i);
        dataarray.Push(d);
    }
}

TestData.prototype.GetRandom = function (i) {
    return Math.random() * 20000 - 10000;;
}

TestData.prototype.GetSine = function (i) {
    return Math.sin(i * 10 * 0.01) * 10000;
}