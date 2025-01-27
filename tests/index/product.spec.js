import { test, expect } from "@playwright/test";

// ##################### Base URL ######################
const baseURL = "https://headless-staging-web-temp.azurewebsites.net/";

//OLD https://headless-staging-web-temp.azurewebsites.net/qa-product/
//NEW https://headless-staging.thomas-sanderson.co.uk/qa-product/

const pageNames = {
    product: "IT Product",
};

// Function to remove DOM using XPath
async function hideElement(page, xpath) {
    await page.evaluate((xpath) => {
        const element = document.evaluate(
            xpath,
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE
        ).singleNodeValue;
        if (element) {
            element.style.visibility = "hidden";
        }
    }, xpath);
}

// Function to capture image and wait for full load, then remove unnecessary sales message
async function captureScreenshot(page, imageName, maskSelector) {
    const img = page.locator("img[alt='Thomas Sanderson']");
    await img.scrollIntoViewIfNeeded();
    await img.evaluate(
        (image) => image.complete || new Promise((f) => (image.onload = f))
    );
    await hideElement(page, "//section[@id='sales-banner-1']");

    // Ensure page is fully loaded and animations are disabled
    await page.waitForLoadState("load", { timeout: 15000 }); // Ensure the entire page is loaded
    await page.waitForTimeout(1000); // Allow extra time for dynamic assets

    // Disable animations and transitions
    await page.addStyleTag({
        content:
            "* { animation: none !important; transition: none !important; }",
    });

    // Capture the screenshot
    await expect(page).toHaveScreenshot(imageName, {
        animations: "disabled",
        maxDiffPixelRatio: 0.2,
        maxDiffPixels: 1000,
        threshold: 0.2,
        fullPage: true,
        mask: [page.locator(maskSelector)],
        timeout: 40000, // Increased timeout to handle delays
    });
}

// Function to wait for DOM content and click the cookie button
async function waitPageAndCookie(page) {
    await page.waitForLoadState("domcontentloaded", { timeout: 40000 }); // Wait for DOM content to load
    await page.click('//button[@id="onetrust-accept-btn-handler"]'); // Accept cookies
}

// ##################### Product #####################

test.describe(`${pageNames.product}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(`${baseURL}` + "qa-product/");
        await waitPageAndCookie(page);
        await captureScreenshot(
            page,
            `${pageNames.product}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});