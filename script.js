const timer = document.getElementById('timer');
const randomTopic = document.getElementById('random-topic');
const startBtn = document.getElementById('start-btn');
const reStartBtn = document.getElementById('restart-btn');
const timerContainer = document.getElementById('timer-container');
const loading = document.querySelector('.loading');

startBtn.addEventListener('click', () => {
  startBtn.style.display = 'none';
  timerContainer.style.display = 'block';
  navigator.mediaDevices
    .getUserMedia({
      audio: true,
    })
    .then(function (stream) {
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);
      const scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);

      analyser.smoothingTimeConstant = 0.8;
      analyser.fftSize = 1024;
      let d = new Date().getTime();
      let longestSilence = 0;
      let difference = 0;
      let topicServed = false;

      setInterval(() => {
        console.log('difference', difference);
        if (topicServed) return;
        difference = Math.round(difference);
        if (difference >= 5) {
          getRandomTopic();

          d = new Date().getTime();
          topicServed = true;
        }
        timer.innerHTML = `${difference}`;
      }, 1000);

      microphone.connect(analyser);
      analyser.connect(scriptProcessor);
      scriptProcessor.connect(audioContext.destination);
      scriptProcessor.onaudioprocess = function () {
        if (topicServed) return;
        const array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);
        const arraySum = array.reduce((a, value) => a + value, 0);
        const average = arraySum / array.length;
        console.log('average: ', average);
        // need to set the right volume level for what determines a silence...
        if (Math.round(average) > 10) {
          d = new Date().getTime();
          difference = 0;
        } else {
          var now = new Date().getTime();
          difference = (now - d) / 1000;
          if (difference > longestSilence) {
            longestSilence = difference;
          }
        }
      };
    })
    .catch(function (err) {
      /* handle the error */
      console.error(err);
    });
});

function getRandomTopic() {
  loading.style.display = 'flex';
  setTimeout(() => {
    randomTopic.innerHTML = topics.split('\n')[Math.floor(Math.random() * 335)];
    randomTopic.classList.remove('pulse');
    loading.style.display = 'none';
    reStartBtn.style.display = 'block';
  }, 2000);
}

reStartBtn.addEventListener('click', () => {
  location.reload();
});

