var percentages = [];
var imageObjects = [];
var imageNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

function Img(name, value, appearances) {
  this.name = name;
  this.source = 'assets/' + name + '.jpg';
  this.value = value;
  this.appearances = appearances;
  imageObjects.push(this);
}

var instantiateImageObjects = function() {
  for(index in imageNames) {
    imageObjects[index] = new Img(imageNames[index], 0, 0);
  }
};

var tracker = {
  totalClicks: 0,
  currentImages: [],
  allTotalValues: [],
  currentImage: null,
  sampleSize: 5,
  img1: document.getElementById('image1'),
  img2: document.getElementById('image2'),
  img3: document.getElementById('image3'),
  button1: document.getElementById('section'),
  button4: document.getElementById('showResults'),
  button5: document.getElementById('resetImageTest'),
  ctx: document.getElementById('myChart').getContext('2d'),
  ctx2: document.getElementById('myChart2').getContext('2d'),
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
    var counter = 1;
    this.currentImages[0] = this.currentImage;
    while (counter < 3) {
      this.getImage();
      if (this.currentImages.indexOf(this.currentImage) === -1) {
        this.currentImages[counter] = this.currentImage;
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
  newSetOfImages: function() {
    this.fillCurrentImages();
    this.displayCurrentImages();
    this.countImageAppearance();
  },
  show: function(id) {
    var display = document.getElementById(id);
    display.style.display = 'block';
  },
  fillTotalValues: function() {
    for (var index in imageObjects) {
      tracker.allTotalValues[index] = imageObjects[index].value;
      percentages[index] = parseFloat(((imageObjects[index].value / imageObjects[index].appearances) * 100).toFixed(2));
    }
  },
  showResults: function() {
    tracker.makeChart(imageNames, tracker.allTotalValues, tracker.ctx, 'Number of Votes for Each Image', '# of Votes');
    tracker.makeChart(imageNames, percentages, tracker.ctx2, 'Percentage Picked When Image Displayed', 'Percentage');
    tracker.stringifyForLocalStorage();
    tracker.parseFromLocalStorage();
  },
  addToImgValue: function(imgName) {
    var indexValue = imageNames.indexOf(imgName);
    var imgObject = imageObjects[indexValue];
    imgObject.value += 1;
  },
  resetImageTest: function() {
    tracker.totalClicks = 0;
    location.reload();
  },
  checkUserClicks: function() {
    if (tracker.totalClicks > tracker.sampleSize - 1) {
      tracker.button1.removeEventListener('click', tracker.handleClick);
      tracker.fillTotalValues();
      tracker.showResultsButton();
    }
  },
  stringifyForLocalStorage: function() {
    var stringify = JSON.stringify(imageObjects);
    localStorage.setItem('images', stringify);
  },
  parseFromLocalStorage: function() {
    var parse = JSON.parse(localStorage.getItem('images'));
    return parse;
  },
  associateWithTracker: function(parse) {
    for (var object in parse) {
      imageObjects[object] = new Img(parse[object].name, parse[object].value, parse[object].appearances);
    }
  },
  handleClick: function() {
    var imgName = event.target.name;
    tracker.addToImgValue(imgName);
    tracker.totalClicks += 1;
    tracker.checkUserClicks();
    if (imgName) {
      tracker.newSetOfImages();
    }
  },
  showResultsButton: function() {
    tracker.show('showResults');
  },
  makeChart: function(labels, data, elem, title, key) {
    var myChart = new Chart(elem, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: key,
          axisX: {
            fontSize: 20
          },
          data: data,
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
          text: title,
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
  }
};

tracker.button1.addEventListener('click', tracker.handleClick);
tracker.button4.addEventListener('click', tracker.showResults);
tracker.button5.addEventListener('click', tracker.resetImageTest);

(function() {
  if (localStorage.images) {
    var parse = tracker.parseFromLocalStorage();
    console.log('parsed');
    tracker.associateWithTracker(parse);
    tracker.newSetOfImages();
  } else {
    instantiateImageObjects();
    tracker.newSetOfImages();
  }
})();
