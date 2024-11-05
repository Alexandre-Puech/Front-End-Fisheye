function photographerTemplate(data) {
  const { name, portrait, city, country, tagline, price } = data;

  const picture = `assets/images/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const lien = document.createElement("div");
    lien.classList.add("lien");
    const cardText = document.createElement("div");
    cardText.classList.add("cardText");
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);
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
  return { name, picture, getUserCardDOM };
}
