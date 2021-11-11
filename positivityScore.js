const positiveWords = ["absolutely","accepted","acclaimed","accomplish","accomplishment","achievement","action","active","admire","adorable","adventure","affirmative","affluent","agree","agreeable","amazing","angelic","appealing","approve","aptitude","attractive","awesome","beaming","beautiful","believe","beneficial","bliss","bountiful","bounty","brave","bravo","brilliant","bubbly","calm","celebrated","certain","champ","champion","charming","cheery","choice","classic","classical","clean","commend","composed","congratulation","constant","cool","courageous","creative","cute","dazzling","delight","delightful","distinguished","divine","earnest","easy","ecstatic","effective","effervescent","efficient","effortless","electrifying","elegant","enchanting","encouraging","endorsed","energetic","energized","engaging","enthusiastic","essential","esteemed","ethical","excellent","exciting","exquisite","fabulous","fair","familiar","famous","fantastic","favorable","fetching","fine","fitting","flourishing","fortunate","free","fresh","friendly","fun","funny","generous","genius","genuine","giving","glamorous","glowing","good","gorgeous","graceful","great","green","grin","growing","handsome","happy","harmonious","healing","healthy","hearty","heavenly","honest","honorable","honored","hug","idea","ideal","imaginative","imagine","impressive","independent","innovate","innovative","instant","instantaneous","instinctive","intellectual","intelligent","intuitive","inventive","jovial","joy","jubilant","keen","kind","knowing","knowledgeable","laugh","learned","legendary","light","lively","lovely","lucid","lucky","luminous","marvelous","masterful","meaningful","merit","meritorious","miraculous","motivating","moving","natural","nice","novel","now","nurturing","nutritious","okay","one","one-hundred percent","open","optimistic","paradise","perfect","phenomenal","pleasant","pleasurable","plentiful","poised","polished","popular","positive","powerful","prepared","pretty","principled","productive","progress","prominent","protected","proud","quality","quick","quiet","ready","reassuring","refined","refreshing","rejoice","reliable","remarkable","resounding","respected","restored","reward","rewarding","right","robust","safe","satisfactory","secure","seemly","simple","skilled","skillful","smile","soulful","sparkling","special","spirited","spiritual","stirring","stunning","stupendous","success","successful","sunny","super","superb","supporting","surprising","terrific","thorough","thrilling","thriving","tops","tranquil","transformative","transforming","trusting","truthful","unreal","unwavering","up","upbeat","upright","upstanding","valued","vibrant","victorious","victory","vigorous","virtuous","vital","vivacious","wealthy","welcome","well","whole","wholesome","willing","wonderful","wondrous","worthy","wow","yes","yummy","zeal","zealous"];

const getPositivityScore = (comment) => {

    if(typeof comment !== 'string' && !(comment instanceof String)) {
        throw new TypeError("Comment needs to be a string")
    }

    let score = 2; //Start with a default score of 2 so multiplier won't have any issues if there aren't any positive word matches.

    const singleReg = /(?<![!])(!)(?![!])/gm
    score += (comment.match(singleReg) || []).length

    const sequentialReg = /(!)\1+/gm
    const matches = (comment.match(sequentialReg) || []) //We're gonna hold on to this until the end and just it as an exponential multiplier.

    comment = comment.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " "); //Get rid of punctuation

    //Count each occurance of a positive word. 5pts each.
    const wordArr = comment.split(" ");
    const intersections = positiveWords.filter(value => wordArr.includes(value));
    score += intersections.length * 5;

    matches.forEach(item => {
        score = Math.pow(score,item.length) //scores go up exponentially for sequential exclamation points.
    })

    return score;
}

exports.getPositivityScore = getPositivityScore;

//(?<![!])(!)(?![!])
//(!)\1+