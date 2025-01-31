import { test, expect } from "@playwright/test";

// ##################### Base URL ######################

const baseURL = "https://www.thomas-sanderson.co.uk/";

// ##################### Pages #########################

const pageNames = {
    blinds: "Blinds",
    blindsDuette: "Duette Blinds",
    blindsElectric: "Electric Blinds",
    blindsPleated: "Pleated Blinds",
    blindsWooden: "Wooden Blinds",
    blindsRoman: "Roman Blinds",
    blindsRoller: "Roller Blinds",
    blindsThermal: "Thermal Blinds",
    blindsBayWindow: "Bay Window Blinds",
    blindsBiFoldDoor: "Bi Fold Door Blinds",
    blindsPatioDoor: "Patio Door Blinds",
    blindsFrenchDoor: "French Door Blinds",
    blindsGableEnd: "Gable End Blinds",
    blindsSkylightAndRoofLantern: "Skylight And Roof Lantern Blinds",
    blindsBedroom: "Bedroom Blinds",
    blindsKitchen: "Kitchen Blinds",
    blindsBathroom: "Bathroom Blinds",
    blindsHomeOffice: "Home Office Blinds",
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

// ##################### Blinds #####################

test.describe(`${pageNames.blinds}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(`${baseURL}` + "blinds/");
        await waitPageAndCookie(page);
        await captureScreenshot(
            page,
            `${pageNames.blinds}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});

test.describe(`${pageNames.blindsDuette}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(`${baseURL}` + "window-blinds/duette/");
        await waitPageAndCookie(page);
        await page.click("//span[text()[normalize-space()='Pattern']]");
        await page.click("//span[text()[normalize-space()='Feature']]");
        await page.click("//span[text()[normalize-space()='Material']]");
        await captureScreenshot(
            page,
            `${pageNames.blindsDuette}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});

test.describe(`${pageNames.blindsElectric}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(
            `${baseURL}` + "window-blinds/powered-electric-blinds/"
        );
        await waitPageAndCookie(page);
        await page.click("//span[text()[normalize-space()='Colour']]");
        await page.click("//span[text()[normalize-space()='Pattern']]");
        await page.click("//span[text()[normalize-space()='Material']]");
        await captureScreenshot(
            page,
            `${pageNames.blindsElectric}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});

test.describe(`${pageNames.blindsPleated}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(`${baseURL}` + "window-blinds/pleated/");
        await waitPageAndCookie(page);
        await page.click("//span[text()[normalize-space()='Pattern']]");
        await page.click("//span[text()[normalize-space()='Feature']]");
        await captureScreenshot(
            page,
            `${pageNames.blindsPleated}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});

test.describe(`${pageNames.blindsWooden}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(`${baseURL}` + "window-blinds/wooden-blinds/");
        await waitPageAndCookie(page);
        await page.click("//span[text()[normalize-space()='Colour']]");
        await captureScreenshot(
            page,
            `${pageNames.blindsWooden}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});

test.describe(`${pageNames.blindsRoman}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(`${baseURL}` + "window-blinds/roman-blinds/");
        await waitPageAndCookie(page);
        await page.click("//span[text()[normalize-space()='Pattern']]");
        await page.click("//span[text()[normalize-space()='Feature']]");
        await captureScreenshot(
            page,
            `${pageNames.blindsRoman}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});

test.describe(`${pageNames.blindsRoller}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(`${baseURL}` + "window-blinds/roller-blinds/");
        await waitPageAndCookie(page);
        await page.click("//span[text()[normalize-space()='Pattern']]");
        await page.click("//span[text()[normalize-space()='Feature']]");
        await captureScreenshot(
            page,
            `${pageNames.blindsRoller}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});

test.describe(`${pageNames.blindsThermal}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(`${baseURL}` + "thermal-solutions/");
        await waitPageAndCookie(page);
        await page.click("//span[text()[normalize-space()='Colour']]");
        await page.click("//span[text()[normalize-space()='Pattern']]");
        await captureScreenshot(
            page,
            `${pageNames.blindsThermal}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});

test.describe(`${pageNames.blindsBayWindow}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(`${baseURL}` + "window-blinds/bay-window-blinds/");
        await waitPageAndCookie(page);
        await captureScreenshot(
            page,
            `${pageNames.blindsBayWindow}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});

test.describe(`${pageNames.blindsBiFoldDoor}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(`${baseURL}` + "window-blinds/bifold-doors/");
        await waitPageAndCookie(page);
        await page.click("//span[text()[normalize-space()='Product Type']]");
        await captureScreenshot(
            page,
            `${pageNames.blindsBiFoldDoor}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});

test.describe(`${pageNames.blindsPatioDoor}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(`${baseURL}` + "window-blinds/patio-doors/");
        await waitPageAndCookie(page);
        await captureScreenshot(
            page,
            `${pageNames.blindsPatioDoor}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});

test.describe(`${pageNames.blindsFrenchDoor}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(`${baseURL}` + "window-blinds/french-doors/");
        await waitPageAndCookie(page);
        await captureScreenshot(
            page,
            `${pageNames.blindsFrenchDoor}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});

test.describe(`${pageNames.blindsGableEnd}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(`${baseURL}` + "window-blinds/gable-end-solutions/");
        await waitPageAndCookie(page);
        await page.click("//span[text()[normalize-space()='Colour']]");
        await page.click("//span[text()[normalize-space()='Pattern']]");
        await page.click("//span[text()[normalize-space()='Feature']]");
        await page.click("//span[text()[normalize-space()='Material']]");
        await captureScreenshot(
            page,
            `${pageNames.blindsGableEnd}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});

test.describe(`${pageNames.blindsSkylightAndRoofLantern}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(
            `${baseURL}` + "window-blinds/skylights-and-roof-lantern-blinds/"
        );
        await waitPageAndCookie(page);
        await page.click("//span[text()[normalize-space()='Colour']]");
        await page.click("//span[text()[normalize-space()='Material']]");
        await page.click("//span[text()[normalize-space()='Feature']]");

        await captureScreenshot(
            page,
            `${pageNames.blindsSkylightAndRoofLantern}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});

test.describe(`${pageNames.blindsBedroom}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(`${baseURL}` + "window-blinds/bedroom/");
        await waitPageAndCookie(page);
        await captureScreenshot(
            page,
            `${pageNames.blindsBedroom}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});

test.describe(`${pageNames.blindsKitchen}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(`${baseURL}` + "window-blinds/kitchen/");
        await waitPageAndCookie(page);
        await captureScreenshot(
            page,
            `${pageNames.blindsKitchen}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});

test.describe(`${pageNames.blindsBathroom}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(`${baseURL}` + "window-blinds/bathroom/");
        await waitPageAndCookie(page);
        await captureScreenshot(
            page,
            `${pageNames.blindsBathroom}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});

test.describe(`${pageNames.blindsHomeOffice}`, async () => {
    test("WholePage", async ({ page }) => {
        await page.goto(`${baseURL}` + "window-blinds/home-office/");
        await waitPageAndCookie(page);
        await captureScreenshot(
            page,
            `${pageNames.blindsHomeOffice}-WholePage.png`,
            "//div[@class='trustpilot-container']"
        );
    });
});
