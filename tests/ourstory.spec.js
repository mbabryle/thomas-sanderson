import { test, expect } from "@playwright/test";

// ##################### Base URL ######################

const baseURL = "https://www.thomas-sanderson.co.uk/";

// ##################### Pages #########################

const pageNames = {
    ourStoryInYourArea: "In Your Area",
    ourStoryPartners: "Partners",
    ourStoryCustomerReviews: "Customer Reviews",
    ourStoryExibitionsAndShows: "Exibitions And Shows",
    ourStoryPressAndMedia: "Press And Media",
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

// ##################### Our Story Section #####################

test.describe(`${pageNames.ourStoryInYourArea}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(`${baseURL}` + "in-your-area/");
        await waitPageAndCookie(page);
        await captureScreenshot(
            page,
            `${pageNames.ourStoryInYourArea}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});

test.describe(`${pageNames.ourStoryPartners}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(`${baseURL}` + "partners/");
        await waitPageAndCookie(page);
        await captureScreenshot(
            page,
            `${pageNames.ourStoryPartners}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});

test.describe(`${pageNames.ourStoryCustomerReviews}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(`${baseURL}` + "reviews/");
        await waitPageAndCookie(page);
        await captureScreenshot(
            page,
            `${pageNames.ourStoryCustomerReviews}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});

test.describe(`${pageNames.ourStoryExibitionsAndShows}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(`${baseURL}` + "exhibitions-and-shows/");
        await waitPageAndCookie(page);
        await captureScreenshot(
            page,
            `${pageNames.ourStoryExibitionsAndShows}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});

test.describe(`${pageNames.ourStoryPressAndMedia}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(`${baseURL}` + "about-us/press-and-release/");
        await waitPageAndCookie(page);
        await captureScreenshot(
            page,
            `${pageNames.ourStoryPressAndMedia}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});
