import 'dotenv/config';
import { initMongoConnection } from './db/initMongoConnection.js';
import app from './app.js';

async function bootstrap() {
  try {
    await initMongoConnection();

    const PORT = process.env.PORT || 8080;

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
}

bootstrap();
