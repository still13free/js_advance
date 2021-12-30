const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()

const port = 3000
const catalog_path = path.resolve(__dirname, './data/showcase.json')
const cart_path = path.resolve(__dirname, './data/cart.json')
const static_dir = path.resolve(__dirname, './public/')

app.use(express.static(static_dir))
app.use(express.json())

app.get('/api/v1/showcase', (req, res) => {
  fs.readFile(catalog_path, 'utf-8', (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      res.status(500).send(err)
    }
  })
})

app.get('/api/v1/cart', (req, res) => {
  fs.readFile(cart_path, 'utf-8', (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      res.status(500).send(err)
    }
  })
})

app.post('/api/v1/cart/add', (req, res) => {
  fs.readFile(cart_path, 'utf-8', (err, data) => {
    if (!err) {
      const addGood = req.body
      console.log(addGood)

      const cart = JSON.parse(data);
      const idx = cart.contents.findIndex((stack) => stack.id_product == addGood.id_product)
      if (idx >= 0) {
        cart.contents[idx].quantity += 1
      } else {
        cart.contents.push({
          "id_product": addGood.id_product,
          "product_name": addGood.product_name,
          "price": addGood.price,
          "quantity": 1
        })
      }
      console.log(`good added at index ${idx}`)

      cart.amount += addGood.price
      cart.countGoods += 1

      fs.writeFile(cart_path, JSON.stringify(cart), 'utf-8', (err, data) => {
        res.sendStatus(201)
      })
    } else {
      res.status(500).send(err)
    }
  })
})

app.post('/api/v1/cart/remove', (req, res) => {
  fs.readFile(cart_path, 'utf-8', (err, data) => {
    if (!err) {
      const removeId = req.body.id_product
      console.log(removeId)

      const cart = JSON.parse(data);
      const idx = cart.contents.findIndex((stack) => stack.id_product == removeId)

      if (idx >= 0) {
        const good = cart.contents[idx]
        cart.amount -= good.price
        cart.countGoods -= 1

        if (good.quantity > 1) {
          cart.contents[idx].quantity -= 1
          console.log(`good at index ${idx} decreased`)
        } else {
          cart.contents.splice(idx, 1)
          console.log(`good at index ${idx} deleted`)
        }

        fs.writeFile(cart_path, JSON.stringify(cart), 'utf-8', (err, data) => {
          res.sendStatus(201)
        })
      } else {
        res.sendStatus(304)
      }
    } else {
      res.status(500).send(err)
    }
  })
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
