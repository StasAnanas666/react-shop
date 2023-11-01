import { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { firebaseConfig } from "./firebaseConfig";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Auth from "./components/Auth";
import HomePage from "./components/HomePage";
import Navigation from "./components/Navigation";
import AdminPage from "./components/AdminPage";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function App() {
  return (
    <Router>
      {!firebase.auth().currentUser ? (
        <Auth />
      ) : (
        <>
        <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </>
          
      )}
    </Router>
  );
}

export default App;
