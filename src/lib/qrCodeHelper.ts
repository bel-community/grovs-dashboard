import QRCode from "qrcode";
import { showErrorNotification } from "./Notifications";

const QR_SIZE_PX = 1024;

const qrFileName = (url: string) => {
  const slug = url
    .replace(/^https?:\/\//, "")
    .replace(/[^a-zA-Z0-9-_]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `qr-${slug || "link"}.png`;
};

export const downloadLinkQrCode = async (url: string) => {
  try {
    const dataUrl = await QRCode.toDataURL(url, {
      width: QR_SIZE_PX,
      margin: 2,
      errorCorrectionLevel: "M",
    });
    const anchor = document.createElement("a");
    anchor.href = dataUrl;
    anchor.download = qrFileName(url);
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  } catch {
    showErrorNotification("Couldn't generate the QR code");
  }
};
