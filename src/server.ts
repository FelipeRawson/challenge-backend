import express from 'express';
import path from 'path';
import cors from 'cors';
import { AppDataSource } from './config/data-source'; 

import { bookRoutes } from './book/routes/BookRoutes';
import { libraryRoutes } from './library/routes/LibraryRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../../challenge-ui/dist')));

app.use('/api/books', bookRoutes);
app.use('/api/library', libraryRoutes);

app.get('/api/health', (_req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Backend is running',
    database: AppDataSource.isInitialized ? 'connected' : 'disconnected'
  });
});

app.get('*', (req, res) => {
  // Solo servir React para rutas que NO sean de API
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API route not found' });
  }
  
  const indexPath = path.join(__dirname, '../../challenge-ui/dist/index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error('Error serving index.html:', err);
      return res.status(500).send('Error loading application');
    }
    return;
  });
  return;
});


const startServer = async () => {
  const PORT = process.env.PORT || 3002;
  
  try {
    console.log('Initializing database connection...');
    await AppDataSource.initialize();
    console.log('Database connection established successfully');
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Frontend available at http://localhost:${PORT}`);
      console.log(`API available at http://localhost:${PORT}/api`);
      
      const frontendPath = path.join(__dirname, '../../challenge-ui/dist');
      console.log(`Looking for frontend files at: ${frontendPath}`);
    });
    
  } catch (error) {
    console.error('Error during server initialization:', error);
    
    //para debugging
    if (typeof error === 'object' && error !== null && 'message' in error && typeof (error as any).message === 'string' && (error as any).message.includes('connect')) {
      console.error('💡 Database connection failed. Check your .env file:');
      console.error(`   - DB_HOST: ${process.env.DB_HOST || 'localhost'}`);
      console.error(`   - DB_PORT: ${process.env.DB_PORT || '5432'}`);
      console.error(`   - DB_NAME: ${process.env.DB_NAME || 'spotfinder'}`);
      console.error(`   - DB_USER: ${process.env.DB_USER || 'postgres'}`);
    }
    
    process.exit(1);
  }
};


process.on('SIGTERM', async () => {
  console.log('SIGTERM received, closing server...');
  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy();
    console.log('Database connection closed');
  }
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, closing server...');
  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy();
    console.log('Database connection closed');
  }
  process.exit(0);
});

startServer();

export default app;