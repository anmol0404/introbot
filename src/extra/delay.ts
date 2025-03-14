export async function delay(minDelay: number, maxDelay: number): Promise<void> {
  const delay: number = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;

  await new Promise<void>((resolve) => setTimeout(resolve, delay));
}
