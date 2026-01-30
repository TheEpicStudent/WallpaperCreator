//creatorJS.js

const { text } = require("body-parser");

// AI usage: inline suggestions only
lastposx = '100px';
lastposy = '100px';
let centerX = 0;
let centerY = 0;
originalposx = '100px';
originalposy = '100px';
let distance = 10;
let number = 1;
let done = false;
let leftside = document.getElementById('contentsLeft');
document.getElementById('edith1').style.display = 'none';
document.getElementById('editp').style.display = 'none';


document.getElementById('edith1').style.display = 'none';
document.getElementById('editp').style.display = 'none';



window.addEventListener("beforeunload", (event) => {
    const hasUnsavedChanges = true; 
    if (hasUnsavedChanges) {
        event.preventDefault(); 
    }
});

function tabOpen(tab) {
    try {
    if (tab === 'screenSize') {
        leftside.innerHTML = `
        <h1>Device Type</h1>
        <p>Select your device type from the list below.</p>
        <p><b>Not all devices on the list will work. I have implemented most Apple iPhones so far, but more devices will be added soon.</b></p>
        <br>
            <select id="screenselect" onchange="updateScreenSize()">
                <option>Loading...</option>
            </select>

        <!-- <button onclick="detectScreenSize();">Detect Screen Size</button> -->
        `;

        fetch('/json/screenlist.json')
                .then(response => response.json())
                .then(data => {
                    const select = document.getElementById('screenselect');
                    select.innerHTML = '';
                    data.forEach(screen => {
                        const option = document.createElement('option');
                        const backID = screen.replace(/\s+/g, '').toLowerCase();
                        option.value = backID;
                        option.textContent = screen;
                        select.appendChild(option);
                    });
                });
        
        

    } else if (tab === 'templates') {
        leftside.innerHTML = `
        <h1>Templates</h1>
            <p>Go ahead, select a template to get started.</p>
            <div class="lazyverticalstack">
                <div class="lazyhorizontalstack">
                    <div class="templatecard">
                        <p>Template 1</p>
                        <img class="templatepreview" src="images/templates/template1.png" alt="Template 1 Preview">
                        <button>Select</button>
                    </div>
                    <div class="templatecard">
                        <p>Template 2</p>
                        <img class="templatepreview" src="images/templates/template2.png" alt="Template 2 Preview">
                        <button>Select</button>
                    </div>
                </div>
                <div class="lazyhorizontalstack">
                    <div class="templatecard">
                        <p>Template 3</p>
                        <img class="templatepreview" src="images/templates/template3.png" alt="Template 3 Preview">
                        <button>Select</button>
                    </div>
                    <div class="templatecard">
                        <p>Template 4</p>
                        <img class="templatepreview" src="images/templates/template4.png" alt="Template 4 Preview">
                        <button>Select</button>
                    </div>
                    </div>
            </div>
        `;
    } else if (tab === 'background') {
        leftside.innerHTML = `
        <h1 onload="checkBG();">Background</h1>
            <p>Choose the color of your wallpaper background here.</p>
            <div class="lazyhorizontalstack">
            <label for="bgcolorpicker">Select Color</label>
            <input type="color" id="bgcolorpicker" onchange="document.getElementById('screen').style.backgroundColor = this.value;document.getElementById('screen').style.backgroundImage = 'none'; value='#ffffff';checkBG();" style="display: none;">
            <circle id="bgcolorshow"> </circle>
            </div>
            <br>
            <p>Or use an image here.</p>
            <label for="bgimagepicker">Upload Image</label>
            <input type="file" id="bgimagepicker" accept="image/*" onchange="document.getElementById('screen').style.backgroundImage = 'url(' + window.URL.createObjectURL(this.files[0]) + ')';document.getElementById('screen').style.backgroundSize = 'cover';document.getElementById('screen').style.backgroundColor = 'transparent';document.getElementById('screen').style.backgroundPosition = 'center';checkBG();" style="display: none;">
            <div id="ranges">
            <p style="display:none;">Adjust image position:</p>
            <br>
            <input type="range" id="bgimageposX" min="0" max="100" value="50" onchange="document.getElementById('screen').style.backgroundPositionX = this.value + '%';checkBG();" style="display:none;">
            <sub style="display:none;">Horizontal position</sub>
            <br>
            <input type="range" id="bgimageposY" min="0" max="100" value="50" onchange="document.getElementById('screen').style.backgroundPositionY = this.value + '%';checkBG();" style="display:none;">
            <sub style="display:none;">Vertical position</sub>
            </div>
        `;
    } else if (tab === 'welcome') {
        leftside.innerHTML = `
        <h1>Welcome to the Wallpaper Creator!</h1>
            <p>First, select the Device Type button from the toolbar to your left.</p>
            <p>Then you can start designing your wallpaper, or select a template to get started quickly.</p>
            <br>
            <p>Enjoy!</p>
        `;
    } else if (tab === 'text') {
        
        
        leftside.innerHTML = `
        <h1 id="texth1">Add Text</h1>
            <input type="text" id="textinput" placeholder="Enter your text here">
            <button onclick="addText(); done=true; console.log('clicked');" id="addTextButton">Add Text</button>
            <h1 id="edith1">Edit Text</h1>
            <br>
            <p id="editp">Click where you want the text to be.</p>
            <p id="editcolordesc">Change text color:</p>
            <div class="lazyhorizontalstack">
            <label for="textcolorpicker" id="textcolorlabel">Select Color</label>
            <input type="color" id="textcolorpicker" onchange="document.getElementById('text' + (number - 1)).style.color = this.value;" style="margin-bottom: 10px; display:none;">
            <circle id="textcolorshow">
            </div>
            <br>
            <p id="editsizedesc">Change text size:</p>
            <input type="number" id="textsizepicker" min="8" max="100" value="24" onchange="document.getElementById('text' + (number - 1)).style.fontSize = this.value + 'px';">
            <p id="editposdesc">Adjust text position:</p>
            <button onclick="moveText('up')" id="moveUpButton" style="border-radius:5px 5px 0 0">↑</button>
            <div class="lazyhorizontalstack" style="padding:0;">
            <button onclick="moveText('left')" id="moveLeftButton" style="margin-top:0; border-radius:5px 0 0 5px">←</button>
            <button onclick="moveText('right')" id="moveRightButton" style="margin-top:0; border-radius:0 5px 5px 0">→</button>
            </div>
            <button onclick="moveText('down')" id="moveDownButton" style="margin-top:0; border-radius:0 0 5px 5px">↓</button>
            <br>
            <div class="lazyhorizontalstack" style="align-items:center;">
            <p id="selectTextElementDesc">Select Text Element:</p>
            <input type="number" id="textselector" min="0" value="1" style="width:50px;" onchange="console.log('Selected text element ' + this.value);">
            </div>
            <br>
            <div class="lazyhorizontalstack" style="align-items:center;">
            <p id="preciseMoveDesc">Precise Movement:</p>
            <input type="checkbox" id="preciceMove" >
            </div>
            <br>
            <button onclick="resetTextPosition();" id="resetTextPositionButton">Reset Text Position</button>
            <button onclick="deleteText();" id="deleteTextButton">Delete Text Element</button>

            `;
            // im bouta crash out
        document.getElementById('edith1').style.display = 'none';
        document.getElementById('editp').style.display = 'none';
        document.getElementById('textcolorpicker').style.display = 'none';
        document.getElementById('textcolorpicker').style.display = 'none';
        document.getElementById('textcolorshow').style.display = 'none';
        document.getElementById('textcolorlabel').style.display = 'none';
        document.getElementById('editsizedesc').style.display = 'none';
        document.getElementById('editcolordesc').style.display = 'none';
        document.getElementById('textsizepicker').style.display = 'none';
        document.getElementById('editposdesc').style.display = 'none';
        document.getElementById('moveLeftButton').style.display = 'none';
        document.getElementById('moveRightButton').style.display = 'none';
        document.getElementById('moveUpButton').style.display = 'none';
        document.getElementById('moveDownButton').style.display = 'none';
        document.getElementById('textselector').style.display = 'none';
        document.getElementById('preciceMove').style.display = 'none';
        document.getElementById('selectTextElementDesc').style.display = 'none';
        document.getElementById('preciseMoveDesc').style.display = 'none';
        document.getElementById('resetTextPositionButton').style.display = 'none';
        document.getElementById('deleteTextButton').style.display = 'none';
        
    }


} catch (error) {
    console.error('Error loading tab content:', error);
    
}
}

