// ===== Menu Toggle and Navbar Visibility =====
const menuBtn = document.getElementById("menuBtn");
const sideMenu = document.getElementById("sideMenu");
const navbar = document.getElementById("navbar");

menuBtn.onclick = () => sideMenu.classList.toggle("show");
sideMenu.querySelectorAll("a").forEach(link => 
  link.onclick = () => sideMenu.classList.remove("show")
);

window.addEventListener("scroll", () => {
  const home = document.getElementById("Home");
  const showNav = window.scrollY + window.innerHeight / 5 > home.offsetTop + home.offsetHeight;
  navbar.classList.toggle("visible", showNav);
});

// ===== Form Validation =====
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  if (!form) return;

  const name = form.querySelector("#name");
  const email = form.querySelector("#email");
  const msg = form.querySelector("textarea[name='message']");
  let pass = form.querySelector("#password");

  // Create password field if not present
  if (!pass) {
    pass = document.createElement("input");
    Object.assign(pass, { type: "password", id: "password", name: "password", placeholder: "Password", required: true });
    form.insertBefore(pass, msg);
  }

  const err = (el, msg) => {
    let e = el.nextElementSibling;
    if (!e || !e.classList.contains("error-text")) {
      e = document.createElement("div");
      e.className = "error-text";
      el.after(e);
    }
    e.textContent = msg;
  };

  const clearErr = () => form.querySelectorAll(".error-text").forEach(e => e.remove());

  form.addEventListener("submit", e => {
    e.preventDefault();
    clearErr();
    let ok = true;

    if (!name.value.trim()) err(name, "Please enter your name"), ok = false;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) err(email, "Enter a valid email."), ok = false;
    if (pass.value.length < 6) err(pass, "Password must be at least 6 characters."), ok = false;
    if (msg.value.trim().length < 10) err(msg, "Message must be at least 10 characters."), ok = false;

    if (ok) {
      alert("✅ Form submitted successfully!");
      form.reset();
    }
  });
});
