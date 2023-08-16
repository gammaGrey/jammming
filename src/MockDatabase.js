import Song from "./Song";

const trackArray = [ //{song, artist, album, ID}
  {
    name:"song one",
    artist:"artist one",
    album:"album one",
    id:"1"
  },
  {
    name:"song two",
    artist:"artist two",
    album:"album two",
    id:"2"
  },
  {
    name:"song three",
    artist:"artist one",
    album:"album three",
    id:"3"
  }
];

const songArray = [];

for (let i = 0; i < 4 ; i++) {
  let k = Math.floor((Math.random() * 2) + 1);
  let j = new Song(`mock song ${i}`,`artist ${k}`,`album ${i}`, `song-${i}`);

  songArray.push(j);
};
console.log("songArray:")
console.log(songArray);

export default songArray;