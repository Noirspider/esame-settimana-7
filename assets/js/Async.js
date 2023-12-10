const url = "https://striveschool-api.herokuapp.com/api/product/";
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTczMzUwZmZlMDMxZTAwMTliYTE3NWIiLCJpYXQiOjE3MDIwNDkwNzIsImV4cCI6MTcwMzI1ODY3Mn0.XthGH0ZNPSuSsmw4QBKJ_TNASZEiOFKULn8RNCQM8Ww";

fetch(url, { headers: { Authorization: token } })
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
  })

  .then((arrayResponseObj) => {
    let container = document.getElementById("mainContainer");

    arrayResponseObj.forEach((product) => {
      let newDiv = document.createElement("div");
      newDiv.classList.add("col-12", "col-md-6", "col-lg-4", "col-xl-3", "gy-3", "gx-auto");
      newDiv.innerHTML = `     
      <div>
          <div class="card mx-auto" style="width: 18rem;">
                <img src="${product.imageUrl}" class="card-img-top object-fit-contain mt-1" alt="..." height="200" >
              <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.brand}</p>
                <p class="card-text">${product.description}</p>
                <p class="card-text">${product.price} €</p>
                <a href="./product.html?id=${product._id}" class="btn btn-primary">More Info</a>
                <a href="./backOffice.html?resourceId=${product._id}" class="btn btn-success"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
              </svg></a>
              </div>
          </div>
      </div>`;
      container.appendChild(newDiv);
    });
  });
