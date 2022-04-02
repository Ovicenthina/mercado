//MODULOS
const express = require("express");
const app = express();
const exphbs = require("express-handlebars");

//Handledars
app.set("view engine", "handlebars");

app.engine(
  "handlebars",
  exphbs.engine({
    layoutsDir: __dirname + "/views",
    partialsDir: __dirname + "/views/componentes/",
  })
);

//disponiendo de los archivos necesarios para usar bootstrap, jquery en el servidor
app.use(express.static(__dirname + "/assets"))
app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));
app.use("/js", express.static(__dirname + "/node_modules/bootstrap/dist/js"));
app.use("/jquery", express.static(__dirname + "/node_modules/jquery/dist"));


let carro = [];
let productosCant = 0;

//Se dispone la ruta raiz que al ser consumida muestra el Dashboard
app.get("/", (req,res)=>{
    res.render ("inicio", {
        productos: [
            "banana",
            "cebollas",
            "lechuga",
            "papas",
            "pimenton",
            "tomate",
        ],
        usuario: "Orihana Triana",
        ventas: carro,
        cantidad : productosCant
    })
});

//Se dispone la ruta para ver los productos en el modal
app.get("/:producto",(req,res)=>{
    const {producto}= req.params;
    if(producto !== "icono"){
        carro.push(producto);
        productosCant= carro.length;
    }
    res.redirect("/")
})

//Se dispone la ruta para eliminar productos del modal
app.get ("/eliminar/:eliminarProducto", (req,res)=>{
    const {eliminarProducto} = req.params;
    if (eliminarProducto !== "icono") {
        carro.splice(carro.indexOf(eliminarProducto),1);
        productosCant = carro.length;
    }
    res.redirect("/")
});

app.listen(3000, () => {
    console.log("El servidor está inicializado en el puerto 3000");
  });