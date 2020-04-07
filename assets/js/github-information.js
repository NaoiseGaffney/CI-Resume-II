/** WHY? -- Render User Information from GitHUb to provide clients with access to our portfolio. */
/* Function called by the $.when().then() and Error Promise below.
    $.getJSON(`https://api.github.com/users/${username}`)
We're returning a Template Literal `` */
function userInformationHTML(user) {
    return `
        <h2>${user.name}
            <span class="small-name">
                (@<a href="${user.html_url}" target="_blank">${user.login}</a>)
            </span>
        </h2>
        <div class="gh-content">
            <div class="gh-avatar">
                <a href="${user.html_url}" target="_blank">
                    <img src="${user.avatar_url}" width="80" height="80" alt="${user.login}" />
                </a>
            </div>
            <p>Followers: ${user.followers} - Following ${user.following} <br> Repos: ${user.public_repos}</p>
        </div>`;
}

/** WHY? -- Render User Repository to market our development skills and experience. */
/* Function called by the $.when().then() and Error Promise below.
    $.getJSON(`https://api.github.com/users/${username}/repos`)
We're returning a Template Literal `` */
function repoInformationHTML(repos) {
    if (repos.length == 0) {
        return `<div class="clearfix repo-list">No repos!</div>`; // No repos for this user
    }

    // JS map() works like a forEach, and returns an array with the results of this function
    var listItemsHTML = repos.map(function (repo) {
        return `<li>
                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                </li>`;
    });

    // ${listItemsHTML.join("\n")} The join() method on the array with a newline
    return `<div class="clearfix repo-list">
                <p>
                    <strong>Repo List:</strong>
                </p>
                <ul>
                    ${listItemsHTML.join("\n")}
                </ul>
            </div>`;
}

/* First key function: testing that the user has entered a GitHub name, before we attempt to query tha API */
function fetchGitHubInformation(event) {
    $("#gh-user-data").html(""); // Clear the <div>, otherwise old data remains with an empty box
    $("#gh-repo-data").html(""); // Clear the <div>, otherwise old data remains with an empty box

    var username = $("#gh-username").val();
    if (!username) {
        $("#gh-user-data").html(`<h2>Please enter a GitHub username</h2>`);
        return;
    }

    $("#gh-user-data").html(
        `<div id="loader">
            <img src="assets/css/loader.gif" alt="loading..." />
        </div>`);

    /* jQuery Promise: $.when().then() -- When one thing is done, then do the other, unless we get an error
    In this case, once we have a response from the GitHub API we display it in the 'gh-user-data' <div>
        <div class="center-form">
            <input type="text" id="gh-username" value="octocat" oninput="fetchGitHubInformation()" />
            <div id="gh-user-data"></div>
            <div id="gh-repo-data"></div>
        </div> */
    $.when(
        $.getJSON(`https://api.github.com/users/${username}`),
        $.getJSON(`https://api.github.com/users/${username}/repos`)
    ).then(
        function (firstResponse, secondResponse) {
            var userData = firstResponse[0];
            var repoData = secondResponse[0];
            $("#gh-user-data").html(userInformationHTML(userData));
            $("#gh-repo-data").html(repoInformationHTML(repoData));
        },
        function (errorResponse) {
            if (errorResponse.status === 404) {
                $("#gh-user-data").html(
                    `<h2>No info found for user ${username}</h2>`);
            } else if (errorResponse.status === 403) { // Throttling response -- we've exceeded the API call limit
                var resetTime = new Date(errorResponse.getResponseHeader('X-RateLimit-Reset') * 1000); // Convert the reset time to a user-readable format
                $("#gh-user-data").html(`<h4>Too many requests, please wait until ${resetTime.toLocaleTimeString()}</h4>`);
            } else {
                console.log(errorResponse);
                $("#gh-user-data").html(
                    `<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
            }
        });
}

/* To have the default GitHub profile displayed, instead of an empty <div>,
the function is executing 'fetchGitHubInformation()' only when the DOM is fully loaded. */
$(document).ready(fetchGitHubInformation);