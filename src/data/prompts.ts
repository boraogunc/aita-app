export const scenarioPrompts = [
  "%%, partnerin doğum gününü unutup iş toplantısına gittin.",
  "%%, arkadaşının randevusunu sabote edecek bir şaka yaptın.",
  "%%, ev arkadaşının yemeğini izinsiz yedin.",
  "%%, yanlışlıkla aile grubunda sevgiline yazdığın mesajı paylaştın.",
  "%%, tatile giderken köpeği son anda iptal ettin."
];

export function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
