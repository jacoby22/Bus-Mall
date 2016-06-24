var imageObjects = [];
var imageNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

function Img(name) {
  this.name = name;
  this.source = 'assets/' + name + '.jpg';
  imageObjects.push(this);
}

function instantiateImageObjects() {
  for(index in imageNames) {
    imageNames[index] = new Img(imageNames[index]);
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
    console.log(randomValue);
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
    console.log(this.currentImages);
  },
  displayCurrentImages: function() {
    this.img1.src = this.currentImages[0].source;
    this.img2.src = this.currentImages[1].source;
    this.img3.src = this.currentImages[2].source;
  }
};

tracker.fillCurrentImages();
tracker.displayCurrentImages();

handleClick = function() {
  tracker.totalClicks += 1;
  console.log(tracker.totalClicks);
};

var button1 = tracker.img1;
var button2 = tracker.img2;
var button3 = tracker.img3;

button1.addEventListener('click', handleClick);
button2.addEventListener('click', handleClick);
button3.addEventListener('click', handleClick);
