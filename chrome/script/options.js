var STORAGE_KEY = 'github-repos';

$(function() {
  var $textarea = $('#repos');
  var $submitButton = $('#save');

  if (localStorage[STORAGE_KEY] === undefined) {
    localStorage[STORAGE_KEY] = 'MattyAyOh/GitHubIssueGenerator';
  }

  $textarea.val(localStorage[STORAGE_KEY]);
  console.log(localStorage['issueTemplate']);
  $submitButton.click(function() {
    localStorage[STORAGE_KEY] = $textarea.val();
  });
});
