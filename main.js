document.addEventListener('DOMContentLoaded', loadAnimals);

let cuotaTotal = 0;
let cuotaIndividual = 0;
const padrinos = [];
let btnAdoptar = document.getElementById("btn_adoptar");
let btnApadrinar = document.getElementById("btn_padrinar");
let sectionAdoptar = document.getElementById("adoptar");
let filterPerro = document.getElementById("perro");
let filterGato = document.getElementById("gato");
let filterAll = document.getElementById("all");
let formAdoptar = document.getElementById("form_adoptar");
let animalesAdoptados;

if (localStorage) {

    document.getElementById('form').addEventListener('submit', function () {
        let name = document.getElementById('name').value;
        let last_name = document.getElementById('last_name').value;
        let city = document.getElementById('city').value;
        let telefono = document.getElementById('telefono').value;
        let email = document.getElementById('email').value;

        localStorage.setItem('name', name);
        localStorage.setItem('last_name', last_name);
        localStorage.setItem('city', city);
        localStorage.setItem('telefono', telefono);
        localStorage.setItem('email', email);

    });

}

let name = localStorage.getItem('name');
let last_name = localStorage.getItem('last_name');
let city = localStorage.getItem('city');
let telefono = localStorage.getItem('telefono');
let email = localStorage.getItem('email');

if (localStorage.getItem('animalesAdoptados')) {
    animalesAdoptados = JSON.parse(localStorage.getItem('animalesAdoptados'));
} else {
    animalesAdoptados = [];
}

class Animal {
    constructor(props) {
        this.id = props.id;
        this.nombre = props.nombre
        this.tamaño = props.tamaño;
        this.añoNacimiento = props.añoNacimiento;
        this.raza = props.raza;
        this.sexo = props.sexo;
        this.kind = props.kind;
        this.descripcion = props.descripcion;
        this.foto = props.foto;
        this.adoptado = false;
    }
    adoptado() {
        this.adoptado = true;
    }
}

class Padrino {
    constructor(props) {
        this.nombre = props.nombre;
        this.apellido = props.apellido;
        this.email = props.email;
        this.padrino = props.padrino;
        this.cuota = 0;
    }
    cuotaGeneral() {
        this.cuota = 10;
    }
    cuotaEspecifico() {
        this.cuota = cuotaTotal;
    }
}

const animales = [
    {
        id: 1,
        nombre: "Bruno",
        tamaño: "Grande",
        añoNacimiento: "2020",
        raza: "Labrador",
        sexo: "Macho",
        kind: "perro",
        descripcion: "Descripcion de animalito que esta buscando un hogar",
        foto: "https://wildcard.codestuff.io/dog/380/250"
    },
    {
        id: 2,
        nombre: "Astro",
        tamaño: "Pequeño",
        añoNacimiento: "2020",
        raza: "Europeo común",
        sexo: "Macho",
        kind: "gato",
        descripcion: "Descripcion de animalito que esta buscando un hogar",
        foto: "https://wildcard.codestuff.io/cat/380/250"
    },
    {
        id: 3,
        nombre: "Mila",
        tamaño: "Pequeño",
        añoNacimiento: "2016",
        raza: "Puddle",
        sexo: "Hembra",
        kind: "perro",
        descripcion: "Descripcion de animalito que esta buscando un hogar",
        foto: "https://wildcard.codestuff.io/dog/380/250"
    },
    {
        id: 4,
        nombre: "Fito",
        tamaño: "Grande",
        añoNacimiento: "2021",
        raza: "Siamés",
        sexo: "Macho",
        kind: "gato",
        descripcion: "Descripcion de animalito que esta buscando un hogar",
        foto: "https://wildcard.codestuff.io/cat/380/250"
    },
    {
        id: 5,
        nombre: "Bruce",
        tamaño: "Grande",
        añoNacimiento: "2018",
        raza: "Mestizo de Pastor Alemán",
        sexo: "Macho", kind: "perro",
        descripcion: "Descripcion de animalito que esta buscando un hogar",
        foto: "https://wildcard.codestuff.io/dog/380/250"
    },
    {
        id: 6,
        nombre: "Nina",
        tamaño: "Grande",
        añoNacimiento: "2021",
        raza: "Mestizo",
        sexo: "Hembra",
        kind: "perro",
        descripcion: "Descripcion de animalito que esta buscando un hogar",
        foto: "https://wildcard.codestuff.io/dog/380/250"
    },
    {
        id: 7,
        nombre: "Simba",
        tamaño: "Grande",
        añoNacimiento: "2015",
        raza: "Europeo común",
        sexo: "Macho",
        kind: "gato",
        descripcion: "Descripcion de animalito que esta buscando un hogar",
        foto: "https://wildcard.codestuff.io/cat/380/250"
    },
    {
        id: 8,
        nombre: "Luna",
        tamaño: "Grande",
        añoNacimiento: "2012",
        raza: "Americano",
        sexo: "Hembra",
        kind: "gato",
        descripcion: "Descripcion de animalito que esta buscando un hogar",
        foto: "https://wildcard.codestuff.io/cat/380/250"
    },
    {
        id: 9,
        nombre: "Bruno",
        tamaño: "Grande",
        añoNacimiento: "2020",
        raza: "Labrador",
        sexo: "Macho",
        kind: "perro",
        descripcion: "Descripcion de animalito que esta buscando un hogar",
        foto: "https://wildcard.codestuff.io/dog/380/250"
    },
    {
        id: 10,
        nombre: "Tom",
        tamaño: "Grande",
        añoNacimiento: "2021",
        raza: "Europeo común",
        sexo: "Macho",
        kind: "gato",
        descripcion: "Descripcion de animalito que esta buscando un hogar",
        foto: "https://wildcard.codestuff.io/cat/380/250"
    },
    {
        id: 11,
        nombre: "Fifi",
        tamaño: "Grande",
        añoNacimiento: "2020",
        raza: "Europeo común",
        sexo: "Macho",
        kind: "gato",
        descripcion: "Descripcion de animalito que esta buscando un hogar",
        foto: "https://wildcard.codestuff.io/cat/380/250"
    }
]




