/**
 * NAME: Blake Munro
 * DATE: 2024-03-05
 */
console.log('pixabay.js loaded');

// API Key for Pixabay
const PIXABAY_API_KEY = '42719383-a3866294d5d3f5e4141f02326'; // normally we would load a key through the .env file
// URL for Pixbay request
const PIXABAY_URL = 'https://pixabay.com/api/?key=<API_KEY>';
//https://pixabay.com/api/?key=42719383-a3866294d5d3f5e4141f02326&lang=en&page=1&per_page=30
// Constant for image count
const IMAGE_COUNT = 30;



/**
 * makePosts
 * Creates posts for pictures.
 */
const makePosts = (pictureData) => 
{
    if (pictureData?.length > 0){
        const blogColumn = $('.blog-column');
        for (let i = 0; i < pictureData?.length; i++){
            let id = i;
            let pixabayPicture = pictureData[i];
    
            let card = $('<div class="card"></div>')
                .attr("id", "card_" + id)
                .appendTo(blogColumn);
            
            // Append Image to card element
            let pic = $('<img>')
                .attr('id', "img-"+ i)
                .attr("src", pixabayPicture.webformatURL)
                .attr("alt", pixabayPicture.tags)
                .addClass('card-img-top')
                .appendTo(card);
            
            // Append card body to card element
            let cardBody = $('<div class="card-body"></div>')
            .appendTo(card);
    
            let cardParagraph = $('<p class="card-text tags"></p>')
            // Display Tags
            .text("Tags: " + pixabayPicture.tags)
            // Append paragraph to card body
            .appendTo(cardBody);
        }
    }
};

/**
 * getPictures
 * retrieves the pictures from Pixabay API
 */
const getPictures = () => 
{
    // get images matching the following: 30 per page, queary search value of "cars", all horizantal (no vertical) and type photo only (no illustaration or vectors)
    const url = `${PIXABAY_URL.replace('<API_KEY>', PIXABAY_API_KEY)}&q=cars&orientation=horizontal&image_type=photo&per_page=${IMAGE_COUNT}`;
    // use fetch to get the pictures from the API
    fetch(url)
    .then((res) => res.json())
        //console.log(res.json())
    
    .then((data) => {
        // data retrieved
        // make post here
        console.log(data);
        if (data?.hits?.length > 0){
            // Make sure data is not null
            // create posts for all pictures
            makePosts(data?.hits)
        }
    })
    // handle error(s) with .catch()
    .catch((err) => {
        console.log(err);
    })
};

getPictures();

