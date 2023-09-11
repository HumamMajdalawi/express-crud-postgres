import { Request, Response } from "express";
import path from "path";
import { AssetService } from "../services/assetService";
import { checkIfValidUUID } from "../utils";

const GetAssetController = async (req: Request, res: Response) => {
  const assetId = req.params.uuid;

  const assetIdName = assetId?.toString().split(".")[0] as string;
  // validate assetId format
  if (!checkIfValidUUID(assetIdName)) {
    return res.status(422).json({
      success: false,
      message: "Invalid UUID",
    });
  }

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
