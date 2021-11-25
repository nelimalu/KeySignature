const scales = ["A", "Ab", "B", "Bb", "Cs", "C", "Cb", "D", "Db", "E", "Eb", "Fs", "F", "G"];

var correct = 0;
var incorrect = 0;
var answered = false;

function check() {
	const answer = document.getElementById("keysignature").src.split("Data/")[1].split("_Major.png")[0].split('#').join('s');
	const accidental = document.getElementById("accidental").value; 
	const guess = document.getElementById("guess").value.toUpperCase();
	if (!answered) {
		if (guess + accidental === answer) {
			correct += 1;
			answered = true;
			document.getElementById("answer-message").innerHTML = "Correct!";
			document.getElementById("answer-message").style.color = "limegreen";
		} else {
			incorrect += 1;
			document.getElementById("answer-message").innerHTML = "Please try again!";
			document.getElementById("answer-message").style.color = "red";
		}
	}
	document.getElementById("accuracy").innerHTML = "Accuracy: " + parseInt((correct / (correct + incorrect)) * 100).toString() + "%";
}

function next() {
	answered = false;
	scale = scales[Math.floor(Math.random() * scales.length)];
	prev_scale = document.getElementById("keysignature").src.split("Data/")[1].split("_Major.png")[0].split('#').join('s');
	while (scale === prev_scale) {
		scale = scales[Math.floor(Math.random() * scales.length)];
	}
	console.log(scale);
	document.getElementById("answer-message").innerHTML = ".";
	document.getElementById("answer-message").style.color = "ghostwhite";
	document.getElementById("guess").value = "";
	document.getElementById("keysignature").src = "Data/" + scale + "_Major.png"
}
