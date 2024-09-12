const gameContainer = document.getElementById('game-container');
const counterElement = document.getElementById('counter');
const gameTitle = document.getElementById('game-title');
const totalDots = 100;
let dotSequence = [];
let currentStep = 0;
let wrongAttempts = 0;

// Define multiple sequences with their associated colors
const sequences = [
    { sequence: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], color: '#ff6347' }, // Tomato
    { sequence: [90, 80, 70, 60, 50, 40, 30, 20, 10, 0], color: '#4682b4' }, // SteelBlue
    { sequence: [9, 19, 29, 39, 49, 59, 69, 79, 89, 99], color: '#32cd32' }, // LimeGreen
    { sequence: [99, 98, 97, 96, 95, 94, 93, 92, 91, 90], color: '#ff69b4' }, // HotPink
    { sequence: [0, 11, 22, 33, 44, 55, 66, 77, 88, 99], color: '#ffd700' }, // Gold
    { sequence: [99, 88, 77, 66, 55, 44, 33, 22, 11, 0], color: '#6a5acd' }, // SlateBlue
    { sequence: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19], color: '#ff4500' }, // OrangeRed
    { sequence: [81, 72, 63, 54, 45, 36, 27, 18, 9, 0], color: '#20b2aa' }, // LightSeaGreen
    { sequence: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90], color: '#9400d3' }, // DarkViolet
    { sequence: [9, 19, 29, 39, 49, 59, 69, 79, 89, 99], color: '#ffa07a' }  // LightSalmon
];

// Initialize game
initializeGame();

function initializeGame() {
    // Randomly select a sequence
    const randomIndex = Math.floor(Math.random() * sequences.length);
    const selectedSequence = sequences[randomIndex].sequence;
    const selectedColor = sequences[randomIndex].color;

    // Update the game title with the sequence ID
    gameTitle.innerText = `Dot Game - Sequence ID: ${randomIndex + 1}`;

    // Reset previous game state
    gameContainer.innerHTML = '';
    dotSequence = [];
    currentStep = 0;
    wrongAttempts = 0;
    counterElement.innerText = `Wrong Attempts: 0`;

    for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        dot.dataset.index = i;
        dot.style.backgroundColor = selectedColor; // Apply the sequence-specific color
        gameContainer.appendChild(dot);

        dotSequence.push({
            element: dot,
            isClicked: false
        });

        dot.addEventListener('click', () => handleDotClick(i, selectedSequence));
    }
}

function handleDotClick(index, selectedSequence) {
    const dotData = dotSequence[index];

    if (dotData.isClicked) return;

    if (index === selectedSequence[currentStep]) {
        dotData.isClicked = true;
        dotData.element.classList.add('clicked');
        dotData.element.style.visibility = 'hidden'; // Make the dot disappear
        currentStep++;

        if (checkWin(selectedSequence)) {
            alert('You Win! Moving to the next sequence.');
            initializeGame();
        }
    } else {
        wrongAttempts++;
        counterElement.innerText = `Wrong Attempts: ${wrongAttempts}`;
        
        if (wrongAttempts >= 3) {
            alert('Game Over! You made 3 wrong attempts.');
            initializeGame();
        }
    }
}

function checkWin(selectedSequence) {
    return currentStep === selectedSequence.length;
}
