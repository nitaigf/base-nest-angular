import { Schema } from 'mongoose';

export const MetadataSchema = new Schema({
  chave: {
    type: String,
    required: true,
    unique: true,
    maxlength: 100,
  },
  valor: {
    type: String,
    required: true,
  },
  observacao: {
    type: String,
    required: false,
  },
  criada_em: {
    type: Date,
    default: Date.now,
  },
  atualizada_em: {
    type: Date,
    default: Date.now,
  },
});
