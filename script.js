const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

function send(onError, onSuccess, url, method = 'GET', data = '', headers = {}, timeout = 60000) {

  let xhr;

  if (window.XMLHttpRequest) {
    // Chrome, Mozilla, Opera, Safari
    xhr = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    // Internet Explorer
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }

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
  xhr.open(method, url, true);
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
    return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price} руб.</p></div>`;
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
    return `<div class="modal-item"><p>${this.good.title} ${this.good.price}руб. x${this.count}</p></div>`;
  }
}

class Cart {
  constructor() {
    this.list = []
  }

  add(good) {
    const idx = this.list.findIndex((stack) => stack.getGoodId() == good.id)
    if (idx >= 0) {
      this.list[idx].add()
    } else {
      this.list.push(new GoodStack(good))
    }
  }
  remove(id) {
    const idx = this.list.findIndex((stack) => stack.getGoodId() == id)
    if (idx >= 0) {
      this.list[idx].remove()
      if (this.list[idx].getCount() <= 0) {
        this.list.splice(idx, 1)
      }
    }
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
    this.cart = cart;
  }

  _onSuccess(response) {
    const data = JSON.parse(response)
    data.forEach(product => {
      this.list.push(
        new Good({ id: product.id_product, title: product.product_name, price: product.price })
      )
    });
  }

  _onSuccessCart(response) {
    const data = JSON.parse(response)
    data.contents.forEach(product => {
      for (let i = 0; i < product.quantity; i++) {
        this.addToCart(product.id_product)
      }
    });
  }

  _onError(err) {
    console.log(err);
  }

  fetchGoods() {
    send(this._onError, this._onSuccess.bind(this), `${API_URL}/catalogData.json`)
  }

  fetchCart() {
    send(this._onError, this._onSuccessCart.bind(this), `${API_URL}/getBasket.json`)
  }

  addToCart(id) {
    const idx = this.list.findIndex((good) => id == good.id)
    if (idx >= 0) {
      this.cart.add(this.list[idx])
    }
  }

  render() {
    let listHtml = '';
    this.list.forEach(goodItem => listHtml += goodItem.render());
    document.querySelector('.goods-list').innerHTML = listHtml;
  }
}

const cart = new Cart();
const showcase = new Showcase(cart);

showcase.fetchGoods();
showcase.fetchCart();

setTimeout(() => {
  // showcase.addToCart(123)
  // showcase.addToCart(123)
  // showcase.addToCart(123)
  // showcase.addToCart(456)

  // cart.remove(123)

  showcase.render()
  cart.render()
}, 1000)
