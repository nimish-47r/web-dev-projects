const selectionsButtons = document.querySelectorAll("[data-selection]");
const finalColumn = document.querySelector("[data-final-column]");
const computerScoreSpan = document.querySelector("[data-computer-score]");
const yourScoreSpan = document.querySelector("[data-your-score]");

const SELECTIONS = [
    {
        name: 'rock',
        emoji: '✊',
        beats: 'scissor'
    },
    {
        name: 'paper',
        emoji: '✋',
        beats: 'rock'
    },
    {
        name: 'scissor',
        emoji: '✌',
        beats: 'paper'
    }
];

selectionsButtons.forEach(selectionButton => {
    selectionButton.addEventListener('click', event => {
        const selectionName = selectionButton.dataset.selection;
        const selection = SELECTIONS.find(selection => selection.name === selectionName);
        makeSelection(selection);
    })
});

function makeSelection(selection) {
    const computerSelection = randomSelection();
    const youWinner = isWinner(selection, computerSelection);
    const computerWinner = isWinner(computerSelection, selection);

    addSelectionResult(computerSelection, computerWinner);
    addSelectionResult(selection, youWinner);

    if(youWinner) incrementScore(yourScoreSpan);
    if(computerWinner) incrementScore(computerScoreSpan);
}

function randomSelection() {
    const randomIndex = Math.floor(Math.random() * SELECTIONS.length);
    return SELECTIONS[randomIndex];
}

function incrementScore(scoreSpan) {
    scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1;
}

function isWinner(selection, opponentSelection) {
    return selection.beats === opponentSelection.name;
}

function addSelectionResult(selection, winner) {
    const div = document.createElement('div');
    div.innerText = selection.emoji;
    div.classList.add('result-selection');
    if (winner) div.classList.add('winner');
    finalColumn.after(div);
}