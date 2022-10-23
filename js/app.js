let contProductos = document.getElementById("contProductos")
const isOk = true

const productos = [
	{
		id: 1,
		title: "Café instantáneo Nescafé Dolca lata 170 g",
		price: 5460,
		stock: 35,
		image: "https://unimarc.vtexassets.com/arquivos/ids/192567-480-480/000000000000010524-UN-01.jpg?v=637199839616500000"
	},
	{
		id: 2,
		title: "Crema de leche Nestlé lata abre fácil 236 g",
		price: 3780,
		stock: 42,
		image: "https://unimarc.vtexassets.com/arquivos/ids/198385-480-480/000000000000344300-UN-01.jpg?v=637291753849770000"
	},
	{
		id: 3,
		title: "Pack Cerveza Budweiser botella 6 un de 355 cc",
		price: 7490,
		stock: 33,
		image: "https://unimarc.vtexassets.com/arquivos/ids/220684-480-480/000000000000009071-DIS-01.jpg?v=637692199425800000"
	},
	{
		id: 4,
		title: "Vino Casillero del Diablo reserva cabernet sauvignon 750 cc",
		price: 4750,
		stock: 15,
		image: "https://unimarc.vtexassets.com/arquivos/ids/203835-480-480/000000000000009340-UN-01.jpg?v=637396961780670000"
	},
	{
		id: 5,
		title: "Arroz Miraflores G1 largo ancho bolsa 1 Kg",
		price: 1890,
		stock: 17,
		image: "https://unimarc.vtexassets.com/arquivos/ids/193552-480-480/000000000000006105-UN-01.jpg?v=637220709271470000"
	},
	{
		id: 6,
		title: "Papel higiénico Confort doble hoja 4 un de 25 m",
		price: 1250,
		stock: 10,
		image: "https://unimarc.vtexassets.com/arquivos/ids/224375-480-480/000000000000646142-UN-01.jpg?v=637816709727870000"
	},
	{
		id: 7,
		title: "Quinoa Carozzi 250 g",
		price: 2870,
		stock: 28,
		image: "https://unimarc.vtexassets.com/arquivos/ids/193540-480-480/000000000000623026-UN-01.jpg?v=637220702166070000"
	},
	{
		id: 8,
		title: "Pasta corbatas Carozzi 400 g",
		price: 1610,
		stock: 20,
		image: "https://unimarc.vtexassets.com/arquivos/ids/195278-480-480/000000000000006459-UN-01.jpg?v=637260205530630000"
	},
	{
		id: 9,
		title: "Aceite Chef maravilla 0% colesterol 1 L",
		price: 4090,
		stock: 21,
		image: "https://unimarc.vtexassets.com/arquivos/ids/196324-480-480/000000000000004912-UN-01.jpg?v=637270009560970000"
	},
	{
		id: 10,
		title: "Sal de mar fina Oceánica bolsa 1 Kg",
		price: 360,
		stock: 12,
		image: "https://unimarc.vtexassets.com/arquivos/ids/202258-480-480/000000000000645794-UN-01.jpg?v=637371132537730000"
	}
]

const customFetch = (time,task) => {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            if (isOk){
                resolve(task)
            } else
            {
                reject("Error")
            }
        },time)
    })
}
const crearCard = (id, title, price, stock, image) =>{
	const cardProducto = document.createElement("div")
	cardProducto.classList.add("boxCard")
	let prodTitulo = document.createElement("h2")
	prodTitulo.textContent = title
	cardProducto.appendChild(prodTitulo)

	let prodImg = document.createElement("img")
	prodImg.classList.add("imgCard")
	prodImg.setAttribute("src",image)
	cardProducto.appendChild(prodImg)

	let prodStock = document.createElement("p")
	prodStock.textContent = "Stock Disponible: " + stock
	cardProducto.appendChild(prodStock)

	let prodPrice = document.createElement("p")
	prodPrice.textContent = "Precio: $ " + price
	cardProducto.appendChild(prodPrice)

	let btnAgregar = document.createElement("button")
	btnAgregar.textContent = "Comprar"
	btnAgregar.classList.add("btn-comprar")
	btnAgregar.setAttribute("id", id)
	cardProducto.appendChild(btnAgregar)
	contProductos.append(cardProducto)
}

let elMostrarBtn = document.getElementById("btnMostrar")
const mostrarProductos = () => {
elMostrarBtn.style.opacity = 0.5;
elMostrarBtn.textContent = 'Ejecutando proceso...';
contProductos.innerHTML = "";
btnSiguiente.className = 'nobtn';
btnAnterior.className = 'nobtn';
customFetch(2000,productos).then(data => {
									    for(let d of data){
											crearCard(d.id, d.title, d.price, d.stock, d.image)
										}
										setTimeout(function() {
											elMostrarBtn.textContent = 'Mostrar Productos';
											// elMostrarBtn.style.opacity = 1;
											// elMostrarBtn.disabled = false;
										}, 2000);
}
)
}

elMostrarBtn.addEventListener("click", mostrarProductos);


let elMostrarBtnML = document.getElementById("btnMostrarML")
let pagina = 1
const btnAnterior = document.getElementById('btnAnterior')
const btnSiguiente = document.getElementById('btnSiguiente')

btnSiguiente.addEventListener('click', () => {
    pagina += 20
	contProductos.innerHTML = "";
	btnAnterior.className = 'btn';
    mostrarProductosML()
})

btnAnterior.addEventListener('click', () => {
    if (pagina > 20) {
        pagina -= 20
		contProductos.innerHTML = "";
        mostrarProductosML()
    } else { btnAnterior.className = 'nobtn';}
})


const mostrarProductosML = async () => {
    try {
        const respuesta = await axios.get('https://api.mercadolibre.com/sites/MLC/search?q=libros', {
			params: {
                // api_key: 'b11a474a2fd87941a8936c55c3cd38d7',
                limit: 20,
				offset: pagina
            },
        })
        if (respuesta.status === 200) {
			contProductos.innerHTML = "";
			elMostrarBtn.style.opacity = 1;
			btnSiguiente.className = 'btn';
            const datos = await respuesta.data.results
            // console.log(respuesta);
				for(let d of datos){
					crearCard(d.id, d.title, d.price, d.available_quantity, d.thumbnail)
				}

        } else if (respuesta.status === 401) {
            console.log('You dont have access to this resource')
        } else if (respuesta.status === 404) {
            console.log('El producto no pudo ser encontrado')
        } else {
            console.log('Algo malo ocurrió...')
        }
    }
     catch(err) {
        console.log(err)
    }
}

elMostrarBtnML.addEventListener("click", mostrarProductosML);