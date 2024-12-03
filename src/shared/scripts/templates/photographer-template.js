function photographerTemplate(data) {
  const { name, portrait, city, country, tagline, price, id } = data;

  const picture = `assets/images/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");

    const lien = document.createElement("a");
    lien.classList.add("lien");
    lien.setAttribute("aria-label", `lien vers la page de ${name}`);
    lien.setAttribute("href", `photographer.html?id=${id}`);

    const cardText = document.createElement("div");
    cardText.classList.add("cardText");

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", "");

    const h2 = document.createElement("h2");
    h2.textContent = name;

    const location = document.createElement("h3");
    location.textContent = `${city}, ${country}`;

    const slogan = document.createElement("p");
    slogan.textContent = tagline;
    slogan.classList.add("slogan");

    const cost = document.createElement("p");
    cost.textContent = `${price}€/jour`;
    cost.classList.add("cost");

    lien.appendChild(img);
    lien.appendChild(h2);
    article.appendChild(lien);

    cardText.appendChild(location);
    cardText.appendChild(slogan);
    cardText.appendChild(cost);
    article.appendChild(cardText);

    return article;
  }

  function getUserCardProfileDOM() {
    const article = document.createElement("article");

    const cardText = document.createElement("div");
    cardText.classList.add("description");
    cardText.setAttribute("aria-label", `description de ${name}`);

    const h2 = document.createElement("h2");
    h2.textContent = name;
    const location = document.createElement("h3");
    location.textContent = `${city}, ${country}`;
    const slogan = document.createElement("p");
    slogan.textContent = tagline;
    slogan.classList.add("slogan");

    const contactButton = document.createElement("button");
    contactButton.classList.add("contact_button");
    contactButton.textContent = "Contactez moi";
    contactButton.setAttribute("aria-label", "Contact Me");
    contactButton.onclick = displayModal;

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);

    const encart = document.createElement("div");
    encart.classList.add("encart");
    const cost = document.createElement("p");
    cost.textContent = `${price}€/jour`;
    cost.classList.add("cost");
    const heart = document.createElement("img");
    heart.src = "assets/icons/heart2.svg";
    heart.alt = "Heart Icon";
    heart.classList.add("heartIcon");
    const globalLikes = document.createElement("p");
    globalLikes.classList.add("globalLikes");
    globalLikes.textContent = "0";
    const totalLikes = document.createElement("div");
    totalLikes.classList.add("totalLikes");
    totalLikes.appendChild(heart);
    totalLikes.appendChild(globalLikes);
    encart.appendChild(cost);
    encart.appendChild(totalLikes);

    cardText.appendChild(h2);
    cardText.appendChild(location);
    cardText.appendChild(slogan);
    article.appendChild(cardText);
    article.appendChild(contactButton);
    article.appendChild(img);
    article.appendChild(encart);

    return article;
  }

  return { name, picture, getUserCardDOM, getUserCardProfileDOM };
}
