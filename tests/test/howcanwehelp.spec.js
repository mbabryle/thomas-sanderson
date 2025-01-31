import { test, expect } from "@playwright/test";

// ##################### Base URL ######################

const baseURL = "https://www.thomas-sanderson.co.uk/";

// ##################### Pages #########################

const pageNames = {
    helpSectionOurServices: "Our Services",
    helpSectionCovid: "Covid",
    helpSectionFinanceOptions: "Finance Options",
    helpSectionCareers: "Careers",
    helpSectionLegal: "Legal",
    helpSectionRecommendations: "Recommendations",
    helpSectionQuote: "Quote",
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

test.describe(`${pageNames.helpSectionOurServices}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(`${baseURL}` + "our-services/");
        await waitPageAndCookie(page);
        await captureScreenshot(
            page,
            `${pageNames.helpSectionOurServices}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});

test.describe(`${pageNames.helpSectionCovid}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(`${baseURL}` + "covid-19/");
        await waitPageAndCookie(page);
        await captureScreenshot(
            page,
            `${pageNames.helpSectionCovid}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});

test.describe(`${pageNames.helpSectionFinanceOptions}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(`${baseURL}` + "finance-options/");
        await waitPageAndCookie(page);
        await captureScreenshot(
            page,
            `${pageNames.helpSectionFinanceOptions}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});

test.describe(`${pageNames.helpSectionCareers}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto("https://careers.thomas-sanderson.co.uk/");

        // Take a screenshot and save it
        await page.screenshot({
            path: `${pageNames.helpSectionCareers}-WholePage.png`,
            fullPage: true,
        });
    });
});

test.describe(`${pageNames.helpSectionLegal}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(`${baseURL}` + "legal/candidate-privacy-notice/");
        await waitPageAndCookie(page);
        await captureScreenshot(
            page,
            `${pageNames.helpSectionLegal}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});

test.describe(`${pageNames.helpSectionRecommendations}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(`${baseURL}` + "recommendation-scheme/");
        await waitPageAndCookie(page);
        await captureScreenshot(
            page,
            `${pageNames.helpSectionRecommendations}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});

test.describe(`${pageNames.helpSectionQuote}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(`${baseURL}` + "well-beat-any-quote/");
        await waitPageAndCookie(page);
        await captureScreenshot(
            page,
            `${pageNames.helpSectionQuote}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});
