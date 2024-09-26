
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

var stubbed = false;
var moneyList = [0, 0, 0];
if (stubbed) {
    stubbedValues = 50000;
     moneyList = [stubbedValues, stubbedValues, stubbedValues];    
}


var playerStop = false;
var bitIsSet = false;
var over = false;
var bothStop = false;
var cardPick = false;
var topSecred = false;
var bitCheck = false;
var prohra = false;
var newGame = false;

var dealerCards = [];

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

function choooser(){

    console.log("velikost pole je : " + getArrayCount());

if (!over) {
 
    getPlayerCard();
   
    dealerGet();
    
    if (helpCounter == 0) {
        bitCheck = false;
    }
    winnerCheck();
} else {
    alert("Již jste ukončil hru");
}
console.log("playerScore: " + playerScore + " | dealerScore: " + dealerScore)

}


function bit(message1,message2) {

    if (cardPick) {
        if (!over) {
            if (!bitIsSet) {
               
                bitCheck = true;
                if (stubbed) {

                    if (helpCounter > 0) {
                        bitCheck = true;
                    }
                    helpCounter++;
                    document.getElementById('betValue').innerText = `${moneyList[life-1]} Kč`;
                    document.getElementById('bank').innerText = `${moneyList[life-1]} Kč`;
                    var totalcash = moneyList[life-1] * 2;
                    document.getElementById('cash').innerText = `${totalcash} Kč`;
                   
                    moneyList[life - 1] -= moneyList[life-1];
                    
                    setMoney();
                    document.getElementById('money').innerText = `${0} Kč`;
                    bitIsSet = true; // Zajistí, že uživatel nemůže vsadit znovu
                }else{
                    var bitValue = prompt(message1,message2);
                    var numberPattern = /^\d+$/; // Regulární výraz pro čísla
                    if (helpCounter > 0) {
                        bitCheck = true;
                    }
                    helpCounter++;
                    if (numberPattern.test(bitValue) && bitValue.length > 0 && bitValue < (extractNumber(document.getElementById('money').innerHTML)+1)) {
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

    const match = str.match(/\d+/); // Najde první číslo ve stringu
    return match ? parseInt(match[0], 10) : null; // Vrátí číslo nebo null, pokud nenajde číslo
}

function resetCardList() {

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
    enterMoney("Zadej svůj počáteční kapitál", "částka");
    setMoney();
    currentHP = 3;
    maxHP= 3;
    drawHPBar();
    bitCheck = true;
    console.log("["+moneyList[0]+"]"+"["+moneyList[1]+"]"+"["+moneyList[2]+"]")

}

function getRandomCard(IsPlayer = false) {

    // Vyber náhodný index pro cardArray
    const randomX = Math.floor(Math.random() * cardArray.length);
        // Zjisti velikost druhého rozměru pole (počty karet), bez posledního prvku
        const numCards = cardArray[randomX].length - 1; // Odčítáme 1 pro hodnotu karty

        // Generování randomY mezi 0 a numCards - 1 (ne včetně posledního prvku)
        const randomY = Math.floor(Math.random() * numCards); // max je numCards - 1
    // Získání hodnoty poslední pozice v poli (5. prvek)
    if (IsPlayer) {
        value += cardArray[randomX][cardArray[randomX].length - 1];
        playerScore = value;
    } else {
        dealerScore += cardArray[randomX][cardArray[randomX].length - 1];
    }
    
    

    // Odstranění karty ze seznamu
    const cardImage = cardArray[randomX].splice(randomY, 1)[0];

    return cardImage; // Vrať vybranou kartu
}

function resetGame() {

    currentHP = currentHP-1;
    resetCardList();
    const playerCardsContainer = document.querySelector('.player-cards');
    playerCardsContainer.innerHTML = '';
    const dealerCardsContainer = document.querySelector('.dealer-cards');
    dealerCardsContainer.innerHTML = '';
    document.getElementById('score').innerText = 0;
    document.getElementById('money').innerText = 0;
    document.getElementById('betValue').innerText = "";
    over = false;
    life--;
    prohra = false;
    bothStop = false;
    playerStop = false;
    newGame = true;
    bitCheck= true; 
    bitIsSet = false; 
    cardPick = false;
    playerScore = 0;    
    helpCounter = 0;
    value = 0;
    dealerScore = 0;
    setMoney();
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
}

function startNewGame() {

    if (stubbed) {
        moneyList = [stubbedValues, stubbedValues, stubbedValues];    
    }
    disableButtons(false);
    console.log("startNewGame");
    init();
    maxHP = 3;
    currentHP = 3;
    resetCardList();
    const playerCardsContainer = document.querySelector('.player-cards');
    playerCardsContainer.innerHTML = '';
    const dealerCardsContainer = document.querySelector('.dealer-cards');
    dealerCardsContainer.innerHTML = '';
    document.getElementById('score').innerText = 0;
    document.getElementById('money').innerText = 0;
    document.getElementById('betValue').innerText = "";
    over = false;
    life=3;
    prohra = false;
    bothStop = false;
    playerStop = false;
    newGame = false;
    bitCheck= true; 
    bitIsSet = false; 
    cardPick = false;
    playerScore = 0;    
    helpCounter = 0;
    value = 0;
    dealerScore = 0;
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
}

function resetGameAfterWin(isPlayer) {
  
    resetCardList();
    if (isPlayer) {
        prohra = false;
        bothStop = false;
        playerStop = false;
        newGame = true;
        bitCheck= true; 
        bitIsSet = false; 
        cardPick = false;
        playerScore = 0;    
        helpCounter = 0;
        value = 0;
        dealerScore = 0;
        updateHpBar();
      
         
      
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
      
        drawHPBar();
    } else {

        cardPick = false;
        newGame = true;
        bothStop = false;
        playerStop = false;
        prohra = false;
        bitCheck= true;
        bitIsSet = false;  
        playerScore = 0;
        helpCounter = 0;
        value = 0;
        dealerScore = 0;
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
    }

}

function setMoney() {
    document.getElementById('money').innerText = `${moneyList[life - 1]} Kč`;
}

function itsNumber(text){
    var numberPattern = /^\d+$/; // Regulární výraz pro čísla
   
    return  numberPattern.test(text);
}
function enterMoney(message1,message2) {
    if (stubbed) {
       
    } else {
        
    
        var moneyInpu = prompt(message1,message2);
     

        if (itsNumber(moneyInpu) && moneyInpu.length > 0 && moneyInpu > 2) {
            moneyList = [Math.round(moneyInpu / 3), Math.round(moneyInpu / 3), Math.round(moneyInpu / 3)];
        } else {
            enterMoney("Zadaná hodnota není platná, zadej prosím jinou", "částka");
        }
    }
}

function drawHPBar() {
    document.getElementById('hpStatus').innerText = `Hp:${life}/${maxHP}`;
   
    const canvas = document.getElementById('hpBar');
    const ctx = canvas.getContext('2d');

    const hpWidth = (life/ 3) * canvas.width;

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

function updateHpBar(){
    maxHP = maxHP;
    currentHP = life;
    drawHPBar();
}

function winnerCheck() {
   
    if (!prohra) {
        let resultFound = false; // Příznak pro kontrolu, zda byla již výhra/prohra nalezena

        if (!bothStop) {
            if (!playerStop) {
                if (playerScore === 21) {
                    prohra = false;
                    resultFound = true; // Výhra nalezena
                    popUpExit("player win 1",true);
                } else if (playerScore > 21) {
                    prohra = true;
                    resultFound = true; // Prohra nalezena
                    popUpExit("player lose 2",false);
                }
            }

            if (!resultFound) { // Zkontrolujeme, zda již nebyla výhra/prohra nalezena
                if (dealerScore === 21) {
                    prohra = true;
                    resultFound = true; // Výhra dealera nalezena
                    popUpExit("dealer win 3",false);
                } else if (dealerScore > 21) {

                    prohra = false;
                    resultFound = true; // Výhra hráče nalezena
                    popUpExit("player win 4",true);
                }
            }
        } else { // Oba hráči zastavili
            if (playerScore === 21) {
                prohra = false; // Ujistíme se, že prohra se nastaví
                resultFound = true; // Výhra hráče nalezena
                popUpExit("player win 5",true);
            } else if (dealerScore > 21) {
                prohra = true; // Ujistíme se, že prohra se nastaví
                resultFound = true; // Prohra dealera nalezena
                popUpExit("dealer lose 6",true);
            } else if (dealerScore === 21) {
                prohra = true;
                resultFound = true; // Výhra dealera nalezena
                popUpExit("dealer win 7",false);
            } else if (playerScore === playerScore) {
                alert("remíza");
                // todo: dokončit
            } else if (dealerScore > playerScore) {
                prohra = true;
                resultFound = true; // Výhra dealera nalezena
                popUpExit("dealer win 9",false);
            } else {
                prohra = false;
                resultFound = true; // Výhra hráče nalezena
                popUpExit("player win 10",true);
            }
        }
    }
    
}

function leave() {
    window.close();
    over = true;
  
}

function popUpExit(message, isPlayer){
    alert(message)
   
    if (prohra==true && (currentHP-1)<=0) {
        showDealerCards();
        setTimeout(() => {
            if (confirm('Chcete pokračovat v nové hře?')) {
                startNewGame();
            } else {
                over = true;
                disableButtons(true);
            }
            }, 1000)
    }else{

        if (!extractNumber(document.getElementById('money').innerHTML)<= 0 || !prohra) {
            showDealerCards();
            setTimeout(() => {
            if (confirm('Chcete pokračovat ve hře? ')) {
                resetGameAfterWin(isPlayer);
            } else {
                over = true;
                disableButtons(true);
            }
            }, 1000)
        }else{
           
            showDealerCards();
            if (confirm('Si na mizině - Chcete začít novou hru, máš ale o život meně? Momentálně máš ' + (life-1) + " životů")) {
                resetGame(isPlayer);
            } else {
                over = true;
                disableButtons(true);
            }
            
        }
    }
    console.log("player life is set to " + life);
}
init();


function getArrayCount(){
    var arrayCount1 = 0;
    for (var counterI = 0; counterI < cardArray.length; counterI++) {
        arrayCount1 += cardArray[counterI].length; // Přičteme délku podpole
    }
   
    return arrayCount1; // Vrátí celkový počet členů ve všech podpolích
    
}

function disableButtons(enabled){
    document.getElementById("revealButton").disabled = enabled; 
    document.getElementById("bitButton").disabled = enabled; 
    document.getElementById("getButton").disabled = enabled; 
    document.getElementById("stopButton").disabled = enabled; 
}

function shop(message1,message2) {
    const pricePerHeart = 5000;
    const totalMoneyElement = document.getElementById("money");
    
    const totalMoney = parseInt(totalMoneyElement.innerText) || 0;

    // Otevření dialogového okna pro vstup počtu srdíček
    let shopMoney = prompt(message1,message2);

    // Kontrola, zda je zadáno číslo a zda uživatel má dost peněz
    if (itsNumber(shopMoney)) {
        const numberOfHearts = parseInt(shopMoney);
        const totalCost = numberOfHearts * pricePerHeart;

        // Zajištění, že zůstatek nebude klesat pod 1 Kč
        if (totalCost <= totalMoney - 1) {
            // Odečtení peněz a aktualizace stavu peněz
            totalMoneyElement.innerText = totalMoney - totalCost + " Kč";
            maxHP++;
            life++;
            alert(`Koupili jste ${numberOfHearts} srdíček za ${totalCost} Kč.`);
       

        } else {
            alert("Nemáte dostatek peněz na tento nákup.");
        }
    } else {
        shop("Zadné množství nejde koupit, nebo jste zadal něco špatného","Počet Srdíček");
    }
    updateHpBar();

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
