let flashcards = [
  {
    english: "Apple",
    korean: "사과",
    pronunciation: "sagwa"
  },
  {
    english: "Dog",
    korean: "개",
    pronunciation: "gae"
  },
  {
    english: "Cat",
    korean: "고양이",
    pronunciation: "goyang-i"
  }
];

let currentIndex = 0;

function displayCard() {
  document.getElementById("englishWord").innerText = flashcards[currentIndex].english;
  document.getElementById("koreanWord").innerText = flashcards[currentIndex].korean;
  document.getElementById("pronunciation").innerText = flashcards[currentIndex].pronunciation;

  document.getElementById("englishInput").value = flashcards[currentIndex].english;
  document.getElementById("koreanInput").value = flashcards[currentIndex].korean;
  document.getElementById("pronunciationInput").value = flashcards[currentIndex].pronunciation;
}

function nextCard() {
  currentIndex++;

  if (currentIndex >= flashcards.length) {
    currentIndex = 0;
  }

  displayCard();
}

function previousCard() {
  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = flashcards.length - 1;
  }

  displayCard();
}

function addWord() {
  const english = document.getElementById("englishInput").value;
  const korean = document.getElementById("koreanInput").value;
  const pronunciation = document.getElementById("pronunciationInput").value;

  if (english && korean && pronunciation) {
    flashcards.push({
      english,
      korean,
      pronunciation
    });

   currentIndex = flashcards.length - 1;
    displayCard();

    alert("New word added!");
  }
}

function updateWord() {
  flashcards[currentIndex].english = document.getElementById("englishInput").value;
  flashcards[currentIndex].korean = document.getElementById("koreanInput").value;
  flashcards[currentIndex].pronunciation = document.getElementById("pronunciationInput").value;

  displayCard();

  alert("Word updated!");
}

function deleteWord() {
  if (flashcards.length === 1) {
    alert("You need at least one flashcard.");
    return;
  }

  flashcards.splice(currentIndex, 1);

  if (currentIndex >= flashcards.length) {
    currentIndex = flashcards.length - 1;
  }

  displayCard();

  alert("Word deleted!");
}

// Start app

displayCard();




