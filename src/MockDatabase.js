class Song {
  constructor(title, artist, album, id) {
      this.name = title;
      this.artist = artist;
      this.album = album;
      this.id = id;
  }
}

const songArray = () => {
  const sA = [];
  
  for (let i = 0; i < 6 ; i++) {
    let k = Math.floor((Math.random() * 2) + 1);
    let j = new Song(`mock song ${i}`,`artist ${k}`,`album ${i}`, `song-${i}`);
    
    sA.push(j);
  };
  return sA;
};

export default songArray();