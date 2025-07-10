var express = require('express');
var router = express.Router();
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

router.get('/', async function (req, res) {
  try {
    const categories = await prisma.user.findMany({
      orderBy: {
        id: 'asc',
      },
      select: {
        id: true,
        username: true,
        password: false,
        created_at: true,
        updated_at: true,
        carts: true,
      },
    });

    res.status(200).json({
      status: 200,
      data: categories,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      status: 500,
      message: 'Internal server error',
    });
  }
});

router.get('/:id', async function (req, res) {
  try {
    const id = parseInt(req.params.id);

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        password: false,
        created_at: true,
        updated_at: true,
        carts: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: 'user not found',
      });
    }

    res.status(200).json({
      status: 200,
      data: user,
    });
  } catch (error) {
    console.error('Error fetching user by id:', error);
    res.status(500).json({
      status: 500,
      message: 'Internal server error',
    });
  }
});

router.post('/create', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        status: 400,
        message: 'Please fill every field required',
      });
    }

    const newUser = await prisma.user.create({
      data: { 
        username,
        password
     },
    });

    res.status(201).json({
      status: 201,
      message: 'User created successfully',
      data: newUser,
    });
  } catch (error) {
    console.error('Error creating User:', error);
    res.status(500).json({
      status: 500,
      message: 'Internal server error',
    });
  }
});

router.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({
        status: 400,
        message: 'Username is required',
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingUser) {
      return res.status(404).json({
        status: 404,
        message: 'User not found',
      });
    }

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { username },
      select: {
        id: true,
        username: true,
        created_at: true,
        updated_at: true,
      },
    });

    res.status(200).json({
      status: 200,
      message: 'User updated successfully',
      data: updatedUser,
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({
      status: 500,
      message: 'Internal server error',
    });
  }
});

router.delete('/delete/:id', async function (req, res) {
  try {
    const { id } = req.params;

    const existingUser = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingUser) {
      return res.status(404).json({
        status: 404,
        message: 'User not found',
      });
    }

    await prisma.user.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({
      status: 200,
      message: 'User deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({
      status: 500,
      message: 'Internal server error',
    });
  }
});


module.exports = router;