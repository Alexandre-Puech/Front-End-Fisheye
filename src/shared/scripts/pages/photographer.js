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
    mediaContainer.setAttribute("tabindex", "0");
    mediaContainer.setAttribute("aria-label", title);

    let mediaElement;
    if (image) {
      mediaElement = document.createElement("img");
      mediaElement.setAttribute("src", `assets/images/photos/${image}`);
      mediaElement.setAttribute("alt", `${title}, closeup view`);
      mediaElement.classList.add("mediaPic");
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

    mediaContainer.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        const mediaArray = getPhotographerMediaArray();
        const currentIndex = mediaArray.indexOf(this.mediaData);
        this.openLightbox(mediaArray, currentIndex);
      }
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
    const likeDiv = document.createElement("div");
    likeDiv.classList.add("likeDiv");
    const likeSymbol = document.createElement("img");
    likeSymbol.src = "assets/icons/heart.svg";
    likeSymbol.classList.add("likeSymbol");
    likeSymbol.setAttribute("alt", "likes");
    likeDiv.appendChild(likeSymbol);
    mediaLike.appendChild(likeDiv);
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

    const closeButton = document.createElement("a");
    closeButton.className = "close";
    closeButton.setAttribute("aria-label", "Close lightbox");
    closeButton.innerHTML = "Fermer";
    closeButton.addEventListener("click", closeLightbox);
    lightboxContent.appendChild(closeButton);

    const prevButton = document.createElement("a");
    prevButton.className = "prev";
    prevButton.setAttribute("aria-label", "Previous image");
    prevButton.innerHTML = "Précédent";
    prevButton.addEventListener("click", () =>
      navigateLightbox(mediaArray, -1)
    );
    lightboxContent.appendChild(prevButton);

    const nextButton = document.createElement("a");
    nextButton.className = "next";
    nextButton.setAttribute("aria-label", "Next images");
    nextButton.innerHTML = "Suivant";
    nextButton.addEventListener("click", () => navigateLightbox(mediaArray, 1));
    lightboxContent.appendChild(nextButton);
  }
  function handleKeyboardNavigation(event) {
    switch (event.key) {
      case "Escape":
        closeLightbox();
        break;
      case "ArrowLeft":
        navigateLightbox(mediaArray, -1);
        break;
      case "ArrowRight":
        navigateLightbox(mediaArray, 1);
        break;
    }
  }
  function enableKeyboardNavigation() {
    document.addEventListener("keydown", handleKeyboardNavigation);
  }

  showLightboxMedia(mediaArray, currentIndex);
  enableKeyboardNavigation();

  function disableKeyboardNavigation() {
    document.removeEventListener("keydown", handleKeyboardNavigation);
  }

  function closeLightbox() {
    const lightbox = document.querySelector("#lightbox");
    if (lightbox) {
      lightbox.style.display = "none";
      disableKeyboardNavigation();
    }
  }
}

let currentMediaIndex = 0;

function showLightboxMedia(mediaArray, index) {
  currentMediaIndex = index;
  const lightboxContent = document.querySelector(".lightbox-content");
  if (!lightboxContent) return;

  const mediaElements = lightboxContent.querySelectorAll("img, video, p");
  mediaElements.forEach((element) => element.remove());

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

document.addEventListener("DOMContentLoaded", async function () {
  setTimeout(() => {
    const likeDivs = document.querySelectorAll(".mediaLike");

    function calculateTotalLikes() {
      const allLikeCounts = document.querySelectorAll(".likeNumber");
      let totalLikes = 0;
      allLikeCounts.forEach((likeCount) => {
        totalLikes += parseInt(likeCount.textContent);
      });
      return totalLikes;
    }
    function displayTotalLikes() {
      const totalLikesElement = document.querySelector(".globalLikes");
      if (totalLikesElement) {
        totalLikesElement.textContent = `${calculateTotalLikes()}`;
      }
    }
    likeDivs.forEach((div) => {
      const likeButton = div.querySelector(".likeDiv");
      const likeCount = div.querySelector(".likeNumber");

      likeButton.addEventListener("click", function () {
        if (!likeButton.classList.contains("liked")) {
          let currentCount = parseInt(likeCount.textContent);
          currentCount += 1;
          likeCount.textContent = currentCount;
          likeButton.classList.add("liked");
        } else if (likeButton.classList.contains("liked")) {
          let currentCount = parseInt(likeCount.textContent);
          currentCount -= 1;
          likeCount.textContent = currentCount;
          likeButton.classList.remove("liked");
        }
        displayTotalLikes();
      });
    });
    displayTotalLikes();
  }, 200);
});

const popularityFilter = document.querySelector(".filter__popularity");

popularityFilter.addEventListener("click", function () {
  const mediaElements = Array.from(document.querySelectorAll(".media-item"));
  mediaElements.sort((a, b) => {
    const likesA = parseInt(a.querySelector(".likeNumber").textContent);
    const likesB = parseInt(b.querySelector(".likeNumber").textContent);
    return likesB - likesA;
  });
  const mediaContainer = document.querySelector(".media-container");
  mediaContainer.innerHTML = "";
  mediaElements.forEach((mediaElement) => {
    mediaContainer.appendChild(mediaElement);
  });
});

const dateFilter = document.querySelector(".filter__date");

dateFilter.addEventListener("click", function () {
  const mediaElements = Array.from(document.querySelectorAll(".media-item"));
  mediaElements.sort((a, b) => {
    const dateA = new Date(
      a.querySelector(".mediaDate").getAttribute("datetime")
    );
    const dateB = new Date(
      b.querySelector(".mediaDate").getAttribute("datetime")
    );
    return dateB - dateA;
  });
  const mediaContainer = document.querySelector(".media-container");
  mediaContainer.innerHTML = "";
  mediaElements.forEach((mediaElement) => {
    mediaContainer.appendChild(mediaElement);
  });
});

const titleFilter = document.querySelector(".filter__title");

titleFilter.addEventListener("click", function () {
  const mediaElements = Array.from(document.querySelectorAll(".media-item"));
  mediaElements.sort((a, b) => {
    const titleA = a.querySelector(".mediaTitle").textContent.toLowerCase();
    const titleB = b.querySelector(".mediaTitle").textContent.toLowerCase();
    if (titleA < titleB) return -1;
    if (titleA > titleB) return 1;
    return 0;
  });
  const mediaContainer = document.querySelector(".media-container");
  mediaContainer.innerHTML = "";
  mediaElements.forEach((mediaElement) => {
    mediaContainer.appendChild(mediaElement);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const filterSelect = document.getElementById("filter");

  if (filterSelect) {
    filterSelect.addEventListener("keydown", (event) => {
      if (event.code === "Enter" || event.key === "Enter") {
        event.preventDefault();
        filterSelect.click();
      }
    });
  }
});
