type DownloadPlatform = "ios" | "android" | null;

export function detectDownloadPlatform(device: Pick<Navigator, "userAgent" | "maxTouchPoints">): DownloadPlatform {
  if (/Android/i.test(device.userAgent)) return "android";
  // iPadOS can identify as a Mac when requesting desktop websites.
  if (/iPhone|iPad|iPod/i.test(device.userAgent) || (/Macintosh/i.test(device.userAgent) && device.maxTouchPoints > 1)) return "ios";
  return null;
}
