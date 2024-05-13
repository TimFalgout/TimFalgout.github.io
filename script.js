
const phrases = ['Home team scores a goal', 'Away team scores a goal', 'Iceing is called', 'A fight breaks out', 'Game goes into overtime', 'Home team wins', 'Away team wins', 'Home player goes to the penalty box', 'Away player goes to the penalty box', 'Home team power play', 'Away team power play', 'There is a face off', 'Home team scores on empty net', 'Away team scores on empty net', 'Home team is offsides', 'Away team is offsides', 'Home team called for high sticking', 'Away team called for high sticking', 'Home team called for cross-checking', 'Away team called for cross-checking', 'Home team scores 2 goals', 'Away team scores 2 goals', 'Both teams score 5+ goals', 'Home team scores 3 goals', 'Away team scores 3 goals' ];

let players = [
  'Admin',
  'Michelle', 
  'Jan',
  'Naomi',
  'Ben',
  'Beau', 
  'Katie', 
  'joe',
  'jandoe',
  'john',
  'Tim'
  // Add more players as needed...
];

const bingoCardIds = ["#michelleBingoCard", "#janBingoCard", "#timBingoCard"]; // Add more IDs as needed
const winningCards = [];
const playerNames = ["#michelleName", "#janName", "#timName"]; // Add more IDs as needed

// Select all 'a' tags within your navigation that have an 'href' starting with '#' ADJUSTING NAV SCROLLING
document.querySelectorAll('nav a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault(); // Prevent the default jump behavior

    // Get the target section based on the 'href'
    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);
    const headerHeight = 110; // Height of the fixed header
    const positionToScrollTo = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
    // Smooth scroll function
    window.scrollTo({
      top: positionToScrollTo,
      behavior: "smooth",
    });
  });
  });

// Dropdown menu for selecting a player

$(document).ready(() => {
  $('.dropdown-content').hide();
  $('#ddButton, .dropdown-content li').on('click', () => {
    let $dropdownContent = $('.dropdown-content');
    if ($dropdownContent.is(':hidden')) {
      $dropdownContent.slideDown(200);
    } else {
      $dropdownContent.slideUp(200);
    }
  });
});

/* Removing Admin for now -------------------------------->

// Generate admin bingo card
$(document).ready(() => {
  $("#admin-button").on("click", () => {
    $("#adminName").show();
    $("#admin-button").hide();

    // Generate a new bingo card
    let adminBingoCard = generateAdminBingoCard();

    // Get all .grid-item elements within #adminBingoCard
    let $gridItems = $("#adminBingoCard .grid-item");

    // Assign each grid item a phrase from the bingo card
    for (let i = 0; i < adminBingoCard.length; i++) {
      for (let j = 0; j < adminBingoCard[i].length; j++) {
        // Get the corresponding grid item
        let $gridItem = $($gridItems[i * adminBingoCard.length + j]);

        // Set the text of the grid item to the phrase
        $gridItem.text(adminBingoCard[i][j].phrase);
      }
    }
  });
});
// Generates a bingo card for the admin 
function generateAdminBingoCard() {
  let card = [];
  let phrasesCopy = [...phrases]; // Create a copy of the phrases array

  for (let i = 0; i < 6; i++) {
    card[i] = [];
    for (let j = 0; j < 6; j++) {
      let randomIndex = Math.floor(Math.random() * phrasesCopy.length);
      let phrase = phrasesCopy[randomIndex];
      
      // Remove the used phrase from the array
      phrasesCopy.splice(randomIndex, 1);

      card[i][j] = { phrase: phrase, marked: false };
    }
  }
  return card;
}

*/ // End of removing Admin for now

// Check Win Function WORK IN PROGRESS =======================================================================


// Function to check for a win on a bingo card
function checkForWin(bingoCardId) {
  let gridItems = $(bingoCardId + ' .grid-item');
  let gridSize = Math.sqrt(gridItems.length); // Assuming a square grid

  // Check rows and columns
  for (let i = 0; i < gridSize; i++) {
    let rowMarked = true;
    let colMarked = true;
    for (let j = 0; j < gridSize; j++) {
      if (!$(gridItems[i * gridSize + j]).hasClass('marked')) {
        rowMarked = false;
      }
      if (!$(gridItems[j * gridSize + i]).hasClass('marked')) {
        colMarked = false;
      }
    }
    if (rowMarked || colMarked) {
      return true;
    }
  }

  // Check diagonals
  let diag1Marked = true;
  let diag2Marked = true;
  for (let i = 0; i < gridSize; i++) {
    if (!$(gridItems[i * gridSize + i]).hasClass('marked')) {
      diag1Marked = false;
    }
    if (!$(gridItems[i * gridSize + (gridSize - i - 1)]).hasClass('marked')) {
      diag2Marked = false;
    }
  }
  if (diag1Marked || diag2Marked) {
    return true;
  }

  return false;
}


