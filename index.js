// dom variables
const formsize = document.getElementById("fullform");
var formSteps = document.getElementsByTagName("fieldset");
const backBtns = document.querySelectorAll("#btn-back");
const nextBtns = document.querySelectorAll("#btn-next");
const oneMenu = document.getElementById("one");
const twoMenu = document.getElementById("two");
const threeMenu = document.getElementById("three");
const myProgressBar = document.querySelector(".progress");
const message = document.getElementById("message");

// declaring the active fieldset & the total fieldset count
var form_nr = 0;
var fieldset = formSteps[form_nr];
fieldset.className = "show";

// removes the first back button
document.getElementsByName("back")[0].className = "hide";
document.getElementsByName("next")[2].className = "hide";

// slidbar content to
let formStepsNum = 0;
nextBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    formStepsNum = next();
    updateMenu();
    updateProgressBar(myProgressBar, formStepsNum);
  });
});

backBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    formStepsNum = back();
    updateMenu();
  });
});

// Progress bar

function updateProgressBar(progressBar, value) {
  value = Math.round(value);
  for (let i = 0; i <= formStepsNum; i++) {
    value = i * 40;
    progressBar.querySelector(".progress__fill").style.width = `${value}%`;
    progressBar.querySelector(".progress__text").textContent = `${value}%`;
  }
}

// Change Current menu
function updateMenu() {
  if (formStepsNum == 0) {
    oneMenu.classList.add("btn-outline-primary");
    twoMenu.classList.remove("progress-step-active");
    twoMenu.classList.remove("btn-outline-primary");
    threeMenu.classList.remove("progress-step-active");
    threeMenu.classList.remove("btn-outline-primary");
  }
  if (formStepsNum == 1) {
    twoMenu.classList.add("btn-outline-primary");
    oneMenu.classList.remove("progress-step-active");
    oneMenu.classList.remove("btn-outline-primary");
    threeMenu.classList.remove("progress-step-active");
    threeMenu.classList.remove("btn-outline-primary");
    oneMenu.innerHTML = '<img src="./green.jpg" />';
  }
  if (formStepsNum == 2) {
    threeMenu.classList.add("btn-outline-primary");
    oneMenu.classList.remove("progress-step-active");
    oneMenu.classList.remove("btn-outline-primary");
    twoMenu.classList.remove("progress-step-active");
    twoMenu.classList.remove("btn-outline-primary");
    twoMenu.innerHTML = '<img src="./green.jpg" />';
  }
}

// goes one step back
function back() {
  formSteps[form_nr].className = "hide";
  form_nr = form_nr - 1;
  formSteps[form_nr].className = "show";
  return form_nr;
}

// Validation loop & goes to the next step
function next() {
  var val = true;
  var fs = document.querySelectorAll("fieldset")[form_nr];

  var fs_i_count = fs.getElementsByClassName("form-control").length;

  for (i = 0; i < fs_i_count; i++) {
    var input_s = fs.querySelectorAll("input")[i];
    if (input_s.getAttribute("type") === "button") {
      // nothing happens
    }
    if (input_s.getAttribute("type") === "number") {
      if (input_s.value.length === 0 || input_s.value.length === 10) {
        input_s.style.border = "2px solid green";
      } else {
        input_s.style.border = "2px solid red";
      }
    }

    if (
      input_s.getAttribute("type") === "text" &&
      input_s.getAttribute("id") !== "address"
    ) {
      val = false;
      if (input_s.value.length < 2) {
        input_s.style.border = "2px solid red";
        val = false;
      } else {
        val = true;
        input_s.style.border = "2px solid green";
      }
    }

    if (input_s.getAttribute("type") === "email") {
      val = false;
      const re = /\S+@\S+\.\S+/;
      if (!re.test(input_s.value)) {
        val = false;
        input_s.style.border = "2px solid red";
      } else {
        val = true;
        input_s.style.border = "2px solid green";
      }
    }
  }

  if (val === true) {
    // goes to the next step
    var selection = formSteps[form_nr];
    selection.className = "hide";
    form_nr = form_nr + 1;
    var selection = formSteps[form_nr];
    selection.className = "show";
    return form_nr;
  }
}

// Saving data in json formate
var fieldSetDatas = {};

document.getElementById("formdata").addEventListener("submit", (e) => {
  e.preventDefault();

  if (message.value.length > 0) {
    const formData = new FormData(e.target);
    const data = Array.from(formData.entries()).reduce(
      (memo, [key, value]) => ({
        ...memo,
        [key]: value,
      }),
      {}
    );

    fieldSetDatas = JSON.stringify(data);
    formsize.classList.add("hide");
    document.getElementById("output2").classList.add("show");
    document.getElementById("output2").innerHTML = fieldSetDatas;
  } else {
    message.style.border = "2px solid red";
  }
});
