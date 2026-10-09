document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("artistSubmissionForm");
    const successPanel = document.getElementById("artistSubmissionSuccess");
    const feedback = document.getElementById("artistFormFeedback");
    const submitButton = document.getElementById("artistSubmitButton");
    const anotherButton = document.getElementById("submitAnotherArtist");
    const year = document.getElementById("currentYear");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    if (!form || !successPanel || !feedback || !submitButton) {
        return;
    }

    form.addEventListener("submit", async (event) => {
        // Stop the browser from opening Formspree's result page.
        event.preventDefault();

        if (!form.reportValidity()) {
            return;
        }

        submitButton.disabled = true;
        submitButton.textContent = "Submitting...";
        feedback.textContent = "Sending your demo...";
        feedback.className = "artist-form-feedback is-loading";

        try {
            const response = await fetch(form.action, {
                method: "POST",
                body: new FormData(form),
                headers: {
                    Accept: "application/json"
                }
            });

            if (!response.ok) {
                throw new Error(
                    "Your submission could not be sent. Please try again."
                );
            }

            // Keep the visitor on this page.
            form.hidden = true;
            successPanel.hidden = false;
            feedback.textContent = "";

            // Show the confirmation message.
            successPanel.focus();

        } catch (error) {
            feedback.textContent =
                "We couldn't send your demo. Please check your internet connection and try again.";

            feedback.className = "artist-form-feedback is-error";

        } finally {
            submitButton.disabled = false;
            submitButton.textContent = "Submit Artist Application";
        }
    });

    if (anotherButton) {
        anotherButton.addEventListener("click", () => {
            successPanel.hidden = true;
            form.hidden = false;
            form.reset();
            feedback.textContent = "";

            form.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            document.getElementById("artistName")?.focus();
        });
    }
});