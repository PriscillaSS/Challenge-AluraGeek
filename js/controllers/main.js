import { servicesProducts } from "../services/product.services.js";

const productContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");


function createCard (name, price, image, id){
    const card = document.createElement("card");
    card.classList.add("card");

    card.innerHTML =`
    <div class="imagen-container">
        <img  class="Imagen-producto" src="${image}" alt="${name}" />
    </div>

    <div class="card-container--info">
        <p>${name}</p>
        <div class="card-container--value">
            <p>$ ${price}</p>
            <button class="delete-button" data-id="${id}">
                <p>🗑️</p>
            </button>
        </div>
    </div>`;

    /*Boton borrar*/
    const botonBorrar = card.querySelector(".delete-button");
    botonBorrar.addEventListener("click", () => {
        servicesProducts.borrarProducto(id)
            .then(() => {
                card.remove();
            })
            .catch(err => console.log(err));
    });


    productContainer.appendChild(card);
    return card;
};

const render = async () => {
    try {
        const listProducts = await servicesProducts.productList();
        
        listProducts.forEach(product => {
            productContainer.appendChild(
                createCard(
                    product.name,
                    product.price,
                    product.image,
                    product.id
                )
            )
            
        });

        
    } catch (error) {

        console.log(error);
        
    }

}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.querySelector("[data-titulo]").value;
    const price = document.querySelector("[data-precio]").value;
    const image = document.querySelector("[data-imagen]").value;


    servicesProducts.createProducts(name, price, image)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
});

render();
