let menuVisible = false;
//Función que oculta o muestra el menu
function mostrarOcultarMenu(){
    if(menuVisible){
        document.getElementById("nav").classList ="";
        menuVisible = false;
    }else{
        document.getElementById("nav").classList ="responsive";
        menuVisible = true;
    }
}

function seleccionar(){
    //oculto el menu una vez que selecciono una opcion
    document.getElementById("nav").classList = "";
    menuVisible = false;
}

// Cerrar menú al hacer clic en cualquier enlace del menú
document.addEventListener('DOMContentLoaded', function() {
    const menuLinks = document.querySelectorAll('#nav a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e){
            // closing menu for mobile
            seleccionar();
            // smooth scroll with header offset
            const href = this.getAttribute('href');
            if(href && href.startsWith('#')){
                e.preventDefault();
                const target = document.querySelector(href);
                if(target){
                    const header = document.querySelector('.contenedor-header');
                    const headerH = header ? header.offsetHeight : 0;
                    const y = target.getBoundingClientRect().top + window.pageYOffset - headerH - 10;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            }
        });
    });

    // Abrir/cerrar menú en móviles al tocar el icono hamburguesa
    const toggler = document.querySelector('.nav-responsive');
    if (toggler) {
        toggler.addEventListener('click', mostrarOcultarMenu);
    }

    // Active link on scroll
    const sections = Array.from(document.querySelectorAll('section'));
    const setActive = () => {
        const header = document.querySelector('.contenedor-header');
        const headerH = header ? header.offsetHeight : 0;
        let currentId = '';
        sections.forEach(sec => {
            const top = sec.offsetTop - headerH - 20;
            if(window.pageYOffset >= top) currentId = sec.id;
        });
        menuLinks.forEach(a => {
            const href = a.getAttribute('href');
            if(href && href.slice(1) === currentId){ a.classList.add('active'); }
            else { a.classList.remove('active'); }
        });
    };
    window.addEventListener('scroll', setActive);
    setActive();
});
//Funcion que aplica las animaciones de las habilidades
function efectoHabilidades(){
    var skills = document.getElementById("skills");
    var distancia_skills = window.innerHeight - skills.getBoundingClientRect().top;
    if(distancia_skills >= 300){
        let habilidades = document.getElementsByClassName("progreso");
        habilidades[0].classList.add("htmlcss");
        habilidades[1].classList.add("jstypescript");
        habilidades[2].classList.add("javaspring");
        habilidades[3].classList.add("angularreact");
        habilidades[4].classList.add("python");
        habilidades[5].classList.add("sqldb");
        habilidades[6].classList.add("gitgithub");
        habilidades[7].classList.add("comunicacion");
        habilidades[8].classList.add("trabajo");
        habilidades[9].classList.add("creatividad");
        habilidades[10].classList.add("dedicacion");
        habilidades[11].classList.add("proyect");
    }
}


//detecto el scrolling para aplicar la animacion de la barra de habilidades
window.onscroll = function(){
    efectoHabilidades();
} 

// Improve performance of scroll effects on mobile
if('scrollBehavior' in document.documentElement.style){
    try{ window.history.scrollRestoration = 'manual'; }catch(e){}
}