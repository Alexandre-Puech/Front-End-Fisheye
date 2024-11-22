function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
  modal.setAttribute("tabindex", "-1");
  modal.focus();
  createModalHeaderName();
  const mediaContainers = document.querySelectorAll(".media-item");
  mediaContainers.forEach((mediaContainer) => {
    mediaContainer.setAttribute("tabindex", "-1");
  });
  document.addEventListener("keydown", handleEscapeKey);
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
  const mediaContainers = document.querySelectorAll(".media-item");
  mediaContainers.forEach((mediaContainer) => {
    mediaContainer.setAttribute("tabindex", "0");
  });
  document.removeEventListener("keydown", handleEscapeKey);
}

function handleEscapeKey(event) {
  if (event.key === "Escape") {
    closeModal();
  }
}

async function getPhotographerName() {
  const photographerId = getPhotographerIdFromURL();
  const photographer = await getPhotographerData(photographerId);
  if (photographer) {
    return photographer.name;
  } else {
    console.error("Photographe non trouvé");
    return null;
  }
}

async function createModalHeaderName() {
  const photographerName = await getPhotographerName();
  if (photographerName) {
    const modalHeader = document.querySelector("#modalHeader");
    modalHeader.innerHTML = `<div class=formText>
    <p aria-label="contactMe">Contactez-moi</>
          <p aria-label="${photographerName}">${photographerName}</p></div>
          <img src="assets/icons/close.svg" onclick="closeModal()" />`;
  }
}

const modalBody = document.querySelector(".modal");
const formData = document.querySelectorAll(".formData");
const balisePrenom = document.getElementById("first");
const prenomParent = balisePrenom.closest(".formData");
const baliseNom = document.getElementById("last");
const nomParent = baliseNom.closest(".formData");
const baliseEmail = document.getElementById("email");
const emailParent = baliseEmail.closest(".formData");
const baliseMessage = document.getElementById("message");
const messageParent = baliseMessage.closest(".formData");
const form = document.getElementById("form");
const btnSubmit = document.getElementById("buttonSend");

function validerPrenom() {
  const prenom = balisePrenom.value;
  if (prenom.length >= 2) {
    prenomParent.setAttribute("data-error-visible", "false");
    return true;
  }
  prenomParent.setAttribute("data-error-visible", "true");
  return false;
}
function validerNom() {
  const nom = baliseNom.value;
  if (nom.length < 2) {
    nomParent.setAttribute("data-error-visible", "true");
    return false;
  }
  nomParent.setAttribute("data-error-visible", "false");
  return true;
}
function validerEmail() {
  const email = baliseEmail.value;
  const mailRegExp = new RegExp("^[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
  if (!mailRegExp.test(email)) {
    emailParent.setAttribute("data-error-visible", "true");
    return false;
  }
  emailParent.setAttribute("data-error-visible", "false");
  return true;
}
function validerMessage() {
  const message = baliseMessage.value;
  if (message === "") {
    messageParent.setAttribute("data-error-visible", "true");
    return false;
  }
  messageParent.setAttribute("data-error-visible", "false");
  return true;
}

function validate() {
  const isValidPrenom = validerPrenom();
  const isValidNom = validerNom();
  const isValidEmail = validerEmail();
  const isValidMessage = validerMessage();

  if (isValidPrenom && isValidNom && isValidEmail && isValidMessage) {
    return true;
  }
  return false;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const isValid = validate();
  if (isValid) {
    const formData = new FormData(form);
    const userData = {};
    formData.forEach((value, key) => {
      userData[key] = value;
    });
    console.log("Données du formulaire :", userData);
    form.reset();
  }
});
