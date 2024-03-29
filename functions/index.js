const functions = require("firebase-functions");
const algoliasearch = require("algoliasearch");

const APP_ID = functions.config().algolia.app;
const ADMIN_KEY = functions.config().algolia.key;

const client = algoliasearch(APP_ID, ADMIN_KEY);
const index = client.initIndex("Chat Users");

exports.addToIndex = functions.firestore.document("users/{userId}")
    .onCreate(snapshot => {
        const data = snapshot.data();
        const objectID = snapshot.id;

        return index.addObject({...data, objectID});
    });

exports.updateIndex = functions.firestore.document("users/{userId}")
    .onUpdate(change => {
        const newData = change.after.data();
        const objectID = change.after.id;

        return index.saveObject({...newData, objectID});
    });

exports.deleteFromIndex = functions.firestore.document("users/{userId}")
    .onDelete(snapshot => index.deleteObject(snapshot.id));





    
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
