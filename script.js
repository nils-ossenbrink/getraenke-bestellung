document.addEventListener('DOMContentLoaded', function () {
  // Initialisiere Materialize Select
  var elems = document.querySelectorAll('select');
  M.FormSelect.init(elems);

  // Lese Tischnummer aus URL
  const urlParams = new URLSearchParams(window.location.search);
  const tableNumber = urlParams.get('table');
  if (tableNumber) {
    document.getElementById("tableNumber").value = tableNumber;
    M.updateTextFields(); // Aktualisiere Label
  }

  document.getElementById("orderForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const drink = document.getElementById("drink").value;
    const quantity = document.getElementById("quantity").value;
    const table = document.getElementById("tableNumber").value;

    const templateParams = {
      drink: drink,
      quantity: quantity,
      table: table
    };

    emailjs.send("service_les6osp", "template_4vx0rrq", templateParams)
      .then(function(response) {
        document.getElementById("orderSummary").innerText = "Bestellung erfolgreich versendet!";
      }, function(error) {
        let errorMessage = "Fehler beim Versenden der Bestellung.";
        if (error && error.text) {
          errorMessage += " Details: " + error.text;
        } else if (error && error.message) {
          errorMessage += " Nachricht: " + error.message;
        }
        document.getElementById("orderSummary").innerText = errorMessage;
      });
  });
});
