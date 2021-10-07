import * as firebase from "firebase/app"

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_APIKEY}`,
  authDomain: "doctor-manager-d6624.firebaseapp.com",
  projectId: "doctor-manager-d6624",
  storageBucket: "doctor-manager-d6624.appspot.com",
  messagingSenderId: "814853624654",
  appId: "1:814853624654:web:de81e14f5118e49b67c41f",
}

export default firebase.initializeApp(firebaseConfig)
