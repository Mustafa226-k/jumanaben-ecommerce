import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase/authentication";

/**
 * ADD PRODUCT (Admin only - rules enforce this)
 */

export const addProduct = async (product) => {
  await addDoc(collection(db, "products"), {
    ...product,
    price: Number(product.price),
  });
};

/**
 * UPDATE PRODUCT
 */

export const updateProduct = async (id, product) => {
  await updateDoc(doc(db, "products", id), {
    ...product,
    price: Number(product.price),
  });
};

/**
 * DELETE PRODUCT
 */

export const deleteProduct = async (id) => {
  await deleteDoc(doc(db, "products", id));
};

/**
 * FETCH ALL PRODUCTS (Admin view)
 */

export const getAllProducts = async () => {
  const q = query(
    collection(db, "products"),
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
