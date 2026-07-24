/* ==========================================================
   FLOODGUARD v4.0
========================================================== */

/* ==========================
   Loader
========================== */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.style.opacity = "0";
        loader.style.visibility = "hidden";

    }, 1200);

});

/* ==========================
   Sticky Header
========================== */

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 60) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});

/* ==========================
   Dark Mode
========================== */

const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    themeToggle.textContent =
        document.body.classList.contains("dark")
        ? "☀️"
        : "🌙";

});

/* ==========================
   Mobile Menu
========================== */

const menuToggle = document.getElementById("menuToggle");

const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("open");

});

/* ==========================
   Back To Top
========================== */

const topButton = document.getElementById("topButton");

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        topButton.style.display = "block";

    } else {

        topButton.style.display = "none";

    }

});

topButton.addEventListener("click", () => {

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

/* ==========================
   Animated Statistics
========================== */

const stats = document.querySelectorAll("[data-target]");

const counterObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const counter = entry.target;

        const target = Number(counter.dataset.target);

        let current = 0;

        const increment = target / 80;

        const update = () => {

            current += increment;

            if(current < target){

                counter.textContent = Math.floor(current);

                requestAnimationFrame(update);

            }else{

                counter.textContent = target;

            }

        };

        update();

        counterObserver.unobserve(counter);

    });

});

stats.forEach(stat=>counterObserver.observe(stat));
/* ==========================================================
   FLOOD SIMULATION
========================================================== */

const startButton = document.getElementById("startSimulation");

const water = document.getElementById("water");

const barrier = document.getElementById("barrier");

const statusText = document.getElementById("statusText");

const barrierText = document.getElementById("barrierText");

const waterText = document.getElementById("waterText");

const houseText = document.getElementById("houseText");

const notification = document.getElementById("notification");

let running = false;

startButton.addEventListener("click", () => {

    if(running) return;

    running = true;

    startButton.disabled = true;

    startButton.textContent = "Simulation Running...";

    statusText.textContent = "Heavy Rain";

    barrierText.textContent = "Retracted";

    houseText.textContent = "Monitoring";

    waterText.textContent = "0%";

    water.style.height = "0%";

    barrier.style.transform =
        "translateX(-50%) translateY(120px)";

    let level = 0;

    const simulation = setInterval(() => {

        level++;

        water.style.height = level + "%";

        waterText.textContent = level + "%";

        if(level === 25){

            statusText.textContent = "Flood Warning";

        }

        if(level === 35){

            barrierText.textContent = "Deploying";

            barrier.style.transform =
                "translateX(-50%) translateY(0px)";

        }

        if(level === 45){

            barrierText.textContent = "Locked";

            houseText.textContent = "Protected";

            statusText.textContent = "Barrier Active";

        }

        if(level >= 100){

            clearInterval(simulation);

            statusText.textContent = "Simulation Complete";

            notification.textContent =
                "✅ Flood successfully contained!";

            notification.classList.add("show");

            setTimeout(() => {

                notification.classList.remove("show");

            },3000);

            startButton.disabled = false;

            startButton.textContent = "Run Again";

            running = false;

        }

    },80);

});

/* ==========================
   Lightning
========================== */

const lightning = document.querySelector(".scene-lightning");

function flash(){

    lightning.style.opacity = ".7";

    setTimeout(()=>{

        lightning.style.opacity = "0";

    },120);

}

setInterval(flash,7000);
/* ==========================================================
   SCROLL REVEAL
========================================================== */

const revealItems = document.querySelectorAll(
".card, .tech-card, .process-card, .team-card, .stat"
);

const revealObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.animate([
                {
                    opacity:0,
                    transform:"translateY(40px)"
                },
                {
                    opacity:1,
                    transform:"translateY(0)"
                }
            ],{
                duration:700,
                easing:"ease-out",
                fill:"forwards"
            });

            revealObserver.unobserve(entry.target);

        }

    });

},{
    threshold:.15
});

revealItems.forEach(item=>{

    item.style.opacity=0;

    revealObserver.observe(item);

});

/* ==========================================================
   CONTACT FORM
========================================================== */

const contactForm = document.querySelector(".contact-form");

if(contactForm){

contactForm.addEventListener("submit",(e)=>{

    e.preventDefault();

    notification.textContent="✅ Message Sent Successfully";

    notification.classList.add("show");

    contactForm.reset();

    setTimeout(()=>{

        notification.classList.remove("show");

    },3000);

});

}

/* ==========================================================
   ACTIVE NAVIGATION
========================================================== */

const sections=document.querySelectorAll("section");

const navItems=document.querySelectorAll(".nav-links a");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(section=>{

if(window.scrollY>=section.offsetTop-120){

current=section.id;

}

});

navItems.forEach(link=>{

link.classList.remove("active");

if(link.getAttribute("href")==="#"+current){

link.classList.add("active");

}

});

});

/* ==========================================================
   SMOOTH BUTTON EFFECT
========================================================== */

document.querySelectorAll(".btn").forEach(btn=>{

btn.addEventListener("mouseenter",()=>{

btn.style.transform="translateY(-4px) scale(1.02)";

});

btn.addEventListener("mouseleave",()=>{

btn.style.transform="translateY(0) scale(1)";

});

});

/* ==========================================================
   CONSOLE MESSAGE
========================================================== */

console.log(
"%cFloodGuard v4.0 Loaded Successfully",
"color:#0B3D91;font-size:18px;font-weight:bold;"
);