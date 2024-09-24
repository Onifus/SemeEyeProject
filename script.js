var life = 3;
var moneyList = [1000,100,1000];


cardArray = [ 
    ["Image/spodekkule.jpg", "Image/spodekzelene.jpg", "Image/spodekzaludy.jpg","Image/spodeksrdce.jpg", 1],
    ["Image/kralkule.jpg", "Image/kralsrdce.jpg", "Image/kralzaludy.jpg","Image/kralzelene.jpg", 2],
    ["Image/osmkule.jpg", "Image/osmsrdce.jpg","Image/osmzelene.jpg","Image/osmzaludy.jpg", 8],
    ["Image/sedmcervene.jpg","Image/sedmkule.jpg","Image/sedmzaludy.jpg","Image/sedmzelene.jpg", 7],
    ["Image/desetkule.jpg","Image/desetsrdce.jpg","Image/desetzaludy.jpg","Image/desetcervene.jpg", 10],
    ["Image/devetkule.jpg","Image/devetcervene.jpg","Image/devetzaludy.jpg","Image/devetcervene.jpg", 9],
    ["Image/stojkakule.jpg","Image/stojkacervene.jpg","Image/stojkazaludy.jpg","Image/stojkazelena.jpg", 11]
];

bitIsSet = false;
dealercards = [];
dealercards.push(getRandomCard());


var over = false;
var turn = 0;
var value = 0;
var playerScore = 0;

function bit() {
    if (!over) {
        if (!bitIsSet) {
            var bit = prompt("Zadej hodnoty své vsázky", "");
            var numberPattern = /^\d+$/; // Regulární výraz pro čísla
            
            if (numberPattern.test(bit) && bit.length > 0 && bit <= moneyList[0]) {
                document.getElementById('betValue').innerText = `${bit} KČ`;
                document.getElementById('bank').innerText = `${bit} KČ`;
                document.getElementById('cash').innerText = `${bit+bit} KČ`;
                moneyList[life - 1] -= bit;
                setMoney();
                bitIsSet = true; // Zajistí, že uživatel nemůže vsadit znovu
            } else {
                bit();
            }
        } else {
            alert("Sázka již byla zadaná");
        }
    }else{
        alert("Již jste ukončil hru");
    }
}

function init() {
   // enterMoney();
    setMoney();
    drawHPBar();
    dealerGet();
}

function getRandomCard() {
    // Vyber náhodný index pro cardArray
    const randomX = Math.floor(Math.random() * cardArray.length);
    
    // Získání hodnoty poslední pozice v poli (5. prvek)
    value = cardArray[randomX][cardArray[randomX].length - 1]; // poslední hodnota

    // Zjisti velikost druhého rozměru pole (počty karet)
    const numCards = cardArray[randomX].length - 1; // Odčítáme 1 pro hodnotu karty

    // Generování randomY mezi 0 a numCards - 1
    // Ujisti se, že randomY se nemůže dostat nad počet dostupných karet
    const randomY = Math.floor(Math.random() * Math.min(numCards, )); // max 3 karty

    console.log("Vybraný index x: " + randomX + " | Vybraný index y: " + randomY);
    console.log("Poslední hodnota karty: " + value);

    // Odstranění karty ze seznamu
    const cardImage = cardArray[randomX].splice(randomY, 1)[0];

    return cardImage; // Vrať vybranou kartu
}

function get() {
    if (!over) {
        const playerCardsContainer = document.querySelector('.player-cards');
        const newCardDiv = document.createElement('div');
        newCardDiv.classList.add('card');
        const cardImage = document.createElement('img');
        cardImage.src = getRandomCard();
        cardImage.alt = 'Karta hráče';
        newCardDiv.appendChild(cardImage);
        playerScore = value;
        document.getElementById('score').innerText = playerScore;
        playerCardsContainer.appendChild(newCardDiv);

        if (playerScore === 21) {
            over = true;
            alert("win");
        } else if (playerScore > 21) {
            alert("lose");
        }
    }else{
        alert("Již jste ukončil hru");
    }
}

function resetGame() {
    const playerCardsContainer = document.querySelector('.player-cards');
    playerCardsContainer.innerHTML = '';
    document.getElementById('score').innerText = 0;
    document.getElementById('money').innerText = 0;
    document.getElementById('betValue').innerText = "";
    over=false;
    playerScore = 0;
    life--;
    setMoney();
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

function dealerGet() {
    const dealerCardsContainer = document.querySelector('.dealer-cards');
    const newCardDiv = document.createElement('div');
    newCardDiv.classList.add('card');
    const cardImage = document.createElement('img');
    cardImage.src = "Image/back.jpg"; // Zde bude zadní strana karty
    cardImage.alt = 'Karta bankéře';
    newCardDiv.appendChild(cardImage);
    newCardDiv.id = `dealerCard${turn}`; // Nastavíme ID pro pozdější použití
    newCardDiv.onclick = function() { showDealerCards(turn); }; // Přidáme onclick událost
    dealerCardsContainer.appendChild(newCardDiv);
    turn++;
}

function showDealerCards(which) {
    const dealerCardsContainer = document.querySelector('.dealer-cards');
    which = which -1;
    // Zkontroluj, zda existuje dítě na indexu which
    if (dealerCardsContainer.children[`dealerCard${which}`]) {
        const dealerCardImage = dealerCardsContainer.children[which].querySelector('img'); // Získání obrázku karty
        
        // Změň obrázek na správnou kartu
        dealerCardImage.src = dealercards[which]; // Nastavení cesty k obrázku karty
        dealerCardImage.alt = 'Karta bankéře ' + which; // Aktualizace alt textu
    } else {
        console.error("Card does not exist at index: " + `dealerCard${which}`);
    }
}

init();

function leave(){
    over = true;
}

