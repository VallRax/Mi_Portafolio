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


            /* -----------------------------
               Contact form sending (Netlify forms via AJAX)
               - Uses the Netlify forms endpoint by posting to '/'.
               - Keeps the page single-page (AJAX) and shows feedback.
               - If Netlify is not available, the form will still degrade to a normal POST.
               ----------------------------- */

            document.addEventListener('DOMContentLoaded', function(){
                const contactoSection = document.getElementById('contacto');
                if(!contactoSection) return;
                const form = contactoSection.querySelector('form.contact-form');
                if(!form) return;
                form.addEventListener('submit', handleContactSubmit);
            });

            function handleContactSubmit(e){
                            const form = e.target;
                            // If the form is configured to submit to an external service (FormSubmit),
                            // support two modes:
                            // - AJAX mode (user checked "_ajax"): send to FormSubmit AJAX endpoint and keep user on page
                            // - Normal mode: allow browser to submit (redirect via _next)
                            if(form && form.dataset && form.dataset.external === 'formsubmit'){
                                // check _ajax checkbox presence
                                const ajaxInput = form.querySelector('input[name="_ajax"]');
                                let sendAjax = false;
                                if(ajaxInput){
                                    if(ajaxInput.type === 'checkbox'){
                                        sendAjax = !!ajaxInput.checked;
                                    } else {
                                        const v = (ajaxInput.value || '').toString().toLowerCase();
                                        sendAjax = (v === '1' || v === 'true' || v === 'yes');
                                    }
                                }
                                if(!sendAjax){
                                    return; // let the browser submit the form to FormSubmit (will redirect to _next)
                                }

                                // AJAX submission to FormSubmit's AJAX endpoint
                                e.preventDefault();
                                showContactMessage('Enviando...', 'info');
                                const submitBtn = form.querySelector('button[type="submit"]');
                                if(submitBtn) submitBtn.disabled = true;
                                const email = form.getAttribute('action').replace('https://formsubmit.co/','');
                                const ajaxUrl = `https://formsubmit.co/ajax/${encodeURIComponent(email)}`;
                                const formData = new FormData(form);
                                fetch(ajaxUrl, {
                                    method: 'POST',
                                    headers: { 'Accept': 'application/json' },
                                    body: formData
                                }).then(async res => {
                                    const data = await res.json().catch(()=>null);
                                    if(res.ok){
                                        showContactMessage('Mensaje enviado. Gracias — te contactaré pronto.', 'success');
                                        form.reset();
                                        // Redirect back to home after 3 seconds
                                        setTimeout(()=>{ window.location.href = '/'; }, 3000);
                                    } else {
                                        console.error('FormSubmit AJAX error', data || res.statusText);
                                        showContactMessage('No se pudo enviar por AJAX. Intentando envío normal...', 'error');
                                        // fallback: submit normally (this will open FormSubmit verification/redirect)
                                        form.removeEventListener('submit', handleContactSubmit);
                                        form.submit();
                                    }
                                }).catch(err => {
                                    console.error('Network error FormSubmit AJAX', err);
                                    showContactMessage('Error de red. Se intentará el envío normal.', 'error');
                                    form.removeEventListener('submit', handleContactSubmit);
                                    form.submit();
                                }).finally(()=> { if(submitBtn) submitBtn.disabled = false; });
                                return;
                            }
                            e.preventDefault();
                showContactMessage('Enviando...', 'info');
                const submitBtn = form.querySelector('button[type="submit"]');
                if(submitBtn) submitBtn.disabled = true;

                // Build form payload
                const formData = new FormData(form);

                // Netlify expects url-encoded body when submitted via fetch
                const body = new URLSearchParams();
                for(const pair of formData.entries()){
                    body.append(pair[0], pair[1]);
                }

                fetch('/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: body.toString()
                }).then(res => {
                    if(res.ok){
                        showContactMessage('Mensaje enviado. Gracias — te contactaré pronto.', 'success');
                        form.reset();
                        // Redirect back to home after 3 seconds
                        setTimeout(()=>{ window.location.href = '/'; }, 3000);
                    } else {
                        console.error('Netlify form error', res.statusText);
                        showContactMessage('No se pudo enviar. Intenta recargar la página y probar de nuevo.', 'error');
                    }
                }).catch(err => {
                    console.error('Network error sending Netlify form', err);
                    showContactMessage('Error de red. Si persiste, usa tu cliente de correo.', 'error');
                }).finally(()=> { if(submitBtn) submitBtn.disabled = false; });
            }

            function showContactMessage(text, type){
                const section = document.getElementById('contacto');
                if(!section) return;
                let msg = section.querySelector('.contact-msg');
                if(!msg){
                    msg = document.createElement('div');
                    msg.className = 'contact-msg';
                    msg.style.marginTop = '12px';
                    msg.style.fontWeight = '600';
                    section.querySelector('.contenido-seccion').appendChild(msg);
                }
                msg.textContent = text;
                msg.style.color = type === 'success' ? '#1CB698' : type === 'error' ? '#ff6b6b' : '#fff';
            }


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