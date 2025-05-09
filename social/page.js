import { PauseAppAPI } from "../js/api/PauseAppAPI.js";
import { validateLogin } from "../js/utils/validateLogin.js";
import { Navbar } from "../js/components/Navbar.js";
import { UserThumbnail } from "../js/components/UserThumbnail.js";

validateLogin();

document.body.appendChild(Navbar());

const Options = {
    all: "all",
    friends: "friends",
    requests: "requests"
}

class Filter {

    static users = [];

    static nameFilter = "";

    static option = Options.all;

    static getFiltredUsers(me) {
        if (Filter.name != "" && this.option !== Options.requests) return Filter.users.filter(u => u.name.toLowerCase().includes(Filter.nameFilter));

        if (Filter.name != "" && this.option === Options.requests) {
            return Filter.users.filter(relation => relation.sender.name.toLowerCase().includes(Filter.nameFilter));
        }
        return Filter.users;
    }
}

const $userContainer = document.getElementById("user-list");
const renderAllUsers = async (me) => {
    $userContainer.innerHTML = "";
    const fragment = document.createDocumentFragment();

    const friends = await PauseAppAPI.getFriends(me.id);
    Filter.getFiltredUsers(me).forEach(user => {
        if (friends.find(u => u.id == user.id)) return;
        fragment.appendChild(UserThumbnail({user, me, canSendRequest: true}));
    });

    $userContainer.appendChild(fragment);
}

const renderFriends = (me) => {
    $userContainer.innerHTML = "";
    const fragment = document.createDocumentFragment();

    Filter.getFiltredUsers(me).forEach(user => {
        fragment.appendChild(UserThumbnail({user, me}));
    });

    $userContainer.appendChild(fragment);
}

const renderRequests = (me) => {
    $userContainer.innerHTML = "";
    const fragment = document.createDocumentFragment();

    Filter.getFiltredUsers(me).forEach(relation=> {
        fragment.appendChild(UserThumbnail({me, relation}));
    });

    $userContainer.appendChild(fragment);
}

async function main() {
    const allUsers = await PauseAppAPI.getUsers();
    const me = await PauseAppAPI.me();
    Filter.users = allUsers.filter(u => u.id != me.id);
    renderAllUsers(me);

    const $input = document.getElementById("user-in");
    $input.addEventListener("input", (e) => {
        Filter.nameFilter = e.target.value.trim().toLowerCase();
        renderAllUsers(me);
    });
    
    const $showAll = document.getElementById("show-all");
    $showAll.addEventListener("click", () => {
        Filter.option = Options.all;
        Filter.users = allUsers.filter(u => u.id != me.id);
        renderAllUsers(me);
    });

    const $showFriends = document.getElementById("show-friends");
    $showFriends.addEventListener("click", async () => {
        Filter.option = Options.friends;
        Filter.users = await PauseAppAPI.getFriends(me.id);
        renderFriends(me);
    });

    const $showRequests = document.getElementById("show-requests");
    $showRequests.addEventListener("click", async () => {
        Filter.option = Options.requests;
        Filter.users = await PauseAppAPI.getFriendRequests(me.id);
        renderRequests(me);
    });
}

main();