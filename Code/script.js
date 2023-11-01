const fileInput = document.getElementById('jsonFileInput');
const btn = document.querySelector(".btn");

btn.addEventListener('click', handleFile);

function handleFile() {
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const fileContent = event.target.result;
      const linesArray = fileContent.split('\n');
      const jsonArray = [];
      linesArray.forEach((line) => {
        try {
          const jsonObj = JSON.parse(line);
          jsonArray.push(jsonObj);
          document.getElementById("output").innerHTML = "";
        } catch (error) {
          document.getElementById("output").innerHTML = "Error parsing JSON:"+error;
        }
      });
      convertToColumnar(jsonArray);
    };
    reader.readAsText(file);
  }
}

var columns = {};

function jsonToColumn(value, colName) {
  var result = Object.entries(value);
  result.forEach(res => {
    var key = colName + "." + res[0];
    const value = res[1];
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      if (!columns[key]) {
        columns[key] = [];
      }
      columns[key].push(value);
    }
    else if (value === null || value === "") {
      if (!columns[key]) {
        columns[key] = [];
      }
      columns[key].push('');
    }
    else {
      jsonToColumn(value, key);
    }
  });
}

function convertToColumnar(logData) {
  logData.forEach(logEntry => {
    const keys = Object.keys(logEntry);
    keys.forEach(key => {
      const value = logEntry[key];
      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        if (!columns[key]) {
          columns[key] = [];
        }
        columns[key].push(value);
      }
      else if (value === null || value === "") {
        if (!columns[key]) {
          columns[key] = [];
        }
        columns[key].push('');
      } else {
        jsonToColumn(value, key);
      }
    });
  });
  Object.keys(columns).forEach(columnName => {
    const columnData = columns[columnName].join('\n');
    console.log(columnData);
    const blob = new Blob([columnData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = columnName + '.column' + '.txt';
    downloadLink.click();
  });
  columns = {};
}