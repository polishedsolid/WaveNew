var SAMP = {
    SAMP_1MS: 0,
    SAMP_2MS: 1,
    SAMP_5MS: 2,
    SAMP_10MS: 3,
    SAMP_20MS: 4,
    SAMP_50MS: 5,
    SAMP_100MS: 6,
    SAMP_200MS: 7,
    SAMP_500MS: 8,
    SAMP_1S: 9,
    SAMP_2S: 10,
    SAMP_5S: 11,
    SAMP_10S: 12,
    SAMP_20S: 13,
    SAMP_30S: 14,
    SAMP_1MIN: 15,
    SAMP_2MIN: 16,
    SAMP_5MIN: 17,
    SAMP_10MIN: 18,
    SAMP_20MIN: 19,
    SAMP_30MIN: 20,
    SAMP_1HOUR: 21,
};

var SAMPVAL = new Array(
    0.001,
    0.002,
    0.005,
    0.01,
    0.02,
    0.05,
    0.1,
    0.2,
    0.5,
    1,
    2,
    5,
    10,
    20,
    30,
    60,
    120,
    300,
    600,
    1200,
    1800,
    3600);

var SAMPSTR = new Array(
    "1ms",
    "2ms",
    "5ms",
    "10ms",
    "20ms",
    "50ms",
    "100ms",
    "200ms",
    "500ms",
    "1s",
    "2s",
    "5s",
    "10s",
    "20s",
    "30s",
    "1min",
    "2min",
    "5min",
    "10min",
    "20min",
    "30min",
    "1hour");

function Sample(form, select) {
    this.form = form;
    this.select = select;
}

Sample.prototype.SetCtrl = function () {
    var ctrl = document.form.elements[this.select];
    if (ctrl != undefined) SetCtrlSelctOption(document.form.elements[this.select], SAMPSTR, "");
}

Sample.prototype.GetIndex = function () {
    var val = document.form.elements[this.select].selectedIndex;
    return val;
}

Sample.prototype.GetNum = function () {
    var val = SAMPVAL[document.form.elements[this.select].selectedIndex];
    return val;
}

function Timediv(form, select) {
    this.form = form;
    this.select = select;
}

Timediv.prototype.SetCtrl = function () {
    var ctrl = document.form.elements[this.select];
    if (ctrl != undefined) SetCtrlSelctOption(document.form.elements[this.select], SAMPSTR, "/DIV");
}

Timediv.prototype.GetIndex = function () {
    var val = document.form.elements[this.select].selectedIndex;
    return val;
}

Timediv.prototype.GetNum = function () {
    var val = SAMPVAL[document.form.elements[this.select].selectedIndex];
    return val;
}

// Set option of the form select
function SetCtrlSelctOption(ctrl, obj, pstr) {
    var n = 0;
    for (var i in obj) {
        if (ctrl.options[n] == undefined) {
            ctrl.appendChild(document.createElement("option"));
        }
        ctrl.options[n].text = obj[i] + pstr;
        n++;
    }
}
