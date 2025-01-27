import { test, expect } from "@playwright/test";

// ##################### Base URL ######################

const baseURL = "https://www.thomas-sanderson.co.uk/";

// ##################### Pages #########################

const pageNames = {
    UIHomePage: "Home Page",
    UIWindowsShutters: "Window Shutters",
    UIBayWindow: "Bay Window",
    UIConservatoryBlinds: "Conservatory Blinds",
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

// ##################### How Can We Help Section #####################

test.describe(`${pageNames.UIHomePage}`, async () => {
    test("WholePage", async ({ page }) => {
        test.setTimeout(120_000);
        await page.goto(`${baseURL}`);
        await waitPageAndCookie(page);
        await captureScreenshot(
            page,
            `${pageNames.UIHomePage}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});

test.describe(`${pageNames.UIWindowsShutters}`, async () => {
    test("WholePage", async ({ page }) => {
        test.setTimeout(120_000);
        await page.goto(`${baseURL}` + "window-shutters/");
        await waitPageAndCookie(page);
        await captureScreenshot(
            page,
            `${pageNames.UIWindowsShutters}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});

test.describe(`${pageNames.UIBayWindow}`, async () => {
    test("WholePage", async ({ page }) => {
        test.setTimeout(120_000);
        await page.goto(`${baseURL}` + "window-shutters/bay-window/");
        await waitPageAndCookie(page);
        await captureScreenshot(
            page,
            `${pageNames.UIBayWindow}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});

test.describe(`${pageNames.UIConservatoryBlinds}`, async () => {
    test("WholePage", async ({ page }) => {
        test.setTimeout(120_000);
        await page.goto(`${baseURL}` + "conservatory-blinds/");
        await waitPageAndCookie(page);
        await captureScreenshot(
            page,
            `${pageNames.UIConservatoryBlinds}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});
