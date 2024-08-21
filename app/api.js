// api.js

// import { sessionStorage } from './shopify.server';


const API_BASE_URL = 'https://127.0.0.1:8030/shopify'; // Replace with your actual API base URL



 



/**
 * Fetches the list of themes from the backend.
 * @returns {Promise<Array>} A promise that resolves to the list of themes.
 */
export const fetchThemes = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/themes`);
    if (!response.ok) throw new Error('Failed to fetch themes');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching themes:', error);
    return [];
  }
};

/**
 * Submits store data to the backend.
 * @param {Object} data - The data to be submitted.
 * @returns {Promise<Object>} A promise that resolves to the result of the submission.
 */
export const onSubmit = async (data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to submit data');
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error submitting data:', error);
    return { success: false, message: error.message };
  }
};

/**
 * Sends the selected theme to the backend.
 * @param {string} theme - The selected theme.
 * @returns {Promise<Object>} A promise that resolves to the result of the theme selection.
 */
export const onThemeSelect = async (theme) => {
  try {
    const response = await fetch(`${API_BASE_URL}/select-theme`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ theme }),
    });
    if (!response.ok) throw new Error('Failed to select theme');
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error selecting theme:', error);
    return { success: false, message: error.message };
  }
};

/**
 * Starts the AI training process with selected data.
 * @param {Array} selectedData - The data to be used for training.
 * @returns {Promise<Object>} A promise that resolves to the result of the training request.
 */

// const get_resources  = async (resources,session) => {
    
//     const resource_data = {}

// let res_data = null
    
//     for (const [key, value] of Object.entries(resources)) {

// if (value === 'customers'){

//   res_data =  await shopify.rest.Customer.all({
//   session:shopify.sessionStorage , 
// });

// }

// resource_data[key] = res_data


// }


// }

export const onTrain = async (selectedData) => {
  try {


const sessionId = await shopify.api.session.getOfflineId('myshop.shopify.com');
const session = await shopify.config.sessionStorage.loadSession(sessionId);



    const train_data = selectedData.train_data
 
    const formData = new FormData();
    //   const session = await shopify.sessionStorage.loadSession(req.query.session_id);
    // const storeData = await getStoreData(session);

    for (const [key, value] of Object.entries(selectedData)) {
        formData.append(key, value);
    }
        // formData.append('train_data', JSON.stringify(get_resources(train_data,session)));

    const response = await fetch(`${API_BASE_URL}/training-data`, {
      method: 'POST',
      body: formData,  // Use formData directly without setting Content-Type
    });

    if (!response.ok) throw new Error('Failed to start training');
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error starting training:', error);
    return { success: false, message: error.message };
  }
};



/**
 * Checks the status of the AI training process.
 * @returns {Promise<Object>} A promise that resolves to the status of the training process.
 */
export const checkTrainingStatus = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/train-status`);
    if (!response.ok) throw new Error('Failed to check training status');
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error checking training status:', error);
    return { success: false, complete: false };
  }
};

/**
 * Connects the AI to the store.
 * @returns {Promise<Object>} A promise that resolves to the result of the connection request.
 */
export const onConnect = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/connect`, {
      method: 'GET',
    });
    if (!response.ok) throw new Error('Failed to connect AI');
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error connecting AI:', error);
    return { success: false, message: error.message };
  }
};

/**
 * Fetches the training data options from the backend.
 * @returns {Promise<Array>} A promise that resolves to the list of training data options.
 */
export const fetchTrainingData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/training-data`);
    if (!response.ok) throw new Error('Failed to fetch training data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching training data:', error);
    return [];
  }
};
