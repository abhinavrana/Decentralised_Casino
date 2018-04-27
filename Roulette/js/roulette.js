var svgns = "http://www.w3.org/2000/svg";
var slices = [];
var sliceMiddles = [];
var sliceEnds = [];
var sliceTexts = [];
var numSlices = 36;
var isSpinning = false;
var rotation = 0;
var currentSlice = 0;
var wheel;
var spinButton;
var NumberSeq = [
	0,
	32,
	15,
	19,
	4,
	21,
	2,
	25,
	17,
	34,
	6,
	27,
	13,
	36,
	11,
	30,
	8,
	23,
	10,
	5,
	24,
	16,
	33,
	1,
	20,
	14,
	31,
	9,
	22,
	18,
	29,
	7,
	28,
	12,
	35,
	3,
	26
]; // zero green then starts with red

function Slice(num, parent) {
	this.parent = parent;
	this.size = 300 / numSlices;
	this.offset = num * this.size;
	this.id = "slice_" + num;

	this.object = this.create(num);
	this.parent.appendChild(this.object);
}

Slice.prototype = {
	create: function(num) {
		var g = document.createElementNS(svgns, "g");

		var slice = document.createElementNS(svgns, "path");
		slice.setAttributeNS(null, "id", this.id);
		var x1 = 250 + 150 * Math.cos(Math.PI * (-90 + this.offset) / 150);
		var y1 = 250 + 150 * Math.sin(Math.PI * (-90 + this.offset) / 150);
		var x2 =
			250 + 150 * Math.cos(Math.PI * (-90 + this.size + this.offset) / 150);
		var y2 =
			250 + 150 * Math.sin(Math.PI * (-90 + this.size + this.offset) / 150);
		slice.setAttributeNS(
			null,
			"d",
			"M 250 250 L " + x1 + " " + y1 + " A 150 150 0 0 1 " + x2 + " " + y2 + "  Z"
		);

		slice.setAttributeNS(null, "fill", "rgb(0,0,0)");

		slice.setAttributeNS(null, "stroke", "#222222");
		slice.setAttributeNS(null, "style", "stroke-width:1px");

		g.appendChild(slice);

		var overlay = document.createElementNS(svgns, "path");
		overlay.setAttributeNS(
			null,
			"d",
			"M 250 250 L " + x1 + " " + y1 + " A 150 150 0 0 1 " + x2 + " " + y2 + "  Z"
		);
		overlay.setAttributeNS(null, "fill", "#C0C0C0");
		overlay.setAttributeNS(null, "stroke", "#222222");
		overlay.setAttributeNS(null, "style", "stroke-width:1px");
		overlay.setAttributeNS(null, "opacity", "0");

		g.appendChild(overlay);
		return g;
	},
	toggleOverlay: function() {
		var overlay = this.object.childNodes[1];
		if (overlay.getAttribute("opacity") == 0) {
			overlay.setAttributeNS(null, "opacity", 1);
		} else {
			overlay.setAttributeNS(null, "opacity", 0);
		}
	}
};

function SliceMiddle(num, parent) {
	this.parent = parent;
	this.size = 300 / numSlices;
	this.offset = num * this.size;
	this.id = "sliceMiddle_" + NumberSeq[num];

	this.object = this.create(num);
	this.parent.appendChild(this.object);
}

SliceMiddle.prototype = {
	create: function(num) {
		var g = document.createElementNS(svgns, "g");

		var sliceMiddle = document.createElementNS(svgns, "path");
		sliceMiddle.setAttributeNS(null, "id", this.id);
		var x1 = 250 + 180 * Math.cos(Math.PI * (-90 + this.offset) / 150);
		var y1 = 250 + 180 * Math.sin(Math.PI * (-90 + this.offset) / 150);
		var x2 =
			250 + 180 * Math.cos(Math.PI * (-90 + this.size + this.offset) / 150);
		var y2 =
			250 + 180 * Math.sin(Math.PI * (-90 + this.size + this.offset) / 150);
		sliceMiddle.setAttributeNS(
			null,
			"d",
			"M 250 250 L " + x1 + " " + y1 + " A 180 180 0 0 1 " + x2 + " " + y2 + "  Z"
		);

		if (num == 0) sliceMiddle.setAttributeNS(null, "fill", "rgb(0,153,0)");
		else if (isEven(num) == 0)
			sliceMiddle.setAttributeNS(null, "fill", "rgb(153,0,0)");
		else sliceMiddle.setAttributeNS(null, "fill", "rgb(0,0,0)");

		sliceMiddle.setAttributeNS(null, "stroke", "#C0C0C0");
		sliceMiddle.setAttributeNS(null, "style", "stroke-width:3px");

		g.appendChild(sliceMiddle);

		var overlay = document.createElementNS(svgns, "path");
		overlay.setAttributeNS(
			null,
			"d",
			"M 200 200 L " + x1 + " " + y1 + " A 150 150 0 0 1 " + x2 + " " + y2 + "  Z"
		);
		overlay.setAttributeNS(null, "fill", "#FFFFFF");
		overlay.setAttributeNS(null, "stroke", "#222222");
		overlay.setAttributeNS(null, "style", "stroke-width:1px");
		overlay.setAttributeNS(null, "opacity", "0");

		g.appendChild(overlay);
		return g;
	},
	toggleOverlay: function() {
		var overlay = this.object.childNodes[1];
		if (overlay.getAttribute("opacity") == 0) {
			overlay.setAttributeNS(null, "opacity", 1);
		} else {
			overlay.setAttributeNS(null, "opacity", 0);
		}
	}
};

