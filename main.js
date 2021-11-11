const puppeteer = require('puppeteer')
const {getPositivityScore} = require('./positivityScore')
main()

async function main() {
    const top3 = await getReviews()

    top3.forEach(review => {
        console.log(`Positivity Score: ${review[0]}`)
        console.log(`Review: ${review[1]}\n\n`)
    });
}

async function getReviews() {
    const browser = await puppeteer.launch({headless: true})
    const page = await browser.newPage()
    var reviews = []

    for(let i = 1; i < 6; i++) {
        console.log(`Fetching Page ${i}`)

        await page.goto(
            `https://www.dealerrater.com/dealer/McKaig-Chevrolet-Buick-A-Dealer-For-The-People-dealer-reviews-23685/page${i}/?filter=ONLY_POSITIVE#link`,
            {waitUntil: 'networkidle2'}
        );

        reviews.push(await page.evaluate(() => {
            let comments = []
            for(let j = 2; j < 22; j+=2) {
                let selector = `div.review-entry:nth-child(${j}) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > p:nth-child(1)`;
                let review = document.querySelector(selector).innerText;
                comments.push(review)
            }
            return comments

        }))
    }
    await browser.close()

    const top3 = reviews.flat().map((review) => {
        let score = getPositivityScore(review)
        return [score, review]
    }).sort((a, b) => {
        return b[0] - a[0]
    }).slice(0, 3);
    
    return top3

}