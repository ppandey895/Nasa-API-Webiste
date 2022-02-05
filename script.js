
let root = 'https://images-api.nasa.gov/';
let url_earth = 'https://api.nasa.gov/EPIC/api/natural/images?api_key=' + '6Xcrf2LYbjkMwAyG3jvlUOxZhA6vC0KYimC25EWd';
let apod = 'https://api.nasa.gov/planetary/apod?api_key=' + '6Xcrf2LYbjkMwAyG3jvlUOxZhA6vC0KYimC25EWd';

let info = [];
let curr_mission = 0;

let word_check = (string) => {
	sentences = string.split(".");
	allowed = "";
	count = 0;
	for (i in sentences) {
		if(count > 5 || sentences[i][0] == null){
			break;
		}
		count++;
		allowed += sentences[i] + ". ";
	}
	return allowed;
}

let prevImg = () => {
	if(curr_mission > 0){
		curr_mission--;
		document.querySelector('.slider h3').innerHTML = info[curr_mission][0].toUpperCase();
		document.querySelector('.slider div img.apollo-img').src = info[curr_mission][1]['img-url'];
		document.querySelector('.slider p.img-text').innerHTML = info[curr_mission][1]['img-text'] + ' [Image Credit: NASA]';
		document.querySelector('.slider p.desc').innerHTML = info[curr_mission][1]['desc'];
	}
}

let nextImg = () => {
	if(curr_mission < 11){
		curr_mission++;
		document.querySelector('.slider h3').innerHTML = info[curr_mission][0].toUpperCase();
		document.querySelector('.slider div img.apollo-img').src = info[curr_mission][1]['img-url'];
		document.querySelector('.slider p.img-text').innerHTML = info[curr_mission][1]['img-text'] + ' [Image Credit: NASA]';
		document.querySelector('.slider p.desc').innerHTML = info[curr_mission][1]['desc'];
	}
}

let loadAPI = async function(){

	// Astronomy Picture of the Day
	await fetch(apod).then( response => {
		return response.json();
	})
	.then( result => {
		if(result.title != undefined){
			document.querySelector('.apod_title').innerHTML = "<span class='h-light'>" + result.title + "</span>";
			document.querySelector('.apod_img').src = result.url;
			document.querySelector('.apod_detail').innerHTML = word_check(result.explanation);	
		}
	})
	.catch( err => console.log(err) );

	// Natural Image of Earth
	await fetch(url_earth).then( response => response.json() )
	.then( result => {
		data = result[0];
		let y = data.date.substr(0,4);
		let m = data.date.substr(5,2);
		let d = data.date.substr(8,2);
		url_earth_img = `https://api.nasa.gov/EPIC/archive/natural/${y}/${m}/${d}/png/${data.image}.png?api_key=6Xcrf2LYbjkMwAyG3jvlUOxZhA6vC0KYimC25EWd`;
		document.querySelector('img.earth_img').src = url_earth_img;
		document.querySelector('.section-3 div h3').innerHTML = data.caption;
	})
	.catch( err => console.log(err) );

	// Apollo Missions Data
	await fetch('src/apollo-info.json').then(response => response.json() )
	.then(result => {
		for(k in result){
			info.push([k, result[k]]);
		}
		let count = 0;
		document.querySelector('.slider h3').innerHTML = info[0][0].toUpperCase();
		document.querySelector('.slider div img.apollo-img').src = info[0][1]['img-url'];
		document.querySelector('.slider p.img-text').innerHTML = info[0][1]['img-text'] + ' [Image Credit: NASA]';
		document.querySelector('.slider p.desc').innerHTML = info[0][1]['desc'];
	})
	.catch( err => console.log(err) );
}

loadAPI();

