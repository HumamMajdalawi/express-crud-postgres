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

  async getAssets(page: number, limit: number): Promise<Asset[] | null> {
    return this.AssetRepository.createQueryBuilder("Asset")
      .skip(page * limit)
      .take(limit)
      .getMany();
  }

  async deleteAsset(assetId: string): Promise<void> {
    await this.AssetRepository.createQueryBuilder("Asset")
      .delete()
      .where("uuidName = :uuidName", { uuidName: assetId })
      .execute();
  }
}
