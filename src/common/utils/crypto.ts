function base64ToBytes(base64: string) {
  const binString = atob(base64);
  return Uint8Array.from(binString, (m) => m.codePointAt(0)!);
}

function bytesToBase64(bytes: Uint8Array) {
  const binString = Array.from(bytes, (byte) =>
    String.fromCodePoint(byte)
  ).join("");
  return btoa(binString);
}

function bufferToBase64(buffer: ArrayBuffer) {
  return bytesToBase64(new Uint8Array(buffer));
}

function base64ToBuffer(base64: string) {
  return base64ToBytes(base64).buffer;
}

async function keyToBase64(key: CryptoKey) {
  const exported = await window.crypto.subtle.exportKey("raw", key);
  return bufferToBase64(exported);
}

function stringToBytes(message: string) {
  const enc = new TextEncoder();
  return enc.encode(message);
}

function bufferToString(buffer: ArrayBuffer) {
  const dec = new TextDecoder();
  return dec.decode(buffer);
}

function getKeyMaterial(password: string) {
  const enc = new TextEncoder();
  return window.crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits", "deriveKey"]
  );
}

function generateSalt() {
  return window.crypto.getRandomValues(new Uint8Array(16));
}

function generateIV() {
  return window.crypto.getRandomValues(new Uint8Array(12));
}

export function getSalt() {
  return bytesToBase64(generateSalt());
}

export async function getCryptoKey(password: string, salt?: string) {
  const keyMaterial = await getKeyMaterial(password);
  const saltBytes = salt ? base64ToBytes(salt) : generateSalt();
  return {
    salt: salt || bytesToBase64(saltBytes),
    key: await window.crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: saltBytes,
        iterations: 100000,
        hash: "SHA-256",
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      true,
      ["encrypt", "decrypt"]
    ),
  };
}

export async function encrypt(message: string, key: CryptoKey) {
  const iv = generateIV();
  const encoded = stringToBytes(message);

  const encrypted = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv,
    },
    key,
    encoded
  );

  return `${bytesToBase64(iv)}:${bufferToBase64(encrypted)}`;
}

export async function decrypt(ecryptedMessage: string, key: CryptoKey) {
  const [v, m] = ecryptedMessage.split(":");
  const ciphertext = base64ToBuffer(m);
  const iv = base64ToBytes(v);

  const decrypted = await window.crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv,
    },
    key,
    ciphertext
  );

  return bufferToString(decrypted);
}

export async function getHash(password: string, salt?: string) {
  const cryptoKey = await getCryptoKey(password, salt);
  return {
    salt: cryptoKey.salt,
    hash: await keyToBase64(cryptoKey.key),
  };
}

export async function verify(password: string, hash: string, salt: string) {
  return hash === (await getHash(password, salt)).hash;
}

export async function tryDecrypt(ecryptedMessage: string, key: CryptoKey) {
  try {
    return await decrypt(ecryptedMessage, key);
  } catch {
    return 'Cannot decrypt...';
  }
}
