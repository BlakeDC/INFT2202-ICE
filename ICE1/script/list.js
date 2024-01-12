// ADDING ITEMS TO START AND END OF LIST
// Get the <ul> element
var ulElement = document.querySelector('ul');

// ADD NEW ITEM TO END OF LIST
// Create element
var newLiElementEnd = document.createElement('li');
// Create text node
var textNodeEnd = document.createTextNode('Pizza');
// Add text node to element
newLiElementEnd.appendChild(textNodeEnd);
// Add element end of list
ulElement.appendChild(newLiElementEnd);

// ADD NEW ITEM START OF LIST
// Create element
var newLiElementStart = document.createElement('li');
// Create text node
var textNodeStart = document.createTextNode('bread');
// Add text node to element
newLiElementStart.appendChild(textNodeStart);
// Add element to list at the beginning
ulElement.insertBefore(newLiElementStart, ulElement.firstChild);



// All <li> elements

// ADD A CLASS OF COOL TO ALL LIST ITEMS
// Counter variable
var allLiElements = document.querySelectorAll('li');
// Loop through elements
for (var i = 0; i < allLiElements.length; i++) {

    // Change class to cool
    allLiElements[i].classList.add('cool');
}

// ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING
// h2 element
// h2 text
var h2Element = document.querySelector('h2');
// No. of <li> elements
var numberOfItems = allLiElements.length;
// Content
// Update h2 using innerHTML (not textContent) because it contains markup
h2Element.innerHTML = 'Buy groceries - ' + numberOfItems + ' items';