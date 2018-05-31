$(document).ready(function() {
const MARVEL_API_KEY = '1b67f606425f993d3fd9691fb6b64c3c&hash=20b5040f9ed9facc2ec64ccfa55528a3';

  $('form').on("submit", function(e) {
    e.preventDefault();
    const search = $('input[type=text]').val().trim();
    $('input[type=text]').val('');
    if (search.length > 0) {
      console.log(search);
      $.getJSON(`https://gateway.marvel.com:443/v1/public/characters?name=${search}&ts=1&limit=20&apikey=${MARVEL_API_KEY}`)
        .done(function(res) {
          console.log(res);
          console.log(res.data);
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
          console.log(image);

          if (moment.length < 1) {
            $('ul').html(`<li>Your character's name is ${name}. ${description}</li>`);
            $('.image').attr('src', image);
            $('.list').css("opacity", "1");
            $('.list').fadeIn(100);
          } else {
            $('ul').html(`<li>Your character's name is ${name}. ${description} Most famous for ${moment[int5].name}.</li>`);            $('.image').attr('src', image);
            $('.list').css("opacity", "1");
            $('.list').fadeIn(100);
          }
        })
        .fail(function() {
          console.log('error!');
        })
    };
  })

  //random character
  $('#btn2').click(function() {
    let randomNumber = randomMarvelCharacterIndex();
    console.log(randomNumber);
    getMarvelCharaceter(randomNumber);
  });

  function getMarvelCharaceter(randomNumber) {
    $.getJSON(`https://gateway.marvel.com:443/v1/public/characters?id=${randomNumber}&ts=1&limit=20&apikey=${MARVEL_API_KEY}`)
      .done(function(res) {
        console.log(res);
        console.log(res.data);
        const int5 = Math.floor(Math.random() * 5);
        console.log(int5);
        const data = res.data.results[0];
        const name = data.name;
        const description = data.description;
        const moment = data.events.items
        const url = data.urls[0].url;
        const image = data.thumbnail.path + "/portrait_uncanny." + data.thumbnail.extension;
        console.log(url);

        if (moment.length < 1) {
          $('ul').html(`<li>Your character's name is ${name}. ${description}</li>`);
          $('#fmi').html(`<h2>For More Info:`);
          $('#url').attr("href", url).html(`<h2>Click Here</h2>`)
          $('.image').attr('src', image);
          $('.list').css("opacity", "1");
          $('.list').fadeIn(100);
        } else {
          $('ul').html(`<li>Your character's name is ${name}. ${description} Most famous for ${moment[int5].name}.</li>`);
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

  $('#btn').click(function() {
    $.getJSON('https://rickandmortyapi.com/api/character', function(res) {
      console.log(res.results);
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

      console.log(`Your character's name is ${name} and ${genderDisp()} is a ${species}. Originally from ${location} and currently ${status}.`)
      $('ul').html(`<li>Your character's name is ${name} and ${genderDisp()} is a ${species}. Originally from ${location} and currently ${status}.</li>`);
      // $('.image').css("display", "block");
      $('.image').attr('src', image);
      $('.list').css("opacity", "1");
      $('.list').fadeIn(250);

      console.log(randomNum);
    });
  });
});
