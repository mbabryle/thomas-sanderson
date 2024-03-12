import { test, expect } from "@playwright/test";

// ##################### Base URL ######################

const baseURL = "https://www.thomas-sanderson.co.uk/";

// ##################### Pages #########################

const pageNames = {
    global: "Global",
    home: "Home Page",
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
    await page.goto(`${baseURL}`);
    await page.waitForLoadState("networkidle");
    await page.click('//button[@id="onetrust-accept-btn-handler"]');
});

// ##################### Global ########################
test.describe(`${pageNames.global}`, async () => {
    test("MegaNav", async ({ page }) => {
        await expect(page.locator(".site-header__container")).toHaveScreenshot(
            `${pageNames.global}-MegaNav.png`
        );
    });

    test("Footer", async ({ page }) => {
        await expect(
            page.locator("//div[@id='footerContent']")
        ).toHaveScreenshot(`${pageNames.global}-Footer.png`);
    });
});

// ##################### Home Page #####################

test.describe(`${pageNames.home}`, async () => {
    test("ThirdSplit", async ({ page }) => {
        await hideElement(page, "//section[@id='sales-banner-1']");
        await expect(
            page.locator("//div[@id='block-1-homepageHeros']")
        ).toHaveScreenshot(`${pageNames.home}-Hero-ThirdSplit.png`);
    });

    test("HeroPrem", async ({ page }) => {
        await hideElement(page, "//section[@id='sales-banner-1']");
        await expect(
            page.locator("//div[@id='block-5-heroPrem']")
        ).toHaveScreenshot(`${pageNames.home}-HeroPrem.png`);
    });

    test("SalesModulePrem", async ({ page }) => {
        await expect(
            page.locator("//div[@id='block-6-salesModulePrem-inner']")
        ).toHaveScreenshot(`${pageNames.home}-SalesModulePrem.png`);
    });

    test("ProductGrid", async ({ page }) => {
        await hideElement(page, "//section[@id='sales-banner-1']");
        await expect(
            page.locator("//div[@id='block-7-productsGrid']")
        ).toHaveScreenshot(`${pageNames.home}-ProductGrid.png`);
    });

    test("InspirationPrem", async ({ page }) => {
        await hideElement(page, "//section[@id='sales-banner-1']");
        await expect(
            page.locator("//div[@id='block-8-inspirationPrem']")
        ).toHaveScreenshot(`${pageNames.home}-InspirationPrem.png`);
    });

    test("USPGrid", async ({ page }) => {
        await hideElement(page, "//section[@id='sales-banner-1']");
        await expect(
            page.locator("//div[@id='block-9-uSPGrid']")
        ).toHaveScreenshot(`${pageNames.home}-USPGrid.png`);
    });

    test("SalesModulePrem1", async ({ page }) => {
        await expect(
            page.locator("//div[@id='block-10-salesModulePrem-inner']")
        ).toHaveScreenshot(`${pageNames.home}-SalesModulePrem1.png`);
    });

    test("NewsLetter", async ({ page }) => {
        await hideElement(page, "//section[@id='sales-banner-1']");
        await expect(
            page.locator("//div[@id='block-11-newsletter']")
        ).toHaveScreenshot(`${pageNames.home}-NewsLetter.png`);
    });

    test("TrustPilotPrem", async ({ page }) => {
        await hideElement(page, "//section[@id='sales-banner-1']");
        await expect(
            page.locator("//div[@id='block-12-trustpilotPrem']")
        ).toHaveScreenshot(`${pageNames.home}-TrustPilotPrem.png`, {
            mask: [page.locator("//div[@class='trustpilot-container']")],
        });
    });

    test("LogoGridPrem", async ({ page }) => {
        await expect(
            page.locator("//div[@id='block-13-logoGridPrem']")
        ).toHaveScreenshot(`${pageNames.home}-LogoGridPrem.png`);
    });

    // test("WholeHomePage", async ({ page }) => {
    //     //This script is for image that has a lazyload
    //     const img = page.locator("img[alt='Thomas Sanderson Facebook']");
    //     await img.scrollIntoViewIfNeeded();
    //     await img.evaluate(
    //         (image) => image.complete || new Promise((f) => (image.onload = f))
    //     );
    //     await hideElement(page, "//section[@id='sales-banner-1']");
    //     await expect(page).toHaveScreenshot(
    //         `${pageNames.home}-WholeHomePage.png`,
    //         {
    //             fullPage: true,
    //             mask: [
    //                 page.locator(
    //                     // "//section[@id='sales-banner-1']//a[@href='/design-appointment/']",
    //                     "//div[@class='trustpilot-container']"
    //                 ),
    //             ],
    //         }
    //     );
    // });
});
