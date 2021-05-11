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
    // addOne();
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
    // create a connection to firebase/firestore/boards collection;
    const boardsRef = firebase.firestore().collection('boards');
    // cast a general get() from the collection instance to retreive
    // all of the documents in a collection
    const snapshot = await boardsRef.get();
    // this retrieves a snapshot of the entire collection
    // snapshot has a number of methods
      // docChanges == all the changes to the document since the last fetch
      // docs returns an array of all the docs in the QuerySnapshot
      // query, and also size are other methods
    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
    })
  }

  const addOne = async () => {
    const board = {
      author: 'John Gardner',
      description: 'A story about an accident',
      title: 'Grendel',
    };
    // create a firestore connection, ref the collection, add data
    // using .add() will autogenerate an ID, if you do not want to 
    // autogenerate an ID, you an use .set({...});
    const res = await firebase.firestore().collection('boards').add(board);
    console.log("Added document with " + res.id);
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
