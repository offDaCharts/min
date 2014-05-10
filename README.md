min
===

Minimal prog lang

Picture: -  
    (This is not a placeholder for a picture to come. This picture best describes the language)  

#What is it?  

Min is a minimal programming language where most key words and symbols are one symbol. It is statically typed. Programs in min are automatically minified so as to use very little memory. If you want something readable, min is not for you, try manatee instead.


#Examples:

#Hello World
Non leading white spaces are string concatenation 
So white spaces cannot be in the middle of statements unless for concatenation
```
Min:                                                        Javascript:
$str="hello" "world"                                        var str = "hello" + "world"
'str                                                        console.log(str)
```
  

###Number declarations
There is only one number type: \#
```
Min:                                                        Javascript:
#num=3                                                      var num = 3
#n=2                                                        var n = 2
#a                                                          var a
```

###Functions
```
Min:                                                        Javascript:
_add2(num)                                                  function add2(num) {
    `num+2                                                      return num+2
                                                            }
```


###Conditionals
Why have 2 different ways for if statements? In min, the ? : is used for all is statements  
Also, dynamic whitespacing is used for blocks instead of braces
```
Min:                                                        Javascript:
?a>b                                                        if (a < b) {  
    '"hello world"                                          console.log("hello world");  
:?a~b                                                       } else if (a == b) { 
    '"Googbye world"                                        console.log("Goodbye world"); 
:                                                           } else 
    '"the world" " does not exist"                          console.log("the world" + " does not exist");
                                                            }
``` 


###Loops
```
Min:                                                        Javascript:
%#i=0,i<5,i+=1                                              for(var i = 0; i < 5; i++) {
    '"hello 5 times"                                             console.log("hello 5 times"); 
                                                            }
``` 

#Syntax
 
###Macro Syntax:

```
declarations    ->  variableDec |  
                    functionDec 
                    
variableDec     ->  (type)(identifier)(=literal)? |  
                    (type)(identifier'['']')(='['((literal,)*literal)?']')? |  
                    _identifier'('')'  
                
functionDec     ->  _identifier=\((identifier,)*identifier\) block

classDec        ->  ;identifier block
                

statement      ->  literal |  
                    declaration |   
                    expression |  

forLoop         -> %variableDec,condition,assignment block
              
expressions     ->  exp([|&]exp)?  
exp             -> exp1((~|~>|<~|<|>)exp1)?  
exp1            ->  exp2(!)?  
exp2            ->  exp3(^exp3)?  
exp3            ->  exp4([+-]exp4)  
exp4            ->  exp5([*/]exp5)?  
exp5            ->  numeric_literal |
                    identifier

block           ->  (\s{4}*)statement(((1)statement)*)  //pythonic dynamic whitespacing  
```


###Micro Syntax:  
```
keysymbol       ->  '?' |     //if  
                    ':' |     //else  
                    '%' |     //for
                    '@' |     //while  
                    ':?'|    //else if  
                    '_' |     //function 
                    '`' |     //return 
                    '\'' |    //print 
            
identifier      ->  [a-zA-Z][a-zA-Z0-9]*  

literal         ->  string_literal |
                    numeric_literal
           
string_literal  ->  '"' (\w | \" | \n | \\ | \u[0-9A-F]{4})* '"'  

numberic_literal->  \d*.\d*  

operator        ->  '*' |  
                    '^' |  
                    '-' |  
                    '+' |  
                    '/' |  
                    '!' |
                    '&' |
                    '|' |
                    '\s'|  
                    '<' |  
                    '>' |  
                    '~' |  
                    '<~'|  
                    '>~'|  
                    '`' |
                    '''
             
type -> '#' |  
        '$'
        
comment -> (comments are a waste of space and have no place in min!)  
```




