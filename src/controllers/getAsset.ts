import { Request, Response } from "express";
import path from "path";
import { AssetService } from "../services/assetService";

const GetAssetController = async (req: Request, res: Response) => {
  const assetId = req.query.uuid;

  const assetService = new AssetService();
  const asset = await assetService.getAsset(assetId as string);
  if (!asset?.id) {
    return res.status(404).json({
      success: false,
      message: "Asset Is Not Found",
    });
  }

  const assetURL = path.join(__dirname, "upload") + "/" + asset.uuidName;
  return res.status(200).json({
    success: true,
    message: "success",
    assetURL,
    asset: asset,
  });
};

export default GetAssetController;
