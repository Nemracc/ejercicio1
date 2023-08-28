const express = require("express");
const methodOverride = require("method-override");
const slugify = require("slugify");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method")); // Habilitar el uso del campo "_method"
app.use(express.static("public"));
app.use(express.json());

const titulo = "C065008";
//productos nuevos
const productos = [
  { id: 1, nombre: "Coca cola", precio: 5000.0, slug: "coca_cola" },
  { id: 2, nombre: "Galletita", precio: 3500.5, slug: "galletita" },
  { id: 3, nombre: "agua", precio: 10000.35, slug: "agua" },
];
app.set("view engine", "ejs");
app.set("views", "views");

// Petición GET
app.get("/bienvenida", (req, res) => {
  // res.json({ mensaje: "Hola mundo" });
  // res.send("Hola mundo");
  res.render("bienvenida", { titulo: titulo, productos: productos });
});

app.get("/producto/:slug", (req, res) => {
  const p_slug = req.params.slug;
  const producto_seleccionado = productos.find(
    (producto) => producto.slug === p_slug
  );
  console.log(producto_seleccionado);
  res.render("producto", { producto: producto_seleccionado });
});

app.get("/crear_producto/", (req, res) => {
  res.render("crearProducto", { titulo: titulo });
});

app.put("/actualizar_producto/:id", (req, res) => {
  const p_id = req.body.id;
  console.log("Contenido", req.params.id);
  const producto_seleccionado = productos.find(
    (producto) => producto.id == p_id
  );

  console.log("cuerpo", req.body);
  producto_seleccionado.nombre = req.body.nombre;
  producto_seleccionado.precio = req.body.precio;
  const indexToUpdate = productos.findIndex((producto) => producto.id == p_id);

  if (indexToUpdate !== -1) {
    // Actualizar los valores del producto
    productos[indexToUpdate] = producto_seleccionado;

    console.log("Producto actualizado:", productos[indexToUpdate]);
  } else {
    console.log("No se encontró el producto con el ID especificado.");
  }

  res.redirect("/bienvenida");
});

app.delete("/eliminar_producto/:id", (req, res) => {
  const p_id = Number(req.params.id);
  console.log("Contenido", typeof p_id, req.params.id);
  console.log("Array", typeof productos[0].id);

  productos.forEach((producto, index) => {
    if (producto.id == p_id) {
      console.log("indice encontrado", producto.id, p_id);
    } else {
      console.log("indice perdido", producto.id, p_id);
    }
  });

  const indexToDelete = productos.findIndex((producto) => producto.id == p_id);
  console.log("Indice", indexToDelete);
  if (indexToDelete !== -1) {
    // Actualizar los valores del producto
    const elementoEliminado = productos.splice(indexToDelete, 1);

    console.log("Producto Eliminado:", elementoEliminado);
  } else {
    console.log("No se encontró el producto con el ID especificado.");
  }
});

app.post("/crear_producto", (req, res) => {
  console.log("cuerpo", req.body);
  let producto_nuevo = {
    id: 0,
    nombre: "",
    precio: 0,
    slug: "",
  };
  producto_nuevo.nombre = req.body.nombre;
  producto_nuevo.precio = req.body.precio;
  producto_nuevo.slug = slugify(req.body.nombre);
  const id = Math.max(...productos.map((producto) => producto.id));
  console.log("Maximo id", id);
  if (id < 0) {
    producto_nuevo.id = 1;
  } else {
    producto_nuevo.id = id + 1;
  }
  console.log("nuevo id", id);
  productos.push(producto_nuevo);

  res.redirect("/bienvenida");
});

// Inicia el servidor nuevo comentario
app.listen(3000, () => {
  console.log("Servidor puerto 3000");
});
