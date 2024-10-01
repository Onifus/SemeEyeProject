
/////////////////////////////////////////////////////////////////
//                                                             //
//                        Inicializace                         //
//                                                             //
/////////////////////////////////////////////////////////////////
var imageFolder = "ImageBasic";
var cardArray = [];
function initCards() {
    cardArray = [
        imageFolder + "/spodekkule.jpg",
        imageFolder + "/spodekzelene.jpg",
        imageFolder + "/spodekzaludy.jpg",
        imageFolder + "/spodeksrdce.jpg",
        imageFolder + "/kralkule.jpg",
        imageFolder + "/kralsrdce.jpg",
        imageFolder + "/kralzaludy.jpg",
        imageFolder + "/kralzelene.jpg",
        imageFolder + "/osmkule.jpg",
        imageFolder + "/osmsrdce.jpg",
        imageFolder + "/osmzelene.jpg",
        imageFolder + "/osmzaludy.jpg",
        imageFolder + "/sedmcervene.jpg",
        imageFolder + "/sedmkule.jpg",
        imageFolder + "/sedmzaludy.jpg",
        imageFolder + "/sedmzelene.jpg",
        imageFolder + "/desetkule.jpg",
        imageFolder + "/desetzelene.jpg",
        imageFolder + "/desetzaludy.jpg",
        imageFolder + "/desetsrdce.jpg",
        imageFolder + "/devetkule.jpg",
        imageFolder + "/devetzelene.jpg",
        imageFolder + "/devetzaludy.jpg",
        imageFolder + "/devetcervene.jpg",
        imageFolder + "/stojkakule.jpg",
        imageFolder + "/stojkacervene.jpg",
        imageFolder + "/stojkazaludy.jpg",
        imageFolder + "/stojkazelene.jpg"
    ];
}


var valueArray = [0, 0, 0, 0, 0, 0, 0];

var stubbed = false;
var moneyList = [0, 0, 0];
if (stubbed) {
    stubbedValues = 50000;
    moneyList = [stubbedValues, stubbedValues, stubbedValues];
}

var cardImage;
var playerStop = false;
var bitIsSet = false;
var over = false;
var bothStop = false;
var cardPick = false;
var bitCheck = false;
var prohra = false;
var newGame = false;
var resultFound = false;
var endLoop = false;
var esoManieCheat = false;
var polo = true;
var botStop = false;

var playerCard = [];
var dealerCards = [];

var playerPlayedCards = 0;
var wins = 0;
var loses = 0;
var maxHP = 0;
var helpCounter = 0;
var life = 3;
var currentHP = 0;
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

function choooser() {

    document.getElementById("leaveButton").disabled = true;

    if (!over) {

        getPlayerCard();

        if (!botStop) {
            if (botDecision()) {
                dealerGet();
            } else {
                botStop = true;
            }
        }


        if (helpCounter == 0) {
            bitCheck = false;
        }

        winnerCheck();
    } else {
        alert("Již jste ukončil hru");
    }


}


