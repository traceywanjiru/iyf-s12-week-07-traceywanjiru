const CART_STORAGE_KEY = "iyf_shopping_cart";

const state = {
    products: [
        { id: 1, name: "Mandazi (pack of 6)", price: 120 },
        { id: 2, name: "Chapati (pack of 5)", price: 150 },
        { id: 3, name: "Tea leaves 250g", price: 180 }
    ],
    cart: [] // { productId, quantity }
};

// --- Storage Helpers ---
function saveCart() {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.cart));
}

function loadCart() {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    if (saved !== null) {
        try {
            state.cart = JSON.parse(saved);
        } catch {
            state.cart = [];
        }
    }
}

// --- State Actions ---
function addToCart(productId) {
    const existing = state.cart.find(item => item.productId === productId);

    if (existing) {
        existing.quantity++;
    } else {
        state.cart.push({ productId, quantity: 1 });
    }

    saveCart();
    renderAll();
}

function updateQuantity(productId, quantity) {
    const parsedQty = parseInt(quantity, 10);
    if (isNaN(parsedQty) || parsedQty <= 0) {
        removeFromCart(productId);
        return;
    }

    const item = state.cart.find(i => i.productId === productId);
    if (item) {
        item.quantity = parsedQty;
        saveCart();
        renderAll();
    }
}

function removeFromCart(productId) {
    state.cart = state.cart.filter(item => item.productId !== productId);
    saveCart();
    renderAll();
}

function clearCart() {
    state.cart = [];
    saveCart();
    renderAll();
}

// --- Calculated Values ---
function getCartTotal() {
    return state.cart.reduce((total, item) => {
        const product = state.products.find(p => p.id === item.productId);
        return total + (product ? product.price * item.quantity : 0);
    }, 0);
}

function getCartCount() {
    return state.cart.reduce((count, item) => count + item.quantity, 0);
}

// --- DOM Rendering ---
const productListEl = document.getElementById("product-list");
const cartItemsEl = document.getElementById("cart-items");
const cartCountEl = document.getElementById("cart-count");
const cartTotalEl = document.getElementById("cart-total");
const clearCartBtn = document.getElementById("clear-cart-btn");

function renderProducts() {
    productListEl.innerHTML = "";
    state.products.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
            <h3>${product.name}</h3>
            <p>KES ${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productListEl.appendChild(card);
    });
}

function renderCart() {
    cartItemsEl.innerHTML = "";

    if (state.cart.length === 0) {
        cartItemsEl.innerHTML = `<p style="color: #666; text-align: center; padding: 1rem;">Your cart is empty.</p>`;
        return;
    }

    state.cart.forEach(item => {
        const product = state.products.find(p => p.id === item.productId);
        if (!product) return;

        const itemEl = document.createElement("div");
        itemEl.className = "cart-item";
        itemEl.innerHTML = `
            <div class="cart-item-details">
                <strong>${product.name}</strong>
                <small>KES ${product.price} each</small>
            </div>
            <div class="cart-item-actions">
                <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${product.id}, this.value)" />
                <button class="btn-danger" onclick="removeFromCart(${product.id})">×</button>
            </div>
        `;
        cartItemsEl.appendChild(itemEl);
    });
}

function renderSummary() {
    cartCountEl.textContent = getCartCount();
    cartTotalEl.textContent = getCartTotal();
}

function renderAll() {
    renderProducts();
    renderCart();
    renderSummary();
}

// Event Listeners
clearCartBtn.addEventListener("click", clearCart);

// Initialize App on load
loadCart();
renderAll();