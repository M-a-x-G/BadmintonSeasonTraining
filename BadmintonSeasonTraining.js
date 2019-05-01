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



function randomElements(times) {
    var trainingList = document.getElementById("trainingList");
    while(trainingList.hasChildNodes()){
        trainingList.removeChild(trainingList.firstChild);
    }
    trainingList.childNodes.forEach(function(value) { value.parentNode.removeChild(value) });
    var selectedElements = [];

    for(var i=0; i < times; i++){
        do {
            var randomNumber = Math.floor((Math.random() * types.length));
        } while (selectedElements.includes(randomNumber));
        selectedElements.push(randomNumber);
        var newLiElement = document.createElement("li");
        newLiElement.classList.add("list-group-item");

        var innerHeading = document.createElement("h2");
        newLiElement.appendChild(innerHeading);
        innerHeading.innerText = types[randomNumber][0];

        var innerSubText = document.createElement("div");
        innerSubText.classList.add();
        innerSubText.innerText = types[randomNumber][1];
        newLiElement.appendChild(innerSubText);

        trainingList.appendChild( newLiElement);
    }
}
