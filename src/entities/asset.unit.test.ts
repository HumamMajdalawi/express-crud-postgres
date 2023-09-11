import { Asset } from "./asset";

describe("Asset Entity", () => {
  it("Should Define Asset Entity", () => {
    const assetEntity = new Asset();
    expect(assetEntity).toBeDefined();
  });
});
