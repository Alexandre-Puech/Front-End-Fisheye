//Mettre le code JavaScript lié à la page photographer.html

function getPhotographerIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

async function getPhotographerData(id) {
  const response = await fetch("shared/data/photographers.json");
  const profil = await response.json();
  return profil.photographers.find((photographer) => photographer.id == id);
}

async function displayPhotographerData(photographer) {
  const photographerHeader = document.querySelector(".photograph-header");

  const photographerModel = photographerTemplate(photographer);
  const userCardDOM = photographerModel.getUserCardProfileDOM();
  photographerHeader.appendChild(userCardDOM);
}

class MediaFactory {
  constructor(mediaData) {
    this.mediaData = mediaData;
  }

  openLightbox(mediaArray, index) {
    createLightbox(mediaArray, index);
  }

  createMediaElement() {
    const { image, video, title, likes, date } = this.mediaData;

    const mediaContainer = document.createElement("div");
    mediaContainer.classList.add("media-item");

    let mediaElement;
    if (image) {
      mediaElement = document.createElement("img");
      mediaElement.setAttribute("src", `assets/images/photos/${image}`);
      mediaElement.setAttribute("alt", title);
    } else if (video) {
      mediaElement = document.createElement("video");
      mediaElement.setAttribute("controls", "");
      const source = document.createElement("source");
      source.setAttribute("src", `assets/images/photos/${video}`);
      source.setAttribute("type", "video/mp4");
      mediaElement.appendChild(source);
    }
    mediaElement.addEventListener("click", () => {
      const mediaArray = getPhotographerMediaArray();
      const currentIndex = mediaArray.indexOf(this.mediaData);
      this.openLightbox(mediaArray, currentIndex);
    });

    mediaContainer.appendChild(mediaElement);

    const mediaContent = document.createElement("div");
    mediaContent.classList.add("mediaContent");
    const mediaTitle = document.createElement("p");
    mediaTitle.textContent = title;
    mediaTitle.classList.add("mediaTitle");
    const mediaDate = document.createElement("time");
    mediaDate.setAttribute("datetime", date);
    mediaDate.classList.add("mediaDate");
    const mediaLike = document.createElement("div");
    mediaLike.classList.add("mediaLike");
    const likeNumber = document.createElement("p");
    likeNumber.classList.add("likeNumber");
    likeNumber.textContent = likes;
    const likeSymbol = document.createElement("i");
    likeSymbol.classList.add("fa-solid", "fa-heart");
    mediaLike.appendChild(likeSymbol);
    mediaLike.appendChild(likeNumber);
    mediaContent.appendChild(mediaTitle);
    mediaContent.appendChild(mediaDate);
    mediaContent.appendChild(mediaLike);
    mediaContainer.appendChild(mediaContent);
    return mediaContainer;
  }
}

async function getMediaData() {
  const response = await fetch("shared/data/photographers.json");
  const data = await response.json();
  return data.media;
}

function createLightbox(mediaArray, currentIndex) {
  let lightbox = document.querySelector("#lightbox");
  if (!lightbox) {
    lightbox = document.createElement("div");
    lightbox.id = "lightbox";
    lightbox.classList.add("lightbox");
    document.body.appendChild(lightbox);

    const lightboxContent = document.createElement("div");
    lightboxContent.classList.add("lightbox-content");
    lightbox.appendChild(lightboxContent);

    const closeButton = document.createElement("span");
    closeButton.classList.add("close");
    closeButton.innerHTML = "Fermer";
    closeButton.addEventListener("click", closeLightbox);
    lightbox.appendChild(closeButton);

    const prevButton = document.createElement("a");
    prevButton.className = "prev";
    prevButton.innerHTML = "Précédent";
    prevButton.addEventListener("click", () =>
      navigateLightbox(mediaArray, -1)
    );
    lightbox.appendChild(prevButton);

    const nextButton = document.createElement("a");
    nextButton.className = "next";
    nextButton.innerHTML = "Suivant";
    nextButton.addEventListener("click", () => navigateLightbox(mediaArray, 1));
    lightbox.appendChild(nextButton);
  }

  showLightboxMedia(mediaArray, currentIndex);
}

function closeLightbox() {
  const lightbox = document.querySelector("#lightbox");
  if (lightbox) {
    lightbox.style.display = "none";
  }
}

let currentMediaIndex = 0;

function showLightboxMedia(mediaArray, index) {
  currentMediaIndex = index;
  const lightboxContent = document.querySelector(".lightbox-content");
  if (!lightboxContent) return;

  lightboxContent.innerHTML = "";

  const media = mediaArray[index];

  let mediaElement;
  if (media.image) {
    mediaElement = document.createElement("img");
    mediaElement.setAttribute("src", `assets/images/photos/${media.image}`);
    mediaElement.setAttribute("alt", media.title);
  } else if (media.video) {
    mediaElement = document.createElement("video");
    mediaElement.setAttribute("controls", "");
    const source = document.createElement("source");
    source.setAttribute("src", `assets/images/photos/${media.video}`);
    source.setAttribute("type", "video/mp4");
    mediaElement.appendChild(source);
  }

  const mediaTitle = document.createElement("p");
  mediaTitle.textContent = media.title;
  mediaTitle.classList.add("mediaTitle");

  lightboxContent.appendChild(mediaElement);
  lightboxContent.appendChild(mediaTitle);

  const lightbox = document.querySelector("#lightbox");
  lightbox.style.display = "flex";
}

function navigateLightbox(mediaArray, direction) {
  currentMediaIndex += direction;

  if (currentMediaIndex >= mediaArray.length) {
    currentMediaIndex = 0;
  } else if (currentMediaIndex < 0) {
    currentMediaIndex = mediaArray.length - 1;
  }

  showLightboxMedia(mediaArray, currentMediaIndex);
}

let photographerMediaArray = [];

function getPhotographerMediaArray() {
  return photographerMediaArray;
}

async function displayPhotographerMedia(photographerId) {
  const mediaData = await getMediaData();
  photographerMediaArray = mediaData.filter(
    (media) => media.photographerId == photographerId
  );

  const mediaGrid = document.querySelector(".media-container");

  photographerMediaArray.forEach((media) => {
    const mediaFactory = new MediaFactory(media);
    const mediaElement = mediaFactory.createMediaElement();
    mediaGrid.appendChild(mediaElement);
  });
}

async function init() {
  const photographerId = getPhotographerIdFromURL();

  if (photographerId) {
    const photographer = await getPhotographerData(photographerId);
    if (photographer) {
      displayPhotographerData(photographer);
      displayPhotographerMedia(photographerId);
    } else {
      console.error("Photographe non trouvé avec l'ID :", photographerId);
    }
  } else {
    console.error("Aucun ID de photographe trouvé dans l'URL");
  }
}

init();
