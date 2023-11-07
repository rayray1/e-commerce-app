import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDdczNvv4eXAR2idmT4yxxfAk6W6JxI8W4",
	authDomain: "crown-clothing-db-a3084.firebaseapp.com",
	projectId: "crown-clothing-db-a3084",
	storageBucket: "crown-clothing-db-a3084.appspot.com",
	messagingSenderId: "931360885937",
	appId: "1:931360885937:web:ec7bd036cfbacc0c03e690"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
	prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, AdditionalInformation={}) => {
	if (!userAuth) return;

	const userDocRef = doc(db, "users", userAuth.uid);
	const userSnapshot = await getDoc(userDocRef);

	// if user data does not exist
	// create/set the document with the data from userauth in my coolection
	// check if user data exists
	// return userdockRef

	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				...AdditionalInformation
			});
		} catch (error) {
			console.log("error creating the user", error.message);
		}
	}
	return userDocRef;
};

// create user
export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	return await createUserWithEmailAndPassword(auth, email, password);
};

// sign in user
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	return await signInWithEmailAndPassword(auth, email, password);
};
