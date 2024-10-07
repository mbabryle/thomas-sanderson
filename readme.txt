//to run the script individually
npx playwright test tests/homepage.spec.js
npx playwright test tests/swatch-shutters-main.spec.js
npx playwright test tests/swatch-blinds-main.spec.js
npx playwright test tests/swatch-awnings-main.spec.js
npx playwright test tests/swatch-conservatoryblinds-main.spec.js
npx playwright test tests/swatch-garagedoors.spec.js
npx playwright test tests/inspiration.spec.js
npx playwright test tests/designappointment.spec.js
npx playwright test tests/brochurerequest.spec.js
npx playwright test tests/howcanwehelp.spec.js
npx playwright test tests/ourstory.spec.js

//to update basefile screenshots
npx playwright test tests/homepage.spec.js --update-snapshots
npx playwright test tests/swatch-shutters-main.spec.js --update-snapshots
npx playwright test tests/swatch-blinds-main.spec.js --update-snapshots
npx playwright test tests/swatch-awnings-main.spec.js --update-snapshots
npx playwright test tests/swatch-conservatoryblinds-main.spec.js --update-snapshots
npx playwright test tests/swatch-garagedoors.spec.js --update-snapshots
npx playwright test tests/inspiration.spec.js --update-snapshots
npx playwright test tests/designappointment.spec.js --update-snapshots
npx playwright test tests/brochurerequest.spec.js --update-snapshots
npx playwright test tests/howcanwehelp.spec.js --update-snapshots
npx playwright test tests/ourstory.spec.js --update-snapshots

//to show the report
npx playwright show-report