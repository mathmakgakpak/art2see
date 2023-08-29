import Page from "../GUIPage";
import { mkHTML } from "../utils";
class SendArtPage extends Page {
  canvas = mkHTML('canvas', {
    width: 0,
    height: 0,
  });
  ctx = this.canvas.getContext("2d");
  constructor() {
    super("Send Art");

  }

  updateImage(x: number, y: number, w: number, h: number, ignoreWhite: boolean) {
    if (w * h > 1_000_000) throw new Error("Image too big aborting generation.");
    if (!this.ctx) throw new Error("Couldn't get canvas context. Your browser probably doesn't support it");
    this.canvas.width = w;
    this.canvas.height = h;

    const imgData = this.ctx.createImageData(w, h);
    const data = imgData.data;

    for (let index = 0, i = y; i < y + h; i++) {
      for (let j = x; j < x + w; j++, index += 4) {
        const pix = OWOP.world.getPixel(j, i);
        if (!pix || ignoreWhite && pix[0] === 255 && pix[1] === 255 && pix[2] === 255) continue; // 0 0 0 0 (transparent pixel)
        data[index] = pix[0];
        data[index + 1] = pix[1];
        data[index + 2] = pix[2];
        data[index + 3] = 255;
      }
    }
    this.ctx.putImageData(imgData, 0, 0);
  }
}
export default SendArtPage