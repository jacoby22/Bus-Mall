var imageObjects = [];
var imageNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

function Img(name) {
  this.name = name;
  this.source = 'assets/' + name + '.jpg';
  this.value = 0;
  this.appearances = 0;
  imageObjects.push(this);
}

Img.prototype.clearValues = function () {
  this.appearances = 0;
  this.value = 0;
};

function instantiateImageObjects() {
  for(index in imageNames) {
    imageObjects[index] = new Img(imageNames[index]);
  }
}

instantiateImageObjects();

var tracker = {
  totalClicks: 0,
  currentImages: [],
  allTotalValues: [],
  currentImage: null,
  img1: document.getElementById('image1'),
  img2: document.getElementById('image2'),
  img3: document.getElementById('image3'),
  getRandomNum: function() {
    randomValue = Math.floor(Math.random() * imageNames.length);
    return randomValue;
  },
  getImage: function() {
    this.getRandomNum();
    this.currentImage = imageObjects[randomValue];
    return this.currentImage;
  },
  fillCurrentImages: function() {
    this.getImage();
    var counter = 0;
    this.currentImages.push(this.currentImage);
    while (counter < 2) {
      this.getImage();
      if (this.currentImages.indexOf(this.currentImage) === -1) {
        this.currentImages.push(this.currentImage);
        counter += 1;
      }
    }
  },
  displayCurrentImages: function() {
    this.img1.src = this.currentImages[0].source;
    this.img2.src = this.currentImages[1].source;
    this.img3.src = this.currentImages[2].source;
    this.img1.name = this.currentImages[0].name;
    this.img2.name = this.currentImages[1].name;
    this.img3.name = this.currentImages[2].name;
  },
  countImageAppearance: function() {
    this.currentImages[0].appearances += 1;
    this.currentImages[1].appearances += 1;
    this.currentImages[2].appearances += 1;
  },
  clearCurrentImages: function() {
    this.currentImages = [];
  },
  newSetOfImages: function() {
    this.clearCurrentImages();
    this.fillCurrentImages();
    this.displayCurrentImages();
    this.countImageAppearance();
  },
  zeroOutImageObjects: function() {
    for (var index in imageObjects) {
      imageObjects[index].value = 0;
      imageObjects[index].appearances = 0;
    }
  },
  show: function(id) {
    var display = document.getElementById(id);
    display.style.display = 'block';
  },
  hide: function(id) {
    var display = document.getElementById(id);
    display.style.display = 'none';
  },
  clearAllData: function() {
    for (var index in imageObjects) {
      imageObjects[index].value = 0;
      imageObjects[index].appearances = 0;
    }
  },
  showClickTotal: function() {
    var clickTotal = document.getElementById('clickTotal');
    clickTotal.textContent = 'Total Clicks: ' + tracker.totalClicks;
    clickTotal.style.display = 'block';
  },
  fillTotalValues: function() {
    for (var index in imageObjects) {
      this.allTotalValues[index] = imageObjects[index].value;
    }
  }
};

var handleClick = function() {
  var imgName = event.target.name;
  addToImgValue(imgName);
  tracker.totalClicks += 1;
  checkUserClicks();
  if (imgName) {
    tracker.newSetOfImages();
  }
};

var addToImgValue = function(imgName) {
  var indexValue = imageNames.indexOf(imgName);
  var imgObject = imageObjects[indexValue];
  imgObject.value += 1;
};

var checkUserClicks = function() {
  if (tracker.totalClicks > 2) {
    button1.removeEventListener('click', handleClick);
    fillListWithData();
    tracker.fillTotalValues();
    showResultsButton();
  }
};

var fillListWithData = function() {
  for (var j = 1; j < imageObjects.length + 1; j++) {
    var listEl = document.getElementById('' + j);
    listEl.textContent = imageObjects[j - 1].name + ': ' + imageObjects[j - 1].value;
  }
};

var showResults = function() {
  makeChart();
};

var showResultsButton = function() {
  tracker.show('showResults');
};

var resetImageTest = function() {
  tracker.totalClicks = 0;
  tracker.newSetOfImages();
  tracker.clearAllData();
  button1.addEventListener('click', handleClick);
  tracker.hide('ul');
  tracker.hide('showResults');
  tracker.hide('clickTotal');
};

var button1 = document.getElementById('section');
var button4 = document.getElementById('showResults');
var button5 = document.getElementById('resetImageTest');

button1.addEventListener('click', handleClick);
button4.addEventListener('click', showResults);
button5.addEventListener('click', resetImageTest);

var makeChart = function() {
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: imageNames,
      datasets: [{
        label: '# of Votes',
        axisX: {
          fontSize: 20
        },
        data: tracker.allTotalValues,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Number of Votes for Each Image',
        fontSize: 20
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      }
    }
  });
};

tracker.newSetOfImages();
