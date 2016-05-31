var _ = require('lodash');
var tokenGenerator = require('../TokenGenerator.js');
var stringUtility = require('./StringUtility.js');
var tokenGenerator = require('./DiversificationTokenGenerator.js');


var SQLCommandsDictionary = ["ALTER","ANALYZE","BACKUP","CHANGE","CHECK","COMMIT","CREATE","DELETE","DESCRIBE","DO","DROP","EXPLAIN","FLUSH","GRANT","HANDLER","INSERT","JOIN","KILL","LOAD","FROM","TABLE","RENAME","REPLACE","REVOKE",
"SELECT","SET","SHOW","START","STOP","TRUNCATE","UNION","USE","WHERE","ORDER","BY"];


String.prototype.format = function() {
  var args = arguments;
  return this.replace(/{(\d+)}/g, function(match, number) {
    return typeof args[number] != 'undefined'
      ? args[number]
      : match
    ;
  });
};

exports.generateTokenizedQuery = function(query)
{
    var queryArray = stringToArray(query);
    var token = tokenGenerator.token();
    var tokenizedString = "";
    for (var i = 0; i< queryArray.length;i++)
    {
      var word = queryArray[i].toUpperCase();
      var wordIndex = findStringInArray(SQLCommandsDictionary,word);

      //console.log("word :" +word);
      if  (wordIndex > 0)
      {
        tokenizedString= tokenizedString + queryArray[i]+token+" ";
      }
      else
      {
        tokenizedString = tokenizedString+queryArray[i]+" ";
      }
    }
    //console.log(tokenizedString);
    var returnValue = {tokenizedQuery:tokenizedString, token:token};
    console.log("Query Tokenizado:"+ tokenizedString + " token:" + token);
    return returnValue;
};

  exports.checkIfIsValidQuery = function(query, token)
  {
    var queryArray = stringToArray(query);
    for (var i = 0; i< queryArray.length;i++)
    {
       var tokenStartPosition = queryArray[i].indexOf(token);

       //If is not a tokenized command or string;
       if (tokenStartPosition > -1)
       {
         //Check if this command should be tokenized, if should return false, because is a invalid (SQL injected) query.
         if  (_.findIndex(SQLCommandsDictionary, queryArray[i]) > 0)
         {
           return false;
         }
       }
    }
    return true;
  };


  /**
   * Return a vector with words that contains the string.
   * @param  {[type]} string string
   * @return {[type]}        [description]
   */
  function stringToArray(string)
  {
    return string.match(/\S+/g);
  }

  function findStringInArray(array, string)
  {
    var returnValue = -1;
    for (var i = 0; i < array.length; i++)
    {
      returnValue = i;
      if (array[i] == string)
      {
        return returnValue;
      }
    }
    return -1;
  }
