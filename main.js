const container = document.querySelector("#container");
let userSquareInput = 60;
const restartButton = document.querySelector("button");


// Create all the divs to fill up the container
function createSquareGrid(numberOfSquares) {
    // Calculate the size of the div
    // Use getComputedStyle to get the width of the container
    // applied to it from external css file. Otherwise it won't work.
    // parseFloat discards the 'px' value and gives only the number back
    const containerWidth = parseFloat(getComputedStyle(container).width);

    // Remove any existing child elements to start fresh
    container.innerHTML = "";

    const calculateWidthOfDiv = (containerWidth / numberOfSquares).toFixed(2) + "px";

    for (let i = 0; i < numberOfSquares * numberOfSquares; i++) {
        const square = document.createElement("div");
        square.style.minWidth = calculateWidthOfDiv;
        square.style.minHeight = calculateWidthOfDiv;
        square.style.opacity = 0;
        container.appendChild(square);  
    }

    // Select all divs in the container, but I don't need to be extra specific
    // because these are the only divs in the document.
    const divs = container.querySelectorAll("div");
    // iterate through each div and add a listener to it
    divs.forEach((div) => {
        div.addEventListener("mouseenter", hoverOverDivs);
    });
    
}


// Function to math randomize colors of the divs
function getRandomColor () {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;
}


// Function for what happens when mouse hovers over divs
function hoverOverDivs (event) {
    let div = event.target;
    div.style.backgroundColor = getRandomColor();

    // Get current opacity value and convert it to a number
    let currentOpacity = parseFloat(div.style.opacity);
    // Increase opacity by 0.1 ensuring it doesn't exceed 1
    currentOpacity = Math.min(currentOpacity + 0.1, 1);
    // Apply the new opacity value
    div.style.opacity = currentOpacity;
}




createSquareGrid(userSquareInput);


restartButton.addEventListener("click", () => {
    let validInput = false;
    while (!validInput) {
        let input = prompt("Enter the size of the new grid (max 100):");
        userSquareInput = parseInt(input, 10);

        if (!isNaN(userSquareInput) && userSquareInput > 0 && userSquareInput <= 100) {
            validInput = true;
            createSquareGrid(userSquareInput);
        } else {
            alert ("Please enter a valid number between 1 and 100")
        }

    }
});
