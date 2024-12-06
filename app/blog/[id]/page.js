"use client";

import { db } from "@/firebase/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect } from "react";

const SingleBlog = ({ params }) => {
  useEffect(() => {
    (async () => {
      try {
        const { id } = await params;

        //       const q = query(collection(db, "cities"), where("capital", "==", true));

        // const querySnapshot = await getDocs(q);

        const q = query(collection(db, "blogs"), where("id", "==", id));
        const blog = (await getDocs(q)).docs?.[0]?.data();

        //   const querySnapshot = await getDocs(
        //     where(collection(db, "blogs"), where("id", "==", id))
        //   );

        //   const blog = querySnapshot.doc;

        console.log(">>> blog", blog);
      } catch (error) {
        console.error("error in fetching the blog data",error);
      }
    })();
  }, []);
  return <div>SingleBlog</div>;
};

export default SingleBlog;
