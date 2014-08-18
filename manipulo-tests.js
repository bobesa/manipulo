require("./manipulo.js");

//Testing vars/func
var testsFailed = 0, testsOk = 0, testsTotal = 0, test, values, doTest = function(name,ar1,ar2){
	var result = JSON.stringify(ar1) == JSON.stringify(ar2);
	if(result) {
		console.info("+ Test passed: "+name);
		testsOk++;
	} else {
		console.error("- Test failed: "+name);
		testsFailed++;
	}
	testsTotal++;
};

//Test: Array.clear
values = [
	{country:"Poland",shortcut:"pl"},
	{country:"France",shortcut:"fr"},
	{country:"Czech republic",shortcut:"cs"},
	{country:"Spain",shortcut:"es"}
], test = [
	{shortcut:"pl"},
	{shortcut:"fr"},
	{shortcut:"cs"},
	{shortcut:"es"}
], doTest("Array.clear",values.clear("country"),test);

//Test: Array.sortBy #1
values = [
	{country:"Poland",shortcut:"pl"},
	{country:"France",shortcut:"fr"},
	{country:"Czech republic",shortcut:"cs"},
	{country:"Spain",shortcut:"es"}
], test = [
	{country:"Czech republic",shortcut:"cs"},
	{country:"France",shortcut:"fr"},
	{country:"Poland",shortcut:"pl"},
	{country:"Spain",shortcut:"es"}
], doTest("Array.sortBy #1",values.sortBy("country"),test);

//Test: Array.sortBy #2
values = [
	true,
	1,
	"stringie",
	{key:2,value:57},
	{key:1,value:55},
	{key:2,value:56}
], test = [
	1,
	"stringie",
	true,
	{key:1,value:55},
	{key:2,value:56},
	{key:2,value:57}
], doTest("Array.sortBy #2",values.sortBy(["key","value"]),test);

//Results
console.info("= Tests passed "+testsOk+"/"+testsTotal+(testsFailed > 0 ? " ("+testsFailed+" tests failed)" : "")+" = "+(testsOk/testsTotal*100).toFixed(2)+"% success");
