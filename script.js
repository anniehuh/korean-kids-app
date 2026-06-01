
// Firebase configuration
const firebaseConfig ={
 apiKey: "AIzaSyAkPiVhOhY4TZ_lFH5tYYIGD_i4a8jlRgE", 
  authDomain: "korean-kids-app-c633b.firebaseapp.com", 
  projectId: "korean-kids-app-c633b", 
  storageBucket: "korean-kids-app-c633b.firebasestorage.app", 
  messagingSenderId: "509357273870", 
  appId: "1:509357273870:web:80ae09d83c21169693dd5f", 
  measurementId: "G-4Z2G1MBFGY" 
};


// Initialize Firebase

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

let flashcards = [];
let currentIndex = 0;

// Load words from Firestore

async function loadWords() {

  const snapshot = await db.collection("words").get();

  flashcards = [];

  snapshot.forEach((doc) => {

    flashcards.push({
      id: doc.id,
      ...doc.data()
    });

  });

  if (flashcards.length > 0) {
    displayCard();
  }
}

// Display current card

function displayCard() {

  document.getElementById("englishWord").innerText =
    flashcards[currentIndex].english;

  document.getElementById("koreanWord").innerText =
    flashcards[currentIndex].korean;

  document.getElementById("pronunciation").innerText =
    flashcards[currentIndex].pronunciation;

  document.getElementById("englishInput").value =
    flashcards[currentIndex].english;

  document.getElementById("koreanInput").value =
    flashcards[currentIndex].korean;

  document.getElementById("pronunciationInput").value =
    flashcards[currentIndex].pronunciation;
    
  document.getElementById("flashcardInner").classList.remove("flipped");
}

// Next card

function nextCard() {

  currentIndex++;

  if (currentIndex >= flashcards.length) {
    currentIndex = 0;
  }

  displayCard();
}

// Previous card

function previousCard() {

  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = flashcards.length - 1;
  }

  displayCard();
}

// Add word

async function addWord() {

  const english =
    document.getElementById("englishInput").value.trim();

  const korean =
    document.getElementById("koreanInput").value.trim();

  const pronunciation =
    document.getElementById("pronunciationInput").value.trim();

  if (!english || !korean || !pronunciation) {
    alert("Please fill in all fields.");
    return;
  }

  await db.collection("words").add({
    english,
    korean,
    pronunciation,
    category: "Custom"
  });

  
  
  await loadWords();

  currentIndex = flashcards.length - 1;

  displayCard();

  alert("Word added to database!");
}

// Update word

async function updateWord() {

  const current = flashcards[currentIndex];

  await db.collection("words")
    .doc(current.id)
    .update({

      english:
        document.getElementById("englishInput").value,

      korean:
        document.getElementById("koreanInput").value,

      pronunciation:
        document.getElementById("pronunciationInput").value
    });

  await loadWords();

  alert("Word updated!");
}

// Delete word

async function deleteWord() {

  const current = flashcards[currentIndex];

  await db.collection("words")
    .doc(current.id)
    .delete();

  await loadWords();

  if (currentIndex >= flashcards.length) {
    currentIndex = flashcards.length - 1;
  }

  if (flashcards.length > 0) {
    displayCard();
  }

  alert("Word deleted!");
}

// Start app

loadWords();

function flipCard() {
  document.getElementById("flashcardInner").classList.toggle("flipped");
}

function speakKorean() {
  const koreanText = flashcards[currentIndex].korean;

  const speech = new SpeechSynthesisUtterance(koreanText);
  speech.lang = "ko-KR";
  speech.rate = 0.8;

  window.speechSynthesis.speak(speech);
}
if (col < word.length) {
  cell.textContent = word[col];

  if (document.getElementById("traceMode").checked) {
    cell.classList.add("trace-letter");
  }
}