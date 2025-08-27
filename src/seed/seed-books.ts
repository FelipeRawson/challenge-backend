import { AppDataSource } from "../config/data-source";
import { BookEntity } from "../book/entity/BookEntity";

const seed = async () => {
  try {
    await AppDataSource.initialize();
    const repo = AppDataSource.getRepository(BookEntity);

    // Si ya hay libros, no volver a insertar
    const count = await repo.count();
    if (count > 0) {
      console.log("📚 Books already seeded");
      process.exit(0);
    }

    const books = [
      {
        title: "1984",
        author: "George Orwell",
        genre: "Dystopia",
        synopsis: "A chilling prophecy about the future.",
        year: 1949,
      },
      {
        title: "El Aleph",
        author: "Jorge Luis Borges",
        genre: "Fiction",
        synopsis: "A point in space that contains all other points.",
        year: 1945,
      },
      {
        title: "Fahrenheit 451",
        author: "Ray Bradbury",
        genre: "Sci-Fi",
        synopsis: "A future where books are banned and burned.",
        year: 1953,
      },
      {
        title: "Cien Años de Soledad",
        author: "Gabriel García Márquez",
        genre: "Magical Realism",
        synopsis: "The story of the Buendía family in Macondo.",
        year: 1967,
      },
      {
        title: "Narnia",
        author: "Maxi Trusso",
        genre: "Magical Musical",
        synopsis: "The story of the greatest artist of all time.",
        year: 2025,
      },
    ];

    await repo.save(books);
    console.log("✅ Seed completed: books inserted");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    process.exit(1);
  }
};

seed();
