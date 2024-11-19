import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { Job, JobSchema } from './schemas/job.schema';

@Module({
  imports: [
    // Registra o schema do Job no Mongoose
    MongooseModule.forFeature([{ name: Job.name, schema: JobSchema }]),
  ],
  controllers: [JobsController],
  providers: [JobsService],
  exports: [JobsService], // Caso o serviço de Jobs seja usado em outros módulos
})
export class JobsModule {}
