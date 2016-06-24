var imageObjects = [];
var imageNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

function Img(name) {
  this.name = name;
  this.source = name + '.jpg';
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
  img1: document.getElementById('image1'),
  img2: document.getElementById('image2'),
  img3: document.getElementById('image3'),
  getRandomNum: function() {
    randomValue = Math.floor(Math.random() * imageNames.length);
    console.log(randomValue);
  }
};

tracker.getRandomNum();
