const resourceId = new URLSearchParams(window.location.search).get("resourceId");
console.log("RESOURCE ID: ", resourceId);

const url = resourceId
  ? "https://striveschool-api.herokuapp.com/api/product/" + resourceId
  : "https://striveschool-api.herokuapp.com/api/product/";
console.log("url: ", url);

const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTczMzUwZmZlMDMxZTAwMTliYTE3NWIiLCJpYXQiOjE3MDIwNDkwNzIsImV4cCI6MTcwMzI1ODY3Mn0.XthGH0ZNPSuSsmw4QBKJ_TNASZEiOFKULn8RNCQM8Ww";

const method = resourceId ? "PUT" : "POST";
console.log("method: ", method);

window.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.querySelector("button[type='submit']");
  const deleteBtn = document.querySelector("button[type='button'].btn-danger");
  const subtitle = document.getElementById("subtitle");
  uploadImg();
  if (resourceId) {
    subtitle.innerText = "— Modifica Prodotto";

    submitBtn.classList.remove("btn-primary");
    submitBtn.classList.add("btn-success");
    submitBtn.innerText = "Modifica Prodotto";

    deleteBtn.classList.remove("d-none");

    isLoading(true);

    fetch(url, { headers: { Authorization: token } })
      .then((resp) => resp.json())
      .then(({ name, description, price, brand, imageUrl }) => {
        document.getElementById("name").value = name;
        document.getElementById("description").value = description;
        document.getElementById("price").value = price;
        document.getElementById("brand").value = brand;
        document.getElementById("imageUrl").value = imageUrl;
      })
      .finally(() => isLoading(false));
  } else {
    subtitle.innerText = "— Crea Prodotto";
  }
});

const handleSubmit = (event) => {
  event.preventDefault();

  const form = event.target;

  const newProduct = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    price: document.getElementById("price").value,
    brand: document.getElementById("brand").value,
    imageUrl: document.getElementById("imageUrl").value,
  };

  isLoading(true);

  fetch(url, {
    method: method,
    body: JSON.stringify(newProduct),
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  })
    .then((response) => {
      console.log(response);
      // controlli di guardia (guard clauses)
      if (response.status === 404) throw new Error("Errore, risorsa non trovata");
      if (response.status >= 400 && response.status < 500) throw new Error("Errore lato Client");
      if (response.status >= 500 && response.status < 600) throw new Error("Errore lato Server");
      if (!response.ok) throw new Error("Errore nel reperimento dei dati");

      return response.json();
    })
    .then((createdObj) => {
      if (resourceId) {
        showAlert("Risorsa con id: " + createdObj._id + " modificata con successo!", "success");
      } else {
        showAlert("Risorsa con id: " + createdObj._id + " creata con successo!");
        form.reset();
      }
    })
    .catch((Error) => console.log(Error))
    .finally(() => isLoading(false));
};

const isLoading = (boolean) => {
  const spinner = document.querySelector(".spinner-border");

  if (boolean) {
    spinner.classList.remove("d-none");
  } else {
    spinner.classList.add("d-none");
  }
};

const showAlert = (message, colorCode = "primary") => {
  const alertBox = document.getElementById("alert-box");
  alertBox.innerHTML = `
  <div class="alert alert-${colorCode}" role="alert">
  ${message}
  </div>`;

  setTimeout(() => {
    alertBox.innerHTML = "";
  }, 3000);
};

const handleDelete = () => {
  const hasConfirmed = confirm("sei sicuro di voler eliminare il prodotto?");

  if (hasConfirmed) {
    isLoading(true);

    fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
      })
      .then((deletedObj) => {
        showAlert("hai eliminato la risorsa " + deletedObj.name + " che aveva id: " + deletedObj._id, "danger");

        setTimeout(() => {
          window.location.assign("./index.html");
        }, 3000);
      })
      .finally(() => {
        isLoading(false);
      });
  }
};

function uploadImg() {
  const uploadBtn = document.getElementById("uploadBtn");
  uploadBtn.addEventListener("click", function () {
    const url = document.getElementById("imageUrl").value;
    const containerImg = document.getElementById("containerImg");
    const productImg = document.createElement("img");
    productImg.classList.add("img-fluid");
    productImg.style.maxHeight = "500px";
    productImg.src = url;
    containerImg.innerHTML = "";
    containerImg.appendChild(productImg);
  });
}
