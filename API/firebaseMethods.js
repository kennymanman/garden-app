import * as firebase from "firebase";
import "firebase/firestore";
import { Alert } from "react-native";

export async function registration(
  email,
  password,
  lastName,
  firstName,
  phone,
  address
) {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const currentUser = firebase.auth().currentUser;

    const db = firebase.firestore();
    db.collection("users").doc(currentUser.uid).set({
      email: currentUser.email,
      lastName: lastName,
      firstName: firstName,
      phone,
      address,
    });
    return true;
  } catch (err) {
    Alert.alert("There is something wrong!!!!", err.message);
    return false;
  }
}

export async function signIn(email, password) {
  try {
    const response = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    console.log("Response of login----", response);
    return true;
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
    return false;
  }
}

export async function loggingOut() {
  try {
    await firebase.auth().signOut();
    return true;
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
    return false;
  }
}

// Get User Info
export async function getUser(uid) {
  let info = null;
  try {
    const db = firebase.firestore();
    await db
      .collection("users")
      .doc(uid)
      .get()
      .then((snapshot) => {
        info = snapshot.data();
        console.log("Doc----", info);
        return info;
        // console.log(JSON.parse(doc._document.data.toString()));
      })
      .catch((e) => {
        Alert.alert("There is something wrong!", e.message);
        return info;
      });
  } catch (err) {
    console.log("Error in get products---", err);
    Alert.alert("There is something wrong!", err.message);
    return info;
  }
}

export async function getProducts() {
  try {
    // await firebase.auth().signOut();
    const db = firebase.firestore();
    let list = [];
    await db
      .collection("products")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          if (doc?.data()) {
            list.push(doc.data());
          }
          // console.log(JSON.parse(doc._document.data.toString()));
        });
      });

    return list;
  } catch (err) {
    console.log("Error in get products---", err);
    Alert.alert("There is something wrong!", err.message);
    return;
  }
}

export async function saveItems(payload) {
  // console.log("PAyload---", payload);
  try {
    const user = firebase.auth().currentUser?.uid;
    const db = firebase.firestore();
    db.collection("basket")
      .add({ user, ...payload })
      .then((res) => {
        const id = res.id;
        console.log("Rres------", res.id);
        db.collection("basket")
          .doc(res.id)
          .update({ id, user, ...payload });
      });

    Alert.alert("Success", "Item saved successfully");
    return true;
  } catch (err) {
    Alert.alert("Error", err.message);
    return false;
  }
}

export async function getsSavedItems() {
  return new Promise((resolve, reject) => {
    let items = [];
    try {
      const user = firebase.auth().currentUser?.uid;
      const db = firebase.firestore();
      db.collection("basket")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((documentSnapshot) => {
            if (documentSnapshot.data().user == user) {
              items.push(documentSnapshot.data());
            }
          });
          resolve(items);
        });
    } catch (err) {
      Alert.alert("Error", err.message);
      reject(err);
    }
  });
}

export async function removeSavedItems(id) {
  console.log("id----", id);
  return new Promise((resolve, reject) => {
    try {
      const db = firebase.firestore();
      db.collection("basket").doc(id).delete();
      resolve();
    } catch (err) {
      Alert.alert("Error", err.message);
      reject(err);
    }
  });
}
