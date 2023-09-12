const {Circle, Triangle, Square} = require("./shapes.js");
//requiring these three class (circle, triangle, and square) from the shapes.js
//we are able to do this because shapes.js exports these three functions specifically
const fs = require("fs/promises");
//MUST include fs/promises, I am relying on writeFile and readFile returning promises in the last test

describe ("Shapes", () => {
    describe("render", () => {
        it("should render the middle the shape and text lines of code necessary to produce the SVG image", () => {
            let threeLetters = "SVG";
            let textColor = "red";
            let shapeColor = "purple";
            const newCircle = new Circle(threeLetters, textColor, shapeColor);
            expect(newCircle.render()).toEqual(`
        <circle cx = "150" cy = "100" r = "80" fill = "purple"/>

        <text x = "150" y = "125" font-size = "60" text-anchor="middle" fill = "red">SVG</text>`.replace("/^\s+/gm", ""))
        })
    })
})

describe ("Shapes", () => {
    describe ("Triangle", () => {
        it("should render the middle the shape and text lines of code necessary to produce the SVG image", () => {
            let threeLetters = "RPG";
            let textColor = "green";
            let shapeColor = "orange";
            const newTriangle = new Triangle(threeLetters, textColor, shapeColor);
            expect(newTriangle.render()).toEqual(`
        <polygon points="100,20 220,20 160,140" fill = "orange" stroke="black" stroke-width="2"/>

        <text x = "160" y = "70" font-size = "30" text-anchor="middle" fill = "green">RPG</text>`)
        })
    })
})

// remember the regex in .replace(/^\s+/gm, "") does NOT have parantheses

describe("Shapes", () => {
    describe("Square", () => {
        it("should render the middle the shape and text lines of code necessary to produce the SVG image", () => {
            let threeLetters = "LOL"
            let textColor = "yellow";
            let shapeColor = "blue";
            const newSquare = new Square(threeLetters, textColor, shapeColor);
            expect(newSquare.render()).toEqual(`
        <rect width = "200" height = "200" x = "50" y = "50" fill = "blue" stroke="black" stroke-width="2"/>

        <text x = "127" y = "135" font-size = "40" text-anchor="middle" fill = "yellow">LOL</text>`)
        })
    })
})

describe("Shapes", () => {
    describe("Circle", () => {
        it("should render the circle Logo using hexidecimal values for the colors", () => {
            let threeLetters = "LOL"
            let textColor = "#ffa500";
            let shapeColor = "#6a5acd";
            const newSquare = new Square(threeLetters, textColor, shapeColor);
            expect(newSquare.render()).toEqual(`
        <rect width = "200" height = "200" x = "50" y = "50" fill = "#6a5acd" stroke="black" stroke-width="2"/>

        <text x = "127" y = "135" font-size = "40" text-anchor="middle" fill = "#ffa500">LOL</text>`)
        })
    })
})

/*

async function writeFile(fileName, data) {
    try {
      await fs.writeFile(fileName, data, (err) => {
        if (err) {
          console.error("Oh no, error!", err);
        } else {
          console.log("Successfully written the file!!");
        }
      });
    } catch (err) {
      console.error("Oh no, error!", err);
    }
  }

describe("fs", () => {
    describe("writeFile", () => {
        it("should write the SVG file correctly and have the correct filename as well", (done) => {
            let threeLetters = "SVG";
            let textColor = "red";
            let shapeColor = "purple";
            const thisCircle = new Circle(threeLetters, textColor, shapeColor);
            
            const shapeSVGInfo = `
            <svg version ="1.1" width = "${thisCircle.width}" height = "${thisCircle.height}" xmlns="http://www.w3.org/2000/svg">
                ${thisCircle.render()}
        
            </svg>
                `;
                writeFile("logo.svg", shapeSVGInfo).then(() => {
                    expect(fs.readFileSync("logo.svg", { encoding: "utf8" })).toEqual(shapeSVGInfo);
                    done();
                  }).catch((err) => {
                    done(err);
                  })
    })}
            //running to the issue of writeFile not logging the success message once it writes the file,
            //this is because the expect statement is executing and finishing the test before writeFile finishes executing
            //to avoid this issue
    )})
*/


async function writeFile(fileName, data) {
    //need async so I can call await on writeFile, it needs to return a promise
    try {
      await fs.writeFile(fileName, data);
      //currently waiting on fs.writeFile() to write the file
      //if this fails, which means that writeFile rejects the promise (remember that writeFile is returning a promise because I am using fs/promises)
      //, if writeFile fails, the built in promise function in writeFile returns an error
      //this error will drop down and be caught by the catch (err)
      console.log("Successfully written the file!!");
    } catch (err) {
      console.error("Oh no, error!", err);
      //catches the error if fs.writeFile() fails
    }
  }
  
  describe("fs", () => {
    describe("writeFile", () => {
      it("should write the SVG file correctly and have the correct filename as well", async () => {
        //need async so that I can call await on the functions in here
        let threeLetters = "SVG";
        let textColor = "red";
        let shapeColor = "purple";
        const thisCircle = new Circle(threeLetters, textColor, shapeColor);
  
        const shapeSVGInfo = `
          <svg version ="1.1" width = "${thisCircle.width}" height = "${thisCircle.height}" xmlns="http://www.w3.org/2000/svg">
            ${thisCircle.render()}
          </svg>
        `;
        await writeFile("logo.svg", shapeSVGInfo);
        //wait on writeFile to either return a resolved or rejected promise, it wouldn't matter if it was resolved or rejected, but in this case, the rejection throws an error
        //if its rejected await will throw the error; however there is nothing here to handle the error so it would crash the application
        const fileContents = await fs.readFile("logo.svg", { encoding: "utf8" });
        //fileContents is holding the file data, not a buffer object, in this case because OF: { encoding: "utf8" } 
        expect(fileContents).toEqual(shapeSVGInfo);
      });
    });
  });