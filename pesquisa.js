const apiURL = 'https://diwserver.vps.webdock.cloud/products';

function createProductCard(product) {
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
        <div class="col-xxl-3 col-xl-6 col-lg-6 col-md-6 col-sm-6">
          <div class="card-n m-0 mb-4">
            <a class='main' href="detalhes.html?id=${product.id}">
              <div id="card-product-1"></div>
              <img class='tokenImage' src="${product.image}" alt="${product.title}"/>
              <h2 class="text-white mt-3 title-card">${product.title}</h2>
              <div class="mt-2 mb-2" style="display: flex; align-items: center;">
                <span class="text-white fonte-serrat">${star}</span>
                <span class="fonte-serrat">(${product.rating.count})</span>
              </div>
              <p class='description'>Brand: ${product.brandName}</p>
              <div class='tokenInfo'>
                <div class="price">
                  <p>U$${product.price}</p>
                </div>
              </div>
            </a>
          </div>
        </div>`;

        return str;
    }

    return '';
}

// Busca os produtos
async function fetchProducts(searchTerm = '') {
  try {
    const url = getUrl(searchTerm, 21);
    const response = await fetch(url);
    const data = await response.json();
    return data?.products || data;
  } catch (error) {
    renderError();
    console.error(error);
  }
}

// Gera url de busca
getUrl = (searchTerm, pageItems = 12) => {
  // Caso exista um termo pesquisado, retorna a url de busca
  if (searchTerm) {
    return `${apiURL}/search?query=${searchTerm}&page_items=60`
  }
  return `${apiURL}?page_items=${pageItems}`
}

// Troca os skeleton com cards de produtos
async function displayProducts(searchTerm = '') {
  const products = await fetchProducts(searchTerm);
  const productsDiv = $('#product-cards-1');
  productsDiv.empty();
  if (products?.length) {
    products.forEach(function (product) {
      productsDiv.append(createProductCard(product));
    });
  } else {
    productsDiv.append(`
      <div class="col-12">
        <h5 class="text-center text-white erro-mnsg">Nenhum produto encontrado.</h2>
      </div>
    `);
  }
}

// Função para criar os cards skeleton
// recebe o número de skeletons como param
function renderSkeletons (skeletonQuantity) {
  const productsDiv = $('#product-cards-1');
  for (let i = 0; i < skeletonQuantity; i++) {
    productsDiv.append(createSkeletonCard());
  }
}

//Função para renderizar mensagem de erro
function renderError () {
  const productsDiv = $('#product-cards-1');
  productsDiv.empty();
  productsDiv.append(`
    <div class="col-12">
      <h2 class="text-center text-white erro-mnsg">Erro no servidor. Tente novamente.</h2>
    </div>
  `);
}

// Adiciona o eventListener para o input de busca
// ao digitarmos ENTER, executa a busca.
$("#searchInput").keyup(function(event) {
  if (event.keyCode === 13) {
    const searchTerm = $('#searchInput').val();
    displayProducts(searchTerm);
  }
});

// Adiciona o eventListener para o botão de busca
$('#searchButton').click(function () {
  const searchTerm = $('#searchInput').val();
  displayProducts(searchTerm);
});