function updateScreenSize() {
    const select = document.getElementById('screenselect');
    const selectedValue = select.value;
    const screen = document.getElementById('screen');
    const backID = selectedValue.replace(/\s+/g, '').toLowerCase();
    fetch('/json/screens.json')
        .then(response => response.json())
        .then(data => {
            const screenData = data.find(screen => screen.backID === backID);
            screen.style.width = screenData.width / 4 + 'px';
            screen.style.height = screenData.height / 4 + 'px';
        });
    
    console.log('Selected screen size:', selectedValue);
    
}


function detectScreenSize() {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const screen = document.getElementById('screen');
            screen.style.width = width / 2 + 'px';
            screen.style.height = height / 2 + 'px';
            console.log('Detected screen size:', width, 'x', height);
}

function checkBG() {
                if (document.getElementById('screen').style.backgroundImage === 'none') {
                    document.getElementById('bgimageposY').style.display = 'none';
                    document.getElementById('bgimageposX').style.display = 'none';
                    document.getElementById('ranges').style.display = 'none';
                    document.getElementById('bgcolorshow').style.backgroundColor = document.getElementById('screen').style.backgroundColor;
                    console.log('false')
                } else {
                    document.getElementById('bgimageposX').style.display = 'block';
                    document.getElementById('bgimageposY').style.display = 'block';
                    document.getElementById('ranges').style.display = 'block';
                    document.getElementById('bgcolorshow').style.backgroundColor = document.getElementById('screen').style.backgroundColor;
                    console.log('true')
                }
            }
            function updateImagePositionX() {
                document.getElementById('screen').style.backgroundPositionX = document.getElementById('bgimageposX').value + '%';
            }
            function updateImagePositionY() {
                document.getElementById('screen').style.backgroundPositionY = document.getElementById('bgimageposY').value + '%';
            }
            document.getElementById('bgimageposX').addEventListener('input', updateImagePositionX);
            document.getElementById('bgimageposY').addEventListener('input', updateImagePositionY);





