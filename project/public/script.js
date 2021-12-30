// const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const API_URL = 'http://localhost:3000/api/v1';

function send(onError, onSuccess, url, method = 'GET', data = '', headers = {}, timeout = 60000) {

  let xhr;

  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest(); // Chrome, Mozilla, Opera, Safari
  } else if (window.ActiveXObject) {
    xhr = new ActiveXObject("Microsoft.XMLHTTP"); // Internet Explorer
  }

  xhr.open(method, url, true);
  for ([key, value] of Object.entries(headers)) {
    xhr.setRequestHeader(key, value)
  }

  xhr.timeout = timeout;
  xhr.ontimeout = onError;
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status < 400) {
        onSuccess(xhr.responseText)
      } else if (xhr.status >= 400) {
        onError(xhr.status)
      }
    }
  }

  xhr.send(data);
}

function getCounter() {
  let last = 0;
  return () => ++last;
}

const stackIDGenrator = getCounter()

class Good {
  constructor({ id, title, price }) {
    this.id = id;
    this.title = title;
    this.price = price;
  }

  getId() {
    return this.id;
  }
  getPrice() {
    return this.price;
  }
  getTitle() {
    return this.title;
  }
  render() {
    return `<div class="goods-item" id="goods-item-${this.id}">
      <h3>${this.title}</h3>
      <p>${this.price} руб.</p>
      <button class="header-button add-button" id="button-add-${this.id}">добавить</button>
      <button class="header-button remove-button" id="button-remove-${this.id}">убрать</button>
    </div>`;
  }
}

class GoodStack {
  constructor(good) {
    this.id = stackIDGenrator();
    this.good = good;
    this.count = 1;
  }

  getGoodId() {
    return this.good.id
  }
  getGood() {
    return this.good;
  }
  getCount() {
    return this.count;
  }
  add() {
    this.count++;
    return this.count;
  }
  remove() {
    this.count--;
    return this.count;
  }
  render() {
    return `<div class="modal-item">
      <p>${this.good.title} ${this.good.price}руб. x${this.count}</p>
    </div>`;
  }
}

class Cart {
  constructor() {
    this.list = []
  }

  _onError(err) {
    console.log(0);
  }

  add(good) {
    const idx = this.list.findIndex((stack) => stack.getGoodId() == good.id)
    if (idx >= 0) {
      this.list[idx].add()
    } else {
      this.list.push(new GoodStack(good))
    }
    setTimeout(() => {
      cart.render()
    }, 500);
  }

  addAPI(good) {
    const reqData = JSON.stringify({
      "id_product": good.getId(),
      "product_name": good.getTitle(),
      "price": good.getPrice(),
    });
    const headers = {
      "Content-Type": "application/json;odata=verbose"
    };
    send(
      this._onError,
      (response) => {
        if (response == 'Created') {
          this.add(good)
        }
      },
      `${API_URL}/cart/add`,
      'POST',
      reqData,
      headers,
    )
  }

  remove(id) {
    const idx = this.list.findIndex((stack) => stack.getGoodId() == id)
    if (idx >= 0) {
      this.list[idx].remove()
      if (this.list[idx].getCount() <= 0) {
        this.list.splice(idx, 1)
      }
    }
    setTimeout(() => {
      cart.render()
    }, 500);
  }

  removeAPI(id) {
    const reqData = JSON.stringify({
      "id_product": id,
    });
    const headers = {
      "Content-Type": "application/json;odata=verbose"
    };
    send(
      this._onError,
      (response) => {
        if (response == 'Created') {
          this.remove(id)
        }
      },
      `${API_URL}/cart/remove`,
      'POST',
      reqData,
      headers)
    setTimeout(() => {
      cart.render()
    }, 500);
  }

  render() {
    let listHtml = '';
    this.list.forEach(goodStack => listHtml += goodStack.render());
    document.querySelector('.modal-cart').innerHTML = listHtml;
  }
}

class Showcase {
  constructor(cart) {
    this.list = [];
    this.filtred = [];
    this.cart = cart;

    // this.view = new ShowcaseView('.goods-list')
    this.searchInput = document.querySelector('#search-input')
    this.searchButton = document.querySelector('#search-button')

    this.searchButton.addEventListener('click', this.filter.bind(this))
  }

  _onSuccess(response) {
    const data = JSON.parse(response)
    data.forEach(product => {
      this.list.push(
        new Good({ id: product.id_product, title: product.product_name, price: product.price })
      )
    });
    this.render(this.list)
  }

  _onSuccessCart(response) {
    const data = JSON.parse(response)
    data.contents.forEach(product => {
      for (let i = 0; i < product.quantity; i++) {
        this.addToCart(product.id_product, false)
      }
      this.cart.render()
    });
  }

  _onError(err) {
    console.log(err);
  }

  fetchGoods() {
    send(this._onError, this._onSuccess.bind(this), `${API_URL}/showcase`)
  }

  fetchCart() {
    send(this._onError, this._onSuccessCart.bind(this), `${API_URL}/cart`)
  }

  addToCart(id, api = true) {
    const idx = this.list.findIndex((good) => id == good.id)
    if (idx >= 0) {
      if (api) {
        this.cart.addAPI(this.list[idx])
      } else {
        this.cart.add(this.list[idx])
      }
    }
  }

  removeFromCart(id, api = true) {
    if (api) {
      this.cart.removeAPI(id)
    } else {
      this.cart.remove(id)
    }
  }

  render(renderList) {
    let listHtml = '';
    renderList.forEach(goodItem => listHtml += goodItem.render());
    document.querySelector('.goods-list').innerHTML = listHtml;
    this.setupButtonEvents();
  }

  filter() {
    const search = new RegExp(this.searchInput.value, 'i')
    this.filtred = this.list.filter(good => search.test(good.title))
    // this.view.render()
    this.render(this.filtred)
  }

  setupButtonEvents() {
    const addButtons = document.querySelectorAll('.add-button')
    addButtons.forEach(button => {
      let goodId = button.id.replace('button-add-', '')
      goodId = Number(goodId)
      button.addEventListener('click', () => this.addToCart(goodId))
    });

    const removeButtons = document.querySelectorAll('.remove-button')
    removeButtons.forEach(button => {
      let goodId = button.id.replace('button-remove-', '')
      goodId = Number(goodId)
      button.addEventListener('click', () => this.removeFromCart(goodId))
    });
  }
}

const cart = new Cart();
const showcase = new Showcase(cart);

showcase.fetchGoods();
setTimeout(() => {
  showcase.fetchCart();
}, 500);

// немного тестов
// setTimeout(() => {
//   showcase.addToCart(123)
// }, 1500);
// setTimeout(() => {
//   showcase.addToCart(123)
// }, 2500);
// setTimeout(() => {
//   showcase.addToCart(456)
// }, 3500);
// setTimeout(() => {
//   showcase.removeFromCart(123)
// }, 4500);
// setTimeout(() => {
//   showcase.addToCart(456)
// }, 5500);