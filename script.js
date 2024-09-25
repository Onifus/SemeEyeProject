
/////////////////////////////////////////////////////////////////
//                                                             //
//                        Inicializace                         //
//                                                             //
/////////////////////////////////////////////////////////////////

cardArray = [
    ["ImageBasic/spodekkule.jpg", "ImageBasic/spodekzelene.jpg", "ImageBasic/spodekzaludy.jpg", "ImageBasic/spodeksrdce.jpg", 1],
    ["ImageBasic/kralkule.jpg", "ImageBasic/kralsrdce.jpg", "ImageBasic/kralzaludy.jpg", "ImageBasic/kralzelene.jpg", 2],
    ["ImageBasic/osmkule.jpg", "ImageBasic/osmsrdce.jpg", "ImageBasic/osmzelene.jpg", "ImageBasic/osmzaludy.jpg", 8],
    ["ImageBasic/sedmcervene.jpg", "ImageBasic/sedmkule.jpg", "ImageBasic/sedmzaludy.jpg", "ImageBasic/sedmzelene.jpg", 7],
    ["ImageBasic/desetkule.jpg", "ImageBasic/desetzelene.jpg", "ImageBasic/desetzaludy.jpg", "ImageBasic/desetsrdce.jpg", 10],
    ["ImageBasic/devetkule.jpg", "ImageBasic/devetzelene.jpg", "ImageBasic/devetzaludy.jpg", "ImageBasic/devetcervene.jpg", 9],
    ["ImageBasic/stojkakule.jpg", "ImageBasic/stojkacervene.jpg", "ImageBasic/stojkazaludy.jpg", "ImageBasic/stojkazelene.jpg", 11]
];

var moneyList = [1000, 100, 1000];

var playerStop = false;
var bitIsSet = false;
var over = false;
var bothStop = false;
var cardPick = false;
var topSecred = true;
var bitCheck = false;
var prohra = false;
var newGame = false;

var dealerCards = [];

var helpCounter = 0;
var dealerSum = 0;
var life = 3;
var value = 0;
var playerScore = 0;
var dealerScore = 0;

/////////////////////////////////////////////////////////////////
//                                                             //
//                       /Inicializace                         //
//                                                             //
/////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////
//                                                             //
//                           Player                            //
//                                                             //
/////////////////////////////////////////////////////////////////

function bit() {
    console.log("bit");
    if (cardPick) {
        if (!over) {
            if (!bitIsSet) {
                bitCheck = true;
                var bit = prompt("Zadej hodnoty své vsázky", "");
                var numberPattern = /^\d+$/; // Regulární výraz pro čísla
                if (helpCounter > 0) {
                    bitCheck = true;
                }
                helpCounter++;
                if (numberPattern.test(bit) && bit.length > 0 && bit <= moneyList[0]) {
                    document.getElementById('betValue').innerText = `${bit} KČ`;
                    document.getElementById('bank').innerText = `${bit} KČ`;
                    var totalcash = bit * 2;
                    document.getElementById('cash').innerText = `${totalcash} KČ`;
                    moneyList[life - 1] -= bit;
                    setMoney();
                    bitIsSet = true; // Zajistí, že uživatel nemůže vsadit znovu
                } else {
                    bit();
                }
            } else {
                alert("Sázka již byla zadaná");
            }
        } else {
            alert("Již jste ukončil hru");
        }
    } else {
        alert("Nemůžeš bez karty vsázet přeci");
    }
}


function getPlayerCard() {
    console.log("getPlayerCard");
    newGame = false;
    if (bitCheck) {
        if (helpCounter == 0) {
            bitCheck = false;
        }

        cardPick = true;
        if (!over) {
            const playerCardsContainer = document.querySelector('.player-cards');
            const newCardDiv = document.createElement('div');
            newCardDiv.classList.add('card');
            const cardImage = document.createElement('img');
            cardImage.src = getRandomCard(true);
            cardImage.alt = 'Karta hráče';
            newCardDiv.appendChild(cardImage);
            playerScore = value;
            document.getElementById('score').innerText = playerScore;
            playerCardsContainer.appendChild(newCardDiv);

        } else {
            alert("Již jste ukončil hru");
        }
    } else {
        alert("Prvně si vsad");
    }
}

function stop() {
    playerStop = true;
    while (1 === 1) {

        var rng = Math.random() * 99;
        if (rng > 50) {
            winnerCheck();
        } else {
            showDealerCards();
            bothStop = true;
            winnerCheck();
            break;
        }
    }
} 

