/* ============================================================
   Pepper — Reservation form validation
   Lightweight client-side checks. No dependencies.
   ============================================================ */
(function () {
  "use strict";

  var form = document.getElementById("reservation-form");
  if (!form) return;

  var success = document.getElementById("form-success");

  // Helper: show or clear an error message for a field
  function setError(fieldId, message) {
    var msg = form.querySelector('.error-msg[data-for="' + fieldId + '"]');
    if (msg) msg.textContent = message || "";
  }

  function isEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function isZip(value) {
    return /^\d{5}(-\d{4})?$/.test(value);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var valid = true;

    // Required text fields
    [
      { id: "firstName", label: "Please enter your first name." },
      { id: "lastName",  label: "Please enter your last name." },
      { id: "city",      label: "Please enter your city." }
    ].forEach(function (f) {
      var el = document.getElementById(f.id);
      if (!el.value.trim()) { setError(f.id, f.label); valid = false; }
      else setError(f.id, "");
    });

    // Email
    var email = document.getElementById("email").value.trim();
    if (!email) { setError("email", "Please enter your email."); valid = false; }
    else if (!isEmail(email)) { setError("email", "Please enter a valid email address."); valid = false; }
    else setError("email", "");

    // Zip
    var zip = document.getElementById("zip").value.trim();
    if (!zip) { setError("zip", "Please enter your zip code."); valid = false; }
    else if (!isZip(zip)) { setError("zip", "Enter a 5-digit zip code."); valid = false; }
    else setError("zip", "");

    // Date — required and not in the past
    var dateEl = document.getElementById("date");
    var dateVal = dateEl.value;
    if (!dateVal) { setError("date", "Please choose a date."); valid = false; }
    else {
      var chosen = new Date(dateVal + "T00:00:00");
      var today = new Date(); today.setHours(0, 0, 0, 0);
      if (chosen < today) { setError("date", "Please choose a future date."); valid = false; }
      else setError("date", "");
    }

    // Guests
    var guests = document.getElementById("guests").value;
    if (!guests) { setError("guests", "Select a party size."); valid = false; }
    else setError("guests", "");

    if (valid) {
      form.reset();
      if (success) {
        success.classList.add("show");
        success.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  });

  // Clear an error as soon as the guest starts fixing the field
  form.addEventListener("input", function (e) {
    if (e.target.id) setError(e.target.id, "");
    if (success) success.classList.remove("show");
  });
})();
