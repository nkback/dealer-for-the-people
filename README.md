# How to run the app

Clone the repo => npm install => node main.js

# How to run tests
npm test

# Positivity Criteria
I don't know about you, but multiple exclamation points at the end of a single sentance is a little overly positive. I decided to heavily increase the positivity rating to those reviews that had sequential exclamation points.

Each review was given a base of 2 points. Each exclamation point in isolation (Used lookaheads to determine if it was a lonely exclamation point) received 1 point.

5 points for each "positive" word. I determine that from a short list of positive words I pulled from the internet.

I then capture groups of multiple exclamation points and raise the total number to the length of each group of exclamation points. (i.e if you had one positive word and 3 exclamation points at the end of the sentance your calculation would end up being 7^3
