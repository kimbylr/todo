const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getLastEdit = async passphrase => {
  try {
    const res = await fetch(`${API_BASE_URL}lastedit`, {
      headers: {
        Authorization: passphrase,
      },
    });
    const timestamp = await res.json();
    return timestamp;
  } catch (e) {
    console.error('could not fetch last change', e);
  }
};