// https://capitalizemytitle.com/random-topic-generator/
var topics = `
What are some things that you should not say during a job interview?
Where did you go on your last vacation?
What is your favorite song of all time?
What was the last funny video you saw?
What do you do to get rid of stress?
What is something you are obsessed with?
What three words best describe you?
What would be your perfect weekend?
What's your favorite number? Why?
What are you going to do this weekend?
What's the most useful thing you own?
What's your favorite way to waste time?
What do you think of tattoos? Do you have any?
Do you have any pets? What are their names?
Where did you go last weekend? / What did you do last weekend?
What is something popular now that annoys you?
What did you do on your last vacation?
When was the last time you worked incredibly hard?
Are you very active, or do you prefer to just relax in your free time?
What do you do when you hang out with your friends?
Who is your oldest friend? Where did you meet them?
What's the best / worst thing about your work/school?
If you had intro music, what song would it be? Why?
What were you really into when you were a kid?
If you could have any animal as a pet, what animal would you choose?
Have you ever saved an animal's life? How about a person's life?
If you opened a business, what kind of business would it be?
Who is your favorite entertainer (comedian, musician, actor, etc.)?
Are you a very organized person?
Have you ever given a presentation in front of a large group of people? How did it go?
What is the strangest dream you have ever had?
What is a controversial opinion you have?
Who in your life brings you the most joy?
Who had the biggest impact on the person you have become?
What is the most annoying habit someone can have?
Where is the most beautiful place you have been?
Where do you spend most of your free time/day?
Who was your best friend in elementary school?
How often do you stay up past 3 a.m.?
What's your favorite season? Why?
Which is more important, having a great car or a great house? Why?
What animal or insect do you wish humans could eradicate?
Where is the most beautiful place near where you live?
What do you bring with you everywhere you go?
How much time do you spend on the internet? What do you usually do?
What is the most disgusting habit some people have?
Where and when was the most amazing sunset you have ever seen?
WhichÂ recent news storyÂ is the most interesting?
Where is the worst place you have been stuck for a long time?
If you had to change your name, what would your new name be?
What is something that really annoys you but doesn't bother most people?
What word or saying from the past do you think should come back?
How should success be measured? And by that measurement, who is the most successful person you know?
What is your guilty pleasure?
Was there ever an event in your life that defied explanation?
If you could learn the answer to one question about your future, what would the question be?
Has anyone ever saved your life?
What benefit do you bring to the group when you hang out with friends?
How often do you curse? And what's your go-to string of curse words?
What trends did you follow when you were younger?
What do you fear is hiding in the dark?
What was the best period of your life so far? What do you think will be the best period of your entire life?
What do you do to improve your mood when you are in a bad mood?
What is the silliest fear you have?
What are some things you want to accomplish before you die?
What is the best room in your house? Why?
Who is someone popular now that you really like? Why do you like them so much?
Where is the best place to take a date?
What smell brings back great memories?
What's the best pet name you can come up with for a specific type of pet? (Like theseÂ orange cat names.)
How often do you help others? Who do you help? How do you help?
What are you best at?
What makes you nervous?
Who is the funniest person you've met?
What weird or useless talent do you have?
What are some strange beliefs that some people have?
Who would be the worst person to be stuck in an elevator with? How about the best person to be stuck in an elevator with?
What was the best birthday wish or gift you've ever received?
What's the best sitcom past or present?
What's the best show currently on TV?
What will be the future of TV shows?
How often do you binge watch shows?
What cartoons did you watch as a child?
What's the funniest TV series you have seen?
Which TV show do you want your life to be like?
How have TV shows changed over the years?
If you could bring back one TV show that was canceled, which one would you bring back?
What do you think about game shows? Do you have a favorite one?
What's the most underrated or overrated TV show?
What do you think about reality TV? Why do you think it's so popular?
Do you like reality TV shows? Why or why not? If so, which ones?
What is the most overrated movie?
What's your favorite genre of movie?
Which do you prefer? Books or movies?
What movie scene choked you up the most?
Do you like documentaries? Why / why not?
What's the worst movie you have seen recently?
What's the strangest movie you have ever seen?
Do you like horror movies? Why or why not?
When was the last time you went to a movie theater?
What was the last movie you watched? How was it?
Do movies have the same power as books to change the world?
Do you prefer to watch movies in the theater or in the comfort of your own home?
What was the last book you read?
What was your favorite book as a child?
Do you prefer physical books or ebooks?
What is the longest book you've read?
What book genres do you like to read?
How fast do you read?
How often do you go to the library?
What book has influenced you the most?
Do you prefer fiction or nonfiction books?
What book has changed one of your long-held opinions?
What book has had the biggest effect on the modern world?
What was the worst book you had to read for school? How about the best book you had to read for school?
Do you think people read more or fewer books now than 50 years ago?
Now that indie publishing has become easier, have books gotten better or worse?
What was the last song you listened to?
What is your favorite movie soundtrack?
Do you like classical music?
What song always puts you in a good mood?
What's the best way to discover new music?
How has technology changed the music industry?
Are there any songs that always bring a tear to your eye?
What bands or types of music do you listen to when you exercise?
Which do you prefer, popular music or relatively unknown music?
Do you like going to concerts? Why or why not? What was the last concert you went to?
Who was the first band or musician you were really into? Do you still like them?
Records, tapes, CDs, MP3s, streaming. Which did you grow up with? What is good and bad about each?
What are the three best apps on your phone?
What is the most useful app on your phone?
What do app makers do that really annoys you?
How many apps do you have on your phone?
What's the most frustrating app you have tried?
What's the most addictive mobile game you have played?
Which app seemed like magic the first time you used it?
What is the strangest app you have heard of or tried?
What're the best and worst things about the marketplace where you get your apps?
Which app has helped society the most? Which one has hurt society the most?
An app mysteriously appears on your phone that does something amazing. What does it do?
How often do you check your phone?
Do you text more or call more? Why?
What will phones be like in 10 years?
What do you wish your phone could do?
Do you always have to have the latest phone?
What is the most annoying thing about your phone?
How do you feel if you accidentally leave your phone at home?
What kind of case do you have for your phone? Why did you choose it?
What was your first smartphone? How did you feel when you got it?
Do you experience phantom vibration? (Feeling your phone vibrate even though it didn't.)
What sports do you like to watch?
Who are some of your favorite athletes?
What is the hardest sport to excel at?
Who are the 3 greatest athletes of all time?
How much time do you spend watching sports in a week?
Do athletes deserve the high salaries they receive? Why or why not?
What defines a sport? Is fishing a sport? How about video game tournaments?
Do you play in any fantasy sports leagues? If so, how into fantasy sports are you?
Why do you think sports are common across almost all cultures present and past?
Do you play sports video games? Which ones? Is playing the video game or playing the sport more fun? Why?
Which sport is the most exciting to watch? Which is the most boring to watch?
What restaurant do you eat at most?
What's the worst fast food restaurant?
What is the best restaurant in your area?
What is the fanciest restaurant you have eaten at?
What kind of interior do you like a restaurant to have?
What is the worst restaurant you have ever eaten at?
If you opened a restaurant, what kind of food would you serve?
What is the strangest themed restaurant you have heard of?
Would you eat at a restaurant that was really dirty if the food was amazing?
What is the most disgusting thing you have heard happened at a restaurant?
What was your favorite restaurant when you were a child?
Where would you like to travel next?
What is the longest plane trip you have taken?
What's the best way to travel? (Plane, car, train, etc.)
Where is the most relaxing place you have been?
Do you prefer traveling alone or with a group?
What do you think of tour group packages?
Do you prefer to go off the beaten path when you travel?
What was the most overhyped place you've traveled to?
Have you traveled to any different countries? Which ones?
Where is the most awe-inspiring place you have been?
What's the best thing about traveling? How about the worst thing?
What is the worst hotel you have stayed at? How about the best hotel?
How do you think traveling to a lot of different countries changes a person?
What do you think of staycations? (Vacationing and seeing tourist attractions where you live.)
Where do you get your recommendations for what to do and where to stay when you travel?
What is your favorite piece of technology that you own?
What piece of technology is really frustrating to use?
What was the best invention of the last 50 years?
Does technology simplify life or make it more complicated?
Will technology save the human race or destroy it?
Which emerging technology are you most excited about?
What sci-fi movie or book would you like the future to be like?
What do you think the next big technological advance will be?
What technology from a science fiction movie would you most like to have?
What problems will technology solve in the next 5 years? What problems will it create?
What piece of technology would look like magic or a miracle to people in medieval Europe?
Can you think of any technology that has only made the world worse? How about a piece of technology that has only made the world better?
What is your favorite shirt?
Does fashion help society in any way?
What old trend is coming back these days?
What is a fashion trend you are really glad went away?
What is the most comfortable piece of clothing you own?
What is the most embarrassing piece of clothing you own?
How do clothes change how the opposite sex views a person?
Do you care about fashion? What style of clothes do you usually wear?
If you didn't care at all what people thought of you, what clothes would you wear?
What is the best pair of shoes you have ever owned? Why were they so good?
Who do you think has the biggest impact on fashion trends: actors and actresses, musicians, fashion designers, or consumers?
What personal goals do you have?
What are your goals for the next two years?
How have your goals changed over your life?
How much do you plan for the future?
How do you plan to make the world a better place?
What are some goals you have already achieved?
What do you hope to achieve in your professional life?
Have your parents influenced what goals you have?
Do you usually achieve the goals you set? Why or why not?
What is the best way to stay motivated and complete goals?
What are some goals you have failed to accomplish?
What is the craziest, most outrageous thing you want to achieve?
When do you want to retire? What do you want to do when you retire?
Do you prefer summer or winter activities?
What do you like to do in the spring?
Did your family take seasonal vacations?
Which do you prefer, fall or spring?
Which season are you most active in?
What's the most refreshing thing on a hot summer day?
What's the best thing to do on a cold winter day?
Where is the nicest place you have been to in fall?
What is your favorite thing to eat or drink in winter?
Is it better to live where there are four seasons or where one season takes up most of the year?
What is the biggest holiday for your family?
What is your favorite holiday?
What holidays have been over-commercialized?
Do you wish there were more or fewer holidays? Why?
What do you know about the history of some holidays?
What kinds of food do you usually eat on your favorite holiday?
If you had to get rid of a holiday, which would you get rid of? Why?
Does having a day off for a holiday increase or decrease productivity at work?
If some of the lesser-known holidays were commercialized, what would the commercialization look like?
If you could make a holiday, what would it be like? What traditions would it have? What would people eat on your holiday?
What do you think of online education?
What do you think of standardized tests?
Are bigger or smaller schools better?
Is teaching a skill that can be taught?
What will the future of education be?
What do you think of homeschooling?
How can governments make education more efficient?
How has the education you received changed your life?
How can technology improve education? Can it hurt education?
What or who has taught you most of the information you use regularly?
What are some good and bad things about the education system in your country?
What is your favorite cuisine or type of food?
What foods do you absolutely hate?
What do you think of buffets?
When was the last time you had a food fight?
What food looks disgusting but tastes delicious?
What do you get every time you go grocery shopping?
If your life was a meal, what would kind of meal would it be?
What would you want your last meal to be if you were on death row?
What food do you know you shouldn't eat but can't stop yourself?
Do you like spicy food? Why or why not? What is the spiciest thing you have ever eaten?
Does the government have a place in regulating food? To what extent should government regulate food?
When people make mistakes about food (especially foreign food), do you feel the need to correct them? (i.e.Â sushi / sashimiÂ orÂ stromboli / calzone)
If your mind were an island, what would it look like?
What flavor of ice cream do you wish existed?
If you had a personal mascot, what would your mascot be?
If you were a king/queen, what would your throne look like?
Time freezes for everyone but you for one day. What do you do?
You have to relive one day of your life forever. Which day do you choose?
What does your own personal hell look like? How about your own personal heaven?
You find a remote that can rewind, fast forward, stop, and start time. What do you do with it?
If you could call up anyone in the world and have a one-hour conversation, who would you call?
The world has become infested with rabid dogs with the intelligence of a 5-year-old, where do you hole up to survive the â€œa-pup-calypseâ€?
A portal to another world opens in front of you. You don't know how long it will stay open or if you'll be able to get back after you go through. What do you do?
What did you do on your most recent birthday?
Where did you grow up?
Do you have any pets?
Do you have any siblings?
Do you know what your your name means?
What type of phone do you have?
What did you do this past weekend?
What are your plans for this weekend?
What do you like to do in your spare time?
What is the first thing you do when you wake up?
What is the last thing you do before you go to sleep?
What is your middle name?
What was the last thing you purchased?
What is your favorite holiday?
What is your favorite day of the week?
If you could meet anyone in history, who would it be?
What do you like to do to relax?
Are you a saver or a spender?
Do you play any instruments?
Where did (do) you go to school?
What was (is) your favorite subject?
What was (is) your least favorite subject?
What's the first thing you do after school/work?
Were you the class clown or teacher's pet?
What do you do for a living?
What is your dream job?
If you had $10 million, would you still be working/going to school?
What was your least favorite job that you've ever had?
What is something that you have gotten in trouble for at school/work?
What was your favorite children's book?
What is your first childhood memory?
What type of kid were you (e.g. spoiled, rebellious, well-behaved, quiet, obnoxious...)?
What is one thing you miss about being a kid?
What did you want to grow up to be when you were younger?
What is the first think you notice about a guy or girl?
Have you ever been in love?
Do you believe in soul mates?
What are your turn offs?
Do you believe in love at first sight?
Do you prefer short hair or long hair on a guy/girl?
What do you look for in a guy/girl?
Who was the last person you called?
Would you rather be rich and never find true love or be poor and find true love?
Who is your favorite athlete?
How often do you exercise?
What is your favorite sports team?
Do you play any sports?
Where was the last place you went on vacation?
Where do you plan on going for your next vacation?
If you could live anywhere in the world, where would it be?
What countries have you traveled to?
What was your worst vacation experience?
What do you do when you're bored?
What was the biggest thing you have ever won?
What three words best describe you?
Whatâ€™s your favorite way to waste time?
`;
