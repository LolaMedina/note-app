const notes = [];
var noteBeingEdited;
var submitButtontext;


/**
* Create a new list item when clicking on the "Add" button. Returns nothing
*/
function addNewNote() {
  var inputValue = document.getElementById("myInput").value;
  var color = document.getElementById("color-select").value

  if (inputValue === '') {
    alert("You must write something!");
  } else {
    if (noteBeingEdited) {
      notes.splice(noteBeingEdited, 1, { text: inputValue, color: color });
      noteBeingEdited = null
      document.getElementById("color-select").selectedIndex = 0
      document.getElementById("myInput").className=("")
      reRenderNotes()
    } else {
      notes.push({ text: inputValue, color: color });
      document.getElementById("color-select").selectedIndex = 0
      document.getElementById("myInput").className=("")
      updateNotes();
    }
  }
  document.getElementById("myInput").value = "";
}


/**
* Re-render the notes displayed. Returns nothing
*/
function reRenderNotes() {
  var singleNotes = document.getElementById("oldNotes");

  while (singleNotes.firstChild) {
    singleNotes.removeChild(singleNotes.firstChild);
  }

  for (note of notes) {

    // Create all variables to use
    var newDiv = document.createElement("div");
    var p = document.createElement("P");

    // Style div, generate buttons add text to paragraph element
    newDiv.className = (`singleNote ${note.color}`)
    const { editBtn, deleteBtn } = addButtons(notes.indexOf(note));
    const t = document.createTextNode(note.text);
    p.appendChild(t);

    // Append all children to div and then to parent div in document
    newDiv.appendChild(p)
    newDiv.appendChild(editBtn)
    newDiv.appendChild(deleteBtn)
    document.getElementById("oldNotes").appendChild(newDiv);
  }
}

/**
* Generates add buttons for the note divs
* @param {integer} - the id number of the comment
* @returns {Object} - An object containing the edit and delete buttons generated
*/
function addButtons (id) {
  var editBtn = document.createElement("BUTTON");
  var deleteBtn = document.createElement("BUTTON");
  editBtn.id = id;
  editBtn.className = ('editButton')
  deleteBtn.className = ('deleteButton')
  deleteBtn.id = id;
  deleteBtn.onclick = function () { deleteNote(); };
  editBtn.onclick = function () { editNote(); };
  editBtn.appendChild(document.createTextNode("Edit"))
  deleteBtn.appendChild(document.createTextNode("Delete"))
  return { editBtn, deleteBtn }
};

/**
* Adds a new note to the display. Returns nothing
*/
function updateNotes() {

  // Create all variables to use
  var newDiv = document.createElement("div");
  var p = document.createElement("P");
  const color = notes[notes.length - 1].color;

  // Style div, generate buttons add text to paragraph element
  newDiv.className = (`singleNote ${color}`)
  const { editBtn, deleteBtn } = addButtons(notes.length - 1);
  const t = document.createTextNode(notes[notes.length - 1].text)
  p.appendChild(t);

  // Append all children to div and then to parent div in document
  newDiv.appendChild(p)
  newDiv.appendChild(editBtn)
  newDiv.appendChild(deleteBtn)
  document.getElementById("oldNotes").appendChild(newDiv);
}


/**
* Handles deletion of notes. Returns nothing
*/
function deleteNote() {
  alert('Note will be deleted')
  let idToDelete = event.target.getAttribute('id');
  notes.splice(idToDelete, 1);
  reRenderNotes()
}

/**
* Handles editing of notes. Returns nothing
*/
function editNote() {
  let idToEdit = event.target.getAttribute('id');
  var noteToEdit = notes[idToEdit].text;
  noteBeingEdited = idToEdit
  document.getElementById("myInput").value = noteToEdit
  alert(`Use the test area at the top of the page to edit your note. Don't forget to choose your background color!`)
}

/**
* Adds color to text area. Returns nothing
*/
function addColorToTextArea() {
  var textArea = document.getElementById("myInput");
  var color = document.getElementById("color-select").value
  textArea.className = (color)
}
