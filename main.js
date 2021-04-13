const numQuestions = 2;

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
    document.querySelectorAll(".choices > label > input[type='radio']:checked")
      .length == 2
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
    });
  });

// When the user clicks x, close the modal 
document.querySelector(".close").addEventListener("click", () => {
  document.querySelector(".modal").style.display = "none";
})

// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal")) {
    e.target.style.display = "none";
  }
})
