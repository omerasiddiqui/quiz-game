$(document).ready(function() {

    $('#btn2').click(function(){
      const key = '1b67f606425f993d3fd9691fb6b64c3c&hash=20b5040f9ed9facc2ec64ccfa55528a3';
        $.getJSON(`https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=${key}`)
            .done(function(res){
                console.log(res.data);
                const randomNum = Math.floor(Math.random() * 20);
                const int = randomNum;
                const data = res.data.results[int];
                const name = data.name;
                const description = data.description;
                const moment = data.events.items
                const url = data.urls[0].url;
                const image = data.image;
                console.log(moment.length);

                if(moment.length < 3) {
                    $('ul').html(`<li>Your character's name is ${name}. ${description}</li>`);
                    $('.image').css("display", "none");
                    $('.list').fadeIn(500);
                } else {
                    $('ul').html(`<li>Your character's name is ${name}. ${description} Most famous for ${moment[4].name}.</li>`);
                    $('.image').css("display", "none");
                    $('.list').fadeIn(500);
                }
            })
            .fail(function(){
                console.log('error!');
    })
});



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
        if(gender == "Male") {
            return "he";
        } else {
            return "she"
        }}

        console.log(`Your character's name is ${name} and ${genderDisp()} is a ${species}. Originally from ${location} and currently ${status}.`)
        $('ul').html(`<li>Your character's name is ${name} and ${genderDisp()} is a ${species}. Originally from ${location} and currently ${status}.</li>`);
        $('.image').css("display", "block");
        $('.image').attr('src', image);
        $('.list').fadeIn(500);

        console.log(randomNum);
        });
    });
});
