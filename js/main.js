const createProduct = (title, description, price, imageUrl) => {
  const url =
    "https://magicode-7ac7e-default-rtdb.firebaseio.com/products.json";

  const product = {
    title: title,
    description: description,
    price: price,
    imageUrl: imageUrl,
  };

  let productId = "";
  fetch(url, {
    method: "POST",
    body: JSON.stringify(product),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((product) => {
      productId = product.name;
      window.location.href = `/details.html?productId=${productId}`;
    });
};

const getProduct = (id) => {
  const url = `https://magicode-7ac7e-default-rtdb.firebaseio.com/${id}.json`;

  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((product) => {
      const card = buildCard(
        product.title,
        product.description,
        product.imageUrl,
        product.price
      );

      mainContent.appendChild(card);
    });
};

const getAllProducts = () => {
  const url = `https://magicode-7ac7e-default-rtdb.firebaseio.com/products.json`;

  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((products) => {
      for (const key in products) {
        const product = products[key];

        const card = buildCard(
          product.title,
          product.description,
          product.imageUrl,
          product.price,
          key
        );

        mainContent.appendChild(card);
      }
    });
};

const updateProduct = (title, description, price, imageUrl, productId) => {
  const url = `https://magicode-7ac7e-default-rtdb.firebaseio.com/products/${productId}.json`;

  const product = {
    title: title,
    description: description,
    price: price,
    imageUrl: imageUrl,
  };

  fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  }).then((res) => {
    if (res.ok) {
      window.location.href = `/details.html?productId=${productId}`;
    } else {
      console.error(res);
    }
  });
};
