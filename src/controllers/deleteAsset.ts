import { Request, Response } from "express";
import { AssetService } from "../services/assetService";
import { checkIfValidUUID } from "../utils";

const DeleteAssetController = async (req: Request, res: Response) => {
  try {
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
    } else {
      await assetService.deleteAsset(assetId);
    }

    return res.status(204).json({
      success: true,
      message: "success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export default DeleteAssetController;
