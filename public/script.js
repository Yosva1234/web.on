document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('menu-btn');
    const menu = document.getElementById('menu');

    // Mostrar/ocultar menú al hacer clic
    menuBtn.addEventListener('click', function() {
        if (menu.style.display === 'block') {
            menu.style.display = 'none';
        } else {
            menu.style.display = 'block';
        }
    });//

    // Ocultar menú al hacer clic fuera
    document.addEventListener('click', function(event) {
        if (!menu.contains(event.target) && event.target !== menuBtn) {
            menu.style.display = 'none';
        }
    });
});

//------------------------------------------------------------------------------------------------------

let categorias;

function crearcategorias() {
  document.getElementById("menu").innerHTML = "";
  document.getElementById("productoscat").innerHTML = "";

  categorias.forEach((element) => {
    const scroll1 = `<li><a href="#${element.name}">${element.name}</a></li>`;
    const scroll2 = `
      <section class="categoria">
        <h2>${element.name}</h2>
        <div class="productos" id="${element.name}"></div>
      </section>
    `;
    document.getElementById("menu").insertAdjacentHTML('beforeend', scroll1);
    document.getElementById("productoscat").insertAdjacentHTML('beforeend', scroll2);
  });
}

//------------------------------------------------------------------------------------------------------

function mostrar(productos) {
  productos.forEach((element) => {
    const contenedor = document.getElementById(element.categoria);
    if (!contenedor) return;

    const productoHTML = `
      <div class="producto">
        <img src="${element.imagen}" alt="${element.nombre}" onerror="this.src='default.jpg'">
        <h3>${element.nombre}</h3>
        <p class="precio">${element.precio}-CUP</p>
        <p class="descripcion">${element.info}</p>
      </div>
    `;
    contenedor.insertAdjacentHTML('beforeend', productoHTML);
  });
}

async function obtenerproductos() {

  const hashValue = window.location.hash.substring(1); 

    console.log(hashValue);

    await fetch(`/tabla/${hashValue}`) 
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        return response.json();
      })
      .then(data => {
        mostrar(data);
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Hubo un error al cargar los datos de las bebidas');
      });
  }

  async function obtenercategorias()
  {
    const hashValue = window.location.hash.substring(1); 

    const aux = 'cat'+hashValue;

   await fetch(`/tabla/${aux}`) 
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        return response.json();
      })
      .then(data => {
        categorias = data;
        crearcategorias();
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Hubo un error al cargar los datos de las bebidas');
      });
      obtenerproductos();
  }

  function mostrarempresa()
  {

    const name = document.getElementById("empresa").innerHTML = "";

    const scroll = `<h1>${window.location.hash.substring(1).toUpperCase()}</h1>`

    document.getElementById("empresa").insertAdjacentHTML('beforeend', scroll);

    obtenercategorias();
  }



  window.onload = mostrarempresa;
  



