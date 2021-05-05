const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('node:fs');

// make a new folder memes

fs.mkdir('./memes', function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('New directory successfully created.');
  }
});

// declaring a function for downloading and saving the images

async function download(img, i) {
  const responseImg = await fetch(img);
  const buffer = await responseImg.buffer();
  fs.writeFile(`./memes/image${i}.jpg`, buffer, () =>
    console.log('finished downloading!'),
  );
}

// fetching HTML text from the website & saving it in variable using fetch

const memeData = async () => {
  const response = await fetch(
    'https://memegen-link-examples-upleveled.netlify.app/',
  );
  const body = await response.text();

  // parse HTML text and extract img src using cheerio

  const $ = cheerio.load(body);
  const imgList = [];

  $('img').each((i, url) => {
    if (i <= 9) {
      imgList.push(url.attribs.src);
    }
  });

  // looping over array and saving images in folder by calling the function download

  for (let i = 0; i < imgList.length; i++) {
    download(imgList[i], i);
  }
};

memeData();
