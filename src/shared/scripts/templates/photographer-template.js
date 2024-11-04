function photographerTemplate(data) {
  const { name, portrait, city, country, tagline, price } = data;

  const picture = `assets/images/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    const h2 = document.createElement("h2");
    h2.textContent = name;
    const location = document.createElement("h3");
    location.textContent = `${city}, ${country}`;
    const slogan = document.createElement("p");
    slogan.textContent = tagline;
    const cost = document.createElement("p");
    cost.textContent = `${price}€/jour`;
    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(location);
    article.appendChild(slogan);
    article.appendChild(cost);
    return article;
  }
  return { name, picture, getUserCardDOM };
}
