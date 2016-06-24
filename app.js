var imageObjects = [];
var imageNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

function Img(name) {
  this.name = name;
  this.source = 'assets/' + name + '.jpg';
  this.value = 0;
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
  clearCurrentImages: function() {
    this.currentImages = [];
  },
  newSetOfImages: function() {
    this.clearCurrentImages();
    this.fillCurrentImages();
    this.displayCurrentImages();
  }
};

tracker.newSetOfImages();

handleClick = function() {
  tracker.totalClicks += 1;
  console.log(tracker.totalClicks);
  checkUserClicks();
  var imgName = this.name;
  addToImgValue(imgName);
  tracker.newSetOfImages();
};

addToImgValue = function(imgName) {
  console.log(imgName);
  var indexValue = imageNames.indexOf(imgName);
  console.log(indexValue);
  var imgObject = imageObjects[indexValue];
  imgObject.value += 1;
};

checkUserClicks = function() {
  if (tracker.totalClicks > 15) {
    button1.removeEventListener('click', handleClick);
    button2.removeEventListener('click', handleClick);
    button3.removeEventListener('click', handleClick);
  }
};

var button1 = tracker.img1;
var button2 = tracker.img2;
var button3 = tracker.img3;

button1.addEventListener('click', handleClick);
button2.addEventListener('click', handleClick);
button3.addEventListener('click', handleClick);
