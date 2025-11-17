// app.js - Controla a SPA simples

window.addEventListener("hashchange", renderPage);
window.addEventListener("DOMContentLoaded", renderPage);

// Páginas suportadas
function renderPage() {
    const hash = location.hash || "#/";
    const container = document.getElementById("content");

    switch (hash) {
        case "#/":
            container.innerHTML = Templates.dashboard();
            break;

        case "#/usuarios":
            container.innerHTML = Templates.usuarios();
            attachUserEvents();
            break;

        case "#/config":
            container.innerHTML = Templates.config();
            attachConfigEvents();
            break;

        default:
            container.innerHTML = "<h2>Página não encontrada</h2>";
    }
}

/* Eventos da página de usuários */
function attachUserEvents() {
    const form = document.getElementById("userForm");

    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const valid = Validation.validateForm(form);

        if (!valid) {
            showToast("Preencha os campos corretamente.");
            return;
        }

        showToast("Usuário cadastrado!");
        form.reset();
    });
}

/* Eventos da página de configurações */
function attachConfigEvents() {
    const form = document.getElementById("configForm");

    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const valid = Validation.validateForm(form);

        if (!valid) {
            showToast("Campo obrigatório!");
            return;
        }

        showToast("Configurações salvas!");
    });
}
