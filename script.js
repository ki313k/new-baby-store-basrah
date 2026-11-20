/* =====================================================================
   قاعدة بيانات البضائع (3 خيارات جاهزة لكل قسم)
   لتعديل أي منتج مستقبلاً: غيّر الاسم (name)، السعر (price)، ومسار الصورة (image)
   ===================================================================== */
const products = [
    // --- القسم 1: ملابس أطفال (صيفي) ---
    {
        id: 101,
        name: "منتج صيفي 1 - فستان قطني",
        category: "clothes-summer",
        price: 25000,
        image: "images/sef1.jpeg"
    },
    {
        id: 102,
        name: "منتج صيفي 2 - طقم شورت وتيشيرت",
        category: "clothes-summer",
        price: 22000,
        image: "images/sef2.jpeg"
    },
    {
        id: 103,
        name: "منتج صيفي 3 - بدلة أطفال خفيفة",
        category: "clothes-summer",
        price: 20000,
        image: "images/sef3.jpeg"
    },

    // --- القسم 2: ملابس أطفال (شتوي) ---
    {
        id: 201,
        name: "منتج شتوي 1 - طقم مخملي دافئ",
        category: "clothes-winter",
        price: 38000,
        image: "images/sh1.jpeg"
    },
    {
        id: 202,
        name: "منتج شتوي 2 - جاكيت مبطن",
        category: "clothes-winter",
        price: 45000,
        image: "images/sh2.jpeg"
    },
    {
        id: 203,
        name: "منتج شتوي 3 - بيجامة صوف ناعمة",
        category: "clothes-winter",
        price: 30000,
        image: "images/sh3.jpeg"
    },

    // --- القسم 3: أسرة أطفال ---
    {
        id: 301,
        name: "سرير 1 - سرير خشبي هزاز",
        category: "beds",
        price: 150000,
        image: "images/bed1.jpeg"
    },
    {
        id: 302,
        name: "سرير 2 - سرير تركي قياس 100 في 50",
        category: "beds",
        price: 95000,
        image: "images/bed2.jpeg"
    },
    {
        id: 303,
        name: "سرير 3 - سرير بجانب سرير الأم",
        category: "beds",
        price: 135000,
        image: "images/karooksmall.jpeg"
    },

    // --- القسم 4: عربات أطفال ---
    {
        id: 401,
        name: "عربة 1 - عربة سفر خفيفة الوزن",
        category: "strollers",
        price: 120000,
        image: "images/babyston.jpeg"
    },
    {
        id: 402,
        name: "عربة 2 - عربة فاخرة متعددة الوضعيات",
        category: "strollers",
        price: 185000,
        image: "images/kidlo.jpeg"
    },
    {
        id: 403,
        name: "عربة 3 - عربة توأم مزدوجة",
        category: "strollers",
        price: 220000,
        image: "images/kidlo2.jpeg"
    },

    // --- القسم 5: مستلزمات الأم ---
    {
        id: 501,
        name: "مستلزمات الأم 1 - طقم رضاعات مضادة للمغص",
        category: "mom-supplies",
        price: 28000,
        image: "images/chicoo2.jpeg"
    },
    {
        id: 502,
        name: "مستلزمات الأم 2 - حاملة أطفال مريحة",
        category: "mom-supplies",
        price: 55000,
        image: "images/gmad5.jpeg"
    },
    {
        id: 503,
        name: "مستلزمات الأم 3 - حقيبة مستلزمات الطفل",
        category: "mom-supplies",
        price: 42000,
        image: "images/chicoo3.jpeg"
    },

    // --- القسم 6: الحضائن والقماط لحديثي الولادة ---
    {
        id: 601,
        name: "حديثي الولادة 1 - حضانة مواليد آمنة",
        category: "incubators-swaddles",
        price: 110000,
        image: "images/gmad1.jpeg"
    },
    {
        id: 602,
        name: "حديثي الولادة 2 - قماط قطن 100%",
        category: "incubators-swaddles",
        price: 18000,
        image: "images/gmad2.jpeg"
    },
    {
        id: 603,
        name: "حديثي الولادة 3 - طقم استقبال مولود",
        category: "incubators-swaddles",
        price: 65000,
        image: "images/gmad3.jpeg"
    }
];

let cart = JSON.parse(localStorage.getItem("newBabyCart")) || [];
let allExpanded = false;
let toastTimer;

// فتح وإغلاق القسم العمودي عند الضغط عليه
function toggleSection(sectionId) {
    const clickedItem = document.getElementById(sectionId);
    if (!clickedItem) return;

    const isAlreadyOpen = clickedItem.classList.contains("active");

    document.querySelectorAll(".accordion-item").forEach(item => {
        item.classList.remove("active");
    });

    if (!isAlreadyOpen) {
        clickedItem.classList.add("active");
    }
}

// فتح أو طي كل الأقسام بضغطة واحدة
function toggleAllSections() {
    const items = document.querySelectorAll(".accordion-item");
    const btn = document.getElementById("toggle-all-btn");
    allExpanded = !allExpanded;

    items.forEach(item => {
        if (item.style.display !== "none") {
            item.classList.toggle("active", allExpanded);
        }
    });

    if (btn) {
        btn.innerHTML = allExpanded
            ? `<i class="fas fa-folder"></i> طي كل الأقسام`
            : `<i class="fas fa-folder-open"></i> فتح كل الأقسام`;
    }
}

// إنشاء بطاقة المنتج
function createProductCard(product) {
    return `
        <div class="card">
            <div>
                <img src="${product.image}" alt="${product.name}" class="product-img">
                <h3>${product.name}</h3>
            </div>
            <div>
                <p class="price">${product.price.toLocaleString()} د.ع</p>
                <button class="btn" onclick="addToCart(${product.id})">
                    <i class="fas fa-cart-plus"></i> أضف إلى السلة
                </button>
            </div>
        </div>
    `;
}