/////////////////////////////////////////////////////////////////
//                                                             //
//                          /Player                            //
//                                                             //
/////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////
//                                                             //
//                           Dealer                            //
//                                                             //
/////////////////////////////////////////////////////////////////

function dealerGet() {
    console.log("dealerGet");
    const newCard = getRandomCard(); // Získáme náhodnou kartu
    dealerCards.push(newCard); // Přidáme do pole karet dealera

    const dealerCardsContainer = document.querySelector('.dealer-cards');
    const newCardDiv = document.createElement('div');
    newCardDiv.classList.add('card');

    const cardImage = document.createElement('img');
    cardImage.src = "ImageBasic/back.jpg"; // Zde bude zadní strana karty
    cardImage.alt = 'Karta bankéře';

    newCardDiv.appendChild(cardImage);
    dealerCardsContainer.appendChild(newCardDiv); // Přidáme div s kartou do dealerových karet
}

function showDealerCards() {
    const dealerCardsContainer = document.querySelector('.dealer-cards');
    const existingCardImages = dealerCardsContainer.querySelectorAll('img'); // Všechna existující místa pro karty
    document.getElementById('dealerscore').innerText = dealerScore;

    dealerCards.forEach((card, index) => {
        if (existingCardImages[index]) {
            // Pokud obrázek existuje, aktualizujeme zdroj na skutečnou kartu dealera
            existingCardImages[index].src = card; // V této části se použije skutečná karta
            existingCardImages[index].alt = 'Karta bankéře';
        }
    });

}

/////////////////////////////////////////////////////////////////
//                                                             //
//                          /Dealer                            //
//                                                             //
/////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////
//                                                             //
//                        Universal                            //
//                                                             //
/////////////////////////////////////////////////////////////////

function extractNumber(str) {
    console.log("extractNumber");
    const match = str.match(/\d+/); // Najde první číslo ve stringu
    return match ? parseInt(match[0], 10) : null; // Vrátí číslo nebo null, pokud nenajde číslo
}

function resetCardList() {
    console.log("resetCardList");
    if (topSecred) {
        cardArray = [];
        cardArray = [
            ["ImageZCU/spodekkule.jpg", "ImageZCU/spodekzelene.jpg", "ImageZCU/spodekzaludy.jpg", "ImageZCU/spodeksrdce.jpg", 1],
            ["ImageZCU/kralkule.jpg", "ImageZCU/kralsrdce.jpg", "ImageZCU/kralzaludy.jpg", "ImageZCU/kralzelene.jpg", 2],
            ["ImageZCU/osmkule.jpg", "ImageZCU/osmsrdce.jpg", "ImageZCU/osmzelene.jpg", "ImageZCU/osmzaludy.jpg", 8],
            ["ImageZCU/sedmcervene.jpg", "ImageZCU/sedmkule.jpg", "ImageZCU/sedmzaludy.jpg", "ImageZCU/sedmzelene.jpg", 7],
            ["ImageZCU/desetkule.jpg", "ImageZCU/desetzelene.jpg", "ImageZCU/desetzaludy.jpg", "ImageZCU/desetsrdce.jpg", 10],
            ["ImageZCU/devetkule.jpg", "ImageZCU/devetzelene.jpg", "ImageZCU/devetzaludy.jpg", "ImageZCU/devetcervene.jpg", 9],
            ["ImageZCU/stojkakule.jpg", "ImageZCU/stojkacervene.jpg", "ImageZCU/stojkazaludy.jpg", "ImageZCU/stojkazelene.jpg", 11]
        ];
    } else {
        cardArray = [];
        cardArray = [
            ["ImageBasic/spodekkule.jpg", "ImageBasic/spodekzelene.jpg", "ImageBasic/spodekzaludy.jpg", "ImageBasic/spodeksrdce.jpg", 1],
            ["ImageBasic/kralkule.jpg", "ImageBasic/kralsrdce.jpg", "ImageBasic/kralzaludy.jpg", "ImageBasic/kralzelene.jpg", 2],
            ["ImageBasic/osmkule.jpg", "ImageBasic/osmsrdce.jpg", "ImageBasic/osmzelene.jpg", "ImageBasic/osmzaludy.jpg", 8],
            ["ImageBasic/sedmcervene.jpg", "ImageBasic/sedmkule.jpg", "ImageBasic/sedmzaludy.jpg", "ImageBasic/sedmzelene.jpg", 7],
            ["ImageBasic/desetkule.jpg", "ImageBasic/desetzelene.jpg", "ImageBasic/desetzaludy.jpg", "ImageBasic/desetsrdce.jpg", 10],
            ["ImageBasic/devetkule.jpg", "ImageBasic/devetzelene.jpg", "ImageBasic/devetzaludy.jpg", "ImageBasic/devetcervene.jpg", 9],
            ["ImageBasic/stojkakule.jpg", "ImageBasic/stojkacervene.jpg", "ImageBasic/stojkazaludy.jpg", "ImageBasic/stojkazelene.jpg", 11]
        ];
    }

}
function init() {
    // enterMoney();
    setMoney();
    drawHPBar();
    bitCheck = true;

}

