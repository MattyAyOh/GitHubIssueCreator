var STORAGE_KEY = 'github-repos';
var TEMPLATE_KEY = 'savedTemplate';

$(function() {
  var $textarea = $('#repos');
  var $templateTextArea = $('#template');
  var $submitButton = $('#save');
  var $templateCheckbox = $('#template-checkbox');
  var templateCheckbox = document.querySelector('input[id=template-checkbox]');

  if (localStorage[STORAGE_KEY] === undefined)
  {
    localStorage[STORAGE_KEY] = 'MattyAyOh/GitHubIssueCreator';
  }

  if (localStorage.getItem("templateChecked") == "YES")
  {
    templateCheckbox.checked = true;
    $templateTextArea.val(localStorage[TEMPLATE_KEY]);
  }
  showTemplateTextAreaIf(templateCheckbox.checked);

  templateCheckbox.addEventListener('change', function ()
  {
    showTemplateTextAreaIf(templateCheckbox.checked);
  });

  $textarea.val(localStorage[STORAGE_KEY]);
  $submitButton.click(function()
  {
    localStorage[STORAGE_KEY] = $textarea.val();
    isTemplateChecked = templateCheckbox.checked;
    isTemplateChecked ? localStorage.setItem("templateChecked", "YES") : localStorage.removeItem("templateChecked");
    isTemplateChecked ? localStorage.setItem(TEMPLATE_KEY, $templateTextArea.val()) : localStorage.removeItem(TEMPLATE_KEY);
    chrome.tabs.getCurrent(function(tab)
    {
    	chrome.tabs.remove(tab.id, function() { });
    });
  });
});

function showTemplateTextAreaIf(isChecked) {
  if (isChecked) {
      $('#template').show();
      $('#template-label').show();
  } else {
      $('#template').hide();
      $('#template-label').hide();
  }
}
