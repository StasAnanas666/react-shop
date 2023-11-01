import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //регистрация
  const handleSignUp = async () => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      <Navigate to="/" />;
    } catch (error) {
      console.error(error);
    }
  };

  //авторизация
  const handleSignIn = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      <Navigate to="/" />;
    } catch (error) {
      console.error(error);
    }
  };

  //выход из учетки
  const handleSignOut = async () => {
    try {
      await firebase.auth().signOut();
      <Navigate to="/auth" />;
    } catch (error) {
      console.error(error);
    }
  };

  //аутентификация с гугл
  const handleSignInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider);
      <Navigate to="/" />;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {firebase.auth().currentUser ? (
        <div>
          <p>Привет, {firebase.auth().currentUser.email}</p>
          <button onClick={handleSignOut}>Выйти</button>
        </div>
      ) : (
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSignUp}>Зарегистрироваться</button>
          <button onClick={handleSignIn}>Войти</button>
          <button onClick={handleSignInWithGoogle}>Войти с Google</button>
        </div>
      )}
    </div>
  );
};

export default Auth;
