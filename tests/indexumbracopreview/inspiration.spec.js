import { test, expect } from "@playwright/test";

// ##################### Base URL ######################

const baseURL = "https://headless-staging.thomas-sanderson.co.uk/";

//OLD https://headless-staging-web-temp.azurewebsites.net/
//NEW https://headless-staging.thomas-sanderson.co.uk/

const pageNames = {
    inspiration: "IT Inspiration",
    inspirationArticles: "IT Inspiration Articles",
    inspirationAuthors: "IT Inspiration Authors",
    inspirationAuthorDetails: "IT Inspiration Author Details",
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
    const img = page.locator("img[alt='Thomas Sanderson']");
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
    await page.waitForLoadState("domcontentloaded", { timeout: 40000 });
    await page.click('//button[@id="onetrust-accept-btn-handler"]');
    await page.waitForTimeout(3000); // Waits for 3 seconds
}

// ##################### Inspiration #####################

test.describe(`${pageNames.inspiration}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(`${baseURL}` + "inspiration/");
        await waitPageAndCookie(page);
        await captureScreenshot(
            page,
            `${pageNames.inspiration}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});

test.describe(`${pageNames.inspirationArticles}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(
            `${baseURL}` +
                "inspiration/patio-door-blinds-and-shutters-buying-guide/"
        );
        await waitPageAndCookie(page);
        await captureScreenshot(
            page,
            `${pageNames.inspirationArticles}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});

test.describe(`${pageNames.inspirationAuthors}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(`${baseURL}` + "inspiration/authors/");
        await waitPageAndCookie(page);
        await captureScreenshot(
            page,
            `${pageNames.inspirationAuthors}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});

test.describe(`${pageNames.inspirationAuthorDetails}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(`${baseURL}` + "inspiration/authors/abi-clewley/");
        await waitPageAndCookie(page);
        await captureScreenshot(
            page,
            `${pageNames.inspirationAuthorDetails}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});
