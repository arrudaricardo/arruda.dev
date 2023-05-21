import { test, expect } from "@playwright/test";

test("generate pdf", async ({ page }) => {
  await page.goto("/about");
  const downloadPromise = page.waitForEvent("download");
  await page.getByText("Download").click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toMatchSnapshot();
  const fileStream = await download.createReadStream()
  // Read all at once
  const buffer = await new Promise((resolve, reject) => {
    const chunks: Uint8Array[] = [];
    fileStream?.on("data", (chunk) => chunks.push(chunk));
    fileStream?.on("error", reject);
    fileStream?.on("end", () => resolve(Buffer.concat(chunks)));
  });
  expect(buffer).toMatchSnapshot();
});
