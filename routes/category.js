var express = require('express');
var router = express.Router();
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

router.get('/', async function (req, res) {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        id: 'asc',
      },
      include: {
        products: true, 
      },
    });

    res.status(200).json({
      status: 200,
      data: categories,
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      status: 500,
      message: 'Internal server error',
    });
  }
});

router.get('/:id', async function (req, res) {
  try {
    const id = parseInt(req.params.id);

    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        products: true,
      },
    });

    if (!category) {
      return res.status(404).json({
        status: 404,
        message: 'Category not found',
      });
    }

    res.status(200).json({
      status: 200,
      data: category,
    });
  } catch (error) {
    console.error('Error fetching category by id:', error);
    res.status(500).json({
      status: 500,
      message: 'Internal server error',
    });
  }
});

router.post('/create', async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        status: 400,
        message: 'Category name is required',
      });
    }

    const newCategory = await prisma.category.create({
      data: { name },
    });

    res.status(201).json({
      status: 201,
      message: 'Category created successfully',
      data: newCategory,
    });
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({
      status: 500,
      message: 'Internal server error',
    });
  }
});


router.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        status: 400,
        message: 'Category name is required',
      });
    }

    const existingCategory = await prisma.category.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingCategory) {
      return res.status(404).json({
        status: 404,
        message: 'Category not found',
      });
    }

    const updatedCategory = await prisma.category.update({
      where: { id: parseInt(id) },
      data: { name },
    });

    res.status(200).json({
      status: 200,
      message: 'Category updated successfully',
      data: updatedCategory,
    });
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({
      status: 500,
      message: 'Internal server error',
    });
  }
});


router.delete('/delete/:id', async function (req, res) {
  try {
    const { id } = req.params;

    const existingcategory = await prisma.category.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingcategory) {
      return res.status(404).json({
        status: 404,
        message: 'category not found',
      });
    }

    await prisma.category.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({
      status: 200,
      message: 'category deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({
      status: 500,
      message: 'Internal server error',
    });
  }
});

module.exports = router;