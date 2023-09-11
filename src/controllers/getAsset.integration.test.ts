import { Request, Response } from "express";
import GetAssetController from "./getAsset";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const asset = {
  id: 2,
  uuidName: "test",
  originalName: "test",
  mimeType: "test",
};

const mockGetAsset = jest.fn();

jest.mock("../services/assetService", () => ({
  AssetService: jest.fn().mockImplementation(() => ({
    getAsset: mockGetAsset,
  })),
}));

describe("GetAssetController", () => {
  it("Should Return 422 if uuid is not valid", async () => {
    const req = { params: { uuid: 0 } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await GetAssetController(req, res);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Invalid UUID",
    });
  });

  it("Should Return 404 if Asset Is Not Exists", async () => {
    mockGetAsset.mockResolvedValue({});

    const req = { params: { uuid: uuidv4() } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await GetAssetController(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Asset Is Not Found",
    });
  });

  it("Should Get An Asset", async () => {
    mockGetAsset.mockResolvedValue(asset);

    const req = { params: { uuid: uuidv4() } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await GetAssetController(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "success",
      asset: asset,
      assetURL: path.join(__dirname, "upload") + "/" + asset.uuidName,
    });
  });
});
