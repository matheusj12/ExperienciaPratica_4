/* main.js - comportamento do dashboard - com acessibilidade WCAG AA */

/* Seletores principais */
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const themeToggle = document.getElementById('themeToggle');
const contrastToggle = document.getElementById('contrastToggle');
const userBtn = document.getElementById('userBtn');
const userDropdown = document.querySelector('#userDropdown .dropdown-menu');
const toast = document.getElementById('toast');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');
const openSample = document.getElementById('openSample');

/* --------------------------------------------
   SIDEBAR RESPONSIVA
---------------------------------------------*/
sidebarToggle.addEventListener('click', ()=> {
  if (window.innerWidth <= 768) {
    sidebar.classList.toggle('open');
  } else {
    sidebar.classList.toggle('collapsed');
  }
});

/* Fecha sidebar ao clicar fora (mobile) */
document.addEventListener('click', (e)=>{
  if (window.innerWidth <= 768 && !sidebar.contains(e.target)) {
    sidebar.classList.remove('open');
  }
});

/* --------------------------------------------
   MENU COLAPSÁVEL (ARIA)
---------------------------------------------*/
document.querySelectorAll('.nav-collapsible').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    const sub = btn.nextElementSibling;
    if (sub) sub.style.display = expanded ? 'none' : 'block';
  });
});

/* --------------------------------------------
   DROPDOWN DE USUÁRIO (ARIA)
---------------------------------------------*/
userBtn.addEventListener('click', ()=>{
  const expanded = userBtn.getAttribute('aria-expanded') === 'true';
  userBtn.setAttribute('aria-expanded', String(!expanded));

  const open = userDropdown.style.display === 'block';
  userDropdown.style.display = open ? 'none' : 'block';
  userDropdown.setAttribute('aria-hidden', open ? 'true' : 'false');
});

/* --------------------------------------------
   TEMA ESCURO / CLARO
---------------------------------------------*/
function setTheme(name){
  document.documentElement.classList.remove('theme-light','theme-dark','theme-auto');
  document.documentElement.classList.add(name);

  document.body.className = name;
  themeToggle.setAttribute('aria-pressed', name === 'theme-dark');
}

(function initTheme(){
  setTheme('theme-auto');
})();

themeToggle.addEventListener('click', ()=>{
  const isDark = document.body.classList.contains('theme-dark');
  setTheme(isDark ? 'theme-light' : 'theme-dark');
});

/* --------------------------------------------
   ALTO CONTRASTE (WCAG AA)
---------------------------------------------*/
if (contrastToggle) {
  contrastToggle.addEventListener('click', ()=>{
    document.body.classList.toggle('theme-contrast');
    localStorage.setItem("contrastMode", document.body.classList.contains("theme-contrast"));
  });
}

/* Restaurar contraste salvo */
if (localStorage.getItem("contrastMode") === "true") {
  document.body.classList.add("theme-contrast");
}

/* --------------------------------------------
   FORM DE FILTRO → TOAST
---------------------------------------------*/
document.getElementById('filterForm').addEventListener('submit', (e)=>{
  e.preventDefault();
  showToast('Filtro aplicado com sucesso!');
});

/* Função de toast */
let toastTimer;
function showToast(message = '') {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);

  toastTimer = setTimeout(()=>{
    toast.classList.remove('show');
  }, 2500);
}

/* --------------------------------------------
   MODAL DE DETALHES
---------------------------------------------*/
function openModal(content){
  modalContent.textContent = content;
  modal.setAttribute('aria-hidden','false');
}

function closeModal(){
  modal.setAttribute('aria-hidden','true');
}

document.getElementById('closeModal').addEventListener('click', closeModal);
document.getElementById('modalClose').addEventListener('click', closeModal);

/* Botão de exemplo */
openSample.addEventListener('click', ()=>{
  openModal('Exemplo de detalhe: usuário João — compra R$120, status Ativo.');
});

/* Abrir modal ao clicar “Ver” */
document.querySelectorAll('.open-detail').forEach(btn=>{
  btn.addEventListener('click', (e)=> {
    const row = e.target.closest('tr');
    const user = row.children[0].textContent;
    const val = row.children[1].textContent;
    const status = row.children[2].textContent;

    openModal(`Usuário: ${user}\nValor: ${val}\nStatus: ${status}`);
  });
});
