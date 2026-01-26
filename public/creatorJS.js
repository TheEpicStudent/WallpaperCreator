//creatorJS.js
// AI usage: inline suggestions only

let leftside = document.getElementById('contentsLeft');

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