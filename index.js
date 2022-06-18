fetch("http://deckofcardsapi.com/api/deck/new/draw/?count=2")
.then(res => res.json())
.then(data => {
    console.log(data)
})