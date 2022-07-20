import React, { useState, useEffect } from "react";
import { db } from "../Firebase/firebaseConfig.js";
import {
  addDoc,
  collection,
  onSnapshot,
  where,
  query,
  deleteDoc,
  getDoc,
  doc,
} from "firebase/firestore";
import closeNote from "../img/closeNote.png";
import editNote from "../img/editNote.png";
import cat1 from "../img/cat1.gif";
import {Modal} from './Modal.js'

const getNoteById = async (id) => {
  const docRefId = doc(db, "notes", id);
  const docSnap = await getDoc(docRefId);

  if (docSnap.exists()) {
    //console.log("Document data:", docSnap.data());
    return { ...docSnap.data()};
  } else {
    console.log("No such document!");
  }
}

const getNotes = (setNotes) => {
  const q =  query(
    collection(db, "notes"),
    where("author", "==", localStorage.getItem("email"))
  );
  onSnapshot(q, (querySnapshot) => {
    const docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id });
    });
    setNotes(docs);
  });
};

const addnote = async (objectNote, currentId, setNotes) => {
  //console.log(currentId, 'antes');
  if (currentId === '') {
    const docRef = await addDoc(collection(db, "notes"), objectNote);
    console.log("Document written with ID: ", docRef.id);
    getNotes(setNotes);
    // setValues({ ...initialStateValues });
  }
};

const onDeleteNote = (id) => {
  deleteDoc(doc(db, "notes", id));
};


export const Notes = () => {
  const initialStateValues = {
    title: "",
    description: "",
    author: localStorage.getItem("email"),

  };
  const [values, setValues] = useState(initialStateValues);
  const [currentId, setCurrentId] = useState('');
  const [notes, setNotes] = useState([]);
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addnote(values, currentId, setNotes);
    //console.log(values);
    // setValues({ ...initialStateValues });
    e.target.reset()
    
  };

  









    useEffect(() => {

      getNotes(setNotes)
    }, []);


  return (
    <div className="Container-rapid-note">
      <div className="Content-cat">
        <img src={cat1} className="catNote" alt="cat" />
      </div>
      <form className="Container-note-form" onSubmit={handleSubmit}>
        <div className="Container-note">
          <div className="input-group-text">
            <p className="titleAddNote">Agregar nota</p>
            <input
              type="text"
              name="title"
              className="formTitleNote"
              placeholder="Título"
              onChange={handleInputChange}
              //value={values.title}
            />
            <div className="input-group-textarea">
              <textarea
                className="textareaNote"
                name="description"
                rows="4"
                placeholder="Escribe una nota"
                onChange={handleInputChange}
                //value={values.description}
              ></textarea>
            </div>
          </div>
          <button className="btnPrimary">Guardar</button>
        </div>
      </form>

      <div>
        <div className="notesList">
          {notes.map((note) => (
            <div className="notesContent" key={note.id} id={note.id}>
              <div className="noteCard">
                <div className="contentBtnEdit">
                  <button
                    className="editNote"
                    data-noteid={note.id}
                    onClick ={() => {
                      setCurrentId(note.id);
                      toggleModal();
                      const notes = getNoteById(note.id)
                      setNotes(notes);
                    }}
                  >
                    <img src={editNote} className="editNote" alt="btn" />
                  </button>
                </div>
                <div className="contentBtnClose">
                  <button
                    className="btnClose"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteNote(note.id);
                    }}
                  >
                    <img src={closeNote} className="closeNote" alt="btn" />
                  </button>
                </div>
                {/* <button
                data-noteid={note.id}
                onClick ={() => {setCurrentId(note.id);  toggleModal()}}
                className='btn-Modal'>
                Editar Nota
                </button> */}

                <input
                  className="editTitleLoad"
                  onChange={handleInputChange}
                  value={note.title}
                />
                <textarea
                  className="editDescriptionLoad"
                  onChange={handleInputChange}
                  rows="5"
                  value={note.description}
                >
                </textarea>
              </div>
            </div>
          ))}
            <Modal note={currentId} values={values} setValues={setValues} modal={modal} setModal={setModal}/>
        </div>
      </div>
    </div>);
};

