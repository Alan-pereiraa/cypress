import { del, get, post, put } from './api/http-client.js';

const state = { token: sessionStorage.getItem('quality_token'), products: [], editingId: null };
const $ = (selector) => document.querySelector(selector);
const loginScreen = $('[data-login-screen]');
const dashboard = $('[data-dashboard]');
const loginForm = $('[data-login-form]');
const productModal = $('[data-product-modal]');
const productForm = $('[data-product-form]');

function money(value) { return Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); }
function message(selector, text = '') { $(selector).textContent = text; }

async function login(event) {
  event.preventDefault();
  message('[data-login-message]');
  try {
    const data = await post('/api/auth/login', Object.fromEntries(new FormData(loginForm)));
    state.token = data.token;
    sessionStorage.setItem('quality_token', state.token);
    $('[data-user-name]').textContent = data.user.name;
    loginScreen.hidden = true;
    dashboard.hidden = false;
    await loadProducts();
  } catch (error) { message('[data-login-message]', error.message); }
}

async function loadProducts() {
  try {
    const data = await get(`/api/products?search=${encodeURIComponent($('[data-search]').value)}`, state.token);
    state.products = data.data;
    renderProducts();
  } catch (error) { message('[data-dashboard-message]', error.message); }
}

function renderProducts() {
  const totalStock = state.products.reduce((sum, product) => sum + Number(product.stock), 0);
  const totalValue = state.products.reduce((sum, product) => sum + Number(product.price) * Number(product.stock), 0);
  $('[data-total-products]').textContent = state.products.length;
  $('[data-total-stock]').textContent = totalStock;
  $('[data-total-value]').textContent = money(totalValue);
  $('[data-empty]').hidden = state.products.length > 0;
  $('[data-products-body]').innerHTML = state.products.map((product) => `<tr><td><strong>${escapeHtml(product.name)}</strong><small>#${product.id}</small></td><td>${money(product.price)}</td><td><span class="stock ${product.stock < 10 ? 'stock--low' : ''}">${product.stock} un.</span></td><td>${new Date(product.createdAt).toLocaleDateString('pt-BR')}</td><td class="actions"><button data-edit="${product.id}" type="button">Editar</button><button data-delete="${product.id}" type="button">Excluir</button></td></tr>`).join('');
}

function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' }[character])); }
function openModal(product = null) { state.editingId = product?.id || null; $('[data-modal-title]').textContent = product ? 'Editar produto' : 'Novo produto'; productForm.elements.id.value = product?.id || ''; productForm.elements.name.value = product?.name || ''; productForm.elements.price.value = product?.price || ''; productForm.elements.stock.value = product?.stock ?? ''; message('[data-modal-message]'); productModal.showModal(); }
function closeModal() { productModal.close(); }

async function saveProduct(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(productForm));
  data.price = Number(data.price); data.stock = Number(data.stock);
  try { state.editingId ? await put('/api/products', data, state.token) : await post('/api/products', data, state.token); closeModal(); await loadProducts(); }
  catch (error) { message('[data-modal-message]', error.message); }
}

async function deleteProduct(id) { if (!confirm('Deseja realmente excluir este produto?')) return; try { await del('/api/products', { id: Number(id) }, state.token); await loadProducts(); } catch (error) { message('[data-dashboard-message]', error.message); } }

loginForm.addEventListener('submit', login);
productForm.addEventListener('submit', saveProduct);
$('[data-new-product]').addEventListener('click', () => openModal());
$('[data-close-modal]').addEventListener('click', closeModal);
$('[data-refresh]').addEventListener('click', loadProducts);
$('[data-search]').addEventListener('input', loadProducts);
$('[data-logout]').addEventListener('click', () => { sessionStorage.removeItem('quality_token'); window.location.reload(); });
$('[data-products-body]').addEventListener('click', (event) => { const editId = event.target.dataset.edit; const deleteId = event.target.dataset.delete; if (editId) openModal(state.products.find((product) => product.id === Number(editId))); if (deleteId) deleteProduct(deleteId); });

if (state.token) { loginScreen.hidden = true; dashboard.hidden = false; loadProducts(); }
import { checkHealth } from './modules/health.js';

const statusElement = document.querySelector('[data-health-status]');

async function loadHealthStatus() {
  try {
    const health = await checkHealth();
    statusElement.textContent = `API online · ${health.service}`;
    statusElement.dataset.state = 'online';
  } catch (error) {
    statusElement.textContent = 'API offline · inicie o servidor PHP';
    statusElement.dataset.state = 'offline';
  }
}

loadHealthStatus();
