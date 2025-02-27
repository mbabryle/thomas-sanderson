import { test, expect } from "@playwright/test";

// ##################### Base URL ######################

const baseURL = "https://headless-staging-web-temp.azurewebsites.net";

//OLD https://headless-staging-web-temp.azurewebsites.net/qa-generic/
//NEW https://headless-umbraco.thomas-sanderson.co.uk/qa-generic/

const pageNames = {
    designAppointment: "Design Appointment",
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
    await page.waitForLoadState("domcontentloaded", { timeout: 15000 });
    await page.click('//button[@id="onetrust-accept-btn-handler"]');
}

// ##################### Design Appointment #####################

test.describe(`${pageNames.designAppointment}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(`${baseURL}` + "design-appointment/");
        await waitPageAndCookie(page);
        await page.waitForTimeout(3000); // Waits for 3 seconds
        await captureScreenshot(
            page,
            `${pageNames.designAppointment}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});
