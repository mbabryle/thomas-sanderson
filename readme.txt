//to run the script
npx playwright test tests/visual.spec.js

//to update basefile screenshots
npx playwright test tests/visual.spec.js --update-snapshots  

//to show the report
npx playwright show-report