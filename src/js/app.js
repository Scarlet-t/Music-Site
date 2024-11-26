/**
 * WEB222 – Assignment 06
 *
 * I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been
 * copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Please update the following with your information:
 *
 *      Name:       Jenny Zhang
 *      Student ID: 142467232
 *      Date:       2024/03/23
 */

// All of our data is available on the global `window` object.
// Create local variables to work with it in this file.
const { artists, songs } = window;

// For debugging, display all of our data in the console. You can remove this later.
console.log({ artists, songs }, "App Data");

document.addEventListener("DOMContentLoaded", function () {
  // get all the elements
  const menu = document.getElementById("menu");
  const selectedArtist = document.getElementById("selected-artist");
  const cardsList = document.getElementById("cards-list");
  selectArtist;
  // menu const
  function makeMenu() {
    // i. Loop through all of your Artist objects and create a <button> element for each, adding it to the <nav id=”menu”>…</nav>
    window.artists.forEach((artist) => {
      let buttonArtst = document.createElement("button");
      // ii. Use each Artist’s name for the button’s text
      buttonArtst.innerHTML = artist.name;
      // iii. When the button is clicked, show that Artist’s Name, Links, and Songs.
      buttonArtst.addEventListener("click", () => selectArtist(artist));
      menu.appendChild(buttonArtst);
    });
  }

  // select artist
  function selectArtist(artist) {
    //clear stuffs
    selectedArtist.innerHTML = "";
    while (selectArtist.nextSibling) {
      selectedArtist.parentNode.removeChild(selectArtist.nextSibling);
    }
    cardsList.innerHTML = "";

    selectedArtist.innerHTML = artist.name + " || ";

    //links
    let link1 = document.createElement("a");
    link1.innerHTML = artist.urls[0].name;
    link1.href = artist.urls[0].url;
    selectedArtist.appendChild(link1);
    selectedArtist.innerHTML += ", ";
    let link2 = document.createElement("a");
    link2.innerHTML = artist.urls[1].name;
    link2.href = artist.urls[1].url;
    selectedArtist.appendChild(link2);

    // songs table body
    const listSongs = window.songs.filter((song) => {
      return song.artistId === artist.artistId && !song.explicit;
    });
    listSongs.forEach((song) => {
      // main card
      let card = document.createElement("div");
      card.className = "card";
      card.addEventListener("click", () => {
        console.log(song);
        window.open(song.url);
      });

      // album cover
      let albumCover = document.createElement("img");
      albumCover.className = "album-cover";
      albumCover.src = song.imageUrl;
      card.appendChild(albumCover);

      // song info
      let songInfo = document.createElement("table");
      songInfo.className = "song-info";

      // song title (row1)
      let row1 = document.createElement("tr");

      let rowTitle1 = document.createElement("td");
      rowTitle1.className = "row-title";
      rowTitle1.innerHTML = "Song Title: ";

      let rowContent1 = document.createElement("td");
      rowContent1.innerHTML = song.title;

      row1.append(rowTitle1, rowContent1);
      songInfo.appendChild(row1);

      // song title (row2)
      let row2 = document.createElement("tr");

      let rowTitle2 = document.createElement("td");
      rowTitle2.className = "row-title";
      rowTitle2.innerHTML = "Year Recorded: ";

      let rowContent2 = document.createElement("td");
      rowContent2.innerHTML = song.year;

      row2.append(rowTitle2, rowContent2);
      songInfo.appendChild(row2);

      // duration (row3)
      let row3 = document.createElement("tr");

      let rowTitle3 = document.createElement("td");
      rowTitle3.className = "row-title";
      rowTitle3.innerHTML = "Duration (mm:ss): ";

      let rowContent3 = document.createElement("td");
      rowContent3.innerHTML = `${Math.floor(song.duration / 60)}:${
        song.duration % 60 < 10 ? "0" + (song.duration % 60) : song.duration % 60
      }`;

      row3.append(rowTitle3, rowContent3);
      songInfo.appendChild(row3);

      //append to cards lisr
      card.appendChild(songInfo);
      cardsList.appendChild(card);
    });

    // make cards
  }
  makeMenu();
  selectArtist(window.artists[0]);
});
