let incidenceMatrix = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]
];

let adjacencyMatrix = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
];

let rowCount, columnCount;

const tableIncidenceMatrix = document.getElementsByTagName('table')[0];
const tableAdjacencyMatrix = document.getElementsByTagName('table')[1];

document.getElementsByTagName('button')[0].addEventListener('click', function(){
    let topCount = document.getElementById('top-count').value;
    let edgeCount = document.getElementById('edge-count').value; 
    if(topCount > 0 && edgeCount > 0){
        rowCount = Number(topCount);
        columnCount = Number(edgeCount);
        makeRowsIncidenceMatrix();
    }
});

document.getElementsByTagName('button')[1].addEventListener('click', function(){
    for(let rowIndex = 1; rowIndex < rowCount + 1; rowIndex++){
        for(let columnIndex = 1; columnIndex < columnCount + 1; columnIndex++){
            if(Number(tableIncidenceMatrix.rows[rowIndex].cells[columnIndex].innerHTML) === 1){
                incidenceMatrix[rowIndex - 1][columnIndex - 1] = 1;
            }
        }
    }
    getAdjacencyMatrix();
})

function getAdjacencyMatrix(){ 
       for(let columnIndex = 0; columnIndex < columnCount; columnIndex++){
           let oneEnd = -1, anotherEnd = -1;
           for(let rowIndex = 0; rowIndex < rowCount; rowIndex++){
               if(incidenceMatrix[rowIndex][columnIndex] === 1){
                    if(oneEnd === -1){
                        oneEnd = rowIndex;
                    }
                    else{
                        anotherEnd = rowIndex;
                    }
               }
           }
           adjacencyMatrix[oneEnd][anotherEnd] = 1;
           adjacencyMatrix[anotherEnd][oneEnd] = 1;
       }
       makeRowsAdjacencyMatrix();
    } 
    
function makeRowsIncidenceMatrix(){
    let tHeader = tableIncidenceMatrix.createTHead();
    let row = tHeader.insertRow(0);
    for(let position = 0; position < columnCount + 1; position++){
        let cell = row.appendChild(document.createElement('th'));
        if(position !== 0){
            cell.innerHTML = 'e<sub>' + position + '</sub>';
        }
    }    

    let tBody = tableIncidenceMatrix.appendChild(document.createElement('tbody'))
    for(let rowPosition = 0; rowPosition < rowCount; rowPosition++){
        let row = tBody.insertRow(rowPosition);
        for(let columnPosition = 0; columnPosition < columnCount + 1; columnPosition++){
            let cell = row.insertCell(columnPosition);
            if(columnPosition != 0){
                cell.innerHTML = '0';
                cell.setAttribute('contenteditable', 'true');
                cell.classList.add('editable-cell');
            }
            else{
                let index = rowPosition + 1;
                cell.innerHTML = 'V<sub>' + index + '</sub>';
            }
        }
    }
    document.getElementById('incidence-matrix').style.display = 'block';
}    

function makeRowsAdjacencyMatrix(){
    
    let tHeader = tableAdjacencyMatrix.createTHead();
    let row = tHeader.insertRow(0);
    for(let position = 0; position < rowCount + 1; position++){
        let cell = row.appendChild(document.createElement('th'));
        if(position !== 0){
            cell.innerHTML = 'V<sub>' + position + '</sub>';
        }
    }    

    let tBody = tableAdjacencyMatrix.appendChild(document.createElement('tbody'))
    for(let rowPosition = 0; rowPosition < rowCount; rowPosition++){
        let row = tBody.insertRow(rowPosition);
        for(let columnPosition = 0; columnPosition < rowCount + 1; columnPosition++){
            let cell = row.insertCell(columnPosition);
            if(columnPosition != 0){
                cell.innerHTML = adjacencyMatrix[rowPosition][columnPosition - 1];
            }
            else{
                let index = rowPosition + 1;
                cell.innerHTML = 'V<sub>' + index + '</sub>';
            }
        }
    }
    document.getElementById('adjacency-matrix').style.display = 'block';
}    