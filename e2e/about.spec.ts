import { test, expect } from "@playwright/test";
import { createHash } from "node:crypto";

test("generated about pdf", async ({ page }) => {
  await page.goto("/about");
  const downloadPromise = page.waitForEvent("download");
  await page.getByText("Download").click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toMatchSnapshot();
  const fileStream = await download.createReadStream();
  const buffer = await new Promise<Buffer>((resolve, reject) => {
    const chunks: Uint8Array[] = [];
    fileStream?.on("data", (chunk) => chunks.push(chunk));
    fileStream?.on("error", reject);
    fileStream?.on("end", () => resolve(Buffer.concat(chunks)));
  });
  const pdfHash = createHash("md5")
    .update(new TextDecoder().decode(buffer))
    .digest("hex");
  expect(pdfHash).toMatchSnapshot();
});
