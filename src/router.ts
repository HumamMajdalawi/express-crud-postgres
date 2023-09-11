import { Router } from "express";
import { upload } from "./middlewares/uploadAsset";
import PostAssetController from "./controllers/postAsset";

const router = Router();

router
  .route("/assets")
  .get((req, res) => {
    return res.send({
      data: [
        {
          id: "asset",
          asset: "AssetName",
        },
      ],
    });
  })
  .post([upload.single("file")], PostAssetController);

export default router;