function toggleDarkmode() {
    document.body.classList.toggle('darkmode');
    const darkmodeButton = document.getElementById('darkmodeButton');
    if (document.body.classList.contains('darkmode')) {
        darkmodeButton.textContent = 'Switch to Light Mode';
        document.getElementById('stylesheet').href = 'darkstyle.css';
    } else {
        darkmodeButton.textContent = 'Switch to Dark Mode';
        document.getElementById('stylesheet').href = 'style.css';
    }
}



function editText() {
                    document.getElementById('texth1').style.display = 'none';
                    document.getElementById('textinput').style.display = 'none';
                    document.getElementById('addTextButton').style.display = 'none';
                    document.getElementById('edith1').style.display = 'block';
                    document.getElementById('editp').style.display = 'block';

                    const screen = document.getElementById('screen');
                    screen.addEventListener('click', function(event) {
                        const x = event.clientX;
                        const y = event.clientY;
                        const textElements = document.getElementById("text" + (number - 1));
                        if (textElements) {
                            textElements.style.left = x + 'px';
                            textElements.style.top = y + 'px';
                        }
                        if (done) {
                            document.getElementById('texth1').style.display = 'block';
                            document.getElementById('textinput').style.display = 'block';
                            document.getElementById('addTextButton').style.display = 'block';
                            document.getElementById('edith1').style.display = 'none';
                            document.getElementById('editp').style.display = 'none';
                            document.getElementById('edith1').style.display = 'none';
                            document.getElementById('editp').style.display = 'none';
                            document.getElementById('textcolorpicker').style.display = 'none';
                            document.getElementById('selectTextElementDesc').style.display = 'block';
                            document.getElementById('preciseMoveDesc').style.display = 'block';
                            document.getElementById('textselector').value = number - 1;
                            document.getElementById('resetTextPositionButton').style.display = 'block';
                            document.getElementById('deleteTextButton').style.display = 'block';
                            document.getElementById('textcolorshow').style.display = 'block';
                            document.getElementById('textcolorlabel').style.display = 'block';
                            document.getElementById('editsizedesc').style.display = 'block';
                            document.getElementById('editcolordesc').style.display = 'block';
                            document.getElementById('textsizepicker').style.display = 'block';
                            document.getElementById('editposdesc').style.display = 'block';
                            document.getElementById('moveLeftButton').style.display = 'block';
                            document.getElementById('moveRightButton').style.display = 'block';
                            document.getElementById('moveUpButton').style.display = 'block';
                            document.getElementById('moveDownButton').style.display = 'block';
                            document.getElementById('textselector').style.display = 'block';
                            document.getElementById('preciceMove').style.display = 'block';
                            screen.removeEventListener('click', arguments.callee);
                            originalposx = document.getElementById("text" + (number - 1)).style.left;
                            originalposy = document.getElementById("text" + (number - 1)).style.top;
                            done = false;
                            
                        }
                    });
                }

