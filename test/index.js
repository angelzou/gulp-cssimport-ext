var test = require("tape");
var EventEmitter = require("events").EventEmitter;
var emitter = new EventEmitter();
var tests = [
	"complete",
	"general",
	"minified",
	"options-extensions-exclude",
	"options-extensions-only",
	"options-filter",
	"options-matchpattern",
	"parent",
	"include-paths",
	"recursive",
	"commented-import",
	"wild-commented-import",
	"sass-commented-import",
];
emitter.on("run", function(index) {
	var name = tests[index];
	if (!name) {
		throw new Error("Index out of range.");
	}
	process.chdir(__dirname + "/" + name);
	var fn = require("./" + name);
	var t = test(fn);
	t.on("end", function() {
		var nextIndex = index + 1;
		if (nextIndex >= tests.length) {
			return;
		}
		emitter.emit("run", nextIndex);
	});
});

emitter.emit("run", 0);