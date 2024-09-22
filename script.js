
const deck = [
    "🂡", "🂱", "🃁", "🃑", // Eso a 10
    "🂢", "🂲", "🃂", "🃒", // 2
    "🂣", "🂳", "🃃", "🃓", // 3
    "🂤", "🂤", "🃄", "🃔", // 4
    "🂥", "🂵", "🃅", "🃕", // 5
    "🂦", "🂶", "🃆", "🃖", // 6
    "🂧", "🂷", "🃇", "🃗", // 7
    "🂨", "🂸", "🃈", "🃘", // 8
    "🂩", "🂹", "🃉", "🃙", // 9
    "🂪", "🂺", "🃊", "🃚", // 10
    "🂫", "🂻", "🃋", "🃛", // J
    "🂬", "🂼", "🃍", "🃜", // Q
    "🂭", "🂽", "🃎", "🃝"  // K
];

function Get() {
    const playerCard1 = document.getElementById('playerCard1');
    const randomIndex1 = Math.floor(Math.random() * deck.length);
    playerCard1.innerText = deck[randomIndex1];
}