// Function to check all bingo cards for a win
function checkAllBingoCards() {
  for (let i = 0; i < bingoCardIds.length; i++) {
    // Skip this card if it has already won
    if (winningCards.includes(bingoCardIds[i])) {
      continue;
    }
    if (checkForWin(bingoCardIds[i])) {
      // Add this card to the list of winning cards
      winningCards.push(bingoCardIds[i]);

      // Update the corresponding HTML element
      let place = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th"];
      let playerName = $(playerNames[i]).text();
      $(playerNames[i]).text(playerName + " " + place[winningCards.length - 1] + " place winner");

      setTimeout(function() {
        alert("Bingo! " + playerName + " is the " + place[winningCards.length - 1] + " place winner!");
      }, 0);
    }
  }
}

 
// Call the function to check all bingo cards for a win
$(document).ready(() => {
  $(document).on('click', '.grid-item', function() {
    if ($(this).hasClass('marked')) {
      $(this).removeClass('marked');
    } else {
      $(this).addClass('marked');
    }
    checkAllBingoCards();
  });
});



// Generate Michelle's bingo card

$(document).ready(() => {
  $("#michelle-button").on("click", () => {
    $("#michelleName").show();
    $("#michelle-button").hide();

    // Generate a new bingo card
    let michelleBingoCard = generateMichelleBingoCard();

    // Get all .grid-item elements within BingoCard
    let $gridItems = $("#michelleBingoCard .grid-item");

    // Assign each grid item a phrase from the bingo card
    for (let i = 0; i < michelleBingoCard.length; i++) {
      for (let j = 0; j < michelleBingoCard[i].length; j++) {
        // Get the corresponding grid item
        let $gridItem = $($gridItems[i * michelleBingoCard.length + j]);

        // Set the text of the grid item to the phrase
        $gridItem.text(michelleBingoCard[i][j].phrase);
      }
    }
  });
});

function generateMichelleBingoCard() {
  let card = [];
  const usedPhrases = new Set();

  for (let i = 0; i < 5; i++) {
      card[i] = [];
      for (let j = 0; j < 5; j++) {
          let phrase;
          do {
              phrase = phrases[Math.floor(Math.random() * phrases.length)];
          } while (usedPhrases.has(phrase));

          usedPhrases.add(phrase);
          card[i][j] = { phrase: phrase, marked: false };
      }
  }
  return card;
}

// End of Michelle's bingo card

// Generate Jan's bingo card

$(document).ready(() => {
  $("#jan-button").on("click", () => {
    $("#janName").show();
    $("#jan-button").hide();

    // Generate a new bingo card
    let janBingoCard = generateJanBingoCard();

    // Get all .grid-item elements within BingoCard
    let $gridItems = $("#janBingoCard .grid-item");

    // Assign each grid item a phrase from the bingo card
    for (let i = 0; i < janBingoCard.length; i++) {
      for (let j = 0; j < janBingoCard[i].length; j++) {
        // Get the corresponding grid item
        let $gridItem = $($gridItems[i * janBingoCard.length + j]);

        // Set the text of the grid item to the phrase
        $gridItem.text(janBingoCard[i][j].phrase);
      }
    }
  });
});

function generateJanBingoCard() {
  let card = [];
  const usedPhrases = new Set();

  for (let i = 0; i < 5; i++) {
      card[i] = [];
      for (let j = 0; j < 5; j++) {
          let phrase;
          do {
              phrase = phrases[Math.floor(Math.random() * phrases.length)];
          } while (usedPhrases.has(phrase));

          usedPhrases.add(phrase);
          card[i][j] = { phrase: phrase, marked: false };
      }
  }
  return card;
}

// End of Jan's bingo card

// Generate Tim's bingo card

$(document).ready(() => {
  $("#tim-button").on("click", () => {
    $("#timName").show();
    $("#tim-button").hide();

    // Generate a new bingo card
    let timBingoCard = generateTimBingoCard();

    // Get all .grid-item elements within BingoCard
    let $gridItems = $("#timBingoCard .grid-item");

    // Assign each grid item a phrase from the bingo card
    for (let i = 0; i < timBingoCard.length; i++) {
      for (let j = 0; j < timBingoCard[i].length; j++) {
        // Get the corresponding grid item
        let $gridItem = $($gridItems[i * timBingoCard.length + j]);

        // Set the text of the grid item to the phrase
        $gridItem.text(timBingoCard[i][j].phrase);
      }
    }
  });
});

function generateTimBingoCard() {
  let card = [];
  const usedPhrases = new Set();

  for (let i = 0; i < 5; i++) {
      card[i] = [];
      for (let j = 0; j < 5; j++) {
          let phrase;
          do {
              phrase = phrases[Math.floor(Math.random() * phrases.length)];
          } while (usedPhrases.has(phrase));

          usedPhrases.add(phrase);
          card[i][j] = { phrase: phrase, marked: false };
      }
  }
  return card;
}