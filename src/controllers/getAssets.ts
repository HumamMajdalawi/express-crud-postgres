import { Request, Response } from "express";
import { AssetService } from "../services/assetService";
import { getAssetURL } from "../utils";

const GetAssetsController = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as any);
    const limit = parseInt(req.query.limit as any);
    if (
      !Number.isInteger(page) ||
      !Number.isInteger(limit) ||
      page < 0 ||
      limit < 0
    ) {
      return res.status(422).json({
        success: false,
        message: "Invalid Parameters",
      });
    }

    const assetService = new AssetService();
    const assets = await assetService.getAssets(page, limit);

    const results = assets?.map((asset) => ({
      ...asset,
      assetURL: getAssetURL(asset.uuidName),
    }));

    return res.status(200).json({
      success: true,
      message: "success",
      assets: results,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export default GetAssetsController;
