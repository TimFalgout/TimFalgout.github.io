
var phrases = ["49ers score a TD", "Cheifs score a TD", "49ers get a first down", "Taylor Swift shown during game", "Bud Light commercial", "49ers intercept the cheifs", "cheifs intercept the 49ers", "49ers return punt for TD", "Cheifs return punt for TD", "49ers challenge a call", "Cheifs challenge a call", "Cheifs fumble and 49ers recover", "49ers fumble and Cheifs recover", "49ers score >= 21", "Cheifs score >= 21", "Cheifs miss a field goal", "49ers miss a field goal", "Budweiser commercial during game", "49er score >= 14", "Cheifs score >= 14", "49ers successful 4th down conversion", "Cheifs successful 4th down conversion", "49ers win the game", "Cheifs win the game", "49ers throw an interception", "Cheifs throw an interception"  ];



var bingoCard = [];
var $bingoCard = $('#bingo-card');

function generateCard() {
    bingoCard = [];
    $bingoCard.empty();
    for (var i = 0; i < 5; i++) {
        bingoCard[i] = [];
        for (var j = 0; j < 5; j++) {
            var phrase = phrases[Math.floor(Math.random() * phrases.length)];
            bingoCard[i][j] = { phrase: phrase, marked: false };
            $bingoCard.append('<div class="bingo-cell" data-row="' + i + '" data-col="' + j + '">' + phrase + '</div>');
        }
    }
}

function checkWin() {
    for (var i = 0; i < 5; i++) {
        if (bingoCard[i].every(cell => cell.marked)) return true; // Check rows
        if (bingoCard.every(row => row[i].marked)) return true; // Check columns
    }
    if (bingoCard.every((row, i) => row[i].marked)) return true; // Check main diagonal
    if (bingoCard.every((row, i) => row[4 - i].marked)) return true; // Check other diagonal

    return false;
}

$(document).on('click', '.bingo-cell', function() {
    var row = $(this).data('row');
    var col = $(this).data('col');
    bingoCard[row][col].marked = !bingoCard[row][col].marked;
    $(this).toggleClass('marked');
    if (checkWin()) {
        alert('Congratulations, you won!');
    }
});

$('.pushable').click(function() {
    if ($('.marked').length > 0 && !confirm('Are you sure? Your current game isn\'t finished.')) {
        return;
    }
    generateCard();
});

generateCard();








