// Gloval
document.write("<script type='text/javascript' src='Grid.js'><\/script>");
document.write("<script type='text/javascript' src='Canvas.js'><\/script>");
document.write("<script type='text/javascript' src='Wave.js'><\/script>");
document.write("<script type='text/javascript' src='Property.js'><\/script>");

function Initial(form, samp, timediv, canvas) {

    sampleCtrl = new Sample(form, samp);
    sampleCtrl.SetCtrl();

    timedivCtrl = new Timediv(form, timediv);
    timedivCtrl.SetCtrl();

    grid = new Grid(canvas);
    grid.SetSize(800, 400);
    grid.Draw('black', '#444444');
}

function Initial2(canvas) {
    wave = new Wave(canvas);
    wave.SetSize(800, 400);
    wave.SetData();
    wave.Draw('Red', 2, true);
}

function ChangeCtrl() {
    wave.SetSamp();
    wave.SetTimeDiv();
    grid.Draw('black', '#444444');
    wave.SetData();
    wave.Draw('Red', 2, true);
}