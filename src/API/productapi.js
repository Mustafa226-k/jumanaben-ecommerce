import { collection, doc, getDoc,getDocs,query,where } from "firebase/firestore";
import { db } from "../firebase/authentication";

export const getAvailableProducts = async () =>{
  console.log("getAvailableProducts CALLED");
   try{
    const q = query(collection(db,"products"),
    where("status","==","available")
   );
   const data = await getDocs(q);

   console.log("FINAL PRODUCTS SIZE:", data.size);

   const product = data.docs.map((docs)=>({
    id:docs.id,
    ...docs.data()
   }));
  

   return product;
   }catch(error){
    console.error("Error fetching products:",error);
    return [];
   }
}

export const getFeaturedProducts = async () =>{
  try{
    const q = query(collection(db,"products"),
    where("isFeature","==",true),
    where("status","==","available"));

    const data = await getDocs(q);
    const product = data.docs.map((docs)=>({
      id:docs.id,
      ...docs.data()
    }));
    return product;
  }catch(error){
    console.error("Error fetching featured products:",error);
    return [];
  }
  }