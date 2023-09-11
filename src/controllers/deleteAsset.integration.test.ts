import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import DeleteAssetController from "./deleteAsset";

const mockDeleteAsset = jest.fn();
const mockGetAsset = jest.fn();

const asset = {
  id: 2,
  uuidName: "test",
  originalName: "test",
  mimeType: "test",
};

jest.mock("../services/assetService", () => ({
  AssetService: jest.fn().mockImplementation(() => ({
    deleteAsset: mockDeleteAsset,
    getAsset: mockGetAsset,
  })),
}));

describe("DeleteAssetController", () => {
  it("Should Return 422 if uuid is not valid", async () => {
    const req = { params: { uuid: 0 } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await DeleteAssetController(req, res);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Invalid UUID",
    });
  });

  it("Should Return 404 if Asset Is Not Exists", async () => {
    mockDeleteAsset.mockResolvedValue({});

    const req = { params: { uuid: uuidv4() } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await DeleteAssetController(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Asset Is Not Found",
    });
  });

  it("Should Delete An Asset", async () => {
    const req = { params: { uuid: uuidv4() } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    mockGetAsset.mockReturnValue(asset);
    await DeleteAssetController(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "success",
    });
  });
});
