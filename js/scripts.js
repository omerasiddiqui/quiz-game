$(document).ready(function() {
  const MARVEL_API_KEY = '1b67f606425f993d3fd9691fb6b64c3c&hash=20b5040f9ed9facc2ec64ccfa55528a3';
  const COMIC_API_KEY = '576c6d73e8839e8e061dc63a19396156e4a60680';

  function getMarvelCharaceter(randomNumber) {
    $.getJSON(`https://gateway.marvel.com:443/v1/public/characters?id=${randomNumber}&ts=1&limit=20&apikey=${MARVEL_API_KEY}`)
      .done(function(res) {
        console.log(res);
        const data = res.data.results[0];
        const name = data.name;
        const description = data.description;
        const moment = data.events.items
        const url = data.urls[0].url;
        const image = data.thumbnail.path + "/portrait_uncanny." + data.thumbnail.extension;

        if (moment.length < 1) {
          $('ul').html(`<li>Your character's name is ${name}. ${description}</li>`);
          $('#fmi').html(`<h2>For More Info:`);
          $('#url').attr("href", url).html(`<h2>Click Here</h2>`)
          $('.image').attr('src', image);
          $('.list').css("opacity", "1");
          $('.list').fadeIn(100);
        } else {
          $('ul').html(`<li>Your character's name is ${name}. ${description} Most famous for ${moment[0].name}.</li>`);
          $('#fmi').html(`<h2>For More Info:`);
          $('#url').attr("href", url).html(`<h2>Click Here</h2>`)
          $('.image').attr('src', image);
          $('.list').css("opacity", "1");
          $('.list').fadeIn(100);
        }
      })
      .fail(function() {
        let randomNumber = randomMarvelCharacterIndex();
        getMarvelCharaceter(randomNumber);
      })
  }

  function randomMarvelCharacterIndex() {
    let min = 1011334;
    let max = 1009697;
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function clear() {
    $('.moreInfo a').empty();
    $('#fmi').empty();
  }

  /********************************************************************************/

  //random Rick and Morty character
  $('#rickAndMorty').click(function() {
    clear();
    $.getJSON('https://rickandmortyapi.com/api/character', function(res) {
      console.log(res);
      const randomNum = Math.floor(Math.random() * 20);
      const int = randomNum;
      const data = res.results[int];
      const gender = data.gender;
      const name = data.name;
      const species = data.species;
      const location = data.location.name;
      const status = data.status;
      const image = data.image;
      function genderDisp() {
        if (gender == "Male") {
          return "he";
        } else {
          return "she"
        }
      }
      $('ul').html(`<li>Your character's name is ${name} and ${genderDisp()} is a ${species}. Originally from ${location} and currently ${status}.</li>`);
      $('.image').attr('src', image);
      $('.list').css("opacity", "1");
      $('.list').fadeIn(250);
    }

  );
  });

  //Search Marvel character
  $('form').on("submit", function(e) {
    e.preventDefault();
    clear();
    const search = $('input[type=text]').val().trim();
    $('input[type=text]').val('');
    if (search.length > 0) {
      $.getJSON(`https://gateway.marvel.com:443/v1/public/characters?name=${search}&ts=1&limit=20&apikey=${MARVEL_API_KEY}`)
        .done(function(res) {
          const dataCount = res.data.count
          if (dataCount < 1) {
            $('.list').css("opacity", "1");
            $('ul').html(`<p style="text-align:center">No Marvel character named ${search}. <br> Try changing the format. <br> Ex: iron man, spider-man</p>`)
          }
          const randomNum20 = Math.floor(Math.random() * 20);
          const int10 = Math.floor(Math.random() * 10);
          const int5 = Math.floor(Math.random() * 5);
          const int = randomNum20;
          const data = res.data.results[0];
          const name = data.name;
          const description = data.description;
          const moment = data.events.items
          const url = data.urls[0].url;
          const image = data.thumbnail.path + "/portrait_uncanny." + data.thumbnail.extension;
          if (moment.length < 1) {
            $('ul').html(`<li>Your character's name is ${name}. ${description}</li>`);
            $('.image').attr('src', image);
            $('.list').css("opacity", "1");
            $('.list').fadeIn(100);
          } else {
            $('ul').html(`<li>Your character's name is ${name}. ${description} Most famous for ${moment[int5].name}.</li>`);
            $('.image').attr('src', image);
            $('.list').css("opacity", "1");
            $('.list').fadeIn(100);
          }
        })
        .fail(function() {
          console.log('error!');
        })
    };
  })

  //random Marvel character
  $('#randomMarvel').click(function() {
    clear();
    let randomNumber = randomMarvelCharacterIndex();
    getMarvelCharaceter(randomNumber);
  });

  //random Simpsons quote
  $('#simpsons').click(function() {
    clear();
    $.getJSON(`https://thesimpsonsquoteapi.glitch.me/quotes`)
      .done(function(data) {
        const character = data[0].character;
        const quote = data[0].quote;
        const image = data[0].image;

        $('ul').html(`<li>A quote from ${character}: ${quote}</li>`);
        $('.image').attr('src', image);
        $('.list').css("opacity", "1");
        $('.list').fadeIn(250);

      })
      .fail(function() {
        console.log(`error!`);
      })
  });
});
