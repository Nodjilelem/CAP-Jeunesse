document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("formulaire");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const requiredFields = form.querySelectorAll("[required]");
        let allFilled = true;

        requiredFields.forEach((field) => {
            if (!field.value || (field.type === "radio" && !form.querySelector(`input[name="${field.name}"]:checked`))) {
                allFilled = false;
            }
        });

        if (!allFilled) {
            alert("Veuillez remplir tous les champs obligatoires avant de soumettre le formulaire.");
            return;
        }

        const submitButton = form.querySelector("button[type='submit']");
        submitButton.disabled = true;
        submitButton.textContent = "Envoi en cours...";

        fetch(form.action, {
            method: form.method,
            headers: { "Accept": "application/json" },
            body: new FormData(form),
        })
        .then(response => {
            if (response.ok) {
                alert("Merci ! Votre candidature a été envoyée avec succès.");
                form.reset();
                submitButton.disabled = false;
                submitButton.textContent = "Soumettre ma candidature";
            } else {
                response.json().then(data => {
                    alert(data.error || "Une erreur est survenue. Veuillez réessayer.");
                    submitButton.disabled = false;
                    submitButton.textContent = "Soumettre ma candidature";
                });
            }
        })
        .catch((error) => {
            alert("Erreur réseau. Veuillez vérifier votre connexion et réessayer.");
            submitButton.disabled = false;
            submitButton.textContent = "Soumettre ma candidature";
            console.error(error);
        });
    });
});
