import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      required: false,
      default:
        "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=826&t=st=1713346885~exp=1713347485~hmac=8445034ac21425bfe476de1167ffc83d7aad313af37df904b348b253bc34aa09",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    roles: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Role",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
