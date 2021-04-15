const url = "./data.json";
let numQuestions;

// Variables used for typewriting effect
let typedText;
let typedIdx;

// Keeps track of which questions have been answered
const answered = new Set();

fetch(url)
  .then((response) => response.json())
  .then((json) => {
    document.querySelector(
      "h1"
    ).style.backgroundImage = `url(${json.title_img})`;

    json.questions.forEach((question, idx) => {
      let choicesHTML = "";
      let choices = shuffle(question.answers);

      choices.forEach((choice) => {
        let imgHTML = "";
        if (choice.image_url) {
          imgHTML = `<img src=${choice.image_url}></img>`;
        }

        let txtHTML = "";
        if (choice.text) {
          txtHTML = `<p class="white-shadow-text">${choice.text}</p>`;
        }

        choicesHTML += `<label class="card">
          <input type="radio" name="question${idx}" value=${choice.outcome}>
          ${imgHTML}
          ${txtHTML}
        </label>`;
      });

      let containerHTML = `<div class="question">
        <p class="prompt white-shadow-text">${question.question_name}</p>
        <div class="choices">
          ${choicesHTML}
        </div>
      </div>`;

      document
        .querySelector(".container")
        .insertAdjacentHTML("beforeend", containerHTML);
    });
    setOpacity();
    numQuestions = document.querySelectorAll(".question").length;
    calculate(numQuestions, json.outcomes);
  });

// When the user clicks x, close the modal
document.querySelector(".close").addEventListener("click", () => {
  document.querySelector(".modal").style.display = "none";
});

// When the user clicks anywhere outside of the modal-content, close the modal
window.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal")) {
    e.target.style.display = "none";
  }
});

// Displays modal result after determining most frequent answer
function calculate(numQuestions, outcomes) {
  document.getElementById("calculate").addEventListener("click", () => {
    let outcomesDict = outcomes;
    for (let key in outcomesDict) {
      outcomesDict[key]["count"] = 0;
    }

    let highestFrequency = 0;
    let chosen;

    // Determines which outcome the user chooses most frequently
    document
      .querySelectorAll(".choices > label > input[type='radio']:checked")
      .forEach((checked) => {
        outcomesDict[checked.value]["count"] += 1;
        if (outcomesDict[checked.value]["count"] > highestFrequency) {
          highestFrequency = outcomesDict[checked.value]["count"];
          chosen = checked.value;
        } // When two choices have the same frequency, we randomly choose one
        else if (outcomesDict[checked.value]["count"] == highestFrequency) {
          highestFrequency = outcomesDict[checked.value]["count"];
          chosen = [chosen, checked.value][Math.floor(Math.random() * 2)];
        }
      });

    // Displays modal with text dependent on whether all questions have been answered
    const modalTxt = document.querySelector(".modal-text");
    if (answered.size == numQuestions) {
      modalTxt.innerHTML = `<img src=${outcomes[chosen]["img"]}>
      <p>Send the following link to your closest friends & loved ones:</p>
      <a href="${outcomes[chosen]["advice"]}">What you need...</a>`;
      typedText = ["Your love language is", outcomes[chosen]["text"]];
      typedIdx = 0;
      typeWriter();
      document.querySelector(".modal").style.backgroundImage =
        "url('media/roses.gif')";
    } else {
      scrollToPlace();
      modalTxt.innerHTML = `<h2>Calculations are still incomplete...</h2>
      <p>Please answer all questions first! I scrolled you to the earliest question you missed.</p>`;
    }
    document.querySelector(".modal").style.display = "block";
  });
}

// For each question, lower the opacity of every choice except the one selected
function setOpacity() {
  document
    .querySelectorAll(".choices > label > input[type='radio']")
    .forEach((input) => {
      input.addEventListener("change", (e) => {
        // Record which question number was just answered
        answered.add(parseInt(input.name.split("question")[1]));

        e.target.parentNode.classList.remove("unselected");
        e.target.parentNode.classList.add("selected");
        e.target.parentNode.parentNode
          .querySelectorAll("input:not(:checked)")
          .forEach((uncheckedInput) => {
            uncheckedInput.parentNode.classList.remove("selected");
            uncheckedInput.parentNode.classList.add("unselected");
          });

        scrollToPlace();
      });
    });
}

// Scrolls user to the earliest question that must still be completed
function scrollToPlace() {
  for (let i = 0; i < numQuestions; i++) {
    if (!answered.has(i)) {
      nextQuestion = document.querySelector(
        `.question:nth-child(${i + 1})`
      );
      break;
    }
  }
  if (nextQuestion) {
    window.scrollTo(0, nextQuestion.offsetTop);
  } else {
    window.scrollTo(0, document.getElementById("calculate").offsetTop);
  }
}

/* The Fisher-Yates Algorithm to shuffle an array
  Iterates backwards starting from the last element of the array
  Swaps the current "old" element with a random other "earlier" element
  Code written myself referencing the algorithm from Wikipedia
*/
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let earlierIdx = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[earlierIdx]] = [arr[earlierIdx], arr[i]];
  }
  return arr;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// TypeWriting Effect: Followed tutorial from https://www.w3schools.com/howto/howto_js_typewriter.asp
async function typeWriter() {
  const speed = 100;

  if (typedIdx < typedText[0].length) {
    if (typedIdx == 0) {
      document
        .querySelector(".modal-text img")
        .insertAdjacentHTML("beforebegin", "<h3></h3><h2></h2>");
    }
    let currentChar = typedText[0].charAt(typedIdx);
    document.querySelector(".modal-text h3").innerHTML += currentChar;
    typedIdx++;
    setTimeout(typeWriter, speed);
  } else if (typedIdx == typedText[0].length) {
    for (let i = 0; i < 3; i++) {
      document.querySelector(".modal-text h3").innerHTML += ".";
      await sleep(500);
    }
    await sleep(1000);
    document.querySelector(
      ".modal-text h2"
    ).innerHTML = `${typedText[1].toUpperCase()}`;
    document.querySelector(".modal-text h2").style.animation = "fade-in 5s";
    typedIdx++;
  }
}
