const chai = require('chai');
const Card = require('../src/Card');
const Turn = require('../src/Turn');
const Round = require('../src/Round');
const testData = require('../src/test-data');
const Deck = require('../src/Deck');
const sampleDeck = testData.sampleDeck;
const expect = chai.expect;

describe('Round', function() {
    // let newDeck
    // console.log(testDeck)
    // beforeEach(funtion() {

    // }) 
    let newDeck
    beforeEach(() => {
        newDeck = sampleDeck.map(card => {
            return new Card(card.id, card.question, card.answers, card.correctAnswer)
          });
        newDeck = new Deck(newDeck)
        // newDeck = newDeck.map(card => {
        //     return new Card(card.id, card.question, card.answers, card.correctAnswer);
        // })
    });
    // let newDeck
    //  beforeEach(() => {
    //     newDeck = newDeck.map(card => {
    //         return new Card(card.id, card.question, card.answers, card.correctAnswer)
    //     })

    // })
      
    //   newDeck = new Deck(newDeck)

    it(`Should be a function`, function() {
        const round = new Round();
        expect(Round).to.be.a(`function`);
    });

    it(`should be an instance of Round`, function() {
        const round = new Round();
        expect(round).to.be.an.instanceOf(Round);
    })

    it(`should keep track of the deck`, function() {
        const round = new Round(newDeck);
        expect(round.deck).to.deep.equal(newDeck)
    })

    it(`should return the current card being played`, function() {
        // const card1 = newDeck[0]
        const round = new Round(newDeck);
        // round.returnCurrentCard();
        // console.log(round.returnCurrentCard(), newDeck, newDeck)
        expect(round.returnCurrentCard()).to.equal(newDeck.cards[0])
        // console.log(newDeck[0])

    })

    describe('takeTurn', function() {
    
        it(`should add one to turns for every round played`, function() {
            const round = new Round(newDeck);
    
            expect(round.turns).to.equal(0);
            
            round.takeTurn();
            round.takeTurn();
            round.takeTurn();
            
            expect(round.turns).to.equal(3);
        })
    
        it(`should make the next card in the array the current card`, function() {
            const round = new Round(newDeck);

            expect(round.returnCurrentCard()).to.equal(newDeck.cards[0])

            round.takeTurn();

            expect(round.returnCurrentCard()).to.equal(newDeck.cards[0]);
        })

        it(`should add the ids of incorrect guesses to in the array`, function() {
            const round = new Round(newDeck);
            
            expect(round.incorrectGuesses).to.deep.equal([]);

            round.returnCurrentCard();

            round.takeTurn('array');

            expect(round.incorrectGuesses[0]).to.equal(round.currentCard.id)
            // I need to make sure it's pushed into the array. I should also check a correct answer 
        })

        it(`should return feedback if guess is correct`, function() {
            const round = new Round(newDeck);

            expect(round.takeTurn('object')).to.equal('correct!');
        })

        it(`should return feedback if guess is incorrect`, function() {
            const round = new Round(newDeck);

            expect(round.takeTurn('array')).to.equal('incorrect!');
        })
    })

    it(`should return the percentage of correct guesses`, function() {
        const round = new Round(newDeck);
        round.takeTurn('object');
        round.takeTurn('object');
        round.takeTurn('mutator method');
        round.takeTurn('mutator method');
        round.takeTurn('iteration method');
        expect(round.calculatePercentCorrect()).to.equal(60)
        //Should test if I have 0 answers given or array length is 0
    })

    // it(`should end round when out of cards`, function() {
    //     const round = new Round(newDeck);
    //     round.takeTurn('object');
    //     round.takeTurn('object');
    //     round.takeTurn('mutator method');
    //     round.takeTurn('mutator method');
    //     round.takeTurn('iteration method');
    //     expect(round.endRound()).to.equal('** Round over!** You answered 60% of the questions correctly!')
    //     // expect(round.takeTurn('iteration method')).to.equal('** Round over!** You answered 60% of the questions correctly!')
    //     // Should it fire this.endRound by itself??
    // })
})
  