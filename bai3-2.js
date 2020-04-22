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
    response.render('bai3-2', {
        todos: todos
    });
});
app.get('/todos/search', (req, res) => {
    var q = req.query.q
    var matchedTodos = todos.filter(function (todo) {
        return todo.name.toLowerCase().indexOf(q.toLowerCase()) !== -1
    })
    res.render('bai3-2', {
        todos: matchedTodos,
        query: q
    })
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
