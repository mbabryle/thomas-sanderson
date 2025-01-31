import { test, expect } from "@playwright/test";

// ##################### Base URL ######################

const baseURL = "https://www.thomas-sanderson.co.uk/";

// ##################### Pages #########################

const pageNames = {
    global: "Global",
    home: "Home Page",
    aboutUs: "About Us",
    contact: "Contact",
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

// // ##################### Global ########################
// test.describe(`${pageNames.global}`, async () => {
//     test("MegaNav", async ({ page }) => {
//         await expect(
//             page.locator("//header[@class='site-header']")
//         ).toHaveScreenshot(`${pageNames.global}-MegaNav.png`);
//     });

//     test("Footer", async ({ page }) => {
//         await expect(
//             page.locator("//div[@id='footerContent']")
//         ).toHaveScreenshot(`${pageNames.global}-Footer.png`);
//     });
// });

// ##################### Home Page #####################

test.describe(`${pageNames.home}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(`${baseURL}`);
        await waitPageAndCookie(page);
        await captureScreenshot(
            page,
            `${pageNames.home}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});

test.describe(`${pageNames.aboutUs}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(`${baseURL}` + "about-us/");
        await waitPageAndCookie(page);
        await captureScreenshot(
            page,
            `${pageNames.aboutUs}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});

test.describe(`${pageNames.contact}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(`${baseURL}` + "contact/");
        await waitPageAndCookie(page);
        await captureScreenshot(
            page,
            `${pageNames.contact}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});
