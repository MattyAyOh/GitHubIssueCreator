var $ISSUE_TITLE = $('.composer [name="issue[title]"]');
var $ISSUE_BODY = $('.composer [name="issue[body]"]');

$(function() {
  var TEMPLATE_PATH = 'https://github.com/MattyAyOh/GitHubIssueCreator/master/ISSUETEMPLATE.md';

  chrome.runtime.sendMessage(
    {method: "getTemplateLocation"}, function(response)
    {
      $ISSUE_TITLE.prop('placeholder', "Title (The most important part of the issue)");

      TEMPLATE_PATH = response.location;
      if( response.defaultChecked == 'YES' )
      {
        var savedTemplate = response.savedTemplate;
        if( savedTemplate == "")
        {
          $ISSUE_BODY.prop('placeholder', "ERROR: Your saved template is empty");
        }
        else
        {
          $ISSUE_BODY.val(response.savedTemplate);
          $ISSUE_BODY.prop('placeholder', "HEY!  Don't ignore the issue template.");
        }
      }

      else
      {
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
        }).fail(function()
        {
          $ISSUE_TITLE.prop('placeholder', "Title (ERROR: ISSUETEMPLATE.MD NOT FOUND.  LOADING DEFAULT TEMPLATE)");

          var TEMPLATE_PATH = 'https://github.com/MattyAyOh/GitHubIssueCreator/blob/master/ISSUETEMPLATE.md';
          $.get(TEMPLATE_PATH, function(contents, status)
          {
            console.log(status);
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
          }).fail(function()
          {
            $ISSUE_BODY.prop('placeholder', "Couldn't fetch issue template. Sorry!");
          });
        });
      }


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
