import { AppDataSource } from "../data-source";
import { Asset } from "../entities/asset";

export type AssetType = {
  originalName: string;
  uuidName: string;
  mimetype: string;
};

export class AssetService {
  private AssetRepository = AppDataSource.getRepository(Asset);

  async addAsset(params: AssetType): Promise<Asset> {
    const { originalName, mimetype, uuidName } = params;
    const user = this.AssetRepository.create({
      originalName,
      mimetype,
      uuidName,
    });
    return this.AssetRepository.save(user);
  }

  async getAsset(assetId: string): Promise<Asset | null> {
    return this.AssetRepository.findOneBy({
      uuidName: assetId,
    });
  }
}
