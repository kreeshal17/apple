import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

export const useUserRole = () => {
    const [role, setRole] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                setRole(null);
                return;
            }

            try {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setRole(docSnap.data().role);
                } else {
                    setRole(null);
                }
            } catch (error) {
                console.error("Error fetching user role:", error);
                setRole(null);
            }
        });

        return () => unsubscribe();
    }, []);

    return role;
};