const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

// target url
const url =
   'https://www.amazon.com/Oculus-Quest-Advanced-All-One-Virtual/dp/B099VMT8VZ/ref=sr_1_3?crid=2XOPRGLK0DPJ7&keywords=oculus&qid=1649201433&sprefix=oculus%2Caps%2C75&sr=8-3';

// product object
const product = {
   name: '',
   image: '',
   price: '',
   link: '',
};

// scraper function
async function scrape() {
   try {
      // fetch HTML
      const { data } = await axios.get(url);

      // load HTML
      const $ = cheerio.load(data);

      // select div items
      // const item = $('div#dp-container');
      const item = $('div#ppd');

      // populate the product object with the selected elements
      product.name = $(item).find('span#productTitle').text();
      product.image = $(item).find('img#landingImage').attr('src');
      product.price = $(item).find('span#priceblock_ourprice').text();
      product.link = url;

      // create product.json file
      fs.writeFile('product.json', JSON.stringify(product, null, 2), (err) => {
         if (err) {
            console.error(err);
            return;
         }
         console.log('completed');
      });
   } catch (err) {
      console.error(err);
   }
}

scrape();