function getRandomCard(IsPlayer = false) {
    console.log("getRandomCard");
    // Vyber náhodný index pro cardArray
    const randomX = Math.floor(Math.random() * cardArray.length);

    // Získání hodnoty poslední pozice v poli (5. prvek)
    if (IsPlayer) {
        value += cardArray[randomX][cardArray[randomX].length - 1];
    } else {
        dealerScore += cardArray[randomX][cardArray[randomX].length - 1];
    }

    // Zjisti velikost druhého rozměru pole (počty karet), bez posledního prvku
    const numCards = cardArray[randomX].length - 1; // Odčítáme 1 pro hodnotu karty

    // Generování randomY mezi 0 a numCards - 1 (ne včetně posledního prvku)
    const randomY = Math.floor(Math.random() * numCards); // max je numCards - 1

    //console.log("Vybraný index x: " + randomX + " | Vybraný index y: " + randomY);
    //console.log("Poslední hodnota karty: " + value);
    midRoundCheck();
    // Odstranění karty ze seznamu
    const cardImage = cardArray[randomX].splice(randomY, 1)[0];

    return cardImage; // Vrať vybranou kartu
}

function resetGame() {
    console.log("resetGame");
    resetCardList();
    const playerCardsContainer = document.querySelector('.player-cards');
    playerCardsContainer.innerHTML = '';
    const dealerCardsContainer = document.querySelector('.dealer-cards');
    dealerCardsContainer.innerHTML = '';
    document.getElementById('score').innerText = 0;
    document.getElementById('money').innerText = 0;
    document.getElementById('betValue').innerText = "";
    over = false;
    playerScore = 0;
    life--;
    setMoney();
}

function resetGameAfterWin(isPlayer) {
    console.log("resetGameAfterWin");
    resetCardList();
    if (isPlayer) {
        prohra = false;
        bothStop = false;
        playerStop = false;
        newGame = true;
        playerScore = 0;
        dealerScore = 0;
        moneyList[life - 1] = moneyList[life - 1] + extractNumber(document.getElementById('cash').innerHTML);
        document.getElementById('cash').innerText = 0;
        document.getElementById('score').innerText = 0;
        document.getElementById('money').innerText = "";
        document.getElementById('money').innerText = `${moneyList[life - 1]} KČ`;
        document.getElementById('betValue').innerText = "";
        document.getElementById('bank').innerText = "0 KČ";
        document.getElementById('score').innerText = "0";
        document.getElementById('dealerscore').innerText = "0";
        const playerCardsContainer = document.querySelector('.player-cards');
        playerCardsContainer.innerHTML = '';
        const dealerCardsContainer = document.querySelector('.dealer-cards');
        dealerCardsContainer.innerHTML = '';
        console.log("----------------------------------------------");
    } else {
        newGame = true;
        bothStop = false;
        playerStop = false;
        prohra = false;
        playerScore = 0;
        dealerScore = 0;
        document.getElementById('cash').innerText = 0;
        document.getElementById('score').innerText = 0;
        document.getElementById('money').innerText = 0;
        document.getElementById('money').innerText = moneyList[life - 1];
        document.getElementById('betValue').innerText = "";
        document.getElementById('bank').innerText = "0 KČ";
        document.getElementById('score').innerText = "0";
        document.getElementById('dealerscore').innerText = "0";
        const playerCardsContainer = document.querySelector('.player-cards');
        playerCardsContainer.innerHTML = '';
        const dealerCardsContainer = document.querySelector('.dealer-cards');
        dealerCardsContainer.innerHTML = '';
        console.log("----------------------------------------------");
        

    }

}

function setMoney() {
    document.getElementById('money').innerText = `${moneyList[life - 1]} KČ`;
}

function enterMoney() {
    var person = prompt("Zadej svůj počáteční kapitál", "");
    var numberPattern = /^\d+$/; // Regulární výraz pro čísla

    if (numberPattern.test(person) && person.length > 0) {
        moneyList = [Math.round(person / 3), Math.round(person / 3), Math.round(person / 3)];
    } else {
        enterMoney();
    }
}

