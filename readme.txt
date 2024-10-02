//to run the script individually
npx playwright test tests/homepage.spec.js
npx playwright test tests/swatch-shutters-main.spec.js
npx playwright test tests/swatch-blinds-main.spec.js
npx playwright test tests/swatch-awnings-main.spec.js
npx playwright test tests/swatch-conservatoryblinds-main.spec.js
npx playwright test tests/swatch-garagedoors.spec.js
npx playwright test tests/inspiration.spec.js

//to update basefile screenshots
npx playwright test tests/homepage.spec.js --update-snapshots
npx playwright test tests/swatch-shutters.spec.js --update-snapshots
npx playwright test tests/swatch-blinds-main.spec.js --update-snapshots
npx playwright test tests/swatch-awnings-main.spec.js --update-snapshots
npx playwright test tests/swatch-conservatoryblinds-main.spec.js --update-snapshots
npx playwright test tests/swatch-garagedoors.spec.js --update-snapshots
npx playwright test tests/inspiration.spec.js --update-snapshots

//to show the report
npx playwright show-report