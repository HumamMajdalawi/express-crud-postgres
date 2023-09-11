import { Router } from "express";
import { upload } from "./middlewares/uploadAsset";
import PostAssetController from "./controllers/postAsset";
import GetAssetController from "./controllers/getAsset";
import GetAssetsController from "./controllers/getAssets";
import DeleteAssetController from "./controllers/deleteAsset";

const router = Router();

router
  .route("/assets")
  .post([upload.single("file")], PostAssetController)
  .get(GetAssetsController);
router
  .route("/assets/:uuid")
  .get(GetAssetController)
  .delete(DeleteAssetController);

export default router;