function loadAnimals() {
    let sectionAnimals = document.getElementById("animales");
    let filteredAnimals = animales.filter(animal => !animalesAdoptados.includes(animal.id));
    
    filteredAnimals.forEach(animal => {
        sectionAnimals.innerHTML += `<div class="card card-compact w-96 bg-base-100 shadow-xl inline-flex m-4 ${animal.kind} ${animal.id}">
                                        <figure><img src="${animal.foto}" alt="Foto" /></figure>
                                        <div class="card-body">
                                        <h2 class="card-title">${animal.nombre}</h2>
                                        <p class="text-left"><b>Raza</b>: ${animal.raza}</p>
                                        <p class="text-left"><b>Sexo</b>: ${animal.sexo}</p>
                                        <p class="text-left">${animal.descripcion}</p>
                                        <div class="card-actions justify-end">
                                            <button id="${animal.id}" class="btn btn-primary border border-indigo-500 bg-indigo-500 text-white font-medium hover:bg-indigo-700 hover:border-indigo-700 text-sm card_btn_adoptar">Adoptar</button>
                                        </div>
                                        </div>
                                    </div>`;
        onclickAdoption();

    });

}


function filterSelection(seleccion) {
    let buttons = document.querySelectorAll(".btn-filter");

    buttons.forEach((button) => {
        if (seleccion == button.id) {
            button.classList.add("bg-indigo-800");
        } else {
            button.classList.remove("bg-indigo-800");
        }
    });


    let cards = document.querySelectorAll(".card");

    cards.forEach((card) => {
        if (seleccion == "all" && (!card.classList.contains("adoptado"))) {
            card.classList.remove("hidden");
        } else {
            if (card.classList.contains(seleccion) && (!card.classList.contains("adoptado"))) {
                card.classList.remove("hidden");
            } else {
                card.classList.add("hidden");
            }
        }
    });
}

function onclickAdoption() {
    let botones = document.querySelectorAll(".card_btn_adoptar");
    botones.forEach((boton) => {
        boton.onclick = () => addToAdoption(boton.id);
    });
}
function addToAdoption(id) {
    console.log(id);
    formAdoptar.scrollIntoView({
        behavior: 'smooth'
    });

    let cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
        if (card.classList.contains(id)) {
            card.classList.add("hidden");
            card.classList.add("adoptado");
            animalesAdoptados.push(id);
            localStorage.setItem('animalesAdoptados', JSON.stringify(animalesAdoptados));
        }
    });
}

btnAdoptar.onclick = () => sectionAdoptar.scrollIntoView({
    behavior: 'smooth'
});

filterAll.onclick = () => filterSelection("all");
filterPerro.onclick = () => filterSelection("perro");
filterGato.onclick = () => filterSelection("gato");