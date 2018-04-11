var axiom = "X";
var sentence = axiom;
var angle;
var rules = [];
var len = 200;
rules[0] = {
    a: "X",
    b: "F+[[X]-X]-F[-FX]+X"
}
rules[1] = {
    a: "F",
    b: "FF"
}


function generate()
{
    len *= 0.54;
    var nextSentence = "";
    for (var i = 0; i < sentence.length; i++){
        var current = sentence.charAt(i);
        var found = false;

        for (rule of rules){
            if (current == rule.a){
                nextSentence += rule.b;
                found = true;
                break;
            }
        }
        if (!found){
            nextSentence += current;
        }
    }

    sentence = nextSentence;
    createP(sentence);
    turtle();
}

function turtle() {
    background(51);
    resetMatrix();
    translate(width/2, height);
    strokeWeight(len/5);
    stroke(255,100);

    for (var i = 0; i < sentence.length; i++){
        var current = sentence.charAt(i);
        if (current == "F"){
            line (0,0,0, -len);
            translate (0, -len)
        } else if (current == "+"){
            rotate (angle);
        } else if (current == "-"){
            rotate (-angle);
        } else if (current == "[") {
            push();
        } else if (current == "]") {
            pop();
        }
    }
}


function setup() 
{
    createCanvas(1900,1900);
    angle = radians(25);
    background(51);
    turtle();
    var button = createButton("generate");
    button.mousePressed(generate);
}

