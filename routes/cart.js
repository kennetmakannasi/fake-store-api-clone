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
        carts: {
            select: {
                quantity: true,
                product: true
            }
        }
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
    const userId = parseInt(req.params.id);

    if (isNaN(userId)) {
      return res.status(400).json({
        status: 400,
        message: 'Invalid user id',
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        carts: {
          select: {
            quantity: true,
            product: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: 'User not found',
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
    const { userId, quantity, productId } = req.body;

    if (!userId || !quantity || !productId) {
      return res.status(400).json({
        status: 400,
        message: '',
      });
    }

    const newCartItem = await prisma.cart.create({
      data: { userId, quantity, productId },
    });

    res.status(201).json({
      status: 201,
      message: 'item added to cart',
      data: newCartItem,
    });
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({
      status: 500,
      message: 'Internal server error',
    });
  }
});

router.patch('/update/:id', async (req, res) => {
  try {
    const cartId = parseInt(req.params.id);
    const { quantity } = req.body;

    if (isNaN(cartId) || !quantity) {
      return res.status(400).json({
        status: 400,
        message: 'Invalid input',
      });
    }

    const updatedCart = await prisma.cart.update({
      where: { id: cartId },
      data: { quantity },
    });

    res.status(200).json({
      status: 200,
      message: 'Cart updated',
      data: updatedCart,
    });
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({
      status: 500,
      message: 'Internal server error',
    });
  }
});


router.delete('/delete/:id', async (req, res) => {
  try {
    const cartId = parseInt(req.params.id);

    if (isNaN(cartId)) {
      return res.status(400).json({
        status: 400,
        message: 'Invalid cart id',
      });
    }

    // Cek dulu apakah cart item ada
    const existingCart = await prisma.cart.findUnique({
      where: { id: cartId },
    });

    if (!existingCart) {
      return res.status(404).json({
        status: 404,
        message: 'Cart item not found',
      });
    }

    // Hapus cart item
    await prisma.cart.delete({
      where: { id: cartId },
    });

    res.status(200).json({
      status: 200,
      message: 'Cart item deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting cart item:', error);
    res.status(500).json({
      status: 500,
      message: 'Internal server error',
    });
  }
});



module.exports = router;