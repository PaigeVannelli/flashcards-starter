class Card {
    constructor(id = 0, question = 'no queston', answers = ['no answers'], correctAnswer = 'no answer') {
        this.id = id; 
        this.question = question; 
        this.answers = answers;
        this.correctAnswer = correctAnswer 
    }
}

module.exports = Card;