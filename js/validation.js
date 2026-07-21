/* ============================================================
   Pepper — Reservation form
   Validation is handled by native HTML5 features in the markup
   (required, type="email", pattern, minlength, min). This script
   only adds two small enhancements on top of that:
     1. sets the date field's minimum to today (no past bookings)
     2. shows a success message once the browser reports the
        form as valid.
   ============================================================ */
(function () {
  "use strict";

  var form = document.getElementById("reservation-form");
  if (!form) return;

  var success = document.getElementById("form-success");
  var dateEl = document.getElementById("date");

  // 1. Set the minimum selectable date to today using the HTML5 min attribute.
  if (dateEl) {
    var today = new Date();
    var iso = today.toISOString().split("T")[0]; // YYYY-MM-DD
    dateEl.min = iso;
  }

  // 2. On submit, let native validation run first. If the browser
  //    reports the form valid, show the confirmation and reset.
  form.addEventListener("submit", function (e) {
    if (!form.checkValidity()) {
      // Native validation UI (the browser's own messages) handles the rest.
      return;
    }
    e.preventDefault();
    form.reset();
    if (success) {
      success.classList.add("show");
      success.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });

  // Hide the success note as soon as the guest edits the form again.
  form.addEventListener("input", function () {
    if (success) success.classList.remove("show");
  });
})();
