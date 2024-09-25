import crypto from "crypto";
export function hashInfo(...info) {
    return crypto.createHash("sha256").update(info.join("-")).digest("hex");
}