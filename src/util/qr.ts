import QRCode from "qrcode";


export async function generateQrDataUrl(url: string, size = 300): Promise<string> {
  if (!url) throw new Error("URL required");
  const opts: QRCode.QRCodeToDataURLOptions = { margin: 1, width: size };
  return QRCode.toDataURL(url, opts);
}


export async function generateQrOnCanvas(canvas: HTMLCanvasElement, url: string, size = 300): Promise<string> {
  canvas.width = size;
  canvas.height = size;
  await QRCode.toCanvas(canvas, url, { margin: 1, width: size });
  return canvas.toDataURL("image/png");
}