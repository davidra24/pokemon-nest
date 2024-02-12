import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Pokemon extends Document {
  @Prop({
    unique: true,
    index: true,
  })
  num: number;

  @Prop({
    unique: true,
    index: true,
  })
  name: string;

  @Prop({
    unique: true,
  })
  url: string;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
