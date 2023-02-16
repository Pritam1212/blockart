import User from "@/models/User";

const { default: dbConnect } = require("@/utils/dbConnect");

dbConnect();

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const user = await User.find({ "walletAddress": id });
        if (user.length === 0) {
          return res.status(200).json({ success: false, data: user });
        }

        res.status(200).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};
