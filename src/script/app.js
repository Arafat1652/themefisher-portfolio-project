document.addEventListener("DOMContentLoaded", function () {
    const tabButtons = document.querySelectorAll(".tab-button");
    const tabContents = document.querySelectorAll(".tab-content");

    tabButtons.forEach(button => {
        button.addEventListener("click", function () {
            // Remove active state from all buttons
            tabButtons.forEach(btn => btn.classList.remove("border-b-4", "border-yellow-600", "text-yellow-600"));

            // Hide all tab contents
            tabContents.forEach(content => content.classList.add("hidden"));

            // Activate clicked button
            this.classList.add("border-b-4", "border-yellow-600", "text-yellow-600");

            // Show related tab content
            const tabId = this.getAttribute("data-tab");
            document.getElementById(tabId).classList.remove("hidden");
        });
    });
});