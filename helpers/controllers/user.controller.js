import { db } from "../model/user.model"
import { mongoConnect, mongoDisconnect } from "../mongo-db";
import bcrypt from 'bcryptjs';

async function getAllUsers() {
  try {
    await mongoConnect();
    const users = await db.User.find({}, {
      __v: 0, _id: 0, password: 0
    })
    return users;
  } catch (error) {
    console.error("Error fetching user:", error);
    return { error: "Failed to fetch user" };
  } finally {
    await mongoDisconnect();
  }
}

async function addNewUser(user) {
  try {
    await mongoConnect();

    // validate
    if (await db.User.findOne({ username: user.username })) {
      return {
        status:null,
        message:'Username "' + user.username + '" is already taken'
      };
    }

    // hash password
    if (user.password) {
      user.password = bcrypt.hashSync(user.password, 10);
    }

    const newUser = new db.User(user);
    // save user
    await newUser.save();

    return {
      status:'Ok',
      message:'User Added Successfully'
    };

  } catch (error) {
    console.error("Error adding user:", error);
    return { error: "Failed to add user" };

  } finally {
    await mongoDisconnect();
  }
}

async function login(params) {
  
}

export const userCollection = {
  getAllUsers,
  addNewUser
}