// تعبئة المنتجات وتحديث عداد الخيارات في كل قسم
function renderProducts(filteredList = products) {
    const featuredContainer = document.getElementById("featured-products");
    if (featuredContainer) {
        const featured = [products[0], products[3], products[12], products[15]].filter(Boolean);
        featuredContainer.innerHTML = featured.map(createProductCard).join("");
    }

    const categories = [
        "clothes-summer",
        "clothes-winter",
        "beds",
        "strollers",
        "mom-supplies",
        "incubators-swaddles"
    ];

    const isSearching = document.getElementById("search-input")?.value.trim() !== "";

    categories.forEach(categoryKey => {
        const section = document.getElementById(categoryKey);
        const container = document.getElementById(`${categoryKey}-grid`);
        const countBadge = document.getElementById(`count-${categoryKey}`);

        if (container && section) {
            const categoryProducts = filteredList.filter(p => p.category === categoryKey);
            container.innerHTML = categoryProducts.map(createProductCard).join("");

            if (countBadge) {
                countBadge.textContent = `${categoryProducts.length} خيارات`;
            }

            if (isSearching) {
                if (categoryProducts.length > 0) {
                    section.style.display = "block";
                    section.classList.add("active");
                } else {
                    section.style.display = "none";
                }
            } else {
                section.style.display = "block";
                section.classList.remove("active");
            }
        }
    });
}

// البحث الفوري
function searchProducts() {
    const query = document.getElementById("search-input").value.trim().toLowerCase();
    if (!query) {
        allExpanded = false;
        const btn = document.getElementById("toggle-all-btn");
        if (btn) btn.innerHTML = `<i class="fas fa-folder-open"></i> فتح كل الأقسام`;
        renderProducts(products);
        return;
    }

    const filtered = products.filter(p => p.name.toLowerCase().includes(query));
    renderProducts(filtered);
}

// فتح القسم تلقائياً إذا جاء الزبون من رابط في الصفحة الرئيسية (مثل categories.html#beds)
function openSectionFromHash() {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
        const targetSection = document.getElementById(hash);
        if (targetSection && targetSection.classList.contains("accordion-item")) {
            targetSection.classList.add("active");
            targetSection.scrollIntoView({ behavior: "smooth" });
        }
    }
}

// إظهار الإشعار الخفيف (Toast)
function showToast(productName) {
    const toast = document.getElementById("toast");
    const msg = document.getElementById("toast-message");
    if (!toast || !msg) return;

    msg.textContent = `تمت إضافة "${productName}" للسلة`;
    toast.classList.add("show");

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

// دوال سلة التسوق
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveAndUpdateCart();
    showToast(product.name);
}

function changeQuantity(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        saveAndUpdateCart();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveAndUpdateCart();
}

function saveAndUpdateCart() {
    localStorage.setItem("newBabyCart", JSON.stringify(cart));
    updateCartUI();
}

function updateCartUI() {
    const cartCount = document.getElementById("cart-count");
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalElement = document.getElementById("cart-total");

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) cartCount.textContent = totalItems;

    if (!cartItemsContainer || !cartTotalElement) return;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p style="text-align:center; color:#888; margin-top:40px;">سلة التسوق فارغة حالياً</p>`;
        cartTotalElement.textContent = "0 د.ع";
        return;
    }

    let totalAmount = 0;
    cartItemsContainer.innerHTML = cart.map(item => {
        totalAmount += item.price * item.quantity;
        return `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <span>${item.price.toLocaleString()} د.ع</span>
                </div>
                <div class="qty-controls">
                    <button class="qty-btn" onclick="changeQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="changeQuantity(${item.id}, 1)">+</button>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `;
    }).join("");

    cartTotalElement.textContent = `${totalAmount.toLocaleString()} د.ع`;
}

function toggleCart(forceOpen = false) {
    const modal = document.getElementById("cart-modal");
    if (!modal) return;
    if (forceOpen) {
        modal.style.display = "flex";
    } else {
        modal.style.display = (modal.style.display === "flex") ? "none" : "flex";
    }
}

function checkoutWhatsApp() {
    if (cart.length === 0) {
        alert("سلة التسوق فارغة! يرجى إضافة منتجات أولاً.");
        return;
    }

    let message = "مرحباً متجر New Baby، أرغب بطلب المنتجات التالية:\n\n";
    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        message += `${index + 1}. ${item.name} (العدد: ${item.quantity}) - ${itemTotal.toLocaleString()} د.ع\n`;
    });

    message += `\n*المجموع الكلي:* ${total.toLocaleString()} د.ع`;

    const phone = "9647728881440";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
}

document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    updateCartUI();
    openSectionFromHash();
});

// تفعيل تكبير الصورة عند النقر عليها
document.addEventListener("click", function (e) {
    if (e.target.tagName === "IMG" && e.target.closest("#products-container, .products-grid, .product-card, .card")) {
        const modal = document.getElementById("imageModal");
        const modalImg = document.getElementById("fullProductImage");
        const captionText = document.getElementById("modalCaption");

        if (modal && modalImg) {
            modal.style.display = "flex";
            modalImg.src = e.target.src;
            if (captionText) captionText.textContent = e.target.alt || "";
        }
    }
});

// دالة إغلاق النافذة عند الضغط في أي مكان فارغ أو على زر X
function closeImageModal() {
    const modal = document.getElementById("imageModal");
    if (modal) {
        modal.style.display = "none";
    }
}