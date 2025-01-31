import { test, expect } from "@playwright/test";

// ##################### Base URL ######################

const baseURL = "https://www.thomas-sanderson.co.uk/";

// ##################### Pages #########################

const pageNames = {
    garageDoors: "Garage Doors",
    garageDoorsRoller: "Roller Garage Doors",
    garageDoorsSectional: "Sectional Garage Doors",
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
        animations: "disabled",
        maxDiffPixelRatio: 0.2,
        maxDiffPixels: 1000,
        threshold: 0.2,
        fullPage: true,
        mask: [page.locator(maskSelector)],
    });
}

//Function for waiting domcontent and clicks cookie
async function waitPageAndCookie(page) {
    await page.waitForLoadState("domcontentloaded", { timeout: 15000 });
    await page.click('//button[@id="onetrust-accept-btn-handler"]');
}

// ##################### Garage Doors #####################

test.describe(`${pageNames.garageDoors}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(`${baseURL}` + "garage-doors/");
        await waitPageAndCookie(page);
        // await page.click("//span[text()[normalize-space()='Colour']]");
        // await page.click("//span[text()[normalize-space()='Material']]");
        await captureScreenshot(
            page,
            `${pageNames.garageDoors}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});

test.describe(`${pageNames.garageDoorsRoller}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(`${baseURL}` + "garage-doors/roller-garage-doors/");
        await waitPageAndCookie(page);
        // await page.click("//span[text()[normalize-space()='Colour']]");
        // await page.click("//span[text()[normalize-space()='Material']]");
        await captureScreenshot(
            page,
            `${pageNames.garageDoorsRoller}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});

test.describe(`${pageNames.garageDoorsSectional}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(`${baseURL}` + "garage-doors/sectional-garage-doors/");
        await waitPageAndCookie(page);
        // await page.click("//span[text()[normalize-space()='Colour']]");
        // await page.click("//span[text()[normalize-space()='Material']]");
        await captureScreenshot(
            page,
            `${pageNames.garageDoorsSectional}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});
