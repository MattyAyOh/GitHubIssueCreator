var STORAGE_KEY = 'github-repos';

$(function() {
  if (localStorage[STORAGE_KEY] === undefined) {
    localStorage[STORAGE_KEY] = 'MattyAyOh/GitHubIssueGenerator';
  }

  var githubRepos = $.trim(localStorage[STORAGE_KEY]).split("\n");
  for (var i = 0, path, user, repo, href; i < githubRepos.length; i++) {
    path = githubRepos[i].split('/');
    user = path[0];
    repo = path[1];
    href = 'https://github.com/' + user + '/' + repo + '/issues/new';
    $('#repos').append('<li>' +
      '<a href="' + href + '">' + user + '/<strong>' + repo + '</strong></a>' +
    '</li>');
  }


  $('#repos a').click(function(e) {
    e.preventDefault();
    var repoLocation = $(e.currentTarget).attr('href');
    path = repoLocation.split('/');
    user = path[3];
    repo = path[4];
    chrome.runtime.sendMessage({method: "saveTemplateLocation", location: 'https://github.com/' + user + '/' + repo + '/blob/master/ISSUETEMPLATE.md'}, function(response) {});
    
    chrome.tabs.create({url: repoLocation});
    window.close();
  });
});
