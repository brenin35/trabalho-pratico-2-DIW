function getProductId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

async function fetchProducts() {
    try {
        const productId = getProductId();
        const url = `https://diwserver.vps.webdock.cloud/products/${productId}`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

async function renderPage() {
    const product = await fetchProducts();

    if (product) {
        let rating = product.rating.rate;
        let star = '<div class="star">';
        for (let j = 0; j < 5; j++) {
            if (j < Math.floor(rating)) {
                star += '<i class="fa fa-star full me-2"></i>';
            } else {
                star += '<i class="fa fa-star empty me-2"></i>';
            }
        }
        star += '</div>';

        const str = `
            <div class="container mt-5 mb-5 bg-white rounded-5">
                <div class="row pe-5">
                    <div class="col-lg-6 col-md-12 d-flex align-items-center justify-content-center">
                        <img class="img-detalhes" src="${product.image}" alt="${product.title}">
                    </div>
                    <div class="col-lg-6 col-md-12">
                        <h2 class="text-black title-page-detalhes mt-5">${product.title}</h2>
                        <p class="categoria-product">Category: ${product.category}</p>
                        <hr>
                        <div class="mt-2 mb-2" style="display: flex; align-items: center;">
                            <span class="">${star}</span>
                            <span class="fonte-serrat ">(${product.rating.count} Avaliações)</span>
                        </div>
                        <p class="preco-produto">U$${product.price}</p>
                        <span class="description">${product.description}</span>
                        <button class="cssbuttons-io-button mb-5 mt-3">Comprar
                            <div class="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                    <path fill="none" d="M0 0h24v24H0z"></path>
                                    <path fill="currentColor"
                                        d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z">
                                    </path>
                                </svg>
                            </div>
                        </button>
                    </div>
                </div>
            </div>`;

        document.getElementById('detalhes').innerHTML = str;
    }
}

renderPage();
