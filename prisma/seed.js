const { PrismaClient } = require('../generated/prisma'); // Atau @prisma/client jika pakai default
const prisma = new PrismaClient();

async function main() {
  // 1. Seed Categories
  const electronics = await prisma.category.create({
    data: { name: 'Electronics' },
  });

  const fashion = await prisma.category.create({
    data: { name: 'Fashion' },
  });

  // 2. Seed Products
  const product1 = await prisma.product.create({
    data: {
      title: 'Smartphone XYZ',
      price: 5990000,
      image: "https://www.softcom.co.id/wp-content/uploads/2023/07/rog-7-4.jpg",
      description: 'High-end smartphone with amazing camera',
      rating: '4.5',
      count: 100,
      categoryId: electronics.id,
    },
  });

  const product2 = await prisma.product.create({
    data: {
      title: 'Stylish Jeans',
      price: 299000,
      image: "abc.jpg",
      description: 'Comfortable and stylish jeans for daily use',
      rating: '4.0',
      count: 200,
      categoryId: fashion.id,
    },
  });

  // 3. Seed Users
  const user1 = await prisma.user.create({
    data: {
      username: 'johndoe',
      password: 'hashedpassword123', // ideally, hash this
    },
  });

  // 4. Seed Cart
  await prisma.cart.create({
    data: {
      userId: user1.id,
      itemId: product1.id,
      quantity: 2,
    },
  });

  await prisma.cart.create({
    data: {
      userId: user1.id,
      itemId: product2.id,
      quantity: 1,
    },
  });
}

main()
  .then(() => {
    console.log('Seeding finished ✅');
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error('Seeding error ❌:', e);
    return prisma.$disconnect().then(() => process.exit(1));
  });
