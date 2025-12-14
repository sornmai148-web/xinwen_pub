import crypto from "crypto";

function md5Hash(inputStr: string): string {
  return crypto.createHash("md5").update(inputStr, "utf8").digest("hex");
}

const APP_KEY = process.env.NEXT_PUBLIC_APP_KEY;

function getSecret(appKey: string): string {
  const hashKey = md5Hash("key" + appKey);
  return hashKey.slice(0, 15).slice(-10);
}

function sign(
  appKey: string,
  timestamp: number,
  requestBody: string
): string | null {
  try {
    const secret = getSecret(appKey);
    const sbSign = appKey + secret + timestamp.toString() + requestBody;
    return md5Hash(sbSign).toUpperCase();
  } catch (err) {
    console.error(`生成签名异常: ${err}`);
    return null;
  }
}

export function sendHeaderGenerate(
  data: Record<string, unknown>
): Record<string, string> {
  const SERVER_APP_KEY = APP_KEY;
  const timestamp = Date.now();
  const bodyStr = JSON.stringify(data);
  const s = sign(SERVER_APP_KEY as never, timestamp, bodyStr);

  return {
    "Content-Type": "application/json",
    appkey: SERVER_APP_KEY as never,
    timestamp: timestamp.toString(),
    sign: s ?? "",
  };
}
