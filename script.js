import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.firebasestorage.app",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
window.addKnowledge = async function() {

    const title = document.getElementById("title").value;
    const description =
        document.getElementById("description").value;
    const category =
        document.getElementById("category").value;

    if (title === "" || description === "") {
        alert("Please enter all required details");
        return;
    }

    try {

        await addDoc(collection(db, "knowledge"), {
            title: title,
            description: description,
            category: category,
            createdAt: new Date()
        });

        alert("Knowledge added successfully!");

        document.getElementById("title").value = "";
        document.getElementById("description").value = "";
        document.getElementById("category").value = "";

        displayKnowledge();

    } catch (error) {

        console.error(error);
        alert("Error adding knowledge");

    }
};
async function displayKnowledge() {

    const list =
        document.getElementById("knowledgeList");

    list.innerHTML = "";

    const querySnapshot =
        await getDocs(collection(db, "knowledge"));

    querySnapshot.forEach((doc) => {

        const data = doc.data();

        list.innerHTML += `
            <div class="knowledge">

                <h3>${data.title}</h3>

                <p>${data.description}</p>

                <b>Category:</b>
                ${data.category}

            </div>
        `;
    });
}

displayKnowledge();