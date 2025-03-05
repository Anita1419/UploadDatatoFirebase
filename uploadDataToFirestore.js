// Import necessary modules
const admin = require('firebase-admin');
const serviceAccount = require('path/to/serviceAccountKey.json'); // Replace with your Firebase Admin SDK path
const fs = require('fs');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Initialize Firestore
const db = admin.firestore();

// Path to your JSON file
const jsonFilePath = './data.json'; // Replace with your JSON file path

// Function to upload data to Firestore
async function uploadDataToFirestore() {
  try {
    // Read JSON file
    const rawData = fs.readFileSync(jsonFilePath);
    const data = JSON.parse(rawData);

    // Batch write for uploading data
    const batch = db.batch();
    data.forEach((item) => {
      const docRef = db.collection('recipes').doc(item.id); // Change 'recipes' to your collection name
      batch.set(docRef, item);
    });

    // Commit the batch
    await batch.commit();
    console.log('Data uploaded to Firestore successfully!');
  } catch (error) {
    console.error('Error uploading data to Firestore:', error);
  }
}

// Run the function to upload data
uploadDataToFirestore();
