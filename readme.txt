//to run the script individually
npx playwright test tests/homepage.spec.js
npx playwright test tests/swatch-blinds-duette.spec.js
npx playwright test tests/swatch-blinds-pleated.spec.js
npx playwright test tests/swatch-blinds-roman.spec.js
npx playwright test tests/swatch-blinds-wooden.spec.js
npx playwright test tests/swatch-garage-doors-roller.spec.js
npx playwright test tests/swatch-garage-doors-sectional.spec.js
npx playwright test tests/swatch-garage-doors.spec.js
npx playwright test tests/swatch-shutters.spec.js
npx playwright test tests/swatch-shutters-vinyl.spec.js
npx playwright test tests/swatch-shutters-cafe.spec.js
npx playwright test tests/swatch-shutters-solid.spec.js
npx playwright test tests/swatch-shutters-tracked.spec.js
npx playwright test tests/swatch-shutters-tierontier.spec.js
npx playwright test tests/swatch-shutters-fullheight.spec.js

//to update basefile screenshots
npx playwright test tests/visual.spec.js --update-snapshots  

//to show the report
npx playwright show-report