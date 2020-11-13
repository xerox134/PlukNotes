
let notes = [];
var count = 1;      
let editNoteId = null;
let themeButton = document.getElementById('themeBtn')

themeButton.addEventListener("click",function Function(){
    myFunction();
});
themeButton.addEventListener("dblclick",function Function(){
    myFunction2();
});



function myFunction() {
  
    if(count == 0){
    
        document.body.style.backgroundImage =" url('image/coal.jpg')";
       count++; 
        console.log(count);} 
        
        else { document.body.style.backgroundImage =null;
count=0;
console.log(count)};


  };

  
function myFunction2() {
  
    if(count == 0){
    
        document.body.style.backgroundImage =" url('image/0000.jpg')";
       count++; 
        console.log(count);} 
        
        else { document.body.style.backgroundImage =null;
count=0;
console.log(count)};


  };

  



indexRenderNotes();

function indexRenderNotes() {
    if($('body').is('.index')){
        renderNotes();
        myFunction();
    }
}



function search(needle){
    
    let haystack = $('.note');
    
    console.log('haystack', haystack, 'needle', needle);

    for(let note of haystack){
        let content = $(note).find('.note-content').text();
        let title = $(note).find('.note-title').text();
        console.log('Note content: ', content);
        console.log('Note title: ', title);

        if(title.toLowerCase().includes(needle.toLowerCase()) || content.toLowerCase().includes(needle.toLowerCase())){
            $(note).show();
        } else {
            $(note).hide();
        }
    }
}


async function getNotes() {
    let result = await fetch('/rest/notes');
    notes = await result.json();

}


async function renderNotes() {
    await getNotes();
    let noteList = document.querySelector("#notesList ul");

    noteList.innerHTML = "";
    

    for(let note of notes) {
        let date = new Date(note.date).toLocaleString();
        
            let noteLi = `
            <div class="container">
            <div class="header"><span>${note.title}</span></div> 
            <li class="note" id="${note.id}"style="display:none;">
            <div class="note-title">${note.title}</div><br>
            <div class="note-content">${note.content}</div><br>
            <div class="image"><embed src="${note.imageUrl}" alt="note-image"></div>
            <div class="note-date">${date}</div><br>
            <button class="deleteButton" onclick="confirmClick(this)">Delete</button><br><br>
            <button class="editButton" onclick="saveNoteId(this)">Edit</button><br>
            </li></div>
            `;

            noteList.innerHTML += noteLi;
    }
    
    $(".header").click(function () {
       
        $header = $(this);
        //getting the next element
        $content = $header.next();
        //open up the content needed - toggle the slide- if visible, slide up, if not slidedown.
        $content.slideToggle(15, function () {
            //execute this after slideToggle is done
            //change text of header based on visibility of content div
            $header.text(function () {
                //change text based on condition
                //return $content.is(":visible")
            });
        });
    
    });
}

async function renderEditNote(id) {
    await getNotes();
    let noteList = document.querySelector("#notesList ul");
    noteList.innerHTML = "";
    
    for(let note of notes) {

        if (id == note.id) {
            
            let noteLi = `
            <li class="currentNoteId" id="${note.id}">
            <div class="addNoteContainer">
            <button onclick="renderNotes();">Back</button>
            <h3>Edit Note!</h3>
            <form onsubmit="updateNote(event)">                
                <div class="image"><img src="${note.imageUrl}" alt="note-image"></div><br>
                <input type="text" name="textbox" id="title" Value="${note.title}"><br>                
                <br> 
                <input type ="text" id="content" Value="${note.content}"><br><br>              
                <input type="file" accept="image/*" placeholder="Select image">              
                <button type="submit">Update note</button>
              </form>  </div>  
            </li>`;

            noteList.innerHTML += noteLi;
            }
        
    }
       
}

function saveNoteId(editButton) {
   editNoteId = $(editButton).parent().attr('id');
   console.log('Id for note to edit:', editNoteId);
   renderEditNote(editNoteId);   
}


async function confirmClick(removeButton){
    //let noteId = $(removeButton).parent().attr('id');
    if (confirm('Are you sure?')){
        deleteNote (removeButton);
    } else {
        renderNotes ();
    }
}

async function deleteNote(removeButton){
    let noteId = $(removeButton).parent().attr('id');
    console.log('ID:', noteId)
    
    let note = {
        id: noteId,
    }

    let result = await fetch("/rest/notes", {
        method: "DELETE",
        body: JSON.stringify(note)
    });

    console.log(await result.text());

    renderNotes()
}




async function createNote(e) {
    e.preventDefault();

    let imageUrl = null;

    let files = document.querySelector('input[type=file]').files;

    console.log('How many files are uploaded: ', files.length);

    if (!files.length == 0) {

        let formData = new FormData();

        for(let file of files) {

        formData.append('files', file, file.name);

        }

        let uploadResult = await fetch('/api/file-upload', {

        method: 'POST',

        body: formData

        });

        imageUrl = await uploadResult.text();

    }

    console.log('URL', imageUrl);

    let titleInput = document.querySelector("#title");
    let contentInput = document.querySelector("#content");

    let note = {
        title: titleInput.value,
        content: contentInput.value,
        imageUrl: imageUrl
    }
    let result = await fetch("/rest/notes", {
        method: "POST",
        body: JSON.stringify(note)
        
    });
    
    notes.push(note);

    console.log(await result.text())
    
}

async function updateNote(e) {
    e.preventDefault();
    let imageUrl = null;

    let files = document.querySelector('input[type=file]').files;
    console.log('How many files are uploaded: ', files.length);
    if (!files.length == 0) {

    let formData = new FormData();

    for(let file of files) {

        formData.append('files', file, file.name);

    }

    let uploadResult = await fetch('/api/file-upload', {

        method: 'POST',

        body: formData

    });

   imageUrl = await uploadResult.text();

} 

   console.log('URL', imageUrl);

    let titleInput = document.querySelector("#title");
    let contentInput = document.querySelector("#content");

    let note = {
        title: titleInput.value,
        content: contentInput.value,
        id: editNoteId,
        imageUrl: imageUrl
    }
    let result = await fetch("/rest/notes", {
        method: "PUT",
        body: JSON.stringify(note)
        
    });
    
    notes.push(note);

    console.log(await result.text())
    renderNotes();
}
