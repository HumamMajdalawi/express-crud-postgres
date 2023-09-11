import { AssetService } from "../services/assetService";

// Mock the AppDataSource.getRepository method
jest.mock("../data-source", () => ({
  AppDataSource: {
    getRepository: jest.fn(),
  },
}));

// Define test data
const assetData = {
  originalName: "test.jpg",
  uuidName: "test.jpg",
  mimetype: "image/jpeg",
};

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

    mockRepository.create.mockReturnValue(assetData); // Mock the 'create' method
    mockRepository.save.mockResolvedValue(assetData); // Mock the 'save' method

    // Create an instance of AssetService
    const assetService = new AssetService();

    // Call the addAsset method
    const result = await assetService.addAsset(assetData);

    expect(result).toEqual(assetData);
    expect(mockRepository.create).toHaveBeenCalledWith(assetData);
    expect(mockRepository.save).toHaveBeenCalledWith(assetData);
  });

  it("Should Get an Asset", async () => {
    // Mock AppDataSource.getRepository to return a mock repository
    const mockRepository = {
      findOneBy: jest.fn(),
    };

    require("../data-source").AppDataSource.getRepository.mockReturnValue(
      mockRepository
    );

    mockRepository.findOneBy.mockReturnValue(assetData); // Mock the 'findOneBy' method

    const testUuid = "testUuid";

    // Create an instance of AssetService
    const assetService = new AssetService();

    // Call  getAsset method
    const result = await assetService.getAsset(testUuid);

    expect(mockRepository.findOneBy).toHaveBeenCalledWith({
      uuidName: testUuid,
    });
    expect(result?.uuidName).toBe(assetData.uuidName);
    expect(result?.originalName).toBe(assetData.originalName);
  });

  it("Should Get Assets", async () => {
    // Mock QueryBuilder functions
    const mockRepository = {
      createQueryBuilder: jest.fn().mockImplementation(() => ({
        skip: jest.fn().mockImplementation(() => ({
          take: () => ({ getMany: jest.fn() }),
        })),
      })),
    };

    // Mock QueryBuilder Object
    require("../data-source").AppDataSource.getRepository.mockReturnValue(
      mockRepository
    );

    // Create an instance of AssetService
    const assetService = new AssetService();

    // Call getAssets method
    const result = await assetService.getAssets(0, 10);
    // QueryBuilder has been called
    expect(mockRepository.createQueryBuilder).toHaveBeenCalledWith("Asset");
  });
});
