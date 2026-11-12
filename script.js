// ===== Variables =====
const navToggle = document.getElementById("navToggle");
const siteNav = document.getElementById("siteNav");
const backToTop = document.getElementById("backToTop");

// ===== Footer year =====
const yearSpan = document.getElementById("year");
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// ===== Mobile menu toggle (event handling) =====
if (navToggle && siteNav) {
  navToggle.addEventListener("click", function () {
    const isOpen = siteNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

// ===== Back-to-top button =====
if (backToTop) {
  window.addEventListener("scroll", function () {
    backToTop.hidden = window.scrollY < 300;
  });
  backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ===== Interactive feature: filter services =====
const filterButtons = document.querySelectorAll(".filter-btn");
const serviceCards = document.querySelectorAll(".service");
const filterMessage = document.getElementById("filterMessage");

function filterServices(category) {
  let shown = 0;
  serviceCards.forEach(function (card) {
    const match = category === "all" || card.dataset.category === category;
    card.classList.toggle("hidden", !match);
    if (match) shown++;
  });
  if (filterMessage) {
    filterMessage.textContent = "Showing " + shown + " service" + (shown === 1 ? "" : "s") + ".";
  }
}

filterButtons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    filterButtons.forEach(function (b) { b.classList.remove("active"); });
    btn.classList.add("active");
    filterServices(btn.dataset.filter);
  });
});

// ===== Contact form validation =====
const form = document.getElementById("contactForm");

function setError(input, message) {
  const errorEl = document.getElementById(input.id + "Error");
  errorEl.textContent = message;
  input.classList.toggle("invalid", message !== "");
  input.classList.toggle("valid", message === "");
}

function validateField(input) {
  const value = input.value.trim();
  let message = "";

  if (input.id === "fullName") {
    if (value === "") message = "Please enter your full name.";
    else if (value.length < 3) message = "Name must be at least 3 characters.";
  } else if (input.id === "email") {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (value === "") message = "Please enter your email address.";
    else if (!emailPattern.test(value)) message = "Enter a valid email, e.g. name@example.com.";
  } else if (input.id === "subject") {
    if (value === "") message = "Please enter a subject.";
    else if (value.length < 3) message = "Subject must be at least 3 characters.";
  } else if (input.id === "message") {
    if (value === "") message = "Please write a message.";
    else if (value.length < 10) message = "Message must be at least 10 characters.";
  }

  setError(input, message);
  return message === "";
}

if (form) {
  const fields = form.querySelectorAll("input, textarea");
  const status = document.getElementById("formStatus");

  // live feedback when the user leaves or edits a field
  fields.forEach(function (field) {
    field.addEventListener("blur", function () { validateField(field); });
    field.addEventListener("input", function () {
      if (field.classList.contains("invalid")) validateField(field);
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    let allValid = true;
    fields.forEach(function (field) {
      if (!validateField(field)) allValid = false;
    });

    if (allValid) {
      status.textContent = "Thank you! Your details passed validation. (Demo only: no message was sent.)";
      status.className = "status success";
      form.reset();
      fields.forEach(function (f) { f.classList.remove("valid", "invalid"); });
    } else {
      status.textContent = "Please fix the errors above and try again.";
      status.className = "status fail";
      form.querySelector(".invalid").focus();
    }
  });
}
