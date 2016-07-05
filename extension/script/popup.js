var STORAGE_KEY = 'github-repos';

$(function() {
  if (localStorage[STORAGE_KEY] === undefined) {
    localStorage[STORAGE_KEY] = 'MattyAyOh/Mortality';
  }

  var githubRepos = $.trim(localStorage[STORAGE_KEY]).split("\n");
  var user, repo, href;
  for (var i = 0, path, user, repo, href; i < githubRepos.length; i++) {
    path = githubRepos[i].split('/');
    user = path[0];
    repo = path[1];
    href = 'https://github.com/' + user + '/' + repo + '/issues/new';
    $('#repos').append('<li>' +
      '<a href="' + href + '">' + user + '/<strong>' + repo + '</strong></a>' +
    '</li>');
  }

  if( githubRepos.length == 1 )
  {
    var templateName = "ISSUETEMPLATE.md";
    if( repo.indexOf('[') > -1 )
    {
      templateName = repo.substring(repo.lastIndexOf("[")+1,repo.lastIndexOf("]")) + ".md";
    }
    chrome.runtime.sendMessage({method: "saveTemplateLocation", location: 'https://github.com/' + user + '/' + repo + '/blob/master/' + templateName }, function(response) {});
    chrome.tabs.create({url: href});
    window.close();
  }


  $('#repos a').click(function(e) {
    e.preventDefault();
    var repoLocation = $(e.currentTarget).attr('href');
    path = repoLocation.split('/');
    user = path[3];
    repo = path[4];
    var templateName = "ISSUETEMPLATE.md";
    if( repo.indexOf('[') > -1 )
    {
      templateName = repo.substring(repo.lastIndexOf("[")+1,repo.lastIndexOf("]")) + ".md";
    }
    chrome.runtime.sendMessage({method: "saveTemplateLocation", location: 'https://github.com/' + user + '/' + repo + '/blob/master/' + templateName }, function(response) {});

    chrome.tabs.create({url: repoLocation});
    window.close();
  });
});
