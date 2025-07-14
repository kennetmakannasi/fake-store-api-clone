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



router.get('/docs/user' , (req,res)=>{
    res.render('docs', { title: 'Users', apis: userDocs })
})

router.get('/docs/category' , (req,res)=>{
    res.render('docs', { title: 'categories', apis: categoryDocs })
})

module.exports = router;