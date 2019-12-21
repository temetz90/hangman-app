const puzzleEl = document.querySelector('#puzzle')
const guessesEl = document.querySelector('#guesses')
const guessedLettersEl = document.querySelector('#guessedLetters')
let game1

const render = () => {
    puzzleEl.innerHTML = ''
    guessesEl.textContent = game1.statusMessage
    
    game1.puzzle.split('').forEach((letter) => {
        const letterEl = document.createElement('span')
        letterEl.textContent = letter
        puzzleEl.appendChild(letterEl)
    })

    guessedLettersEl.textContent = 'Current Guesses: ' + game1.guessedLetters.join(', ').toUpperCase()
}

window.addEventListener('keypress', (e) => {
    const guess = String.fromCharCode(e.charCode)
    game1.makeGuess(guess)
    render()
})

const startGame = async () => {
    const puzzle = await getPuzzle('2')
    game1 = new Hangman(puzzle, Math.floor(puzzle.length / 3) + 2)
    render()
}

document.querySelector('#reset').addEventListener('click', startGame)

startGame()