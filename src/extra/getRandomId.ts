import crypto from "crypto";

export default function getRandomId() {
  const timestamp = Date.now();
  return timestamp;
}
