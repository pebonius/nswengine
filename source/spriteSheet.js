export default class SpriteSheet {
  constructor(image, tileSize) {
    this.image = image;
    this.tileSize = tileSize;
  }
  tilesetWidthInTiles = () => {
    return Math.ceil(this.image.width / this.tileSize);
  };
  tileToCol = (tile) => {
    const row = Math.floor(tile / this.tilesetWidthInTiles());
    return tile - row * this.tilesetWidthInTiles();
  };
  tileToRow = (tile) => {
    return Math.floor(tile / this.tilesetWidthInTiles());
  };
}
