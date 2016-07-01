var imageObjects = [];
var imageNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

function Img(name) {
  this.name = name;
  this.source = 'assets/' + name + '.jpg';
  this.value = 0;
  this.appearances = 0;
  imageObjects.push(this);
}

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
  sampleSize: 15,
  img1: document.getElementById('image1'),
  img2: document.getElementById('image2'),
  img3: document.getElementById('image3'),
  button1: document.getElementById('section'),
  button4: document.getElementById('showResults'),
  button5: document.getElementById('resetImageTest'),
  ctx: document.getElementById('myChart').getContext('2d'),
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
  clearAllData: function() {
    for (var index in imageObjects) {
      imageObjects[index].value = 0;
      imageObjects[index].appearances = 0;
    }
  },
  fillTotalValues: function() {
    for (var index in imageObjects) {
      tracker.allTotalValues[index] = imageObjects[index].value;
    }
  },
  showResults: function() {
    tracker.makeChart();
  },
  addToImgValue: function(imgName) {
    var indexValue = imageNames.indexOf(imgName);
    var imgObject = imageObjects[indexValue];
    imgObject.value += 1;
  },
  resetImageTest: function() {
    tracker.totalClicks = 0;
    tracker.clearAllData();
    location.reload();
  },
  checkUserClicks: function() {
    if (tracker.totalClicks > tracker.sampleSize - 1) {
      tracker.button1.removeEventListener('click', tracker.handleClick);
      tracker.fillTotalValues();
      tracker.showResultsButton();
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
  makeChart: function() {
    var myChart = new Chart(tracker.ctx, {
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
  }
};

tracker.button1.addEventListener('click', tracker.handleClick);
tracker.button4.addEventListener('click', tracker.showResults);
tracker.button5.addEventListener('click', tracker.resetImageTest);

tracker.newSetOfImages();
