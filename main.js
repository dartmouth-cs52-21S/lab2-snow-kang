// Read in local JSON file
const url = "./data.json";

fetch(url)
  .then((response) => response.json())
  .then((json) => {
    console.log(json);
    document.querySelector("h1").innerHTML = json.title;
    json.questions.forEach((question, idx) => {
      let newQuestion = document.createElement("div");
      newQuestion.className = "question";
      let newPrompt = document.createElement("span");
      newPrompt.className = "prompt";
      newPrompt.innerHTML = question.question_name;
      newQuestion.appendChild(newPrompt);

      document.querySelector(".container").appendChild(newQuestion);

      let newChoices = document.createElement("div");
      newChoices.className = "choices";

      newQuestion.appendChild(newChoices);

      question.answers.forEach((choice) => {
        let newChoice = document.createElement("label");
        newChoice.className = "description";
        let newInput = document.createElement("input");
        newInput.type = "radio";
        newInput.name = `question${idx}`;
        newInput.value = choice.outcome;
        let newImg = document.createElement("img");
        newImg.src = choice.img_url;
        let newSpan = document.createElement("span");
        newSpan.innerHTML = choice.text;

        newChoice.appendChild(newInput);
        newChoice.appendChild(newImg);
        newChoice.appendChild(newSpan);

        newChoices.appendChild(newChoice);
      });
    });
    setOpacity();
    const numQuestions = document.querySelectorAll(".question").length;
    calculate(numQuestions);
  });


// Displays modal result after determining most frequent answer
function calculate(numQuestions) {
  document.getElementById("calculate").addEventListener("click", () => {
    const choices = { touch: 0, gifts: 0, words: 0, service: 0, time: 0 };
    let highestFrequency = 0;
    let chosen;

    // Populates a dictionary with choice: frequency pairs
    // TODO: account for when two choices have the same frequency (randomly choose one?)
    document
      .querySelectorAll(".choices > label > input[type='radio']:checked")
      .forEach((checked) => {
        choices[checked.value] += 1;
        if (choices[checked.value] > highestFrequency) {
          highestFrequency = choices[checked.value];
          chosen = checked.value;
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
      ).innerHTML = `Your love language is ${chosen}!`;
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
        e.target.parentNode.style.opacity = "1";
        e.target.parentNode.parentNode
          .querySelectorAll("input:not(:checked)")
          .forEach((uncheckedInput) => {
            uncheckedInput.parentNode.style.opacity = "0.2";
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
