import { test, expect } from "@playwright/test";

// ##################### Base URL ######################

const baseURL = "https://www.thomas-sanderson.co.uk/";

// ##################### Pages #########################

const pageNames = {
    windowShutter: "Shutters",
    windowShutterWhiteAndCream: "Shutters WhiteAndCream",
};

//Function to remove DOM using xpath
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

//Function to capture image and wait to become fully loaded and remove uncessarry sales message
async function captureScreenshot(page, imageName, maskSelector) {
    const img = page.locator("img[alt='Thomas Sanderson Facebook']");
    await img.scrollIntoViewIfNeeded();
    await img.evaluate(
        (image) => image.complete || new Promise((f) => (image.onload = f))
    );
    await hideElement(page, "//section[@id='sales-banner-1']");
    await expect(page).toHaveScreenshot(imageName, {
        fullPage: true,
        mask: [page.locator(maskSelector)],
    });
}

//Function for waiting domcontent and clicks cookie
async function waitPageAndCookie(page) {
    await page.waitForLoadState("domcontentloaded");
    await page.click('//button[@id="onetrust-accept-btn-handler"]');
}

//Click Swatch Accordion to Collapse
async function collapseSwatchAccordion(page) {
    const xpaths = [
        "//span[text()[normalize-space()='Product Type']]",
        //div[@class='accordion-item']//div/span[text()[normalize-space()='Colour']]
        "//span[text()[normalize-space()='Feature']]",
        "//span[text()[normalize-space()='Material']]",
        "//span[text()[normalize-space()='Colour']]",
    ];

    for (const xpath of xpaths) {
        const element = await page.$(xpath);
        if (element) {
            await element.click();
            // Adding a small delay between clicks (adjust as needed)
            await page.waitForTimeout(500);
        }
    }
}

// //Before Test this script will execute first
// test.beforeEach(async ({ page }) => {
//     await page.goto(`${baseURL}` + "window-shutters/");
//     //await page.waitForLoadState("networkidle");
//     await page.waitForLoadState("domcontentloaded");
//     await page.click('//button[@id="onetrust-accept-btn-handler"]');
//     await page.click("//span[text()[normalize-space()='Product Type']]");
//     await page.click("//span[text()[normalize-space()='Feature']]");
//     await page.click("//span[text()[normalize-space()='Material']]");
// });

// ##################### Shutters #####################

test.describe(`${pageNames.windowShutter}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(`${baseURL}` + "window-shutters/");
        await waitPageAndCookie(page);
        await collapseSwatchAccordion(page);
        await captureScreenshot(
            page,
            `${pageNames.windowShutter}-TESTINGMUNA.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});
