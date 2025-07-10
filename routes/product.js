var express = require('express');
var router = express.Router();
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `image-${unique}${ext}`);
  }
});

const upload = multer({ storage });

router.get('/', async function (req, res) {
  const product = await prisma.Product.findMany({
    include: {
        category: true, 
    },
    orderBy: [
      {
        id: 'asc',
      },
    ],
  });
  res.status(200).json({
    status: 200 ,
    data: product
  });
});

router.get('/:id', async function (req, res) {
  try {
    const id = parseInt(req.params.id);

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true, 
      },
    });

    if (!product) {
      return res.status(404).json({
        status: 404,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      status: 200,
      data: product,
    });
  } catch (error) {
    console.error('Error fetching product by id:', error);
    res.status(500).json({
      status: 500,
      message: 'Internal server error',
    });
  }
});

router.get('/search', async function (req, res) {
  try {
    const { q } = req.query;

    if (!q || q.trim() === '') {
      return res.status(400).json({
        status: 400,
        message: 'Query parameter "q" is required',
      });
    }

    const keyword = q.toLowerCase();

    const products = await prisma.product.findMany({
      where: {
        OR: [
          {
            title: {
              contains: keyword,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: keyword,
              mode: 'insensitive',
            },
          },
        ],
      },
      orderBy: {
        id: 'asc',
      },
      include: {
        category: true, // opsional: tampilkan juga kategori produk
      },
    });

    res.status(200).json({
      status: 200,
      data: products,
    });
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({
      status: 500,
      message: 'Internal server error',
    });
  }
});

router.post('/create', upload.single('image'), async function (req, res) {
  try {
    const {
      title,
      price,
      description,
      rating,
      count,
      categoryId
    } = req.body;

    const file = req.file;

    // Validasi
    if (!title || !price || !description || !rating || !count || !categoryId || !file) {
      return res.status(400).json({
        status: 400,
        message: 'All fields are required, including image file.',
      });
    }

    // Cek kategori
    const category = await prisma.category.findUnique({
      where: { id: parseInt(categoryId) },
    });

    if (!category) {
      return res.status(404).json({
        status: 404,
        message: 'Category not found',
      });
    }

    // Simpan produk
    const newProduct = await prisma.product.create({
      data: {
        title,
        price: parseInt(price),
        image: file.path, // Simpan path file
        description,
        rating,
        count: parseInt(count),
        categoryId: parseInt(categoryId),
      },
    });

    res.status(201).json({
      status: 201,
      message: 'Product created successfully',
      data: newProduct,
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({
      status: 500,
      message: 'Internal server error',
    });
  }
});

router.put('/update/:id', upload.single('image'), async function (req, res) {
  try {
    const { id } = req.params;
    const {
      title,
      price,
      description,
      rating,
      count,
      categoryId
    } = req.body;

    const file = req.file;

    const existingProduct = await prisma.product.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingProduct) {
      return res.status(404).json({
        status: 404,
        message: 'Product not found',
      });
    }

    if (categoryId) {
      const category = await prisma.category.findUnique({
        where: { id: parseInt(categoryId) },
      });

      if (!category) {
        return res.status(404).json({
          status: 404,
          message: 'Category not found',
        });
      }
    }

    const updatedData = {
      ...(title && { title }),
      ...(price && { price: parseInt(price) }),
      ...(description && { description }),
      ...(rating && { rating }),
      ...(count && { count: parseInt(count) }),
      ...(categoryId && { categoryId: parseInt(categoryId) }),
      ...(file && { image: file.path }),
    };

    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: updatedData,
    });

    res.status(200).json({
      status: 200,
      message: 'Product updated successfully',
      data: updatedProduct,
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({
      status: 500,
      message: 'Internal server error',
    });
  }
});

router.delete('/delete/:id', async function (req, res) {
  try {
    const { id } = req.params;

    const existingProduct = await prisma.product.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingProduct) {
      return res.status(404).json({
        status: 404,
        message: 'Product not found',
      });
    }

    await prisma.product.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({
      status: 200,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({
      status: 500,
      message: 'Internal server error',
    });
  }
});

module.exports = router;