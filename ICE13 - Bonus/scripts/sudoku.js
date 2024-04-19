// board data
// -1 is a placeholder for representing empty & editable cells
let boardData = [
   -1,  1, -1, -1, -1, -1, -1,  9, -1,
   -1, -1,  4, -1, -1, -1,  2, -1, -1,
   -1, -1,  8, -1, -1,  5, -1, -1, -1,
   -1, -1, -1, -1, -1, -1, -1,  3, -1,
    2, -1, -1, -1,  4, -1,  1, -1, -1,
   -1, -1, -1, -1, -1, -1, -1, -1, -1,
   -1, -1,  1,  8, -1, -1,  6, -1, -1,
   -1,  3, -1, -1, -1, -1, -1,  8, -1,
   -1, -1,  6, -1, -1, -1, -1, -1, -1
];
let board;  // the game board element
let cols;
let valid = true; // valid state of the board
let boards = []; // array to hold player boards each move
let palette; // number selection palette
let selected; // selected number
let rows = [];


/**
 * checks to see if the value exists in the block
 * @param {*} x1 
 * @param {*} y1 
 * @param {*} x2 
 * @param {*} y2 
 * @returns boolean
 */
function sameBlock(x1, y1, x2, y2) {
   let firstRow = Math.floor(y1 / 3) * 3;
   let firstCol = Math.floor(x1 / 3) * 3;
   return (y2 >= firstRow && y2 <= (firstRow + 2) && x2 >= firstCol && x2 <= (firstCol + 2));
}

/**
 * checks to see if the value exists in the same row
 * @param {*} x1 
 * @param {*} y1 
 * @param {*} x2 
 * @param {*} y2 
 * @returns boolean
 */
function sameRow(y1, y2) {
   return y1 == y2;
}

/**
 * checks to see if the value exists in the same column
 * @param {*} x1 
 * @param {*} y1 
 * @param {*} x2 
 * @param {*} y2 
 * @returns boolean
 */
function sameColumn(x1, x2) {
   return x1 == x2;
}


function addToBoard() {
   // Save a copy of the entire board state in the boards array
   boards.push([...boardData]);

   let td = $(this);
   let id = td.attr('id'); // get the id from the cell

   let x = parseInt(id.split('_')[0]); // Update to get the column number (x value) from the cell id.
   let y = parseInt(id.split('_')[1]); // Update to get the row number (y value) from the cell id.

   if (selected != null && td.find('span').text() === '') {
      // If there is a number selection
      let span = document.createElement('span');

      // Check if the selected number already exists in the same row
      for (let i = 0; i < 9; i++) {
         if (boardData[boardPosition(i, y)] == selected) {
            td.addClass('error');
            return; // Exit function if number already exists in the row
         }
      }

      // Check if the selected number already exists in the same column
      for (let i = 0; i < 9; i++) {
         if (boardData[boardPosition(x, i)] == selected) {
            td.addClass('error');
            return; // Exit function if number already exists in the column
         }
      }

      // Check if the selected number already exists in the same block
      let firstRow = Math.floor(y / 3) * 3;
      let firstCol = Math.floor(x / 3) * 3;
      for (let i = firstRow; i < firstRow + 3; i++) {
         for (let j = firstCol; j < firstCol + 3; j++) {
            if (boardData[boardPosition(j, i)] == selected) {
               td.addClass('error');
               return; // Exit function if number already exists in the block
            }
         }
      }

      // If the selected number is valid, proceed to add it to the board
      td.removeClass('error');
      // Set selected value in the span
      span.innerText = selected;
      // Insert the span to the cell
      td.append(span);
      // Update boardData array
      boardData[boardPosition(x, y)] = selected;

   } else {
      // Show element with id noSelectionError 
      $('#noSelectionError').show();
   }
}

function boardPosition(x, y) {
   return y * 9 + x;
}

function undo() {
   // TODO: revert back to previous state
   // hint: set the board html to the last saved state
   if (boards.length > 0) {
      let previousBoard = boards.pop();
      boardData = previousBoard.slice();
      // Update the board HTML to the last saved state
      for (let i = 0; i < 81; i++) {
         let val = boardData[i];
         let cell = cols.eq(i);
         let span = cell.find('span');
         if (val > 0) {
            span.text(val);
            cell.addClass('disabled');
         } else {
            span.text('');
            cell.removeClass('disabled');
         }
         cell.removeClass('error');
      }
   }
}

$(document).ready(function() {
   // init globals
   board = $('#board'); // get the game board
   palette = $('#palette');   // get the number selection palette

   // generate game board
   for(let colNum = 0, td, tr, val; colNum < 9; colNum++){
      tr = document.createElement('tr');

      for (let rowNum = 0; rowNum < 9; rowNum++) {
         val = boardData[boardPosition(rowNum, colNum)];
         td = document.createElement('td');

         // assign id to cell with row/column number so it is easy to lookup
         td.id = rowNum + '_' + colNum;

         let span = document.createElement('span');
         if (val > 0) {
            span.append(val);
            td.className = 'disabled';
         }

         td.append(span);
         tr.append(td);
      }

      board.append(tr);
      palette.append('<li>' + (colNum + 1) + '</li>');

      rows = $('#board tr');  // get all game board rows
      cols = $('#board tr td');  // get all game board columns
   }

   // generate number selection palatte 
   $( "<div id=\"noSelectionError\" class=\"error-text\" style=\"display: none\">\n" +
       "       Please select a number below to add to the board\n" +
       "   </div>" ).insertBefore( "#palette" );
   palette.append('<li id="undo" onclick="undo()"><img src="./images/undo.png" /></li>');

   // TODO initialize board cell click event to addToBoard
   console.log(cols.length);
   cols.click(addToBoard);
   $('#0_0').click(function() { console.log('Cell clicked'); });
   // TODO initialize number selection palette to
   palette.children('li').click(function() {
      // - remove class of the previously selected number with class 'selected'
      palette.children('li.selected').removeClass('selected');
      // - store a number in the appropriate variable
      selected = parseInt($(this).text());
      // - update class of the selected number to 'selected'
      $(this).addClass('selected');
      // Hide noSelectionError if visible
      $('#noSelectionError').hide();
   });
});
