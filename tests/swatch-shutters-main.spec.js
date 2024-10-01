import { test, expect } from "@playwright/test";

// ##################### Base URL ######################

const baseURL = "https://www.thomas-sanderson.co.uk/";

// ##################### Pages #########################

const pageNames = {
    windowShutter: "Shutters",
    windowShutterVinyl: "Shutters Vinyl",
    windowShutterCafe: "Shutters Cafe",
    windowShutterSolid: "Shutters Solid",
    windowShutterTracked: "Shutters Tracked",
    windowShutterTierOnTier: "Shutters TierOnTier",
    windowShutterFullHeight: "Shutters FullHeight",
    windowShutterThermal: "Shutters Thermal",
    windowShutterWhiteAndCream: "Shutters WhiteAndCream",
    windowShutterColoured: "Shutters Coloured",
    windowShutterBlackout: "Shutters Blackout",
    windowShutterBayWindow: "Shutters BayWindow",
    windowShutterShaped: "Shutters Shaped",
    windowShutterDoor: "Shutters Door",
    windowShutterGableEnd: "Shutters GableEnd",
    windowShutterBathroom: "Shutters Bathroom",
    windowShutterBedroom: "Shutters Bedroom",
    windowShutterKitchenDiningRooms: "Shutters KitchenAndDiningRooms",
    windowShutterLivingRoom: "Shutters LivingRoom",
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
    // await page.waitForLoadState("domcontentloaded");
    // test.setTimeout(30000);
    await page.waitForLoadState("domcontentloaded", { timeout: 15000 });

    // await page.waitForLoadState("load", { timeout: 30000 });
    // await page.waitForLoadState("networkidle", { timeout: 5000 });
    await page.click('//button[@id="onetrust-accept-btn-handler"]');
}

// //Click Swatch Accordion to Collapse
// async function collapseSwatchAccordion(page) {
//     const xpaths = [
//         "//span[text()[normalize-space()='Product Type']]",
//         //div[@class='accordion-item']//div/span[text()[normalize-space()='Colour']]
//         "//span[text()[normalize-space()='Feature']]",
//         "//span[text()[normalize-space()='Material']]",
//         "//span[text()[normalize-space()='Colour']]",
//     ];

//     for (const xpath of xpaths) {
//         const element = await page.$(xpath);
//         if (element) {
//             await element.click();
//             // Adding a small delay between clicks (adjust as needed)
//             await page.waitForTimeout(500);
//         }
//     }
// }

// //Before Test this script will execute first
// test.beforeEach(async ({ page }) => {
//     await page.goto(`${baseURL}` + "window-shutters/");
//     //await page.waitForLoadState("networkidle");
//     await page.waitForLoadState("domcontentloaded");
//     await page.click('//button[@id="onetrust-accept-btn-handler"]');
//     await page.click("//span[text()[normalize-space()='Product Type']]");
//     await page.click("//span[text()[normalize-space()='Feature']]");
//     await page.click("//span[text()[normalize-space()='Material']]");
// });

// ##################### Shutters #####################

test.describe(`${pageNames.windowShutter}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(`${baseURL}` + "window-shutters/");
        await waitPageAndCookie(page);
        await captureScreenshot(
            page,
            `${pageNames.windowShutter}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});

test.describe(`${pageNames.windowShutterVinyl}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(`${baseURL}` + "window-shutters/vinyl-upvc/");
        await waitPageAndCookie(page);
        await captureScreenshot(
            page,
            `${pageNames.windowShutterVinyl}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});

test.describe(`${pageNames.windowShutterCafe}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(`${baseURL}` + "window-shutters/cafe/");
        await waitPageAndCookie(page);
        await page.click("//span[text()[normalize-space()='Material']]");
        await page.click("//span[text()[normalize-space()='Product Type']]");
        await captureScreenshot(
            page,
            `${pageNames.windowShutterCafe}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});

test.describe(`${pageNames.windowShutterSolid}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(`${baseURL}` + "window-shutters/solid-shutters/");
        await waitPageAndCookie(page);
        await page.click("//span[text()[normalize-space()='Material']]");
        await page.click("//span[text()[normalize-space()='Product Type']]");
        await captureScreenshot(
            page,
            `${pageNames.windowShutterSolid}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});

test.describe(`${pageNames.windowShutterTracked}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(`${baseURL}` + "window-shutters/tracked/");
        await waitPageAndCookie(page);
        await page.click("//span[text()[normalize-space()='Material']]");
        await page.click("//span[text()[normalize-space()='Product Type']]");
        await captureScreenshot(
            page,
            `${pageNames.windowShutterTracked}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});

test.describe(`${pageNames.windowShutterTierOnTier}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(`${baseURL}` + "window-shutters/tier-on-tier/");
        await waitPageAndCookie(page);
        await page.click("//span[text()[normalize-space()='Material']]");
        await page.click("//span[text()[normalize-space()='Product Type']]");
        await captureScreenshot(
            page,
            `${pageNames.windowShutterTierOnTier}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});

