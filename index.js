const inquirer = require("inquirer");
const fs = require("fs");
const {Circle, Triangle, Square} = require("./lib/functions/shapes.js");

const questions = [
    {
        type: "input",
        name: "characters",
        message: "What three characters will your logo feature?",
    }
    ,
    {
        type: "input",
        name: "textColor",
        message: "Please choose one of the colors of the rainbow, (ROYGBIV), or provide a hexidecimal number for the text color of your logo "
    }, 
    {
        type: "list", 
        name: "shape",
        message: "What shape would you like your logo to be?",
        //choices: ["Circle", "Square", "Triangle"],
        choices: [
            {
                name: "Circle",
                value: Circle,
            },
            {
                name: "Square",
                value: Square,
            },
            {
                name: "Triangle",
                value: Triangle
            },
        ]
    },
    {
        type: "input",
        name: "shapeColor",
        message: "Please choose one of the colors of the rainbow, (ROYGBIV), or provide a hexidecimal number for the shape color of your logo "
    },
]

function writeFile(fileName, data) {
    fs.writeFile(fileName, data, (err) => {
        if(err) {
            console.error("Oh no, error!")
        }
        else {
            console.log("Succesfully written the file!!")
        }
    })
}

function init() {
    inquirer.prompt(questions).then((answers) => {
        const threeCharacters = answers.characters;
        const textColor = answers.textColor;
        const Shape = answers.shape;
        const shapeColor = answers.shapeColor;

        


        const newShape = new Shape(threeCharacters, textColor, shapeColor);
        const shapeSVGInfo = `
    <svg version ="1.1" width = "${newShape.width}" height = "${newShape.height}" xmlns="http://www.w3.org/2000/svg">
        ${newShape.render()}

    </svg>
        `

        writeFile("logo.svg", shapeSVGInfo);
    })
}

init();