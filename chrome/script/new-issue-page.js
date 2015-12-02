var $ISSUE_TITLE = $('.composer [name="issue[title]"]');
var $ISSUE_BODY = $('.composer [name="issue[body]"]');

$(function() {
  var TEMPLATE_PATH = 'https://rawgit.com/MattyAyOh/GitHubIssueGenerator/master/README.md';

  chrome.runtime.sendMessage(
    {method: "getTemplateLocation"}, function(response) 
    {
      TEMPLATE_PATH = response.location;
      $ISSUE_TITLE.prop('placeholder', "Title (The most important part of the issue)");
      $ISSUE_BODY.prop('placeholder', "Loading issue template...");

      $.get(TEMPLATE_PATH, function(contents, status) 
      {
        if (status == 'success') 
        {
          var markdown = "";
          if( contents.indexOf("<code>") > -1 )
          {
            markdown = contents.split("<code>")[1].split("</code>")[0];
          }

          if( markdown == "" )
          {
            $ISSUE_BODY.prop('placeholder', "ERROR: ISSUETEMPLATE.md is not properly indented (markdown requires indents [4 spaces] to denote code)");
          }
          else
          {
            $ISSUE_BODY.prop('placeholder', "HEY!  Don't ignore the issue template.");            
          }
          $ISSUE_BODY.val(markdown);
        } 
        else 
        {
          $ISSUE_BODY.prop('placeholder', "Couldn't fetch issue template. Sorry!");
        }
      });


      $ISSUE_BODY.click(function() 
      {
        if (window.getSelection().toString().length) {
          return;
        }
        var position = $ISSUE_BODY.getCursorPosition();

        issueBody = $ISSUE_BODY.val();
        beforeCursor = issueBody.substr(0, position);
        afterCursor = issueBody.substr(position);
        afterStartBracket = beforeCursor.match(/\[[^\]]*$/);
        beforeEndBracket = afterCursor.match(/^[^\[]*\]/);
        if (afterStartBracket && beforeEndBracket) 
        {
          var selectFrom = position - afterStartBracket[0].length;
          var selectTo = position + beforeEndBracket[0].length;
          $ISSUE_BODY.selectRange(selectFrom, selectTo);
        }
      });
    }
  );


});
