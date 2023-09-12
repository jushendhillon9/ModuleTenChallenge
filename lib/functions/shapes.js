class Shape {
    constructor (textX, textY, fontSize) {
        this.textAnchor = "middle";
        this.textX = textX;
        this.textY = textY;
        this.fontSize = fontSize;
        this.width = 300;
        this.height = 180;
    }
}

class Circle extends Shape {
    constructor (threeLetters, textColor, shapeColor) {
        super(150, 125, 60);
        this.shape = "circle";
        this.letters = threeLetters;
        this.textColor = textColor;
        this.shapeColor = shapeColor;
        this.circleX = 150;
        this.circleY = 100;
        this.radius = 80;
    }
    render() {
        let shapeTagSVG =  `
        <${this.shape} cx = "${this.circleX}" cy = "${this.circleY}" r = "${this.radius}" fill = "${this.shapeColor}"/>

        <text x = "${this.textX}" y = "${this.textY}" font-size = "${this.fontSize}" text-anchor="${this.textAnchor}" fill = "${this.textColor}">${this.letters}</text>`;
        return shapeTagSVG;
    }
    
}

class Triangle extends Shape {
    constructor (threeLetters, textColor, shapeColor) {
        super(160, 70, 30);
        this.shape = "polygon";
        this.letters = threeLetters;
        this.textColor = textColor;
        this.shapeColor = shapeColor;
    }
    render() {
        let shapeTagSVG =  `
        <${this.shape} points="100,20 220,20 160,140" fill = "${this.shapeColor}" stroke="black" stroke-width="2"/>

        <text x = "${this.textX}" y = "${this.textY}" font-size = "${this.fontSize}" text-anchor="${this.textAnchor}" fill = "${this.textColor}">${this.letters}</text>`;
        return shapeTagSVG;
    }
}

class Square extends Shape {
    constructor (threeLetters, textColor, shapeColor) {
        super(127, 135, 40);
        this.shape = "rect";
        this.letters = threeLetters;
        this.textColor = textColor;
        this.shapeColor = shapeColor;
        this.width = 200;
        this.height = 200;
        this.rectX = 50;
        this.rectY = 50;
    }
    render() {
        let shapeTagSVG =  `
        <${this.shape} width = "${this.width}" height = "${this.height}" x = "${this.rectX}" y = "${this.rectY}" fill = "${this.shapeColor}" stroke="black" stroke-width="2"/>

        <text x = "${this.textX}" y = "${this.textY}" font-size = "${this.fontSize}" text-anchor="${this.textAnchor}" fill = "${this.textColor}">${this.letters}</text>`;
        return shapeTagSVG;
    }
}

module.exports = {Circle, Triangle, Square};

