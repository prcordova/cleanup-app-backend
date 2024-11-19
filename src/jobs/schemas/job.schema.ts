import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Job extends Document {
  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  type: string; // 'small', 'medium', 'large', 'industrial'

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  client: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  worker: Types.ObjectId;

  @Prop({ default: 'pending' }) // 'pending', 'accepted', 'in-progress', 'completed'
  status: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const JobSchema = SchemaFactory.createForClass(Job);
