$(document).ready(function() {

    $('#btn2').click(function(){
        $('.testing').fadeIn(1000)
    })



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
        $('.image').attr('src', image);
        $('.list').fadeIn(500);

        console.log(randomNum);
        });
    });
});
