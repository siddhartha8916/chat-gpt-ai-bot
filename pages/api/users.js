import { userCollection } from "../../helpers/controllers/user.controller";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const users = await userCollection.getAllUsers();
      res.status(200).json({ users });
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ error: "Failed to fetch user" });
    }
  }

  if (req.method === 'POST') {
    try {
      const newUser = await userCollection.addNewUser(req.body)
      res.status(200).json({ newUser });
    } catch (error) {
      console.error("Error adding user:", error);
      res.status(500).json({ error: "Failed to add user" });
    }
  }
}