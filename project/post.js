// файл сделан для удобства отправления POST запросов

const url = '/api/v1/cart/'
const data = { "id": 13, }

fetch(url, {
    method: 'POST',
    headers: {
        "Content-Type": "application/json;odata=verbose",
    },
    body: JSON.stringify(data)
});