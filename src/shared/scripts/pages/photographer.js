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

  createMediaElement() {
    const { image, video, title, likes, date } = this.mediaData;

    const mediaContainer = document.createElement("div");
    mediaContainer.classList.add("media-item");

    if (image) {
      const img = document.createElement("img");
      img.setAttribute("src", `assets/images/photos/${image}`);
      img.setAttribute("alt", title);
      mediaContainer.appendChild(img);
    } else if (video) {
      const videoElement = document.createElement("video");
      videoElement.setAttribute("controls", "");
      const source = document.createElement("source");
      source.setAttribute("src", `assets/images/photos/${video}`);
      source.setAttribute("type", "video/mp4");
      videoElement.appendChild(source);
      mediaContainer.appendChild(videoElement);
    }
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

async function displayPhotographerMedia(photographerId) {
  const mediaData = await getMediaData();
  const photographerMedia = mediaData.filter(
    (media) => media.photographerId == photographerId
  );

  const mediaGrid = document.querySelector(".media-container");

  photographerMedia.forEach((media) => {
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
