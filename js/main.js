
/* =========================================
   RHYTHMCORE RECORDS
   Main JavaScript
========================================= */

document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    const navItems = document.querySelectorAll(".nav-link");
    const currentYear = document.getElementById("currentYear");

    // Automatically update the footer copyright year.
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // Open and close the mobile navigation.
    if (menuToggle && navLinks) {
        const menuIcon = menuToggle.querySelector("i");

        function closeMenu() {
            navLinks.classList.remove("open");
            document.body.classList.remove("menu-open");

            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

            if (menuIcon) {
                menuIcon.classList.remove("fa-xmark");
                menuIcon.classList.add("fa-bars");
            }
        }

        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");

            document.body.classList.toggle("menu-open", isOpen);

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );

            if (menuIcon) {
                menuIcon.classList.toggle("fa-bars", !isOpen);
                menuIcon.classList.toggle("fa-xmark", isOpen);
            }
        });

        // Close the menu after a navigation link is selected.
        navItems.forEach((link) => {
            link.addEventListener("click", () => {
                closeMenu();
            });
        });

        // Close the menu when Escape is pressed.
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeMenu();
            }
        });

        // Close the mobile menu if the screen becomes larger.
        window.addEventListener("resize", () => {
            if (window.innerWidth > 760) {
                closeMenu();
            }
        });
    }
});