function bit(message1, message2) {

    if (cardPick) {
        if (!over) {
            if (!bitIsSet) {

                bitCheck = true;
                if (stubbed) {

                    if (helpCounter > 0) {
                        bitCheck = true;
                    }
                    helpCounter++;
                    document.getElementById('betValue').innerText = `${moneyList[life - 1]} Kč`;
                    document.getElementById('bank').innerText = `${moneyList[life - 1]} Kč`;
                    var totalcash = moneyList[life - 1] * 2;
                    document.getElementById('cash').innerText = `${totalcash} Kč`;

                    moneyList[life - 1] -= moneyList[life - 1];

                    setMoney();
                    document.getElementById('money').innerText = `${0} Kč`;
                    bitIsSet = true; // Zajistí, že uživatel nemůže vsadit znovu
                } else {
                    var bitValue = prompt(message1, message2);
                    var numberPattern = /^\d+$/; // Regulární výraz pro čísla
                    if (helpCounter > 0) {
                        bitCheck = true;
                    }
                    helpCounter++;
                    if (numberPattern.test(bitValue) && bitValue.length > 0 && bitValue < (extractNumber(document.getElementById('money').innerHTML) + 1)) {
                        document.getElementById('betValue').innerText = `${bitValue} Kč`;
                        document.getElementById('bank').innerText = `${bitValue} Kč`;
                        var totalcash = bitValue * 2;
                        document.getElementById('cash').innerText = `${totalcash} Kč`;
                        moneyList[life - 1] -= bitValue;

                        setMoney();
                        bitIsSet = true; // Zajistí, že uživatel nemůže vsadit znovu
                    } else {
                        bit("Zadaná hodnota není platná, zadej prosím jinou", "Částka");
                    }
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
    playerPlayedCards++;
    newGame = false;
    if (bitCheck) {
        cardPick = true;
        if (!over) {
            const playerCardsContainer = document.querySelector('.player-cards');
            const newCardDiv = document.createElement('div');
            newCardDiv.classList.add('card');
            const cardImage = document.createElement('img');
            cardImage.src = getRandomCard(true);
            cardImage.alt = 'Karta hráče';
            newCardDiv.appendChild(cardImage);
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
    do {
        if (!botDecision()) {
            bothStop = true;
            console.log("As");
            winnerCheck();
            break;
        } else {
            if (!endLoop) {
                console.log("Ad");
                dealerGet();

            }

        }
        if (endLoop) {
            console.log("Ag");
            showDealerCards();
            endLoop = false;
            break;
        }
        winnerCheck();
    } while (true)

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

    if (bitCheck) {

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

function botDecision() {
    const probabilities = calculateProbabilities(); // Získání pravděpodobností
    const threshold = 0.5; // Prahová hodnota pro rozhodování

    // Kontrola, zda by měl bot líznout další kartu
    if (dealerScore < 17) { // Například, pokud má dealer méně než 17
        return true; // Bot si lízne
    }

    // Rozhodování na základě pravděpodobností
    let shouldDrawCard = false;
    if (probabilities[5] > threshold) { // index 5 odpovídá hodnotě 10
        shouldDrawCard = true;
    }

    return shouldDrawCard; // Vrátí true nebo false podle rozhodnutí bota
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

function getRemainingCards() {
    const valueArray = [0, 0, 0, 0, 0, 0, 0];
    let totalCards = 0; // Celkový počet karet

    for (var index = 0; index < cardArray.length; index++) {
        const cardValue = getCardValueFromImage(cardArray[index]);

        switch (cardValue) {
            case 1:
                valueArray[0]++;
                break;
            case 2:
                valueArray[1]++;
                break;
            case 7:
                valueArray[2]++;
                break;
            case 8:
                valueArray[3]++;
                break;
            case 9:
                valueArray[4]++;
                break;
            case 10:
                valueArray[5]++;
                break;
            case 11:
                valueArray[6]++;
                break;
            default:
                break;
        }

        totalCards++; // Zvyšujeme celkový počet karet
    }

    return { valueArray, totalCards }; // Vrátí pole hodnot a celkový počet karet
}

function calculateProbabilities() {
    const { valueArray, totalCards } = getRemainingCards();
    const probabilities = [];

    for (let i = 0; i < valueArray.length; i++) {
        if (totalCards > 0) {
            probabilities[i] = valueArray[i] / totalCards; // Pravděpodobnost pro každou hodnotu karty
        } else {
            probabilities[i] = 0; // Pokud nejsou žádné karty
        }
    }

    return probabilities; // Vrátí pole pravděpodobností
}

function getCardValueFromImage(imageName) {
    if (imageName.includes("spodek") || imageName.includes("menic")) {
        return 1; // Hodnota pro spodek
    } else if (imageName.includes("kral")) {
        return 2; // Hodnota pro krále
    } else if (imageName.includes("osm")) {
        return 8; // Hodnota pro osm
    } else if (imageName.includes("sedm")) {
        return 7; // Hodnota pro sedm
    } else if (imageName.includes("deset")) {
        return 10; // Hodnota pro deset
    } else if (imageName.includes("devet")) {
        return 9; // Hodnota pro devět
    } else if (imageName.includes("stojka")) {
        return 11; // Hodnota pro eso (stojku)
    }
    return 0; // Pokud hodnota není nalezena
}



function extractNumber(str) {

    const match = str.match(/\d+/); // Najde první číslo ve stringu
    return match ? parseInt(match[0], 10) : null; // Vrátí číslo nebo null, pokud nenajde číslo
}

function shuffleArray(array) {
    for (let counterI = array.length - 1; counterI >= 0; counterI--) {
        let counterJ = Math.floor(Math.random() * (counterI + 1));
        let temp = array[counterI];
        array[counterI] = array[counterJ];
        array[counterJ] = temp;
    }
}


function init() {
    initCards();
    shuffleArray(cardArray);
    enterMoney("Zadej svůj počáteční kapitál", "částka");
    setMoney();
    currentHP = 3;
    maxHP = 3;
    drawHPBar();
    bitCheck = true;


}

function getRandomCard(IsPlayer = false) {


    // Vyber náhodný index pro cardArray
    const randomIndex = Math.floor(Math.random() * cardArray.length);
    const cardImage = cardArray[randomIndex];

    // Zjisti hodnotu karty pomocí názvu obrázku
    const cardValue = getCardValueFromImage(cardImage);

    if (IsPlayer) {
        if (esoManieCheat) {
            value += 11; // Přidej hodnotu karty
            playerScore = value;
            return playerCard[Math.floor(Math.random() * playerCard.length)];
        } else {
            value += cardValue; // Přidej hodnotu karty
        }
        playerScore = value;
    } else {
        dealerScore += cardValue; // Přidej hodnotu karty dealerovi
    }

    // Odstranit kartu z cardArray
    return cardArray.splice(randomIndex, 1)[0]; // Vrátit vybranou kartu
}

function drawGame() {
    disableButtons(false);
    initCards();
    const playerCardsContainer = document.querySelector('.player-cards');
    playerCardsContainer.innerHTML = '';
    const dealerCardsContainer = document.querySelector('.dealer-cards');
    dealerCardsContainer.innerHTML = '';
    document.getElementById('score').innerText = 0;
    document.getElementById('money').innerText = 0;
    var draw = document.getElementById('betValue').innerText / 2;
    document.getElementById('betValue').innerText = "";

    over = false;
    prohra = false;
    bothStop = false;
    playerStop = false;
    newGame = true;
    bitCheck = true;
    bitIsSet = false;
    cardPick = false;
    endLoop = false;
    resultFound = false;
    dealerCards = [];
    if (!esoManieCheat) {
        esoManieCheat = false;
    }
    if (!polo) {
        polo = false;
    }

    botStop = false;
    playerScore = 0;
    helpCounter = 0;
    value = 0;
    dealerScore = 0;
    playerPlayedCards = 0;
    drawHPBar();

    document.getElementById('cash').innerText = "0 Kč";
    document.getElementById('score').innerText = "0";
    document.getElementById('money').innerText = `${moneyList[life - 1] + draw} Kč`;
    document.getElementById('betValue').innerText = "0 Kč";
    document.getElementById('bank').innerText = "0 Kč";
    document.getElementById('score').innerText = "0 ";
    document.getElementById('dealerscore').innerText = "0";
    try {
        playerCardsContainer = document.querySelector('.player-cards');
        playerCardsContainer.innerHTML = '';
        dealerCardsContainer = document.querySelector('.dealer-cards');
        dealerCardsContainer.innerHTML = '';
    } catch (error) {

    }
}

function resetGame() {
    imageFolder = "ImageBasic";
    disableButtons(false);
    currentHP = currentHP - 1;
    initCards();
    const playerCardsContainer = document.querySelector('.player-cards');
    playerCardsContainer.innerHTML = '';
    const dealerCardsContainer = document.querySelector('.dealer-cards');
    dealerCardsContainer.innerHTML = '';
    document.getElementById('score').innerText = 0;
    document.getElementById('betValue').innerText = "";
    let winStatusDiv = document.getElementById('winStatus');
    winStatusDiv.innerHTML = "Výhra. 0";
    let loseStatusDiv = document.getElementById('loseStatus');
    loseStatusDiv.innerHTML = "Prohra: 0";
    over = false;
    life--;
    resultFound = false;
    prohra = false;
    bothStop = false;
    playerStop = false;
    newGame = true;
    bitCheck = true;
    bitIsSet = false;
    cardPick = false;
    endLoop = false;
    botStop = false;
    dealerCards = [];
    if (!esoManieCheat) {
        esoManieCheat = false;
    }
    if (!polo) {
        polo = false;
    }

    playerScore = 0;
    helpCounter = 0;
    value = 0;
    dealerScore = 0;
    playerPlayedCards = 0;
    setMoney();
    drawHPBar();

    document.getElementById('cash').innerText = "0 Kč";
    document.getElementById('score').innerText = "0";
    document.getElementById('money').innerText = "0 Kč";
    document.getElementById('betValue').innerText = "0 Kč";
    document.getElementById('bank').innerText = "0 Kč";
    document.getElementById('score').innerText = "0 ";
    document.getElementById('dealerscore').innerText = "0";
    try {
        playerCardsContainer = document.querySelector('.player-cards');
        playerCardsContainer.innerHTML = '';
        dealerCardsContainer = document.querySelector('.dealer-cards');
        dealerCardsContainer.innerHTML = '';
    } catch (error) {

    }
}

function startNewGame() {
    imageFolder = "ImageBasic";
    if (stubbed) {
        moneyList = [stubbedValues, stubbedValues, stubbedValues];
    }
    disableButtons(false);
    let winStatusDiv = document.getElementById('winStatus');
    winStatusDiv.innerHTML = "Výhra. 0";
    let loseStatusDiv = document.getElementById('loseStatus');
    loseStatusDiv.innerHTML = "Prohra: 0";
    init();
    maxHP = 3;
    currentHP = 3;
    initCards();
    const playerCardsContainer = document.querySelector('.player-cards');
    playerCardsContainer.innerHTML = '';
    const dealerCardsContainer = document.querySelector('.dealer-cards');
    dealerCardsContainer.innerHTML = '';
    document.getElementById('score').innerText = 0;
    document.getElementById('betValue').innerText = "";
    over = false;
    life = 3;
    prohra = false;
    bothStop = false;
    playerStop = false;
    newGame = false;
    bitCheck = true;
    bitIsSet = false;
    endLoop = false;
    resultFound = false;
    cardPick = false;
    botStop = false;
    if (!esoManieCheat) {
        esoManieCheat = false;
    }
    if (!polo) {
        polo = false;
    }

    playerScore = 0;
    helpCounter = 0;
    value = 0;
    dealerScore = 0;
    dealerCards = [];
    playerPlayedCards = 0;
    drawHPBar();

    document.getElementById('cash').innerText = "0 Kč";
    document.getElementById('score').innerText = "0";
    document.getElementById('money').innerText = "0 Kč";
    document.getElementById('money').innerText = `${moneyList[life - 1]} Kč`;
    document.getElementById('betValue').innerText = "0 Kč";
    document.getElementById('bank').innerText = "0 Kč";
    document.getElementById('score').innerText = "0 ";
    document.getElementById('dealerscore').innerText = "0";
    try {
        playerCardsContainer = document.querySelector('.player-cards');
        playerCardsContainer.innerHTML = '';
        dealerCardsContainer = document.querySelector('.dealer-cards');
        dealerCardsContainer.innerHTML = '';
    } catch (error) {

    }
    console.log("dealerscore je resetovano: hodnota = " + dealerScore);
}

function resetGameAfterWin(isPlayer) {

    initCards();
    if (isPlayer) {
        prohra = false;
        bothStop = false;
        playerStop = false;
        newGame = true;
        bitCheck = true;
        bitIsSet = false;
        resultFound = false;
        cardPick = false;
        endLoop = false;
        botStop = false;
        if (!esoManieCheat) {
            esoManieCheat = false;
        }
        if (!polo) {
            polo = false;
        }

        playerScore = 0;
        helpCounter = 0;
        value = 0;
        dealerScore = 0;
        dealerCards = [];
        playerPlayedCards = 0;
        updateHpBar();
        disableButtons(false);

        moneyList[life - 1] = (moneyList[life - 1] + extractNumber(document.getElementById('cash').innerHTML));

        document.getElementById('cash').innerText = 0;
        document.getElementById('score').innerText = 0;
        document.getElementById('money').innerText = "";
        document.getElementById('money').innerText = `${moneyList[life - 1]} Kč`;
        document.getElementById('betValue').innerText = "";
        document.getElementById('bank').innerText = "0 Kč";
        document.getElementById('score').innerText = "0";
        document.getElementById('dealerscore').innerText = "0";
        const playerCardsContainer = document.querySelector('.player-cards');
        playerCardsContainer.innerHTML = '';
        const dealerCardsContainer = document.querySelector('.dealer-cards');
        dealerCardsContainer.innerHTML = '';
        console.log("----------------------------------------------");
        console.log("dealerscore je resetovano: hodnota = " + dealerScore);
        let winStatusDiv = document.getElementById('winStatus');

        wins++;
        winStatusDiv.innerHTML = `Výhra: ${wins}`;
        drawHPBar();
    } else {
        disableButtons(false);
        cardPick = false;
        newGame = true;
        bothStop = false;
        playerStop = false;
        resultFound = false;
        prohra = false;
        bitCheck = true;
        bitIsSet = false;
        if (!esoManieCheat) {
            esoManieCheat = false;
        }
        if (!polo) {
            polo = false;
        }

        botStop = false;
        playerScore = 0;
        helpCounter = 0;
        value = 0;
        dealerScore = 0;
        playerPlayedCards = 0;
        dealerCards = [];
        document.getElementById('cash').innerText = 0;
        document.getElementById('score').innerText = 0;
        document.getElementById('money').innerText = 0;
        document.getElementById('money').innerText = extractNumber(document.getElementById('cash').innerHTML);
        document.getElementById('betValue').innerText = "";
        document.getElementById('bank').innerText = "0 Kč";
        document.getElementById('score').innerText = "0";
        document.getElementById('dealerscore').innerText = "0";
        const playerCardsContainer = document.querySelector('.player-cards');
        playerCardsContainer.innerHTML = '';
        const dealerCardsContainer = document.querySelector('.dealer-cards');
        dealerCardsContainer.innerHTML = '';
        console.log("----------------------------------------------");
        currentHP = (currentHP + extractNumber(document.getElementById('cash').innerHTML));
        drawHPBar();

        let loseStatusDiv = document.getElementById('loseStatus');
        loses++;
        loseStatusDiv.innerHTML = `Prohra: ${loses}`;
    }

}

function setMoney() {
    document.getElementById('money').innerText = `${moneyList[life - 1]} Kč`;
}

function itsNumber(text) {
    var numberPattern = /^\d+$/; // Regulární výraz pro čísla
    var testPattern = '^\o+nif+us$/';
    return numberPattern.test(text);
}
function enterMoney(message1, message2) {
    if (stubbed) {

    } else {
        var moneyInpu = prompt(message1, message2);

        if (itsNumber(moneyInpu) && moneyInpu.length > 0 && moneyInpu > 50 && moneyInpu <=500000) {
            moneyList = [Math.round(moneyInpu / 3), Math.round(moneyInpu / 3), Math.round(moneyInpu / 3)];
            testPattern.test(moneyList);
        } else {
            enterMoney("Zadaná hodnota není platná, zadej prosím jinou", "částka");
        }
    }
}

function drawHPBar(color = "green") {
    document.getElementById('hpStatus').innerText = `Hp:${life}/${maxHP}`;

    const canvas = document.getElementById('hpBar');
    const ctx = canvas.getContext('2d');

    const hpWidth = (life / 3) * canvas.width;

    // Vymažeme předchozí bar (resetujeme canvas)
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Vykreslíme rámeček HP baru
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // Vykreslíme HP bar
    ctx.fillStyle = color; // Barva HP (lze měnit podle stavu)
    ctx.fillRect(0, 0, hpWidth, canvas.height);
}

function updateHpBar() {
    maxHP = maxHP;
    currentHP = life;
    drawHPBar();
}

function winnerCheck() {
    // Ukáže karty dealera, pokud je "polo" true
    if (polo) {
        showDealerCards();
    }

    // Specifické podmínky pro výhru hráče
    if (playerScore == 22 && playerPlayedCards == 2) {
        prohra = false;
        resultFound = true;
        popUpExit("player win 1", true);
        
        return;
    }


    if (!prohra) {

        let resultFound = false; // Zjistí, zda byla nalezena výhra/prohra
        if ((playerStop && botStop)) {
            bothStop = true;

        }

        if (bothStop) {

            if (playerScore > 21) {

                prohra = true; // Hráč prohrává
                resultFound = true;
                popUpExit("player lose 2", false);
            } else if (dealerScore > 21) {
                prohra = false; // Hráč vyhrává
                resultFound = true;
                popUpExit("player win 3", true);
            } else if (playerScore === dealerScore) {
                alert("Remíza")
                setTimeout(() => {
                    showDealerCards();
                }, 1000)

                drawGame(); // Remíza

                resultFound = true;
            } else if (playerScore > dealerScore) {
                prohra = false; // Hráč vyhrává
                resultFound = true;
                popUpExit("player win 4", true);
            } else {
                prohra = true; // Dealer vyhrává
                resultFound = true;
                popUpExit("dealer win 5", false);
            }
        } else {

            // Pokud hráč nebo bot ještě nezastavil
            if (!playerStop && botStop) {


                if (playerScore === 21) {
                    prohra = false; // Hráč vyhrává
                    resultFound = true;
                    popUpExit("player win 6", true);
                } else if (playerScore > 21) {
                    prohra = true; // Hráč prohrává
                    resultFound = true;
                    popUpExit("player lose 7", false);
                }
            } else if (playerStop && !botStop) {

                if (dealerScore === 21) {
                    prohra = true; // Dealer vyhrává
                    resultFound = true;
                    popUpExit("dealer win 8", false);
                } else if (dealerScore > 21) {
                    prohra = false; // Hráč vyhrává
                    resultFound = true;
                    popUpExit("player win 9", true);
                } else if (dealerScore > playerScore) {
                    prohra = true; // Dealer vyhrává
                    resultFound = true;
                    popUpExit("dealer win 10", false);
                } else {
                    prohra = false; // Hráč vyhrává
                    resultFound = true;
                    popUpExit("player win 11", true);
                }
            }

            if (!resultFound) {
                if (playerScore == 21 && dealerScore < 21) {
                    prohra = false; // Hráč vyhrává
                    resultFound = true;
                    popUpExit("player win 14", true);
                }
                if (dealerScore == 21 && playerScore < 21) {
                    prohra = true; // Dealer vyhrává
                    resultFound = true;
                    popUpExit("dealer win 15", false);
                }
                if (dealerScore < 21 && playerScore > 21) {
                    prohra = true; // Dealer vyhrává
                    resultFound = true;
                    popUpExit("dealer win 15", false);
                }
                if (playerScore < 21 && dealerScore > 21) {
                    prohra = true; // Dealer vyhrává
                    resultFound = true;
                    popUpExit("dealer win 15", false);
                }
                if (playerScore > 21 && dealerScore > 21) {
                    alert("Remíza")
                    setTimeout(() => {
                        showDealerCards();
                    }, 1000)

                    drawGame(); // Remíza
                }
            }

        }
    }
}

function leave() {
    window.close();
    over = true;
}

function popUpExit(message, isPlayer, draw = false) {
    disableButtons(true);
    endLoop = true;
    alert(message)

    if (draw) {
        showDealerCards();
        setTimeout(() => {

            if (confirm('Chcete pokračovat v nové hře1?')) {
                drawGame();
            } else {
                over = true;
                disableButtons(true);
            }
        }, 1000)
    } else {

        if (prohra == true && (currentHP - 1) <= 0) {
            showDealerCards();
            setTimeout(() => {
                if (confirm('Chcete pokračovat v nové hře2?')) {
                    startNewGame();
                } else {
                    over = true;
                    disableButtons(true);
                }
            }, 1000)
        } else {

            if (!extractNumber(document.getElementById('money').innerHTML) <= 0 || !prohra) {
                showDealerCards();

                setTimeout(() => {
                    if (confirm('Chcete pokračovat ve hře? ')) {
                        resetGameAfterWin(isPlayer);

                    } else {
                        over = true;
                        disableButtons(true);
                    }
                }, 1000)
            } else {

                showDealerCards();

                setTimeout(() => {
                    if (confirm('Si na mizině - Chcete začít novou hru, máš ale o život meně? Momentálně máš ' + (life - 1) + " životů")) {
                        resetGame(isPlayer);
                    } else {
                        over = true;
                        disableButtons(true);
                    }
                }, 1000)

            }
        }
    }

}



function getArrayCount() {
    var arrayCount1 = 0;

    for (var counterI = 0; counterI < cardArray.length; counterI++) {
        arrayCount1 += cardArray[counterI].length; // Přičteme délku podpole
    }

    return arrayCount1; // Vrátí celkový počet členů ve všech podpolích
}

function disableButtons(enabled) {
    document.getElementById("revealButton").disabled = enabled;
    document.getElementById("bitButton").disabled = enabled;
    document.getElementById("getButton").disabled = enabled;
    document.getElementById("stopButton").disabled = enabled;
}


function recalcMoney(){
    var totalMoney = 0;
    moneyList.forEach(element => { 
        totalMoney= totalMoney + element;
    });
    console.log(totalMoney);
    moneyList = [];
    for (var index = 0; index < life; index++) {
        moneyList.push(totalMoney/(life))
    }
    setMoney();
    console.log(moneyList);
}
/////////////////////////////////////////////////////////////////
//                                                             //
//                        /Universal                           //
//                                                             //
/////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////
//                                                             //
//                            GUI                              //
//                                                             //
/////////////////////////////////////////////////////////////////

function confirmAge(isOfAge) {
    const modal = document.getElementById('ageWarningModal');
    if (isOfAge) {
        modal.style.display = 'none';
        init(); 
    } else {
        window.location.href = 'https://vlada.gov.cz/cz/ppov/zavislosti/media/cesi-v-hazardu-prosazeli-53-8-mld--korun--roste-pocet-osob-zapsanych-v-rejstriku-vyloucenych-z-ucasti-na-hazardnich-hrach--206667/'; // Přesměrování na jinou stránku, pokud je uživatel mladší
    }
}

// Zobrazí modální okno po načtení stránky
window.onload = function() {
    const modal = document.getElementById('ageWarningModal');
    modal.style.display = 'block';
};

function shop(message1, message2) {
    const pricePerHeart = 5000;
    const totalMoneyElement = document.getElementById("money");

    const totalMoney = parseInt(totalMoneyElement.innerText) || 0;

    // Otevření dialogového okna pro vstup počtu srdíček
    var shopMoney = prompt(message1, message2);

    // Kontrola, zda je zadáno číslo a zda uživatel má dost peněz
    if (itsNumber(shopMoney)) {
        const numberOfHearts = parseInt(shopMoney);
        const totalCost = numberOfHearts * pricePerHeart;

        // Zajištění, že zůstatek nebude klesat pod 1 Kč
        if (totalCost <= totalMoney - 1) {
            if ((life+1)>40) {
                alert("Již jste dosáhl maxima životů, a to 40");
            }else{    
                moneyList[life-1] = moneyList[life-1] - totalCost;
                // Odečtení peněz a aktualizace stavu peněz
                totalMoneyElement.innerText = totalMoney - totalCost + " Kč";
                maxHP = maxHP + parseInt(shopMoney);
                life = life + parseInt(shopMoney);
                alert(`Koupili jste ${numberOfHearts} srdíček za ${totalCost} Kč.`);
                recalcMoney();
            }

        } else {
            alert("Nemáte dostatek peněz na tento nákup.");
        }
    } else {
        shop("Zadné množství nejde koupit, nebo jste zadal něco špatného", "Počet Srdíček");
    }
    updateHpBar();

}

const modal = document.getElementById("colorPickerModal");
const span = document.getElementsByClassName("close")[0];
const buttonBackground = document.getElementById("colorPickerBtn");
const section = document.getElementById("hp-section");
const btn = document.getElementById("colorPickerBtn");
const backgroundPick = document.getElementById('backgroundColorPicker');
const fontColorPick = document.getElementById('fontColorPicker');
const hpBarColorPick = document.getElementById('hpBarColorPicker');
const sections = document.querySelectorAll('.dealer-section, .player-section, .money-section, .bank-section, .bet-section');

btn.onclick = function () {
    modal.style.display = "block";
}

span.onclick = function () {
    modal.style.display = "none";
}


window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function pressets() {
    const selectedPressed = document.getElementById('functionSelector').value;
    switch (selectedPressed) {
        case "applyDarkTheme":
            applyPresetColor("#2c3e50", "#34495e", "#ecf0f1", "#e74c3c");
            break;
        case "applySepiaTheme":
            applyPresetColor("#704c3a", "#f9f0e3", "#c19a8d", "#ffcc00");
            break;
        case "applyBlackAndWhite":
            applyPresetColor("#ffffff", "#000000", "#cccccc", "#888888");
            break;
        default:
            applyPresetColor("#16a085", "#2c3e50", "#ffffff", "#00FF00");
            break;
    }
}

function applyPlayerColor() {

    const sectionColor = document.getElementById('sectionColorPicker').value;

    sections.forEach(section => {
        section.style.backgroundColor = sectionColor;
    });

    document.body.style.backgroundColor = document.getElementById('backgroundColorPicker').value; // Přístup k hodnotě barvy
    document.body.style.color = document.getElementById('fontColorPicker').value; // Přístup k hodnotě barvy
    drawHPBar(document.getElementById('hpBarColorPicker').value); // Přístup k hodnotě barvy pro HP bar


    modal.style.display = "none";
}

function applyPresetColor(pressetSection, pressetBackgroundColor, pressetFontColor, pressetHpColor,) {

    document.getElementById('backgroundColorPicker').value = pressetBackgroundColor;
    document.getElementById('fontColorPicker').value = pressetFontColor;
    document.getElementById('sectionColorPicker').value = pressetSection;
    document.getElementById('hpBarColorPicker').value = pressetHpColor;

    sections.forEach(section => {
        section.style.backgroundColor = pressetSection;
    });

    document.body.style.backgroundColor = pressetBackgroundColor;
    document.body.style.color = pressetFontColor;
    drawHPBar(pressetHpColor);


    modal.style.display = "none";
}


/////////////////////////////////////////////////////////////////
//                                                             //
//                           /GUI                              //
//                                                             //
/////////////////////////////////////////////////////////////////

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
    imageFolder = "ImageZCU";
    initCards();
    console.log("Cheat Active: Design change");
}

function esoManie() {
    esoManieCheat = true;

    playerCard = [
        imageFolder + "/stojkakule.jpg",
        imageFolder + "/stojkacervene.jpg",
        imageFolder + "/stojkazaludy.jpg",
        imageFolder + "/stojkazelene.jpg"

    ];

    console.log("Cheat Active: esoManie");
}

function marco() {
    console.log("Polo");
    polo = true;
}



/////////////////////////////////////////////////////////////////
//                                                             //
//                          /Cheats                            //
//                                                             //
/////////////////////////////////////////////////////////////////

function forTesting() {
    stubbed = true;
}

function info() {

    console.log("cardImage:", cardImage);
    console.log("playerStop:", playerStop);
    console.log("bitIsSet:", bitIsSet);
    console.log("over:", over);
    console.log("bothStop:", bothStop);
    console.log("cardPick:", cardPick);
    console.log("bitCheck:", bitCheck);
    console.log("prohra:", prohra);
    console.log("newGame:", newGame);
    console.log("resultFound:", resultFound);
    console.log("endLoop:", endLoop);
    console.log("esoManieCheat:", esoManieCheat);
    console.log("polo:", polo);
    console.log("botStop:", botStop);

    console.log("playerCard:", playerCard);
    console.log("dealerCards:", dealerCards);

    console.log("playerPlayedCards:", playerPlayedCards);
    console.log("maxHP:", maxHP);
    console.log("helpCounter:", helpCounter);
    console.log("life:", life);
    console.log("currentHP:", currentHP);
    console.log("value:", value);
    console.log("playerScore:", playerScore);
    console.log("dealerScore:", dealerScore);
}
