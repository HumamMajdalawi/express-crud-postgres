import { Request, Response, response } from "express";
import GetAssetsController from "./getAssets";

const mockGetAssets = jest.fn();

const asset = {
  id: 2,
  uuidName: "test",
  originalName: "test",
  mimeType: "test",
  assetURL: "upload/asset1",
};

jest.mock("../services/assetService", () => ({
  AssetService: jest.fn().mockImplementation(() => ({
    getAssets: mockGetAssets,
  })),
}));

describe("GetAssetsController", () => {
  it("Should Return 422 if page or limit not valid", async () => {
    const req = { query: { limit: "x", page: 0 } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await GetAssetsController(req, res);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Invalid Parameters",
    });
  });

  it("Should Get Assets", async () => {
    const req = { query: { limit: 3, page: 0 } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    // Mock returned assets
    const assets = new Array(3).map((i) => asset);
    mockGetAssets.mockReturnValue(assets);

    await GetAssetsController(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "success",
      assets: assets,
    });
  });
});