function drawHPBar() {
    const canvas = document.getElementById('hpBar');
    const ctx = canvas.getContext('2d');

    const hpWidth = (moneyList[life - 1] / moneyList[0]) * canvas.width;

    // Vymažeme předchozí bar (resetujeme canvas)
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Vykreslíme rámeček HP baru
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // Vykreslíme HP bar
    ctx.fillStyle = 'green'; // Barva HP (lze měnit podle stavu)
    ctx.fillRect(0, 0, hpWidth, canvas.height);
}

function winnerCheck() {
    console.log("winnerCheck");
    if (!prohra) {
        if (bitCheck) {
            if (!bothStop) {
                if (!playerStop) {
                    if (playerScore === 21) {
                        alert("player win 1");
                    } else if (playerScore > 21) {
                        alert("player lose 2");
                    } else {
                        getPlayerCard();
                    }
                }
                if (dealerScore === 21) {
                    alert("dealer win 3");
                    prohra = true;
                    resetGameAfterWin(false);
                } else if (dealerScore > 21) {
                    alert("player win");
                    prohra = true;
                    resetGameAfterWin(true);
                } else {
                    if (!newGame) {
                        dealerGet();
                    }

                }
            } else {
                if (playerScore == 21) {
                    alert("player win 5");
                    resetGameAfterWin(true);
                } else {
                    if (dealerScore > 21) {
                        alert("dealer lose 6");
                    } else if (dealerScore == 21) {
                        alert("dealer win 7");
                        prohra = true;
                        resetGameAfterWin(false);
                    } else if (playerScore == 21) {
                        alert("player win 8");
                    } else if (playerScore == dealerScore) {
                        alert("remíza");
                        //todo dokončit
                    } else if (dealerScore > playerScore) {
                        alert("dealer win 9");
                        prohra = true;
                        resetGameAfterWin(false);
                    } else {
                        alert("player win 10");
                        prohra = true;
                        resetGameAfterWin(true);
                    }
                }
            }
        } else {
            alert("Prvně si vsad");
        }
    }
}

function midRoundCheck() {
    console.log("midRoundCheck");
    if (playerScore == 21 && dealerScore == 21) {
        alert("plychta");
    }
    if (playerScore > 21) {
        alert("player lose 11");
        prohra = true;
        resetGameAfterWin(false);
    } else if (dealerScore > 21) {
        alert("dealer lose 12");
        prohra = true;
        resetGameAfterWin(true);
    }

}
init();

function leave() {
    over = true;
}

/////////////////////////////////////////////////////////////////
//                                                             //
//                        /Universal                           //
//                                                             //
/////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////
//                                                             //
//                           Cheats                            //
//                                                             //
/////////////////////////////////////////////////////////////////
function secredDesign() {
    topSecred = true;
    cardArray = [];
    cardArray = [
        ["ImageZCU/spodekkule.jpg", "ImageZCU/spodekzelene.jpg", "ImageZCU/spodekzaludy.jpg", "ImageZCU/spodeksrdce.jpg", 1],
        ["ImageZCU/kralkule.jpg", "ImageZCU/kralsrdce.jpg", "ImageZCU/kralzaludy.jpg", "ImageZCU/kralzelene.jpg", 2],
        ["ImageZCU/osmkule.jpg", "ImageZCU/osmsrdce.jpg", "ImageZCU/osmzelene.jpg", "ImageZCU/osmzaludy.jpg", 8],
        ["ImageZCU/sedmcervene.jpg", "ImageZCU/sedmkule.jpg", "ImageZCU/sedmzaludy.jpg", "ImageZCU/sedmzelene.jpg", 7],
        ["ImageZCU/desetkule.jpg", "ImageZCU/desetzelene.jpg", "ImageZCU/desetzaludy.jpg", "ImageZCU/desetsrdce.jpg", 10],
        ["ImageZCU/devetkule.jpg", "ImageZCU/devetzelene.jpg", "ImageZCU/devetzaludy.jpg", "ImageZCU/devetcervene.jpg", 9],
        ["ImageZCU/stojkakule.jpg", "ImageZCU/stojkacervene.jpg", "ImageZCU/stojkazaludy.jpg", "ImageZCU/stojkazelene.jpg", 11]
    ];
    console.log("Cheat Active: Design change");
}

/////////////////////////////////////////////////////////////////
//                                                             //
//                          /Cheats                            //
//                                                             //
/////////////////////////////////////////////////////////////////
