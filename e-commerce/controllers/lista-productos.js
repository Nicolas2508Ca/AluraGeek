import { productoServices } from "../servicios/productos_servicios.js";

const getProducts = (name, price, imageUrl, id) => {
  const card = document.createElement("div");

  const contenido = `
    <div class="productos__box">
      <div class="productos__box-info">
        <div class="container">
            <button class="buttonDelete" type="button">
              <img class="deleteImage" src="../assets/img/delete.png" alt="Deletar" />
            </button>
            
            <a href="../screens/edit-product.html?id=${id}">
            
              <button class="buttonEdit" type="button">
                <img class="editImage" src="../assets/img/edit.png" alt="Editar" />
              </button>
             
        </div>
        
        <div class="productos__info">
            <img src="${imageUrl}" alt="Imagen producto" class="productos__imagen">
            <h1 class="nombre-producto"> ${name} </h1>
      </div>
        </div>
        <div class="productos__footer">
            <p class="precio">${price}</p>
            <a class="ver-producto" href="../producto.html?id=${id}">Ver producto</a>
        </div>
    </div>
    `;
  card.innerHTML = contenido;
  card.dataset.id = id;
  return card;
};

const productos = document.querySelector("[data-allProducts]");

productos.addEventListener("click", async (evento) => {
  let deleteButton = evento.target.className === "deleteImage";
  if (deleteButton) {
    const producto = evento.target.closest("[data-id]");
    let id = producto.dataset.id;
    productoServices
      .deleteProducto(id)
      .then((res) => {
        producto.remove();
        console.log(res);
      })
      .catch((err) => console.log(err));
  }
});

const render = async () => {
  try {
    const listaProductos = await productoServices.listaProductos();

    listaProductos.forEach((producto) => {
      productos.appendChild(
        getProducts(
          producto.name,
          producto.price,
          producto.imageUrl,
          producto.id
        )
      );
    });
  } catch (err) {
    console.log(err);
  }
};

render();