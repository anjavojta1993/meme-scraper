const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('node:fs');

// make a new folder called memes, if directory is already there create it, if not, don't

fs.mkdir('./memes', { recursive: true }, (err) => {
  if (err) {
    return console.error(err);
  }
});

// declaring a function for downloading and saving the images

async function download(img, i) {
  // img and i are only references, the actual parameters are passed when I call the function --> this is why their names can be literally ANYTHING
  const responseImg = await fetch(img);
  const buffer = await responseImg.buffer();
  fs.writeFile(`./memes/image${i}.jpg`, buffer, () =>
    console.log('finished downloading!'),
  );
}

// fetching HTML text from the website & saving it in variable using fetch

const memeData = async () => {
  // could also write this as const memeData = async function() {} OR async function memeData() {}
  // async arrow function
  const response = await fetch(
    'https://memegen-link-examples-upleveled.netlify.app/',
  );
  const body = await response.text(); // text method returns text content of selected element --> response of URL

  // parse HTML text and extract img src using cheerio

  const $ = cheerio.load(body); // loading the text response I got with cheerio and putting it into a new variable
  const imgList = []; // creating an empty array and saving it in variable

  $('img').each((i, url) => {
    // accessing 'img' with selector and using each method to run for each matching element
    if (i <= 9) {
      // all matching elements from index 0 to 9
      imgList.push(url.attribs.src); // are pushed into the before declared array imgList
    }
  });

  // looping over array and saving images in folder by calling the function download

  for (let i = 0; i < imgList.length; i++) {
    download(imgList[i], i); // downloading each item in array as long as condition in loop is met
  }
};

memeData();
