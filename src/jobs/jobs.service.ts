import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job } from './schemas/job.schema';

@Injectable()
export class JobsService {
  constructor(@InjectModel(Job.name) private jobModel: Model<Job>) {}

  async create(job: any): Promise<Job> {
    const createdJob = new this.jobModel(job);
    return createdJob.save();
  }

  async findAll(): Promise<Job[]> {
    return this.jobModel.find().exec();
  }

  async updateStatus(jobId: string, status: string): Promise<Job> {
    return this.jobModel
      .findByIdAndUpdate(jobId, { status }, { new: true })
      .exec();
  }
}
