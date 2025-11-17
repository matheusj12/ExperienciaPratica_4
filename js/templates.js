// templates.js - Templates simples da SPA

const Templates = {
    dashboard: () => `
        <section class="card">
            <h2>Dashboard</h2>
            <p>Bem-vindo ao painel principal!</p>

            <div class="actions">
                <a href="#/usuarios" class="btn">Gerenciar Usuários</a>
                <a href="#/config" class="btn btn-outline">Configurações</a>
            </div>
        </section>
    `,

    usuarios: () => `
        <section class="card">
            <h2>Usuários</h2>

            <form id="userForm" class="js-form">
                <div class="form-row">
                    <label>Nome</label>
                    <input type="text" name="nome" required>
                </div>

                <div class="form-row">
                    <label>E-mail</label>
                    <input type="email" name="email" required>
                </div>

                <button class="btn" type="submit">Cadastrar</button>
                <a href="#/" class="btn btn-outline">Voltar</a>
            </form>
        </section>
    `,

    config: () => `
        <section class="card">
            <h2>Configurações</h2>

            <form id="configForm">
                <div class="form-row">
                    <label>Nome do sistema</label>
                    <input type="text" name="sistema" required>
                </div>

                <button class="btn">Salvar</button>
                <a href="#/" class="btn btn-outline">Voltar</a>
            </form>
        </section>
    `
};

window.Templates = Templates;
