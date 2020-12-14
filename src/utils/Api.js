import firebaseApp from "./Firebase";
import * as firebase from "firebase";

const db = firebase.firestore(firebaseApp);

export async function isUserAdmin(uid) {
  const response = await db.collection("admins").doc(uid).get();
  return response.exists;
}
