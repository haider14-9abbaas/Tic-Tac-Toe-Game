let currentPlayer, player1, player2, gameActive;
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

document.getElementById('startButton').addEventListener('click', startGame);
document.getElementById('resetButton').addEventListener('click', resetGame);
document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', cellClicked);
});

function startGame() {
    player1 = document.getElementById('player1').value || 'Player 1';
    player2 = document.getElementById('player2').value || 'Player 2';
    currentPlayer = player1;
    gameActive = true;
   
    document.getElementById('game').classList.remove('hidden');
    document.getElementById('status').innerText = `${currentPlayer}'s Turn`;
    document.querySelectorAll('.cell').forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('filled');
    });
}

function cellClicked() {
    const cell = this;
    if (cell.classList.contains('filled') || !gameActive) return;

    cell.innerText = currentPlayer === player1 ? 'X' : 'O';
    cell.classList.add('filled');

    checkWinner();
}

function checkWinner() {
    const cells = document.querySelectorAll('.cell');
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (
            cells[a].innerText &&
            cells[a].innerText === cells[b].innerText &&
            cells[a].innerText === cells[c].innerText
        ) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        document.getElementById('status').innerText = `${currentPlayer} Wins! 🎉`;
        document.getElementById('status').classList.add('status-win');
        gameActive = false;
    } else if ([...cells].every(cell => cell.classList.contains('filled'))) {
        document.getElementById('status').innerText = 'Game Draw! 🤝';
        document.getElementById('status').classList.add('status-draw');
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
        document.getElementById('status').innerText = `${currentPlayer}'s Turn`;
    }
}

function resetGame() {
    document.getElementById('game').classList.add('hidden');
    document.getElementById('status').innerText = '';
    document.getElementById('status').classList.remove('status-win', 'status-draw');
    document.getElementById('player1').value = '';
    document.getElementById('player2').value = '';
}