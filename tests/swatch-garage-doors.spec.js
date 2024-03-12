import { test, expect } from "@playwright/test";

// ##################### Base URL ######################

const baseURL = "https://www.thomas-sanderson.co.uk/";

// ##################### Pages #########################

const pageNames = {
    garageDoors: "Garrage Doors",
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
    await page.goto(`${baseURL}` + "garage-doors/");
    await page.waitForLoadState("networkidle");
    await page.click('//button[@id="onetrust-accept-btn-handler"]');
    await page.click("//span[text()[normalize-space()='Colour']]");
    await page.click("//span[text()[normalize-space()='Material']]");
});

// ##################### Garage Doors #####################

test.describe(`${pageNames.garageDoors}`, async () => {
    test("WholePage", async ({ page }) => {
        //This script is for image that has a lazyload
        const img = page.locator("img[alt='Thomas Sanderson Facebook']");
        await img.scrollIntoViewIfNeeded();
        await img.evaluate(
            (image) => image.complete || new Promise((f) => (image.onload = f))
        );
        await hideElement(page, "//section[@id='sales-banner-1']");
        await expect(page).toHaveScreenshot(
            `${pageNames.garageDoors}-WholePage.png`,
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
