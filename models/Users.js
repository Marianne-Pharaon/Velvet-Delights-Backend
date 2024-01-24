const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^[a-zA-Z]+ [a-zA-Z]+$/.test(v);
        },
        message: 'Please enter your full Name',
      },
    },
    age: { type: Number, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^[^s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: 'Invalid email format',
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          //  ensuring it has a minimum length, contains uppercase, lowercase, and special characters

          return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\d]).{8,}$/.test(
            v
          );
        },
        message: 'Invalid password format',
      },
    },
    phoneNumber: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^\d{8}$/.test(v);
        },
        message: 'Invalid phone number',
      },
    },
    role: { type: String, required: true },
  },
  { timestamps: true }
);

//to give an id and make it increase alone
// userSchema.pre('save', async function (next) {
//   try {
//     if (!this.user_id) {
//       const existingUsers = await mongoose.model('Users').find();
//       const lastUser_id =
//         existingUsers.length > 0
//           ? existingUsers[existingUsers.length - 1].user_id
//           : 0;
//       this.user_id = lastUser_id + 1;
//     }
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

const Users = mongoose.model('Users', userSchema);

module.exports = Users;
