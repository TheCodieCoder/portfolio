import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
    subject: { type: String, required: true, trim: true, maxlength: 200 },
    message: { type: String, required: true, trim: true, maxlength: 5000 },
    ipHash: { type: String, default: '' },
  },
  { timestamps: true }
);

contactSchema.index({ createdAt: -1 });

export const Contact = mongoose.model('Contact', contactSchema);
