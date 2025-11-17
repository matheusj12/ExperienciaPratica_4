/* main.js - comportamento do dashboard */
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const themeToggle = document.getElementById('themeToggle');
const userBtn = document.getElementById('userBtn');
const userDropdown = document.querySelector('#userDropdown .dropdown-menu');
const toast = document.getElementById('toast');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');
const openSample = document.getElementById('openSample');

/* Sidebar open/close (mobile) */
sidebarToggle.addEventListener('click', ()=> {
  if (window.innerWidth <= 768) {
    sidebar.classList.toggle('open');
  } else {
    sidebar.classList.toggle('collapsed');
  }
});

/* Collapsible nav */
document.querySelectorAll('.nav-collapsible').forEach(btn=>{
  btn.addEventListener('click', e=>{
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    const sub = btn.nextElementSibling;
    if (sub) sub.style.display = expanded ? 'none' : 'block';
  });
});

/* Dropdown user */
userBtn.addEventListener('click', (e)=>{
  const expanded = userBtn.getAttribute('aria-expanded') === 'true';
  userBtn.setAttribute('aria-expanded', String(!expanded));
  const menu = userDropdown;
  if (menu) {
    const open = menu.style.display === 'block';
    menu.style.display = open ? 'none' : 'block';
    menu.setAttribute('aria-hidden', open ? 'true' : 'false');
  }
});

/* Theme toggle: cycles theme-light <-> theme-dark */
function setTheme(name){
  document.documentElement.classList.remove('theme-light','theme-dark','theme-auto');
  document.documentElement.classList.add(name);
  // also set body class for components
  document.body.className = name === 'theme-auto' ? 'theme-auto' : (name === 'theme-dark' ? 'theme-dark' : 'theme-light');
  themeToggle.setAttribute('aria-pressed', name === 'theme-dark' ? 'true' : 'false');
}
(function initTheme(){
  // default: prefer system but toggle sets dark/light
  setTheme('theme-auto');
})();
themeToggle.addEventListener('click', ()=>{
  const currentIsDark = document.body.classList.contains('theme-dark');
  setTheme(currentIsDark ? 'theme-light' : 'theme-dark');
});

/* Filter form -> show toast */
document.getElementById('filterForm').addEventListener('submit', (e)=>{
  e.preventDefault();
  showToast('Filtro aplicado');
});

/* Toast helper */
let toastTimer;
function showToast(message = '') {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=> {
    toast.classList.remove('show');
  }, 2800);
}

/* Modal interactions */
function openModal(content){
  modalContent.textContent = content;
  modal.setAttribute('aria-hidden','false');
}
function closeModal(){
  modal.setAttribute('aria-hidden','true');
}
document.getElementById('closeModal').addEventListener('click', closeModal);
document.getElementById('modalClose').addEventListener('click', closeModal);
openSample.addEventListener('click', ()=> openModal('Exemplo de detalhe: usuário João — compra R$120, status Ativo.'));

/* Table "Ver" buttons open modal */
document.querySelectorAll('.open-detail').forEach(btn=>{
  btn.addEventListener('click', (e)=> {
    const row = e.target.closest('tr');
    const user = row.children[0].textContent;
    const val = row.children[1].textContent;
    const status = row.children[2].textContent;
    openModal(`Usuário: ${user}\nValor: ${val}\nStatus: ${status}`);
  });
});

/* Simple: close sidebar on outside click (mobile) */
document.addEventListener('click', (e)=>{
  if (window.innerWidth <= 768 && !sidebar.contains(e.target) && !sidebar.classList.contains('collapsed')) {
    sidebar.classList.remove('open');
  }
});
