const userService = require("../services/user-service");
const router = require("express").Router();

router.get("/:userId", async function (req, res) {
  const userId = req.params.userId;

  try {
    const Item = await userService.getUserById(userId);
    if (Item) {
      const { userId, name } = Item;
      res.json({ userId, name });
    } else {
      res
        .status(404)
        .json({ error: 'Could not find user with provided "userId"' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not retreive user" });
  }
});

router.post("/", async function (req, res) {
  const { userId, name } = req.body;
  if (typeof userId !== "string") {
    res.status(400).json({ error: '"userId" must be a string' });
  } else if (typeof name !== "string") {
    res.status(400).json({ error: '"name" must be a string' });
  }

  try {
    await userService.insertUser(req.body);
    res.json({ userId, name });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `Could not create user ${e}` });
  }
});

module.exports = router;
