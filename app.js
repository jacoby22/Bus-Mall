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
  }
};

tracker.newSetOfImages();

handleClick = function() {
  var imgName = event.target.name;
  addToImgValue(imgName);
  tracker.totalClicks += 1;
  checkUserClicks();
  tracker.newSetOfImages();
};

addToImgValue = function(imgName) {
  var indexValue = imageNames.indexOf(imgName);
  var imgObject = imageObjects[indexValue];
  try {
    imgObject.value += 1;
  } catch(err) {
    tracker.totalClicks -= 1;
    alert('Please click on the image');
  }
};

checkUserClicks = function() {
  if (tracker.totalClicks > 14) {
    button1.removeEventListener('click', handleClick);
    fillListWithData();
    showResultsButton();
  }
};

fillListWithData = function() {
  for (var j = 1; j < imageObjects.length + 1; j++) {
    var listEl = document.getElementById('' + j);
    listEl.textContent = imageObjects[j - 1].name + ': ' + imageObjects[j - 1].value;
  }
};

showResults = function() {
  tracker.show('ul');
  tracker.showClickTotal();
};

showResultsButton = function() {
  tracker.show('showResults');
};

resetImageTest = function() {
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
