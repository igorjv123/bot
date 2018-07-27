module.exports = function (message, Notes){

    const DOLLAR = 26;
    const EURO = 31;
    const UAH = 1;

    var result = [
      {name:"BOT", text:"Ok"}
    ];

    var bot = /@bot/gmi;

    var exp = [
      {name: 'weather', reg: /What is the weather/gmi},
      {name: 'convert', reg: /Convert/gmi},
      {name: 'save note', reg: /save note/gmi},
      {name: 'show note list', reg: /show note list/gmi},
      {name: 'show note', reg: /show note/gmi},
      {name: 'show quote', reg:/show quote/gmi},
      {name: 'advice', reg: /Що|Як|Скільки/gmi}
    ];

    const quotes = [
      'Якщо хочеш працювати - лягай поспи і все пройде',
      'Чим би дитина не бавилась, лиш би не JS',
      'Вже опів на шосту ранку. Ти знаєш, де зараз твій покажчик стека?',
      'Нікого робота програми не дивує так часто, як її творця!',
    ];

    const advices = [
      'Погуляй','Випий','Знайди дівчину','Не знаю','Поплач','Сходи в душ',
      'Кидай пити','Подивись Сімпсонів'
    ]
    //var message = '@bot What is the weather today in Lviv?';
    console.log(message);
    message = message.replace(/“|‘|’|”/gi, "");
    console.log(message);

    function findQuest(str){
      if (message.search(bot)!=0){
          return
      }
        for(let i of exp){
          if (i.reg.test(str)){
            return i.name
          }
        }
    }

    var keyword = findQuest(message);

    switch (keyword) {
      case 'convert':
        convert(message);
        break;
      case 'weather':
        showTheWeather(message);
        break;
      case 'save note':
        saveNote(message);
        break;
      case 'show note list':
        showNotes(Notes);
        break;
      case 'show note':
        showNote(message);
        break;
      case 'show quote':
        showQuote();
      case 'advice':
        giveAdvice();
        break;
      default:
      result[0].text = "Мій творець ще не закінчив BSA,тому він не може написати нормальний функціонал:("
    }

    function convert(str){
      let numReg = /\d{1,}/gmi;
      let num = Number(str.match(numReg));

      let command = /[0-9]\D.{1,}/gi;

      let valutes = str.match(command);
      valutes = valutes[0].substring(2);
      console.log(valutes);


      switch (valutes) {
        case 'dollar to euro':
           result[0].text = num +" "+ valutes + " = "+ num / 1.19;
          break;
        case 'dollar to hryvnia':
           result[0].text = num +" "+ valutes + " = "+ num * 26
          break;
        case 'euro to dollar':
           result[0].text = num +" "+ valutes + " = "+ num*1.19
          break;
        case 'euro to hryvnia':
           result[0].text = num +" "+ valutes + " = "+ num * 31
          break;
        case 'hryvnia to dollar':
           result[0].text = num +" "+ valutes + " = "+ num / 26
          break;
        case 'hryvnia to euro':
           result[0].text = num +" "+ valutes + " = "+ num / 31
          break;

        default:
        return 'Щось ти намутив...'
      }
    }

    function showTheWeather(str){

      let cityReg = /in.{1,}\?/gi;
      let dayReg = /weather.{1,}? /gi;

      let city = str.match(cityReg)[0];
      let day = str.match(dayReg)[0];

      city = city.slice(3,city.length - 1);
      day = day.slice(8, day.length-1);

      let temperature = Math.floor(Math.random() * 40);
      let tempDescription = 'warm';

      if(temperature <= 15){
        tempDescription = 'cold'
      }
      else if(temperature > 15 && temperature <=25 ) {
        tempDescription = 'warm'
      }
      else{
        tempDescription = "hot"
      }

       result[0].text = res = "The weather is " + tempDescription + " in " + city + " "
                + day + ", temperature: " + temperature;
      }

    function saveNote(str){
      let titleReg = /title.{1,}(?=body)/gi;
      let bodyReg = /body.{1,}/gi;

      let title = str.match(titleReg)[0];
      let body = str.match(bodyReg)[0];

      title = title.slice(8, title.length-2);
      body = body.slice(7, body.length-1);

      result.push({'title':title, 'body':body});

    }

    function showNotes(Notes){
      for (let i = 0; i< Notes.length; i++){
        result[0].text += "Назва: " + Notes[i]['title'] +'. Текст: ' + Notes[i]['body'] + '.\n\n';
      }
    }
    function showNote(str){
      let showReg = /note.{1,}/gi;
      let title = str.match(showReg)[0];

      title = title.slice(5, title.length);

      const regexp = new RegExp(`.*${title}.*`,'/gi');

      console.log( Notes.filter(post => post.title && regexp.test(title)));

    }
    function showQuote(){
      result[0].text = quotes[Math.floor(Math.random() * 3)];
    }
    function giveAdvice(){
      result[0].text = advices[Math.floor(Math.random() * 8)];
    }

    return result;
}
