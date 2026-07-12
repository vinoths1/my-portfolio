// Third-party visual effects
AOS.init({
    duration: 1000,
    once: true,
    easing: "ease-in-out"
});

document.addEventListener("DOMContentLoaded", () => {
    new Typed(".typing", {
        strings: [
            "Java Full Stack Developer",
            "Spring Boot Developer",
            "Backend Developer",
            "Frontend Developer"
        ],
        typeSpeed: 80,
        backSpeed: 40,
        backDelay: 2500,
        startDelay: 500,
        smartBackspace: true,
        loop: true
    });

    const codeSnippet = document.querySelector(".code-card code");
    if (codeSnippet) {
        const typingSteps = [];

        function collectTextNodes(element) {
            element.childNodes.forEach(node => {
                if (node.nodeType === Node.TEXT_NODE && node.textContent) {
                    typingSteps.push({ node, text: node.textContent });
                    node.textContent = "";
                } else if (node.nodeType === Node.ELEMENT_NODE) {
                    collectTextNodes(node);
                }
            });
        }

        collectTextNodes(codeSnippet);
        codeSnippet.classList.add("is-typing");

        let stepIndex = 0;
        let characterIndex = 0;

        function restartCodeTyping() {
            typingSteps.forEach(step => {
                step.node.textContent = "";
            });
            stepIndex = 0;
            characterIndex = 0;
            codeSnippet.classList.add("is-typing");
            typeCode();
        }

        function typeCode() {
            if (stepIndex >= typingSteps.length) {
                codeSnippet.classList.remove("is-typing");
                setTimeout(restartCodeTyping, 2500);
                return;
            }

            const step = typingSteps[stepIndex];
            step.node.textContent += step.text[characterIndex++];

            if (characterIndex === step.text.length) {
                stepIndex++;
                characterIndex = 0;
            }

            setTimeout(typeCode, 60);
        }

        setTimeout(typeCode, 700);
    }
});

// Contact form
emailjs.init({ publicKey: "dmUexQ3UCnMD1nvGv" });

const form = document.getElementById("contactForm");
const sendButton = document.getElementById("sendBtn");
const buttonText = sendButton.querySelector(".btn-text");
const loader = sendButton.querySelector(".loader");

form.addEventListener("submit", function (event) {
    event.preventDefault();
    sendButton.disabled = true;
    buttonText.textContent = "Sending...";
    loader.style.display = "inline-block";

    emailjs.sendForm("service_5bjg0e8", "template_17oa96c", this)
        .then(() => {
            buttonText.textContent = "\u2705 Message Sent";
            form.reset();
        })
        .catch(error => {
            console.error(error);
            buttonText.textContent = "\u274C Failed";
        })
        .finally(() => {
            loader.style.display = "none";
            setTimeout(() => {
                buttonText.textContent = "Send Message";
                sendButton.disabled = false;
            }, 2500);
        });
});

// Scroll UI: one lightweight listener updates all scroll-related elements.
const header = document.querySelector("header");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

const progress = document.createElement("div");
progress.style.cssText = "position:fixed;left:0;top:0;height:5px;background:#00e5ff;z-index:9999";
document.body.appendChild(progress);

const topButton = document.createElement("button");
topButton.textContent = "\u2191";
topButton.setAttribute("aria-label", "Back to top");
topButton.style.cssText = "position:fixed;right:20px;bottom:20px;width:55px;height:55px;border-radius:50%;border:none;background:#00e5ff;color:#000;font-size:22px;cursor:pointer;display:none;z-index:999";
document.body.appendChild(topButton);

function updateScrollUI() {
    const scrollY = window.scrollY;
    header.classList.toggle("scrolled", scrollY > 50);

    let currentSection = "";
    sections.forEach(section => {
        if (scrollY >= section.offsetTop - 150) currentSection = section.id;
    });
    navLinks.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${currentSection}`);
    });

    const pageHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    progress.style.width = pageHeight ? `${(scrollY / pageHeight) * 100}%` : "0";
    topButton.style.display = scrollY > 400 ? "block" : "none";
}

window.addEventListener("scroll", updateScrollUI, { passive: true });
updateScrollUI();

topButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Theme switcher
document.body.classList.add("light-mode");
const modeButton = document.createElement("button");
modeButton.className = "theme-btn";
modeButton.textContent = "\u2600\uFE0F";
modeButton.setAttribute("aria-label", "Switch colour theme");
document.body.appendChild(modeButton);

modeButton.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light-mode");
    modeButton.textContent = isLight ? "\u2600\uFE0F" : "\uD83C\uDF19";
});
