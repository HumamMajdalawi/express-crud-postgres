import { Request, Response } from "express";
import PostAssetController from "./postAsset";

const mockAddAsset = jest.fn(() => {
  return {
    promise: jest.fn().mockResolvedValue({
      uuidName: "test",
      originalName: "test",
      mimeType: "test",
    }),
  };
});

jest.mock("../services/assetService", () => ({
  AssetService: jest.fn().mockImplementation(() => ({
    addAsset: mockAddAsset,
  })),
}));

describe("PostAssetController", () => {
  it("should return 400 if no asset is uploaded", async () => {
    const req = { file: undefined } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await PostAssetController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "No Asset uploaded.",
    });
  });

  it("should upload an asset and return 201", async () => {
    const req = {
      file: { mimetype: "image/jpeg", filename: "test.jpg" },
    } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await PostAssetController(req, res);

    expect(mockAddAsset).toBeCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalled();
  });
});
