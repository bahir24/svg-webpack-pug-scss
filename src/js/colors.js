const colorsToGenerate = 5;
const baseString = 'rgba(';

function generateColors(number){
    var colors = {};
    for(number;number > 0;--number){
        colors[number] = baseString;
        colors[number] += generateShade() + ', ';
        colors[number] += generateShade() + ', ';
        colors[number] += generateShade() + ', ';
        colors[number] += generateOpacity() + ')';
    }
    return colors;

}

function generateShade(){
    return Math.floor(Math.random() * 255);
}
function generateOpacity(){
    let opacity = Math.random().toFixed(2);
    if(opacity < 0.3){
        opacity = generateOpacity();
    }
    return opacity;
}

var colors = generateColors(colorsToGenerate);


var FileColors = {
    colors
};

module.exports = FileColors;