// utils.spec.js
const oldInstance = "https://headless-staging-web-temp.azurewebsites.net/";
const newInstance = "https://headless-staging.thomas-sanderson.co.uk/";

// Function to get the base URL
function getBaseURL(useNewInstance = false) {
    return useNewInstance ? newInstance : oldInstance;
}

// Export the function
export default { getBaseURL };
