var STORAGE_KEY = 'github-repos';
var TEMPLATE_KEY = 'savedTemplate';

$(function() {
  var $textarea = $('#repos');
  var $templateTextArea = $('#template');
  var $submitButton = $('#save');
  var $templateCheckbox = $('#template-checkbox');
  var templateCheckbox = document.querySelector('input[id=template-checkbox]');
  var themeCheckbox = document.querySelector('input[id=theme-checkbox]');

  if (localStorage[STORAGE_KEY] === undefined)
  {
    localStorage[STORAGE_KEY] = 'MattyAyOh/Mortality';
  }

  if (localStorage.getItem("templateChecked") == "YES")
  {
    templateCheckbox.checked = true;
    $templateTextArea.val(localStorage[TEMPLATE_KEY]);
  }

  if( localStorage.getItem("white") == "YES" )
  {
    themeCheckbox.checked = true;
    chrome.browserAction.setIcon({path: "../github.png"});
  }
  else
  {
    chrome.browserAction.setIcon({path: "../github2.png"});
  }

  themeCheckbox.addEventListener('change', function()
  {
    updateThemeToWhiteIf(themeCheckbox.checked);
  });

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

function updateThemeToWhiteIf(isChecked) 
{
  if( isChecked )
  {
    localStorage.setItem("white", "YES");
    chrome.browserAction.setIcon({path: "../github.png"});
  }
  else
  {
    localStorage.removeItem("white");
    chrome.browserAction.setIcon({path: "../github2.png"});
  }
}
function showTemplateTextAreaIf(isChecked) 
{
  if( isChecked ) 
  {
      $('#template').show();
      $('#template-label').show();
  } 
  else 
  {
      $('#template').hide();
      $('#template-label').hide();
  }
}
