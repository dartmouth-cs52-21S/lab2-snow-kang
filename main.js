// Read in local JSON file
const url = "./data.json";

/* The Fisher-Yates Algorithm to shuffle an array
  Iterates backwards starting from the last element of the array.
  Swaps the current "old" element with a random other "earlier" element.
  Code written myself referencing the algorithm from Wikipedia 
*/
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let earlierIdx = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[earlierIdx]] = [arr[earlierIdx], arr[i]];
  }
  return arr;
}

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
    const numQuestions = document.querySelectorAll(".question").length;
    calculate(numQuestions, json.outcomes);
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

    // Populates a dictionary with choice: frequency pairs
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
    if (
      document.querySelectorAll(
        ".choices > label > input[type='radio']:checked"
      ).length == numQuestions
    ) {
      document.querySelector(
        ".modal p"
      ).innerHTML = `Your love language is ${outcomes[chosen]["text"]}!`;

      document.querySelector(
        ".modal-content"
      ).style.backgroundImage = `url(${outcomes[chosen]["img"]})`;
      
      document.querySelector(".modal").style.backgroundImage =
        "url('media/roses.gif')";
    } else {
      document.querySelector(".modal p").innerHTML =
        "Please answer all questions first!";
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
        e.target.parentNode.classList.remove("unselected");
        e.target.parentNode.classList.add("selected");
        e.target.parentNode.parentNode
          .querySelectorAll("input:not(:checked)")
          .forEach((uncheckedInput) => {
            if (uncheckedInput !== e.target) {
              uncheckedInput.parentNode.classList.remove("selected");
              uncheckedInput.parentNode.classList.add("unselected");
            }
          });

        let nextQuestion = e.target.closest(".question").nextElementSibling;
        if (nextQuestion) {
          window.scrollTo(0, nextQuestion.offsetTop);
        } else {
          window.scrollTo(0, document.getElementById("calculate").offsetTop);
        }
      });
    });
}

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
