import { AssetService } from "../services/assetService";

// Mock the AppDataSource.getRepository method
jest.mock("../data-source", () => ({
  AppDataSource: {
    getRepository: jest.fn(),
  },
}));

describe("AssetService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should add an asset", async () => {
    // Mock AppDataSource.getRepository to return a mock repository
    const mockRepository = {
      create: jest.fn(),
      save: jest.fn(),
    };

    require("../data-source").AppDataSource.getRepository.mockReturnValue(
      mockRepository
    );

    // Create an instance of AssetService
    const assetService = new AssetService();

    // Define test data
    const assetData = {
      originalName: "test.jpg",
      uuidName: "test.jpg",
      mimetype: "image/jpeg",
    };

    mockRepository.create.mockReturnValue(assetData); // Mock the 'create' method
    mockRepository.save.mockResolvedValue(assetData); // Mock the 'save' method

    // Call the addAsset method
    const result = await assetService.addAsset(assetData);

    expect(result).toEqual(assetData);
    expect(mockRepository.create).toHaveBeenCalledWith(assetData);
    expect(mockRepository.save).toHaveBeenCalledWith(assetData);
  });
});
