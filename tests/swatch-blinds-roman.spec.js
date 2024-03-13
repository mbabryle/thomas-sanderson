import { test, expect } from "@playwright/test";

// ##################### Base URL ######################

const baseURL = "https://www.thomas-sanderson.co.uk/";

// ##################### Pages #########################

const pageNames = {
    blindsRoman: "Blinds Roman",
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

//Before Test this script will execute first
test.beforeEach(async ({ page }) => {
    await page.goto(`${baseURL}` + "window-blinds/roman-blinds/");
    //await page.waitForLoadState("networkidle");
    await page.waitForLoadState("domcontentloaded");
    await page.click('//button[@id="onetrust-accept-btn-handler"]');
    await page.click("//span[text()[normalize-space()='Pattern']]");
    await page.click("//span[text()[normalize-space()='Feature']]");
});

// ##################### Blinds Roman #####################

test.describe(`${pageNames.blindsRoman}`, async () => {
    test("WholePage", async ({ page }) => {
        //This script is for image that has a lazyload
        const img = page.locator("img[alt='Thomas Sanderson Facebook']");
        await img.scrollIntoViewIfNeeded();
        await img.evaluate(
            (image) => image.complete || new Promise((f) => (image.onload = f))
        );
        await hideElement(page, "//section[@id='sales-banner-1']");
        await expect(page).toHaveScreenshot(
            `${pageNames.blindsRoman}-WholePage.png`,
            {
                fullPage: true,
                mask: [
                    page.locator(
                        // "//section[@id='sales-banner-1']//a[@href='/design-appointment/']",
                        "//div[@class='trustpilot-container']"
                    ),
                ],
            }
        );
    });
});
