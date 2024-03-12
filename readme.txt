//to run the script individually
npx playwright test tests/homepage.spec.js
npx playwright test swatch-blinds-duette.spec.js
npx playwright test swatch-blinds-pleated.spec.js
npx playwright test swatch-blinds-roman.spec.js
npx playwright test swatch-blinds-wooden.spec.js
npx playwright test swatch-garage-doors-roller.spec.js
npx playwright test swatch-garage-doors-sectional.spec.js
npx playwright test swatch-garage-doors.spec.js
npx playwright test swatch-shutters.spec.js

//to run swatch pages *Might cause an error
npx playwright test tests/swatch-blinds-duette.spec.js tests/swatch-blinds-pleated.spec.js tests/swatch-blinds-roman.spec.js tests/swatch-blinds-wooden.spec.js tests/swatch-garage-doors.spec.js tests/swatch-garage-doors-roller.spec.js tests/swatch-garage-doors-sectional.spec.js tests/swatch-shutters.spec.js

//to update basefile screenshots
npx playwright test tests/visual.spec.js --update-snapshots  

//to show the report
npx playwright show-report