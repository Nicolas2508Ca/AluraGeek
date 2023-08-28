import { productoServices } from "../servicios/productos_servicios.js";

const nuevoProducto = (name, imageUrl, price, id) =>
{
    const card = document.createElement("div")
    card.classList.add("productos__box")
    const contenido = 
        `
        <div class="productos__info">
            <img src="${imageUrl}" alt="Imagen producto" class="productos__imagen">
            <h1 class="nombre-producto"> ${name} </h1>
        </div>
        <div class="productos__footer">
            <p class="precio">${price}</p>
            <a class="ver-producto" href="../producto.html?id=${id}">Ver producto</a>
        </div>
        `;

    card.innerHTML = contenido
    card.dataset.id = id

    return card
}

const producto = document.querySelector('[data-products]')

productoServices
.listaProductos()
.then((data) => 
{
    data.forEach(({name, imageUrl, price, id}) =>
        {
             const nuevaLinea = nuevoProducto(name, imageUrl, price, id);
             producto.appendChild(nuevaLinea);
        });
})