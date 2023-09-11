import { Request, Response } from "express";
import { AssetService } from "../services/assetService";

const PostAssetController = async (req: Request, res: Response) => {
  // Check if there is an asset uploaded
  if (!req.file?.filename) {
    return res
      .status(400)
      .json({ success: false, message: "No Asset uploaded." });
  }

  const mimetype = req.file.mimetype;
  const originalName = req.file.originalname;
  const uuidName = req.file.filename;

  //Store asset
  const assetService = new AssetService();
  await assetService.addAsset({ originalName, uuidName, mimetype });

  return res
    .status(201)
    .json({ success: true, message: "Asset uploaded successfully.", uuidName });
};

export default PostAssetController;
