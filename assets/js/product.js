const parametri = new URLSearchParams(window.location.search);
const id = parametri.get("id");

const url = "https://striveschool-api.herokuapp.com/api/product/" + id;
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTczMzY5OWZlMDMxZTAwMTliYTE3ODIiLCJpYXQiOjE3MDIwNDk0MzMsImV4cCI6MTcwMzI1OTAzM30.8M9NXzf9FES_YQHHH32fs1QZQliyVf7STWb2PUhwouo";

fetch(url, {
  headers: {
    Authorization: token,
  },
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
  })
  .then((ResponseObj) => {
    const productDetailsContainer = document.getElementById("product-details");
    productDetailsContainer.classList.add("col-10", "mx-auto", "text-center");
    const serverDetailsContainer = document.getElementById("server-details");
    // Nome prodotto
    const productName = document.createElement("h2");
    productName.textContent = ResponseObj.name;
    productName.classList.add("display-4", "text-center");

    // Brand del prodotto
    const productBrand = document.createElement("h3");
    productBrand.textContent = `Brand: ${ResponseObj.brand}`;
    productBrand.classList.add("text-muted", "text-center");

    //prezzo prodotto
    const productPrice = document.createElement("p");
    productPrice.textContent = `Prezzo: $${ResponseObj.price}`;
    productPrice.classList.add("lead", "text-center");

    //descrizione prodotto
    const productDescription = document.createElement("p");
    productDescription.textContent = `Descrizione: ${ResponseObj.description}`;
    productDescription.classList.add("text-muted", "text-center");

    //immagine prodotto
    const productImage = document.createElement("img");
    productImage.src = ResponseObj.imageUrl;
    productImage.classList.add("img-fluid", "rounded", "float-right");
    productImage.style.maxWidth = "50%";

    // ID del prodotto
    const productId = document.createElement("p");
    productId.textContent = `ID del prodotto: ${ResponseObj._id}`;
    productId.classList.add("text-muted", "text-center");

    // Data di creazione
    const createdAt = document.createElement("p");
    createdAt.textContent = `Creato il: ${new Date(ResponseObj.createdAt).toLocaleDateString()}`;
    createdAt.classList.add("text-muted", "text-center");

    // Data di aggiornamento
    const updatedAt = document.createElement("p");
    updatedAt.textContent = `Ultimo aggiornamento: ${new Date(ResponseObj.updatedAt).toLocaleDateString()}`;
    updatedAt.classList.add("text-muted", "text-center");

    const editLink = document.createElement("a");
    editLink.href = `./backOffice.html?resourceId=${ResponseObj._id}`;
    editLink.classList.add("btn", "btn-success");
    editLink.textContent = "Modifica";

    productDetailsContainer.appendChild(productName);
    productDetailsContainer.appendChild(productBrand);
    productDetailsContainer.appendChild(productPrice);
    productDetailsContainer.appendChild(productDescription);
    productDetailsContainer.appendChild(productImage);
    serverDetailsContainer.appendChild(productId);
    serverDetailsContainer.appendChild(updatedAt);
    serverDetailsContainer.appendChild(createdAt);
    serverDetailsContainer.appendChild(editLink);
  });
