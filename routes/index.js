var express = require('express');
var router = express.Router();

router.get('/' , (req,res)=>{
    res.render('index')
})

const userDocs = [
    {
        method: 'GET',
        endpoint: '/api/user',
        description: 'Get all users'
    },
    {
        method: 'POST',
        endpoint: '/api/user/create',
        description: 'Create a new user',
        example: `POST /api/user/create
Content-Type: application/json

{
    "username": "John Doe",
    "password": "secret123"
}`
    },
    {
        method: 'GET',
        endpoint: '/api/user/:id',
        description: 'Get user by ID'
    },
    {
        method: 'PUT',
        endpoint: '/api/user/update/:id',
        description: 'Update user by ID'
    },
    {
        method: 'DELETE',
        endpoint: '/api/user/delete/:id',
        description: 'Delete user by ID'
    }
];

const categoryDocs = [
    {
        method: 'GET',
        endpoint: '/api/category',
        description: 'Get all categories'
    },
    {
        method: 'POST',
        endpoint: '/api/category/create',
        description: 'Create a new category',
        example: `POST /api/category/create
Content-Type: application/json

{
    "name": "categoryName"
}`
    },
    {
        method: 'GET',
        endpoint: '/api/category/:id',
        description: 'Get category by ID'
    },
    {
        method: 'PUT',
        endpoint: '/api/category/update/:id',
        description: 'Update category by ID'
    },
    {
        method: 'DELETE',
        endpoint: '/api/category/delete/:id',
        description: 'Delete category by ID'
    }
];

const cartDocs = [
    {
        method: 'GET',
        endpoint: '/api/cart',
        description: 'Get all carts'
    },
    {
        method: 'POST',
        endpoint: '/api/cart/create',
        description: 'Create a new cart',
        example: `POST /api/cart/create
Content-Type: application/json

{
    "userId": 1
    "quantity": 2
    "productId": 3
}`
    },
    {
        method: 'GET',
        endpoint: '/api/cart/:id',
        description: 'Get cart by user ID'
    },
    {
        method: 'PATCH',
        endpoint: '/api/cart/update/:id',
        description: 'Update cart item quantity by cart ID'
    },
    {
        method: 'DELETE',
        endpoint: '/api/cart/delete/:id',
        description: 'Delete cart by cart ID'
    }
];

const productDocs = [
    {
        method: 'GET',
        endpoint: '/api/product',
        description: 'Get all products'
    },
    {
        method: 'POST',
        endpoint: '/api/product/create',
        description: 'Create a new product with formdata',
        example: `POST /api/product/create
    title: text
    price: text
    description: text
    rating: text
    count: text
    categoryId: text
    image: file
`
    },
    {
        method: 'GET',
        endpoint: '/api/product/:id',
        description: 'Get product by ID'
    },
    {
        method: 'PUT',
        endpoint: '/api/product/update/:id',
        description: 'Update product by ID'
    },
    {
        method: 'DELETE',
        endpoint: '/api/product/delete/:id',
        description: 'Delete product by ID'
    }
];

router.get('/docs/user' , (req,res)=>{
    res.render('docs', { title: 'Users', apis: userDocs })
})

router.get('/docs/category' , (req,res)=>{
    res.render('docs', { title: 'Categories', apis: categoryDocs })
})

router.get('/docs/product' , (req,res)=>{
    res.render('docs', { title: 'Products', apis: productDocs })
})

router.get('/docs/cart' , (req,res)=>{
    res.render('docs', { title: 'Carts', apis: cartDocs })
})

module.exports = router;