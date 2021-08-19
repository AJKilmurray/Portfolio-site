import config from "./config.js";

const projectsContainer = document.getElementById("project-list");
const filters = document.querySelectorAll(".filter-btn");
const navToggle = document.querySelector(".navbar-toggler");
const navIcon = document.querySelector(".navbar-toggler-icon");

// Initializes projects upon page load/refresh
formatProjects();

navToggle.addEventListener("click", toggleNavColor);
filters.forEach((btn) => btn.addEventListener("click", filterProjects));

// Filter projects based on the tech category clicked
function filterProjects(event) {
	const keyword = event.currentTarget.dataset.tech;

	const results = [];
	config.projects.forEach((project) => {
		for (let tech of project.tech) {
			if (tech === keyword) results.push(project);
		}
	});

	formatProjects(results);
}

// Parse Projects into HTML formatted strings
function formatProjects(projects = config.projects) {
	const format = projects
		.map((project) => {
			const icons = project.tech.map((tech) => `<img src="assets/images/tech-icons/${tech}-icon.JPEG" />`).join("");

			return `<div class="col-md-4 project-card">
      <article class="project-content">
        <h1 class="font-primary">${project.title}</h1>
        <h2 class="font-primary project-date">${project.date}</h2>
        <figure class="project-img-figure">
          <img class="project-img" src="/assets/images/projects/${project.img}" alt="${project.alt}"  />
        </figure>
        <article class="project-description">
          <h3 class="font-primary mb-3"><span class="text-highlight">Project</span> Description</h3>
          <p class="font-secondary">
            ${project.description} 
          </p>
          <div class="row">
            <div class="col-md-12">
              ${icons} 
            </div>
          </div>
        </article>
        <a href="${project.site}" target="_blank" class="btn first-link project-link"><span class="text-highlight">View</span> Site</a>
        <a href="${project.repo}" target="_blank" class="btn project-link"><span class="text-highlight">View</span> Code</a>
      </article>
    </div>`;
		})
		.join("");

	displayProjects(format);
}

function displayProjects(projects) {
	while (projectsContainer.firstChild) {
		projectsContainer.removeChild(projectsContainer.lastChild);
	}

	if (!projects) {
		noProjectsFound();
		return;
	}

	projectsContainer.insertAdjacentHTML("afterbegin", projects);
}

function noProjectsFound() {
	projectsContainer.insertAdjacentHTML("afterbegin", `<h3 class="projects-error font-primary">${config.error}</h3>`);
}

// Navbar Toggler
function toggleNavColor(event) {
	const status = event.currentTarget.ariaExpanded === "true" ? true : false;

	if (status) {
		navIcon.classList.add("active-toggle");
	} else if (!status) {
		navIcon.classList.remove("active-toggle");
	}
}
