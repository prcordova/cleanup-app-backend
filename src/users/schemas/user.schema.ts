import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true }) // Torna o e-mail único
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ enum: ['client', 'worker'], default: 'client' })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
