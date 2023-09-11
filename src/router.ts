import { Router } from "express";

const router = Router();

router.route("/assets").get((req, res) => {
  return res.send({
    data: [
      {
        id: "asset",
        asset: "AssetName",
      },
    ],
  });
});

export default router;
