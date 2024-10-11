import { test, expect } from "@playwright/test";

// ##################### Base URL ######################

const baseURL = "https://www.thomas-sanderson.co.uk/";

// ##################### Pages #########################

const pageNames = {
    siteTermsCookiePolicy: "Cookie Policy",
    siteTermsCookieSettings: "Cookie Settings",
    siteTermsTermsAndConditions: "Terms And Conditions",
    siteTermsPrivacyPolicy: "Privacy Policy",
    siteTermsAntiSlavery: "Anti Slavery",
    siteTermsElectricalEquipment: "Electrical Equipment Recycling",
    siteTermsEditorialStandards: "Editorial Standards",
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
    // await page.click('//button[@id="onetrust-accept-btn-handler"]');
}

// ##################### Site Terms Section #####################

test.describe(`${pageNames.siteTermsCookiePolicy}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(`${baseURL}` + "legal/cookie-policy/");
        await waitPageAndCookie(page);
        await captureScreenshot(
            page,
            `${pageNames.siteTermsCookiePolicy}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});

test.describe(`${pageNames.siteTermsCookieSettings}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(`${baseURL}` + "legal/cookie-policy/");
        await waitPageAndCookie(page);
        await captureScreenshot(
            page,
            `${pageNames.siteTermsCookieSettings}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});

test.describe(`${pageNames.siteTermsTermsAndConditions}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(`${baseURL}` + "legal/terms-conditions/");
        await waitPageAndCookie(page);
        await captureScreenshot(
            page,
            `${pageNames.siteTermsTermsAndConditions}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});

test.describe(`${pageNames.siteTermsPrivacyPolicy}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(`${baseURL}` + "legal/privacy-policy/");
        await waitPageAndCookie(page);
        await captureScreenshot(
            page,
            `${pageNames.siteTermsPrivacyPolicy}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});

test.describe(`${pageNames.siteTermsAntiSlavery}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(`${baseURL}` + "legal/anti-slavery/");
        await waitPageAndCookie(page);
        await captureScreenshot(
            page,
            `${pageNames.siteTermsAntiSlavery}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});

test.describe(`${pageNames.siteTermsElectricalEquipment}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(`${baseURL}` + "legal/weee-recycling/");
        await waitPageAndCookie(page);
        await captureScreenshot(
            page,
            `${pageNames.siteTermsElectricalEquipment}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});

test.describe(`${pageNames.siteTermsEditorialStandards}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(`${baseURL}` + "editorial-standards/");
        await waitPageAndCookie(page);
        await captureScreenshot(
            page,
            `${pageNames.siteTermsEditorialStandards}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});
