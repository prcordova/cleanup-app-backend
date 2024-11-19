import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
        connectionFactory: (connection) => {
          connection.on('connected', () =>
            console.log('Conectado ao MongoDB!'),
          );
          connection.on('error', (err) =>
            console.error('Erro no MongoDB:', err),
          );
          return connection;
        },
      }),
    }),
  ],
})
export class DatabaseModule {}
