//umbraco index Testing

1. Update the baseURL under indexumbracopreview folder to OLD url https://headless-staging-web-temp.azurewebsites.net/

2. Generate basefile using the OLD url  by running the scripts below one by one

npx playwright test tests/indexumbracopreview/brochurerequest.spec.js --update-snapshots
npx playwright test tests/indexumbracopreview/designappointment.spec.js --update-snapshots
npx playwright test tests/indexumbracopreview/generic.spec.js --update-snapshots
npx playwright test tests/indexumbracopreview/homepage.spec.js --update-snapshots
npx playwright test tests/indexumbracopreview/inspiration.spec.js --update-snapshots
npx playwright test tests/indexumbracopreview/product.spec.js --update-snapshots
npx playwright test tests/indexumbracopreview/style.spec.js --update-snapshots

3. Update baseURL of each file to the new URL https://headless-umbraco.thomas-sanderson.co.uk/
4. Run the command to compare basefile (OLD) to new URL https://headless-umbraco.thomas-sanderson.co.uk/

npx playwright test tests/indexumbracopreview/brochurerequest.spec.js
npx playwright test tests/indexumbracopreview/designappointment.spec.js
npx playwright test tests/indexumbracopreview/generic.spec.js
npx playwright test tests/indexumbracopreview/homepage.spec.js
npx playwright test tests/indexumbracopreview/inspiration.spec.js
npx playwright test tests/indexumbracopreview/product.spec.js
npx playwright test tests/indexumbracopreview/style.spec.js


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

//Index Testing
npx playwright test "tests/index/homepage.spec.js" --update-snapshots
npx playwright test "tests/index/inspiration.spec.js" --update-snapshots


//to show the report
npx playwright show-report