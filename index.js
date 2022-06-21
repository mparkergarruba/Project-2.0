let dealbtn = document.querySelector("#deal")
let revealBtn = document.querySelector("#reveal")
let placeBet = document.querySelector("#bet-form")

placeBet.addEventListener("submit", (event) => {
    event.preventDefault()
    let betAmount = document.querySelector("#bet-amount").value
    let betDisplay = document.querySelector("#bet-display")

    betDisplay.textContent = `$${betAmount} big smackaroos`
    placeBet.reset()
})

dealbtn.addEventListener("click", function() {
    fetch("http://deckofcardsapi.com/api/deck/new/draw/?count=5")
    .then(res => res.json())
    .then(data => {
        console.log(data);
        let pc1 = document.querySelector("#player1")
        let pc2 = document.querySelector("#player2")
        let pc3 = document.querySelector("#player3")
        let pc4 = document.querySelector("#player4")
        let pc5 = document.querySelector("#player5")


        let playerHand = [pc1, pc2, pc3, pc4, pc5]
        playerHand.forEach((card, index) => {
               if (index < 3) {
                card.src = data.cards[index].image
                 card.addEventListener("click", () => {
                     fetch(`http://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=1`)
                     .then(res => res.json())
                     .then(oneDraw => {
                        card.src = oneDraw.cards[0].image;
                     })
                 }, {once : true});
                } else {
                    card.src = "https://opengameart.org/sites/default/files/card%20back%20black.png"
                    
                    card.addEventListener("mouseenter", () => {
                    card.src = data.cards[index].image;
                    card.addEventListener("click", () => {
                         fetch(`http://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=1`)
                         .then(res => res.json())
                         .then(oneDraw => {
                            playerHand[index].src = oneDraw.cards[0].image;
                            data.cards[index] = oneDraw.cards[0];
                         })
                     }, {once : true});
                    })
                    
                    card.addEventListener("mouseleave", () => {
                        card.src = "https://opengameart.org/sites/default/files/card%20back%20black.png"
                    })  
                }
        })
      
        fetch(`http://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=5`)
        .then(res => res.json())
        .then(newData => {
        
            let aic1 = document.querySelector("#ai1")
            let aic2 = document.querySelector("#ai2")
            let aic3 = document.querySelector("#ai3")
            let aic4 = document.querySelector("#ai4")
            let aic5 = document.querySelector("#ai5")

            let dealerHand = [aic1, aic2, aic3, aic4, aic5]

            dealerHand.forEach((card, index) => {
                if (index < 3) {
                    card.src = newData.cards[index].image
                } else {
                    card.src = "https://opengameart.org/sites/default/files/card%20back%20black.png"
                    revealBtn.addEventListener("click", () => {
                        card.src = newData.cards[index].image
                    })
                }
            })
        })
    })
})