function SliceEnd(num, parent) {
	this.parent = parent;
	this.size = 300 / numSlices;
	this.offset = num * this.size;
	this.id = "sliceEnd_" + NumberSeq[num];

	this.object = this.create(num);
	this.parent.appendChild(this.object);
}

SliceEnd.prototype = {
	create: function(num) {
		var g = document.createElementNS(svgns, "g");

		var sliceEnd = document.createElementNS(svgns, "path");
		sliceEnd.setAttributeNS(null, "id", this.id);
		var x1 = 250 + 230 * Math.cos(Math.PI * (-90 + this.offset) / 150);
		var y1 = 250 + 230 * Math.sin(Math.PI * (-90 + this.offset) / 150);
		var x2 =
			250 + 230 * Math.cos(Math.PI * (-90 + this.size + this.offset) / 150);
		var y2 =
			250 + 230 * Math.sin(Math.PI * (-90 + this.size + this.offset) / 150);
		sliceEnd.setAttributeNS(
			null,
			"d",
			"M 250 250 L " + x1 + " " + y1 + " A 230 230 0 0 1 " + x2 + " " + y2 + "  Z"
		);

		if (num == 0) sliceEnd.setAttributeNS(null, "fill", "rgb(0,204,0)");
		else if (isEven(num) == 0)
			sliceEnd.setAttributeNS(null, "fill", "rgb(204,0,0)");
		else sliceEnd.setAttributeNS(null, "fill", "rgb(0,0,0)");

		sliceEnd.setAttributeNS(null, "stroke", "#C0C0C0");
		sliceEnd.setAttributeNS(null, "style", "stroke-width:1px");

		g.appendChild(sliceEnd);

		var overlay = document.createElementNS(svgns, "path");
		overlay.setAttributeNS(
			null,
			"d",
			"M 200 200 L " + x1 + " " + y1 + " A 150 150 0 0 1 " + x2 + " " + y2 + "  Z"
		);
		overlay.setAttributeNS(null, "fill", "#FFFFFF");
		overlay.setAttributeNS(null, "stroke", "#222222");
		overlay.setAttributeNS(null, "style", "stroke-width:1px");
		overlay.setAttributeNS(null, "opacity", "0");

		g.appendChild(overlay);
		return g;
	},
	toggleOverlay: function() {
		var overlay = this.object.childNodes[1];
		if (overlay.getAttribute("opacity") == 0) {
			overlay.setAttributeNS(null, "opacity", 1);
		} else {
			overlay.setAttributeNS(null, "opacity", 0);
		}
	}
};

function isEven(n) {
	return n % 2 == 0;
}

function Move(x, y, s) {
	var ball = document.getElementById("theBallPath");
	var speedvar = document.getElementById("speed");
	var numwheel = document.getElementById("numwheel");
	var middlewheel = document.getElementById("middlewheel");

	var curspeed = s;

	speedvar.setAttributeNS(null, "dur", s + "ms");
	//numwheel.setAttributeNS(null, "dur", s + "ms");

	ball.setAttributeNS(
		null,
		"d",
		"M 250, 250	m -" +
			x +
			", 0 a " +
			x +
			"," +
			x +
			" 0 1,0 " +
			y +
			",0	a " +
			x +
			"," +
			x +
			" 0 1,0 -" +
			y +
			",0"
	);

	document
		.getElementById("roottwo")
		.setCurrentTime(
			document.getElementById("roottwo").getCurrentTime() * curspeed / (s - 100)
		);

	if (x > 165) {
		setTimeout(function() {
			Move(x - 1, y - 2, s + 100);
		}, 200);
	} else {
		speedvar.setAttributeNS(null, "dur", "25000ms");
		speedvar.setAttributeNS(null, "keyPoints", "1;0");
		document
			.getElementById("roottwo")
			.setCurrentTime(
				document.getElementById("roottwo").getCurrentTime() * curspeed / 28000
			);
		$("#roulette-button").show();
	}
}

function Start() {
	$("#roulette-button").hide();
	document.getElementById("ball").style.display = "block";
	var root = document.getElementsByTagNameNS(svgns, "svg")[0];
	//var suspendID = root.suspendRedraw(20000);
	setTimeout(function() {
		Move(240, 480, 1000);
	}, 200);
}

document.addEventListener(
	"DOMContentLoaded",
	function() {
		wheel = document.getElementById("roulette-board");
		wheeloutter = document.getElementById("roulette-board-outter");
		wheelnumber = document.getElementById("roulette-board-number");
		arrow = document.getElementById("roulette-arrow");
		spinButton = document.getElementById("roulette-button");

		for (var i = 0; i < numSlices; i++) {
			sliceEnds[i] = new SliceEnd(i, wheeloutter);
			sliceMiddles[i] = new SliceMiddle(i, wheeloutter);
			slices[i] = new Slice(i, wheel);
		}

		slices[35].toggleOverlay();
		slices[1].toggleOverlay();

		slices[8].toggleOverlay();
		slices[10].toggleOverlay();

		slices[17].toggleOverlay();
		slices[19].toggleOverlay();

		slices[26].toggleOverlay();
		slices[28].toggleOverlay();
	},
	false
);

