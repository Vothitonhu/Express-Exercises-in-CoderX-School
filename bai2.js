const express = require('express')
const app = express()
let port = 3000
let todos = [
    { id: 1, name: 'Đi chợ' },
    { id: 2, name: 'Rửa chén' },
    { id: 3, name: 'Nấu cơm' },
    { id: 4, name: 'Học code tại CodersX' }
]

app.set('view engine', 'pug')
app.set('views', './views')
app.get('/', (request, response) => {
    response.send('I love CodersX');
});
app.get('/todos', (request, response) => {
    response.render('bai2', {
        todos: todos
    });
});


app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
