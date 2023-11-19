// Function to handle animations
function handleIntersection(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "fadeInUp 1s ease forwards";
      observer.unobserve(entry.target);
    }
  });
}

// Ensure the DOM is fully loaded
document.addEventListener("DOMContentLoaded", (event) => {
  // Create a new Intersection Observer instance
  const observer = new IntersectionObserver(handleIntersection, {
    threshold: 0.1,
  });

  // Target all the .tech-box and .project-card elements
  const elementsToWatch = document.querySelectorAll(".tech-box, .project-card");

  // Observe each element
  elementsToWatch.forEach((element) => {
    element.style.animation = "none"; // Reset the animation
    observer.observe(element);
  });

  // Function to open the modal
  function openModal() {
    const modalId = this.getAttribute("data-modal");
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add("show");
      modal.style.display = "block";
      modal.setAttribute("tabindex", "0");
      modal.focus();
    }
  }

  // Function to close the modal
  function closeModal(modalElement) {
    if (modalElement) {
      modalElement.classList.remove("show");
      modalElement.style.display = "none";
      modalElement.removeAttribute("tabindex");
    }
  }

  // Add event listeners to all "See More" buttons
  document.querySelectorAll(".project-description .more").forEach((span) => {
    span.addEventListener("click", openModal);
  });

  // Close modal when the 'X' is clicked
  document.querySelectorAll(".close-modal").forEach((closeBtn) => {
    closeBtn.addEventListener("click", function () {
      closeModal(this.closest(".modal"));
    });
  });

  // Close modal when clicking outside of it
  window.addEventListener("click", function (event) {
    if (event.target.classList.contains("modal")) {
      closeModal(event.target);
    }
  });

  // Query all anchor tags with a hash in the href attribute
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault(); // Prevent default anchor click behavior

      // Get the target element's ID from the anchor's href attribute
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Scroll to the target element smoothly
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // About me read more button
  document
    .getElementById("read-more-btn")
    .addEventListener("click", function () {
      const hiddenContent = document.querySelector(".about-me-hidden");
      hiddenContent.classList.toggle("about-me-shown");
      this.style.display = "none";
    });
});
