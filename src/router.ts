import { Router } from "express";
import { upload } from "./middlewares/uploadAsset";
import PostAssetController from "./controllers/postAsset";
import GetAssetController from "./controllers/getAsset";

const router = Router();

router.route("/assets").post([upload.single("file")], PostAssetController);

router.get("/assets/:uuid", GetAssetController);

export default router;
