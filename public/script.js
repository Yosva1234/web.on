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

function crearcategorias()
{
  document.getElementById("menu").innerHTML="";
  document.getElementById("productoscat") = innerHTML="";

  categorias.forEach((element) =>
  {
      console.log(element.name);
      const scroll1 = `
      <li><a herf = "#${element.name}">${element.name}</a></li>;
      `;

      const scroll2 = `
      <section class="categoria">
        <h2>${element.name}</h2>
        <div class = "productos" id = "${element.name}">

       </div>
      </section>
      `;

      document.getElementById("menu").appendChild(scroll1);
      document.getElementById("productoscat").appendChild(scroll2);

  });
}

//------------------------------------------------------------------------------------------------------

function mostrar(productos) {

   categorias.forEach((element)=>
  {
     document.getElementById(element.name) = innerHTML="";
  });

    productos.forEach((element) => {
      const scrooll = document.createElement("div");
      scrooll.classList.add("producto");
      scrooll.innerHTML = `
        <img src="${element.imagen}" alt="${element.nombre}" ">
        <h3>${element.nombre}</h3>
        <p class="precio"> ${element.precio}-CUP</p>
        <p class="descripcion">${element.info}</p>
      `;
      document.getElementById(element.categoria).appendChild(scrooll);
    });
  }


function obtenerproductos() {

  const hashValue = window.location.hash.substring(1); 

    console.log(hashValue);

    fetch(`/tabla/${hashValue}`) 
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

  function obtenercategorias()
  {
    const hashValue = window.location.hash.substring(1); 

    fetch(`/tabla/cat${hashValue}`) 
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



  window.onload = obtenercategorias;
  



