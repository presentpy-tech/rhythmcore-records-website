
// ========================================
// RHYTHMCORE RECORDS - FAQ PAGE
// Search, category filters and accordion
// ========================================

(function () {
    "use strict";

    function initialiseFAQ() {
        const faqList = document.getElementById("faq-questions");
        const searchInput = document.getElementById("faq-search");
        const noResults = document.getElementById("faq-no-results");
        const filterButtons = document.querySelectorAll(".faq-filter");
        const faqItems = document.querySelectorAll(".faq-item");

        // Stop with a useful message if the expected HTML is missing.
        if (!faqList || !searchInput || faqItems.length === 0) {
            console.error(
                "FAQ setup failed. Check faq.html for faq-questions, " +
                "faq-search and faq-item."
            );
            return;
        }

        let activeCategory = "all";

        // Expand or collapse a question.
        faqList.addEventListener("click", function (event) {
            const question = event.target.closest(".faq-question");

            if (!question || !faqList.contains(question)) {
                return;
            }

            const item = question.closest(".faq-item");
            const answer = item.querySelector(".faq-answer");
            const icon = question.querySelector("i");

            if (!answer) {
                return;
            }

            const willOpen =
                question.getAttribute("aria-expanded") !== "true";

            // Close other questions first.
            faqItems.forEach(function (otherItem) {
                const otherQuestion =
                    otherItem.querySelector(".faq-question");
                const otherAnswer =
                    otherItem.querySelector(".faq-answer");
                const otherIcon = otherQuestion
                    ? otherQuestion.querySelector("i")
                    : null;

                if (otherQuestion && otherAnswer) {
                    otherQuestion.setAttribute("aria-expanded", "false");
                    otherAnswer.hidden = true;
                    otherItem.classList.remove("open");
                }

                if (otherIcon) {
                    otherIcon.classList.remove("fa-minus");
                    otherIcon.classList.add("fa-plus");
                }
            });

            // Open the selected question if it was previously closed.
            if (willOpen) {
                question.setAttribute("aria-expanded", "true");
                answer.hidden = false;
                item.classList.add("open");

                if (icon) {
                    icon.classList.remove("fa-plus");
                    icon.classList.add("fa-minus");
                }
            }
        });

        // Search and filter questions.
        function updateFAQs() {
            const term = searchInput.value.trim().toLowerCase();
            let visibleCount = 0;

            faqItems.forEach(function (item) {
                const category = item.getAttribute("data-category") || "";
                const content = item.textContent.toLowerCase();

                const categoryMatches =
                    activeCategory === "all" ||
                    category === activeCategory;

                const searchMatches = content.includes(term);
                const shouldShow = categoryMatches && searchMatches;

                item.hidden = !shouldShow;

                if (shouldShow) {
                    visibleCount++;
                } else {
                    // Close any question hidden by the current filter.
                    const question = item.querySelector(".faq-question");
                    const answer = item.querySelector(".faq-answer");
                    const icon = question
                        ? question.querySelector("i")
                        : null;

                    if (question) {
                        question.setAttribute("aria-expanded", "false");
                    }

                    if (answer) {
                        answer.hidden = true;
                    }

                    item.classList.remove("open");

                    if (icon) {
                        icon.classList.remove("fa-minus");
                        icon.classList.add("fa-plus");
                    }
                }
            });

            if (noResults) {
                noResults.hidden = visibleCount > 0;
            }
        }

        // Listen for typing in the search box.
        searchInput.addEventListener("input", updateFAQs);

        // Listen for category selection.
        filterButtons.forEach(function (button) {
            button.addEventListener("click", function () {
                activeCategory = button.getAttribute("data-category") || "all";

                filterButtons.forEach(function (otherButton) {
                    const selected = otherButton === button;

                    otherButton.classList.toggle("active", selected);
                    otherButton.setAttribute(
                        "aria-pressed",
                        String(selected)
                    );
                });

                updateFAQs();
            });
        });

        // Footer year.
        const year = document.getElementById("current-year");

        if (year) {
            year.textContent = new Date().getFullYear();
        }

        // Mobile navigation, if those elements exist.
        const menuToggle = document.getElementById("menu-toggle");
        const navLinks = document.getElementById("nav-links");

        if (menuToggle && navLinks) {
            menuToggle.addEventListener("click", function () {
                const open = navLinks.classList.toggle("active");

                menuToggle.setAttribute("aria-expanded", String(open));

                const icon = menuToggle.querySelector("i");

                if (icon) {
                    icon.classList.toggle("fa-bars", !open);
                    icon.classList.toggle("fa-times", open);
                }
            });

            navLinks.querySelectorAll("a").forEach(function (link) {
                link.addEventListener("click", function () {
                    navLinks.classList.remove("active");
                    menuToggle.setAttribute("aria-expanded", "false");

                    const icon = menuToggle.querySelector("i");

                    if (icon) {
                        icon.classList.add("fa-bars");
                        icon.classList.remove("fa-times");
                    }
                });
            });
        }

        // Apply the initial state.
        updateFAQs();

        console.log("Rhythmcore FAQ JavaScript loaded successfully.");
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initialiseFAQ);
    } else {
        initialiseFAQ();
    }
})();