function addText() {
    const textValue = document.getElementById('textinput').value;
    const textElement = document.createElement('p');
    textElement.innerText = textValue;
    textElement.style.position = 'absolute';
    textElement.style.justifySelf = 'center';
                    textElement.style.alignSelf = 'center';
                    textElement.style.color = 'black';
                    textElement.style.fontSize = '24px';
                    
                    textElement.id = "text" + number;
                    number++;
                    document.getElementById('screen').appendChild(textElement);
                    editText();
                }
function checkScreenBounds() {
    let id = 'text' + document.getElementById('textselector').value;
    let screenbounds = document.getElementById('screen').getBoundingClientRect();
    let textbounds = document.getElementById(id).getBoundingClientRect();
    if (textbounds.left < screenbounds.left) {
        document.getElementById(id).style.left = lastposx;
    } else if (textbounds.right > screenbounds.right) {
        document.getElementById(id).style.left = lastposx;
    } else if (textbounds.top < screenbounds.top) {
        document.getElementById(id).style.top = lastposy;
    } else if (textbounds.bottom > screenbounds.bottom) {
        document.getElementById(id).style.top = lastposy; 
    }
    if (textbounds.left >= screenbounds.left && textbounds.right <= screenbounds.right && textbounds.top >= screenbounds.top && textbounds.bottom <= screenbounds.bottom) {
        lastposx = document.getElementById(id).style.left;
        lastposy = document.getElementById(id).style.top;
    }

}




function moveText(direction) {
 if (document.getElementById('preciceMove').checked) {
    distance = 1;
 } else {
    distance = 10;
 }
 let id = 'text' + document.getElementById('textselector').value;
 if (document.getElementById(id).style.left == null || document.getElementById(id).style.top == null) {
    document.getElementById(id).style.left = '10px';
    document.getElementById(id).style.top = '10px';
 }
lastposx = document.getElementById(id).style.left;
lastposy = document.getElementById(id).style.top;
 if (direction === 'left') {
        document.getElementById(id).style.left = parseInt(document.getElementById(id).style.left) - distance + 'px';
        console.log('moved left');
    } else if (direction === 'right') {
        document.getElementById(id).style.left = parseInt(document.getElementById(id).style.left) + distance + 'px';
        console.log('moved right');
    } else if (direction === 'up') {
        document.getElementById(id).style.top = parseInt(document.getElementById(id).style.top) - distance + 'px';
    } else if (direction === 'down') {
        document.getElementById(id).style.top = parseInt(document.getElementById(id).style.top) + distance + 'px';
    }
    checkScreenBounds();
}



function deleteText() {
    let id = 'text' + document.getElementById('textselector').value;
    const textElement = document.getElementById(id);
    textElement.parentNode.removeChild(textElement);
}
function getCenter() {
    const element = document.getElementById("screen");
    const rect = element.getBoundingClientRect();

    centerX = rect.left + rect.width / 2;
    centerY = rect.top + rect.height / 2;

    console.log(`Center coordinates: (${centerX}, ${centerY})`);
}


function resetTextPosition() {
    getCenter();
    let id = 'text' + document.getElementById('textselector').value;
    document.getElementById(id).style.left = centerX + 'px';
    document.getElementById(id).style.top = centerY + 'px';
}

/* 
GOing unused for now bc i dont wanna deal with it

from w3schools https://www.w3schools.com/howto/howto_js_draggable.asp

dragElement(document.getElementById(""));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
} */