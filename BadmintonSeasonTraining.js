var types = [
    ["Wadenheben, beidbeinig", "(mit Gewichten / einbeinig / Sprung / Seilspringen)"],
    ["Kniebeugen, beidbeinig", "(mit Gewichten / einbeinig / Sprung)"],
    ["Bergsteiger", "(diagonal / Schultertap / Tempo / Kombi Liegestütz)"],
    ["Seitstütz Rotation", "(Kombi Liegestütz o. Steiger / Arm-Knie)"],
    ["Crunchies", "(Arme auf Knien / Hände zu Hacken / Stabi-Halten)"],
    ["Schwimmer", "(Arme Kopf-Rücken / m. Gewichten / Oberkörper hoch)"],
    ["Beckenlift, beidbeinig", "(Gesäßnah/fern / einbeinig / m. Gewicht)"],
    ["Ausfallschritt rückw.", "(Arme ÜK / Arme NK / m. Gewichten)"],
    ["Sit-Ups", "(Arme ÜK / m. Gew / Hände zw. Beine / Hände nb. Beine)"],
    ["Hampelmann", "(m. Gewichten / breite Sprünge / lange Arme)"],
    ["Burpees statisch", "(dynamisch / m. Gewichten)"],
    ["Gummiband Laufen vorw.", "(rückw. / breiterer Stand / Schrittweiten)"],
    ["Ausfallschritt vorwärts", "(mit Gewichten / Arme ÜK / abw. Sprünge)"],
    ["seitliche Ausfallschritte", "(m. Gewichten / Arme seitlich / Arme vorne / zw. Kn. Beuge)"],
    ["Seitstütz halten", "(Beinebewegung / Hüfte auf und ab / Arm-Knie)"],
    ["Ruderzug Gummiband", "(m. Gewichten / Griff)"],
    ["Kreuzheben beidbeinig", "(einbeinig / m. Gewichten / Arme Var.)"],
    ["Gummiband Laufen seitw.", "(Rhythmus / Kombi Übungen)"]
];

var timerStarted = false;
var exerciseTimerDisplay;
var trainingList;
var exerciseCount;
var exerciseTime = 40;
var exerciseCounter;
var startButton;
var isPause = false;
var timeSelectSlider;
var exercisePass;
var selectedExerciseCount;
var selectedExercisePasses;

function randomElements(times) {
    selectedExerciseCount = times;
    exerciseCounter = document.getElementById("exerciseCount");
    exerciseCounter.innerText = "Ü" + times;

    exerciseTimerDisplay = document.getElementById("exerciseTimer");
    trainingList = document.getElementById("trainingList");

    timeSelectSlider = document.getElementById("timeSelectSlider");
    exerciseTimerDisplay.innerHTML = timeSelectSlider.value + "s";

    timeSelectSlider.oninput = function () {
        exerciseTimerDisplay.innerHTML = this.value + "s";
        exerciseTime = this.value;
    };

    while (trainingList.hasChildNodes()) {
        trainingList.removeChild(trainingList.firstChild);
    }
    trainingList.childNodes.forEach(function (value) {
        value.parentNode.removeChild(value)
    });
    var selectedElements = [];

    for (var i = 0; i < times; i++) {
        do {
            var randomNumber = Math.floor((Math.random() * types.length));
        } while (selectedElements.includes(randomNumber));
        selectedElements.push(randomNumber);
        var newLiElement = document.createElement("li");
        newLiElement.classList.add("list-group-item");
        newLiElement.id = ("exerciseElement" + i);

        var innerHeading = document.createElement("h2");
        newLiElement.appendChild(innerHeading);
        innerHeading.innerText = types[randomNumber][0];

        var innerSubText = document.createElement("div");
        innerSubText.classList.add();
        innerSubText.innerText = types[randomNumber][1];
        newLiElement.appendChild(innerSubText);

        trainingList.appendChild(newLiElement);
    }
}

function start(button) {

    timeSelectSlider.disabled = true;
    startButton = button;

    if (timerStarted) {
        button.innerText = "Start";
        stop();
    } else {
        switchProperties(false);
        button.innerText = "Stop";
        exerciseCount = selectedExerciseCount;
        selectedExercisePasses = document.querySelector('input[name = "exercisePasses"]:checked').value;
        exercisePass = selectedExercisePasses;
        startExercise();
    }
    timerStarted = !timerStarted;
}

function playAudio(file) {
    if (file === "start") {
        var audio = new Audio("start.m4a");
    } else if (file === "pause") {
        audio = new Audio("pause.m4a");
    } else if (file === "end") {
        audio = new Audio("end.m4a");
    }
    audio.play();
}

function startTimer(duration, display) {
    var time = duration - 1, seconds;
    var timer = setInterval(function () {
        seconds = parseInt(time % 60, 10);
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = seconds + "s";

        if (--time < 0) {
            time = duration;
            clearInterval(timer);
        }
    }, 1000);
}

function startExercise() {
    var timeToRun;
    if (exercisePass === 0) {
        playAudio("end");
        startButton.innerText = "Start";
        reset();
        exercisePass = selectedExercisePasses;
        switchProperties(true);
        timerStarted = false;
        return;
    }
    if (exerciseCount > 0) {
        if (!isPause) {
            timeToRun = exerciseTime * 1000;
            exerciseCounter.innerText = "Ü" + exerciseCount;
            playAudio("start");
            startTimer(exerciseTime, exerciseTimerDisplay);
            isPause = true;
            document.getElementById("exerciseElement" + (selectedExerciseCount - exerciseCount)).classList.add("selectedExercise");

        } else {
            timeToRun = 20 * 1000;
            exerciseCounter.innerText = "P";
            playAudio("pause");
            startTimer(20, exerciseTimerDisplay);
            isPause = false;
        }

    } else {
        reset();
        exercisePass--;
    }
    setTimeout(function () {
        startExercise();
        if (!isPause) {
            exerciseCount--;
        }
    }, timeToRun);
}

function switchProperties(show) {
    var properties = document.getElementsByClassName("selectedProperty");
    for (var i = 0; i < properties.length; i++) {
        if (!show) {
            properties[i].classList.add("hidden");
        } else {
            properties[i].classList.remove("hidden");
        }
    }
}

function reset() {
    exerciseCount = selectedExerciseCount + 1;
    exerciseCounter.innerText = trainingList.childElementCount;
    trainingList.childNodes.forEach(function (value) {
        value.classList.remove("selectedExercise")
    });
    exerciseTimerDisplay.innerHTML = timeSelectSlider.value + "s";
    timeSelectSlider.disabled = false;


}

