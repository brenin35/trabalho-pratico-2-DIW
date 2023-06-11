fetch('https://diwserver.vps.webdock.cloud/products/search?query=2&page_items=12')
  .then(res => res.json())
  .then(data => {
    let str = '';
    const products = data;

    for (let i = 0; i < products.length; i++) {
      let product = products[i];

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

      str += `
        <div class="col-xxl-3 col-xl-6 col-lg-6 col-md-6 col-sm-6 ">
          <div class="card-n m-0 mb-4" data-aos="fade-up" data-aos-duration="1000">
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
    }

    document.getElementById('product-cards-1').innerHTML = str;
    AOS.init();
  });
