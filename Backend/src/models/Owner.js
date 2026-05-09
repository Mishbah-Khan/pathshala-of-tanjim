import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const ownerSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Tanjim Mohammad Mubarrat',
    immutable: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    immutable: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    default: null,
  },
  bio: {
    type: String,
    default: '',
  },
  teachingStyle: {
    type: String,
    default: '',
  },
  achievements: [
    {
      type: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before save - FIXED VERSION
ownerSchema.pre('save', async function (next) {
  try {
    // Only hash if password is modified
    if (!this.isModified('password')) {
      return next();
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(this.password, 10);

    // Replace plain password with hashed password
    this.password = hashedPassword;

    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method - FIXED VERSION
ownerSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password);
};

const Owner = mongoose.model('Owner', ownerSchema);
export default Owner;
