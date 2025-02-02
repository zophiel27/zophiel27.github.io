import { personalInfo, projectData, skills, experienceData, educationData } from './data.js';

// project pop up section
let originalContent = '';

function openPopup(projectId) {
    const project = projectData[projectId];
    if (project) {
        originalContent = `
        <h3>${project.title}</h3>
        <p>${project.details}</p>
        <div class="image-stack">
            ${project.images.map(image => `<img src="${image}" alt="${project.title}" onclick="viewImage('${image}')">`).join('')}
        </div>
        `;
        document.getElementById("popup-details").innerHTML = originalContent;
        const popupContainer = document.getElementById("popup-container");
        popupContainer.style.display = "flex";
        document.body.classList.add('noscroll');
        setTimeout(() => {
            popupContainer.classList.add("show");
        }, 10); 
    }
}

function viewImage(imageSrc) {
    document.getElementById("popup-details").innerHTML = `
    <img src="${imageSrc}" alt="Image" class="image-view">
    `;
    document.querySelector('.back-btn').style.display = 'block';
}

function showOriginalContent() {
    document.getElementById("popup-details").innerHTML = originalContent;
    document.querySelector('.back-btn').style.display = 'none';
}

function closePopup() {
    const popupContainer = document.getElementById("popup-container");
    popupContainer.classList.remove("show");
    document.body.classList.remove('noscroll'); 
    setTimeout(() => {
        popupContainer.style.display = "none";
    }, 300); 
}

window.openPopup = openPopup;
window.viewImage = viewImage;
window.showOriginalContent = showOriginalContent;
window.closePopup = closePopup;

// personal info section
function generatePersonalInfo() {
    document.querySelector('header h1').textContent = personalInfo.name;
    document.querySelector('header p').textContent = personalInfo.title;
    document.querySelector('.contact-info').innerHTML = `
        <p>
            <a href="${personalInfo.linkedin}" target="_blank">LinkedIn</a> |
            <a href="${personalInfo.github}" target="_blank">GitHub</a>
        </p>
    `;
}

generatePersonalInfo();

// skills section
function generateSkillBubbles() {
    const skillsContainer = document.getElementById("skills-container");
    skills.forEach(skill => {
        const skillBubble = document.createElement("div");
        skillBubble.className = "skill-bubble";
        skillBubble.textContent = skill;
        skillsContainer.appendChild(skillBubble);
    });
}

generateSkillBubbles();

// experience section
function generateExperience() {
    const experienceContainer = document.getElementById("experience-container");
    experienceData.forEach(exp => {
        const experienceItem = document.createElement("div");
        experienceItem.className = "experience-item";
        experienceItem.innerHTML = `
            <h3>${exp.title}</h3>
            <p class="date">${exp.date}</p>
            <ul>
                ${exp.details.map(detail => `<li>${detail}</li>`).join('')}
            </ul>
        `;
        experienceContainer.appendChild(experienceItem);
    });
}

generateExperience();

// education section
function generateEducation() {
    const educationContainer = document.getElementById("education-container");
    educationData.forEach(edu => {
        const educationItem = document.createElement("div");
        educationItem.className = "education-item";
        educationItem.innerHTML = `
            <h3>${edu.title}</h3>
            <p class="date">${edu.date}</p>
            <p>${edu.institution}</p>
        `;
        educationContainer.appendChild(educationItem);
    });
}

generateEducation();

// projects section
function generateProjects() {
    const projectsContainer = document.getElementById("projects-container");
    Object.keys(projectData).forEach(key => {
        const project = projectData[key];
        const projectItem = document.createElement("div");
        projectItem.className = "project-item";
        projectItem.setAttribute("onclick", `openPopup('${key}')`);
        projectItem.innerHTML = `
            <h3>${project.title}</h3>
            <p class="date">${project.date}</p>
        `;
        projectsContainer.appendChild(projectItem);
    });
}

generateProjects();

// smooth navigation
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});