import axios from 'axios';
import { Buffer } from 'buffer';

const USERNAME = 'john@groshapp.com';
const PASSWORD = 'Jd1234';

const getAuthHeader = () => {
  return 'Basic ' + Buffer.from(`${USERNAME}:${PASSWORD}`).toString('base64');
};

export const fetchLists = async () => {
  try {
    const response = await axios.get('https://groshapp.com/test/users/me/households', {
      headers: {
        Authorization: getAuthHeader(),
        Accept: 'application/json',
        'User-Agent': 'Mozilla/5.0',
        //To bypass 455 error on server
      },
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const fetchListDetails = async (householdId) => {
  try {
    const response = await axios.get(
      `https://groshapp.com/test/households/${householdId}/current`,
      {
        headers: {
          Authorization: getAuthHeader(),
          Accept: 'application/json',
          'User-Agent': 'Mozilla/5.0',
        },
      }
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};
