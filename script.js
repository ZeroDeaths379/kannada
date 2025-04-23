let timerInterval,
  timeElapsed = 0,
  timerStarted = false;
const timerDisplay = document.getElementById("timer");

function startTimer() {
  if (timerStarted) return;
  timerStarted = true;
  timerInterval = setInterval(() => {
    timeElapsed += 100; // Increment by 100ms
    const seconds = Math.floor(timeElapsed / 1000);
    const milliseconds = Math.floor((timeElapsed % 1000) / 100);
    timerDisplay.textContent = `Time: ${seconds}.${milliseconds}s`;
  }, 100); // Update every 100ms
}

function stopTimer() {
  clearInterval(timerInterval);
  timerDisplay.textContent += " - Completed!";
}

const kannadaToEnglish = {
  ಅ: "a",
  ಆ: "aa",
  ಇ: "i",
  ಈ: "ii",
  ಉ: "u",
  ಊ: "uu",
  ಎ: "e",
  ಏ: "ee",
  ಐ: "ai",
  ಒ: "o",
  ಓ: "oo",
  ಔ: "au",
  ಕ: "ka",
  ಖ: "kha",
  ಗ: "ga",
  ಘ: "gha",
  ಙ: "nga",
  ಚ: "cha",
  ಛ: "chha",
  ಜ: "ja",
  ಝ: "jha",
  ಞ: "nya",
  ಟ: "ta",
  ಠ: "tha",
  ಡ: "da",
  ಢ: "dha",
  ಣ: "na",
  ತ: "tha",
  ಥ: "tha",
  ದ: "da",
  ಧ: "dha",
  ನ: "na",
  ಪ: "pa",
  ಫ: "pha",
  ಬ: "ba",
  ಭ: "bha",
  ಮ: "ma",
  ಯ: "ya",
  ರ: "ra",
  ಲ: "la",
  ವ: "va",
  ಶ: "sha",
  ಷ: "sha",
  ಸ: "sa",
  ಹ: "ha",
  ಳ: "la",
  ಕ್ಷ: "ksha",
  ಜ್ಞ: "gya",
};

const kannadaLettersContainer = document.getElementById("kannada-letters");
const englishSlotsContainer = document.getElementById("english-slots");

// Preload pronunciation sounds
const pronunciationSounds = {};
Object.keys(kannadaToEnglish).forEach((letter) => {
  pronunciationSounds[kannadaToEnglish[letter]] = new Audio(
    `audio/${kannadaToEnglish[letter]}.mp3`
  );
});

Object.keys(kannadaToEnglish)
  .sort(() => 0.5 - Math.random())
  .forEach((letter) => {
    const letterDiv = document.createElement("div");
    letterDiv.className = "letter";
    letterDiv.draggable = true;
    letterDiv.id = `letter-${letter}`;
    letterDiv.textContent = letter;
    letterDiv.addEventListener("dragstart", (e) => {
      startTimer(); // Start the timer when the letter is dragged
      e.dataTransfer.setData("text", e.target.id);
    });
    kannadaLettersContainer.appendChild(letterDiv);
  });

Object.entries(kannadaToEnglish).forEach(([kannada, english]) => {
  const slot = document.createElement("div");
  slot.className = "slot";
  slot.id = `slot-${kannada}`;
  slot.textContent = english;
  slot.addEventListener("dragover", (e) => e.preventDefault());
  slot.addEventListener("drop", (e) => drop(e, kannada));
  englishSlotsContainer.appendChild(slot);
});

const correctSound = document.getElementById("correct-sound");
const incorrectSound = document.getElementById("incorrect-sound");

function drop(event, kannada) {
  event.preventDefault();
  const letterId = event.dataTransfer.getData("text");
  const letterDiv = document.getElementById(letterId);
  const letterText = letterDiv.textContent;

  if (kannada === letterText) {
    event.target.style.backgroundColor = "#a3d3a1";
    event.target.textContent = letterText;
    letterDiv.style.display = "none";
    correctSound.play();

    // Play the pronunciation sound
    pronunciationSounds[kannadaToEnglish[letterText]].play();

    if (
      !document.querySelectorAll('.letter:not([style*="display: none"])').length
    ) {
      stopTimer();
    }
  } else {
    letterDiv.classList.add("incorrect");
    incorrectSound.play();
    setTimeout(() => letterDiv.classList.remove("incorrect"), 500);
  }
}
console.log("Made by Arnav Patil - rnv.is-a.dev");