test.describe(`${pageNames.windowShutterFullHeight}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(`${baseURL}` + "window-shutters/full-height/");
        await waitPageAndCookie(page);
        await page.click("//span[text()[normalize-space()='Material']]");
        await page.click("//span[text()[normalize-space()='Product Type']]");
        await captureScreenshot(
            page,
            `${pageNames.windowShutterFullHeight}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});

test.describe(`${pageNames.windowShutterThermal}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(`${baseURL}` + "thermal-solutions");
        await waitPageAndCookie(page);
        await page.click("//span[text()[normalize-space()='Colour']]");
        await page.click("//span[text()[normalize-space()='Pattern']]");
        await captureScreenshot(
            page,
            `${pageNames.windowShutterThermal}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});

test.describe(`${pageNames.windowShutterWhiteAndCream}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(`${baseURL}` + "window-shutters/white-and-cream/");
        await waitPageAndCookie(page);
        await page.click("//span[text()[normalize-space()='Material']]");
        await page.click("//span[text()[normalize-space()='Product Type']]");
        await captureScreenshot(
            page,
            `${pageNames.windowShutterWhiteAndCream}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});

test.describe(`${pageNames.windowShutterColoured}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(`${baseURL}` + "window-shutters/coloured/");
        await waitPageAndCookie(page);
        await page.click("//span[text()[normalize-space()='Material']]");
        await page.click("//span[text()[normalize-space()='Product Type']]");
        await captureScreenshot(
            page,
            `${pageNames.windowShutterColoured}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});

test.describe(`${pageNames.windowShutterBlackout}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(`${baseURL}` + "window-shutters/blackout/");
        await waitPageAndCookie(page);
        //As of 3/13/2024 it doesn't have fabrics module on the Live CMS
        // await page.click("//span[text()[normalize-space()='Material']]");
        // await page.click("//span[text()[normalize-space()='Product Type']]");
        await captureScreenshot(
            page,
            `${pageNames.windowShutterBlackout}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});

test.describe(`${pageNames.windowShutterBayWindow}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(`${baseURL}` + "window-shutters/bay-window/");
        await waitPageAndCookie(page);
        await page.click("//span[text()[normalize-space()='Material']]");
        await page.click("//span[text()[normalize-space()='Product Type']]");
        await captureScreenshot(
            page,
            `${pageNames.windowShutterBayWindow}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});

test.describe(`${pageNames.windowShutterShaped}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(`${baseURL}` + "window-shutters/shaped/");
        await waitPageAndCookie(page);
        await page.click("//span[text()[normalize-space()='Material']]");
        await page.click("//span[text()[normalize-space()='Product Type']]");
        await captureScreenshot(
            page,
            `${pageNames.windowShutterShaped}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});

test.describe(`${pageNames.windowShutterDoor}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(`${baseURL}` + "window-shutters/door/");
        await waitPageAndCookie(page);
        await page.click("//span[text()[normalize-space()='Material']]");
        await page.click("//span[text()[normalize-space()='Product Type']]");
        await captureScreenshot(
            page,
            `${pageNames.windowShutterDoor}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});

test.describe(`${pageNames.windowShutterGableEnd}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(`${baseURL}` + "window-blinds/gable-end-solutions/");
        await waitPageAndCookie(page);
        await page.click("//span[text()[normalize-space()='Colour']]");
        await page.click("//span[text()[normalize-space()='Pattern']]");
        await page.click("//span[text()[normalize-space()='Feature']]");
        await page.click("//span[text()[normalize-space()='Material']]");
        await captureScreenshot(
            page,
            `${pageNames.windowShutterGableEnd}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});

test.describe(`${pageNames.windowShutterBathroom}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(`${baseURL}` + "window-shutters/bathroom/");
        await waitPageAndCookie(page);
        await captureScreenshot(
            page,
            `${pageNames.windowShutterBathroom}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});

test.describe(`${pageNames.windowShutterBedroom}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(`${baseURL}` + "window-shutters/bedroom/");
        await waitPageAndCookie(page);
        await page.click("//span[text()[normalize-space()='Material']]");
        await page.click("//span[text()[normalize-space()='Product Type']]");
        await captureScreenshot(
            page,
            `${pageNames.windowShutterBedroom}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});

test.describe(`${pageNames.windowShutterKitchenDiningRooms}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(
            `${baseURL}` + "window-shutters/kitchen-and-dining-rooms/"
        );
        await waitPageAndCookie(page);
        await page.click("//span[text()[normalize-space()='Material']]");
        await page.click("//span[text()[normalize-space()='Product Type']]");
        await captureScreenshot(
            page,
            `${pageNames.windowShutterKitchenDiningRooms}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});

test.describe(`${pageNames.windowShutterLivingRoom}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(`${baseURL}` + "window-shutters/living-room/");
        await waitPageAndCookie(page);
        await page.click("//span[text()[normalize-space()='Material']]");
        await page.click("//span[text()[normalize-space()='Product Type']]");
        await captureScreenshot(
            page,
            `${pageNames.windowShutterLivingRoom}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});
