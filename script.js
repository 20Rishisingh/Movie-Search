const apikey = `https://api.github.com/users/`;


let searchBtn = document.getElementById("srchBtn");
let userInput = document.getElementById("Input");
let userProfile = document.getElementById("dp");
let userName = document.getElementById("userName");
let userBio = document.getElementById("userBio");
let userRepos = document.getElementById("repo");
let userFollowers = document.getElementById("followers");
let userFollowing = document.getElementById("follows");
let joined = document.getElementById("joined");
let mainCard = document.getElementById("main-card");
let followLink = document.getElementById("followLink");


searchBtn.addEventListener("click", () => {
   fetch(apikey + userInput.value)
      .then(response => {
         if (!response.ok){
            throw new Error("Nework response error");
         }
         return response.json();
      })
      .then(outputData => {
         displayOutputData(outputData);
         console.log(outputData);
      })
      .catch(error => {
         alert("User ID Not Found!!!")
      })
      userInput.value = "";
})


function displayOutputData(resultIs) {
   mainCard.style.display = "block";
   console.log(resultIs);
   userFollowers.innerText = resultIs.followers;
   userFollowing.innerText = resultIs.following;
   userRepos.innerText = resultIs.public_repos;
   userProfile.src = resultIs.avatar_url;
   userName.innerText = resultIs.name;
   followLink.href = resultIs.html_url;
   userBio.innerText =  resultIs.bio ? resultIs.bio : "{User has not entered Bio}";
   document.getElementById("userlocation").innerText = resultIs.location;
   joined.innerHTML = `<p>Joined : ${new Date(resultIs.created_at).toLocaleDateString('en-US')} </p>`;
}