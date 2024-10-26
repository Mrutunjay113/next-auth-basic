import mongoose from "mongoose";

const ConnectMongoDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URL);

    console.log(
      "MongoDB connected",
      connect.connection.host,
      connect.connection.name
    );
  } catch (error) {
    console.log(error);
  }
};

export default ConnectMongoDb;
