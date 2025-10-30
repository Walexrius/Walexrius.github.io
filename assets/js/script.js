"use strict";

// ===============================
// ELEMENT TOGGLE FUNCTION
// ===============================
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// ===============================
// SIDEBAR TOGGLE
// ===============================
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});


// ===============================
// CUSTOM SELECT / FILTER
// ===============================
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

select.addEventListener("click", function () {
  elementToggleFunc(this);
});

// keep track of last clicked filter btn (used for active state)
let lastClickedBtn = filterBtn[0] || null;

// Original filter function (author)
const originalFilterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

// ===============================
// PORTFOLIO / CERTIFICATES
// ===============================

// Tiles in the All section
const allProjects = document.querySelectorAll(".project-item[data-tile-link]");

// Category sections containing certificates
const categorySections = document.querySelectorAll(".category-section");
const projectList = document.querySelector(".project-list");

// Clicking a tile scrolls to the respective category
allProjects.forEach((tile) => {
  tile.addEventListener("click", (e) => {
    // if the tile contains an anchor, prevent default navigation
    if (e) e.preventDefault();

    // read the data-tile-link value exactly as provided
    const categoryId = tile.getAttribute("data-tile-link");

    // Hide all category sections first
    categorySections.forEach((sec) => (sec.style.display = "none"));

    // Hide the tiles (project list) when viewing a category
    if (projectList) projectList.style.display = "none";

    // Show the target category
    const targetSection = document.getElementById(categoryId);
    if (targetSection) {
      targetSection.style.display = "block";
      // run name cleanup so certificate titles look nice
      cleanCertificateNames(targetSection);

      // update filter buttons active state to reflect the shown category
      try {
        const catKey = categoryId.toLowerCase();
        let matched = null;
        filterBtn.forEach((b) => {
          // normalize button label into the same key
          const key = b.innerText
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "");
          b.classList.remove("active");
          if (key === catKey) matched = b;
        });
        if (matched) {
          matched.classList.add("active");
          if (selectValue) selectValue.innerText = matched.innerText;
          // update lastClickedBtn reference if available
          try {
            lastClickedBtn = matched;
          } catch (e) {}
        } else {
          if (selectValue) selectValue.innerText = "";
        }
      } catch (err) {
        // ignore
      }

      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Helper: clean certificate display names inside a category section
const cleanCertificateNames = (section) => {
  const anchors = section.querySelectorAll("a.certificate-box");
  anchors.forEach((a) => {
    const p = a.querySelector("p");
    if (!p) return;
    // prefer data-display if provided
    if (a.dataset.display) {
      p.textContent = a.dataset.display;
      return;
    }
    // derive from href filename
    try {
      const url = a.getAttribute("href");
      const parts = url.split("/");
      let filename = parts[parts.length - 1];
      // remove query/hash
      filename = filename.split("?")[0].split("#")[0];
      // remove extension
      filename = filename.replace(/\.[a-z0-9]+$/i, "");
      // replace underscores and dashes with spaces
      filename = filename.replace(/[_\-]+/g, " ");
      // collapse multiple spaces
      filename = filename.replace(/\s+/g, " ").trim();
      // decode URI components
      filename = decodeURIComponent(filename);
      p.textContent = filename;
    } catch (err) {
      // fallback: leave existing text
    }
  });
};

// Filter buttons also control category sections
const filterCategoryFunc = (category) => {
  // when 'all' is selected, show tiles and hide category sections
  if (category === "all") {
    if (projectList) projectList.style.display = "";
    categorySections.forEach((section) => (section.style.display = "none"));
    // ensure tiles are active (visible)
    originalFilterFunc("all");
    return;
  }

  // otherwise hide tiles and show only the selected section
  if (projectList) projectList.style.display = "none";
  categorySections.forEach((section) => {
    if (section.id.toLowerCase() === category) {
      section.style.display = "block";
      cleanCertificateNames(section);
    } else {
      section.style.display = "none";
    }
  });

  // maintain original tile filter behavior too (in case)
  originalFilterFunc(category);
};

// Attach filter buttons
filterBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    // normalize button text into an id-like key: 'Professional Recognitions' -> 'professional-recognitions'
    const selectedCategory = btn.innerText
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    selectValue.innerText = btn.innerText;
    filterCategoryFunc(selectedCategory);

    // Button active state
    if (lastClickedBtn) lastClickedBtn.classList.remove("active");
    btn.classList.add("active");
    lastClickedBtn = btn;
  });
});

// ===============================
// CONTACT FORM VALIDATION
// ===============================
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// ===============================
// PAGE NAVIGATION
// ===============================
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let j = 0; j < pages.length; j++) {
      if (this.innerHTML.toLowerCase() === pages[j].dataset.page) {
        pages[j].classList.add("active");
        navigationLinks[j].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[j].classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
    }
  });
}
