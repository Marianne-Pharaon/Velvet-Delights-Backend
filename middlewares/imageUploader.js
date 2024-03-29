

const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require('firebase/storage');
const storage = getStorage();


const imageUpload = async (file) => {
  try {
    const dateTime = giveCurrentDateTime();

    const storageRef = ref(
      storage,
      `files/${file.originalname}_${dateTime}`
    );

    // Create file metadata including the content type
    const metadata = {
      contentType: file.mimetype,
    };

    // Upload the file in the bucket storage
    const snapshot = await uploadBytesResumable(
      storageRef,
      file.buffer,
      metadata
    );

    // Grab the public URL
    const downloadURL = await getDownloadURL(snapshot.ref);

    if (!downloadURL) {
      throw new Error('Download URL is undefined');
    }

    console.log('File successfully uploaded.');
    return {
      message: 'file uploaded to firebase storage',
      name: file.originalname,
      type: file.mimetype,
      downloadURL: downloadURL,
    };
  } catch (error) {
    console.error('Error during image upload:', error);
    return null;
  }
};


const giveCurrentDateTime = () => {
  const today = new Date();
  const date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const time =
    today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  const dateTime = date + ' ' + time;
  return dateTime;
};

module.exports = imageUpload;
