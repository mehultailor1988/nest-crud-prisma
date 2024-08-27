import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
 //import { AllExceptionsFilter } from './common/AllExceptionsFilter';
 import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
 import axios from 'axios';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors:true});
 //app.useGlobalFilters(new AllExceptionsFilter());
 //app.useGlobalPipes(new ValidationPipe());

//  //Cors
   app.enableCors();

//   app.enableCors({
//     origin: 'http://localhost:3000', 
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
//     allowedHeaders: 'Content-Type, Authorization',
//     credentials: true,
//   });
//  //over

 //Validation
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: true,
      transform: true,
      whitelist: true,
    }),
  );
  //over

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('CRM API')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('CRM') 
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  await app.listen(3000);
 // await fetchUserData();
}


// Function to fetch user data
async function fetchUserData() {
  try {
    const response = await axios.get('http://localhost:3000/user');
    console.log('User data:', response.data);
    const users = response.data.data || response.data;
    
    if (Array.isArray(users)) {
     
      const currentDate = new Date();
     
      for (const user of users) {
        const userCreatedAt = new Date(user.createdAt);

        if (userCreatedAt < currentDate) {
          console.log(`User ${user.name} was created before the current date.`);

          const tokenExpireresponse = await axios.delete('http://localhost:3000/user/signout/${user.id}');
          console.log('Delete response:', tokenExpireresponse.data);

        } 
      }
    } else {
      console.error('Users data not found:', users);
    }
  } catch (error) {
    console.error('Error fetching user data:', error.message);
  }
}
bootstrap();
