const WHATSAPP_NUMBER = "5519993735500";

const whatsappMessage = "Olá! Gostaria de agendar um horário na Barbearia Estação.";


// NAVBAR / MENU MOBILE
const navbar = document.getElementById("navbar");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

function updateNavbar() {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
}

window.addEventListener("scroll", updateNavbar, { passive: true });
updateNavbar();

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Fechar menu" : "Abrir menu"
  );
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
  });
});


// WHATSAPP
function setupWhatsappLink(element) {
  if (!element) return;

  if (WHATSAPP_NUMBER.trim()) {
    element.href =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

    element.target = "_blank";
    element.rel = "noopener";
  } else {
    element.href = "#agendamento";

    element.addEventListener("click", event => {
      event.preventDefault();

      alert(
        "O número oficial do WhatsApp ainda não foi configurado. " +
        "Edite WHATSAPP_NUMBER no arquivo js/script.js."
      );
    });
  }
}

setupWhatsappLink(document.getElementById("whatsappButton"));
setupWhatsappLink(document.getElementById("footerWhatsapp"));


// REVEAL ON SCROLL
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12
  }
);

document
  .querySelectorAll(".reveal")
  .forEach(element => revealObserver.observe(element));


// LIGHTBOX
const galleryItems = [...document.querySelectorAll(".gallery-item")];

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");

const galleryImages = galleryItems.map(item => {
  const image = item.querySelector("img");

  return {
    src: image.getAttribute("src"),
    alt: image.getAttribute("alt")
  };
});

let currentImage = 0;

function showLightbox(index) {
  currentImage =
    (index + galleryImages.length) % galleryImages.length;

  const item = galleryImages[currentImage];

  lightboxImage.src = item.src;
  lightboxImage.alt = item.alt;

  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";
}

galleryItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    showLightbox(index);
  });
});

lightboxClose.addEventListener("click", closeLightbox);

lightboxPrev.addEventListener("click", () => {
  showLightbox(currentImage - 1);
});

lightboxNext.addEventListener("click", () => {
  showLightbox(currentImage + 1);
});

lightbox.addEventListener("click", event => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", event => {
  if (!lightbox.classList.contains("open")) return;

  if (event.key === "Escape") {
    closeLightbox();
  }

  if (event.key === "ArrowLeft") {
    showLightbox(currentImage - 1);
  }

  if (event.key === "ArrowRight") {
    showLightbox(currentImage + 1);
  }
});


// FAQ ACCORDION
document.querySelectorAll(".faq-item").forEach(item => {
  const button = item.querySelector("button");

  button.addEventListener("click", () => {
    const wasOpen = item.classList.contains("open");

    // Fecha todos os outros
    document.querySelectorAll(".faq-item.open").forEach(openItem => {
      openItem.classList.remove("open");

      openItem
        .querySelector("button")
        .setAttribute("aria-expanded", "false");
    });

    // Abre o selecionado
    if (!wasOpen) {
      item.classList.add("open");
      button.setAttribute("aria-expanded", "true");
    }
  });
});


// BOTÃO VOLTAR AO TOPO
const backTop = document.getElementById("backTop");

window.addEventListener(
  "scroll",
  () => {
    backTop.classList.toggle("show", window.scrollY > 600);
  },
  { passive: true }
);

backTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});


// SCROLL SUAVE ENTRE AS SEÇÕES
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", event => {
    const targetId = anchor.getAttribute("href");

    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);

    if (!target) return;

    event.preventDefault();

    const offset = navbar.offsetHeight;

    const targetTop =
      target.getBoundingClientRect().top +
      window.scrollY -
      offset;

    window.scrollTo({
      top: targetTop,
      behavior: "smooth"
    });
  });
});