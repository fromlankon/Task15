const container = document.querySelector('.container');
const url = "https://fuchsia-nettle-taxicab.glitch.me/users";

fetch(url)
    .then(res => res.json())
    .then(data => {
        data.forEach(user => {
            container.innerHTML +=
            `
            <div class="card" style="width: 18rem;">
                <div class="cardImg">
                    <img src="${user.img}" class="card-img-top">
                </div>
                <div class="card-body">
                    <h5 class="card-title"> ${user.name} </h5>
                    <p class="card-text"> ${user.country} </p>
                    <a href="#" class="btn btn-primary"> Add Player </a>
                </div>
            </div>
            `
        });
});