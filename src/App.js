import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from './firebase';

function App() {

  const [boards, setBoards] = useState([]);

  useEffect(() => {
    // getSingleBoard();
    // getByTitle();
    getAll();
  }, [])

  // Get a single document from firebase/firestore
  const getOne = async () => {
    // create a connection to firebase/firestore/boards collection;
    const boardsRef = firebase.firestore().collection('boards');
    // pass in the document id of the single board desired;
    const board = boardsRef.doc('zJT8Qy3DONuh2YwNoEYK');
    // make the asynchronous req for that document
    const doc = await board.get();
    // to access document's data, can use .data()
    // also has checker attr .exists (no method call, object property)
    console.log(doc.data());
  }

  // Get a single, or several documents based on criteria
  const getByTitle = async () => {
      // create a connection to firebase/firestore/boards collection;
      const boardsRef = firebase.firestore().collection('boards');
      // .where() takes an argument that constructs a DB query
      // we pipe on .get() to then retrieve the collection documents immediately
      const snapshot = await boardsRef.where('title', '==', 'Catch-22').get();
      // if empty, failed retrieval
      if (snapshot.empty) {
        console.log('missed firestore');
        return;
      }
      // iterate through results, must call .data() to access
      // the contents of each document in the snapshot
      snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
      })
  }

  const getAll = async () => {
    const boardsRef = firebase.firestore().collection('boards');
    const snapshot = await boardsRef.get();
    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
