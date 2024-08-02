import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("flappyBird");
  const users = db.collection("users");

  if (req.method === "POST") {
    const { username, wallet, score } = req.body;
    const user = await users.findOne({ wallet });

    if (user) {
      if (score > user.highestScore) {
        await users.updateOne({ wallet }, { $set: { highestScore: score } });
      }
    } else {
      await users.insertOne({ username, wallet, highestScore: score });
    }

    res.status(200).json({ message: "User score updated" });
  } else if (req.method === "GET") {
    const user = await users.findOne({ wallet: req.query.wallet });

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  }
  // else {
  //   res.status(405).json({ message: "Method not allowed" });
  // }
}
