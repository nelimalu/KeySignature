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

var answers = new Map();

// sharps
answers.set('A', ["Fs", "Cs", "Gs"]);
answers.set('B', ["Fs", "Cs", "Gs", "Ds", "As"]);
answers.set('C', []);
answers.set('D', ["Fs", "Cs"]);
answers.set('E', ["Fs", "Cs", "Gs", "Ds"]);
answers.set('F', ["Bb"]);
answers.set('G', ["Fs"]);
answers.set('Fs', ["Fs", "Cs", "Gs", "Ds", "As", "Es"]);
answers.set('Cs', ["Fs", "Cs", "Gs", "Ds", "As", "Es", "Bs"]);

// flats
answers.set('Ab', ["Bb", "Eb", "Ab", "Db"]);
answers.set('Bb', ["Bb", "Eb"]);
answers.set('Cb', ["Bb", "Eb", "Ab", "Db", "Gb", "Cb", "Fb"]);
answers.set('Db', ["Bb", "Eb", "Ab", "Db", "Gb"]);
answers.set('Eb', ["Bb", "Eb", "Ab"]);
answers.set('Gb', ["Bb", "Eb", "Ab", "Db", "Gb", "Cb"]);

var keysignatures = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'Fs', 'Cs', 'Ab', 'Bb', 'Cb', 'Db', 'Eb', 'Gb'];
var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

function convert(note) {
	let arr = Array.from(note);
	let ending = "";
	if (arr.length > 1) {
		if (arr[1] == "♭") {
			ending = "b";
		} else if (arr[1] == "♯") {
			ending = "s";
		} else if (arr[1] == "b") {
			ending = "♭";
		} else if (arr[1] == "s") {
			ending = "♯";
		}
	}
	return arr[0] + ending;
}

function equals(a, b) {
    if (a.length !== b.length) {
        return false;
    }

    var seen = {};
    a.forEach(function(v) {
        var key = (typeof v) + v;
        if (!seen[key]) {
            seen[key] = 0;
        }
        seen[key] += 1;
    });

    return b.every(function(v) {
        var key = (typeof v) + v;
        if (seen[key]) {
            seen[key] -= 1;
            return true;
        }
        // not (anymore) in the map? Wrong count, we can stop here
    });
}


function check2() {
	let answer = answers.get(convert(document.getElementById("key").innerHTML));
	if (answer == undefined) {
		answer = [];
	}
	let guesses = [];
	let markedCheckbox = document.getElementsByName('ac'); 
	for (let checkbox of markedCheckbox) {  
		if (checkbox.checked)   {
	    	guesses.push(checkbox.id.charAt(0));
		}  
	}
	let accidental = document.getElementById("sharp-input").checked;
	for (let i = 0; i < guesses.length; i++) {
		if (accidental) {
			guesses[i] += "s";
		} else {
			guesses[i] += "b";
		}
	}

	if (!answered) {
		if (equals(guesses, answer)) {
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

	console.log(JSON.stringify(guesses),  JSON.stringify(answer));
}


function next2() {
	answered = false;

	let nextSignature = keysignatures[Math.floor(Math.random() * keysignatures.length)];
	let prev_scale = convert(document.getElementById("key").innerHTML);
	while (nextSignature === prev_scale) {
		nextSignature = keysignatures[Math.floor(Math.random() * keysignatures.length)];
	}

	document.getElementById("answer-message").innerHTML = ".";
	document.getElementById("answer-message").style.color = "ghostwhite";
	for (let letter of alphabet) {
		document.getElementById(letter + "-checkbox").checked = false;
	}
	document.getElementById("key").innerHTML = convert(nextSignature);
	
}
