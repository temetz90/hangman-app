class Hangman {
    constructor(word, guesses) {
    this.word = word.toLowerCase().split('')
    this.guesses = guesses
    this.guessedLetters = []
    this.status = 'Playing'
    }

    // function for getting puzzle
    getPuzzle() {
        let puzzle = ''

        this.word.forEach((letter) => {
            if (this.guessedLetters.includes(letter) || letter === ' ') {
                 puzzle += letter
                } else {
             puzzle += "*"
            }} )

        return puzzle
    } 

    // function that allows you to guess a letter
    guessLetter = function (letter) {
        if (this.status === 'Playing') {
            letter = letter.toLowerCase()
            const isUnique = !this.guessedLetters.includes(letter)
            const isBadGuess = !this.word.includes(letter)

            if (letter.length === 1 && isUnique) {
                this.guessedLetters.push(letter)
            }

            if (isUnique && isBadGuess) {
                this.guesses--
            }
        } else {
            return
        }

    } 

    // render the game to to window
    renderGameDom() {
        const puzzleEl = document.createElement('h2')
        const guessesEl = document.createElement('p')
        const remainingGuessesEl = document.createElement('p')
        const statusEl = document.createElement('h3')


        //set text content for each new element
        puzzleEl.textContent = this.getPuzzle();
        guessesEl.textContent = this.guessedLetters

        if (this.status === 'Playing') {
            remainingGuessesEl.textContent = `Guesses left: ${this.guesses}`
        } else if (this.status === 'Failed') {
            remainingGuessesEl.textContent = `Nice try! The word was "${this.word.join('')}".`
        } else if (this.status === 'Finished!') {
            remainingGuessesEl.textContent = 'Great work! You guessed the word correctly!'
        }

        statusEl.textContent = this.status

        //clear out the game div on each render
        document.querySelector('#game-space').innerHTML = ''

        //append the game space div with each new element
        document.querySelector('#game-space').appendChild(puzzleEl)
        document.querySelector('#game-space').appendChild(guessesEl) 
        document.querySelector('#game-space').appendChild(statusEl)
        document.querySelector('#game-space').appendChild(remainingGuessesEl)
    }

    // recalculate status of game  
    updateStatus() {
        const finished = this.word.every((letter) => this.guessedLetters.includes(letter) || letter === ' ')


        if (this.guesses === 0) {
            this.status = 'Failed'
        } else if (finished) {
            this.status = 'Finished!'
        } else {
            this.status = 'Playing'
        }
        }
}