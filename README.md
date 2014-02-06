min
===

Minimal prog lang

Picture: -  
    (This is not a placeholder for a picture to come. This picture best describes the language)  

###What is it?  

Min is a minimal programming language where most key words and symbols are one symbol. It is statically typed. Programs in min are automatically minified so as to use very little memory. If you want something readable, min is not for you, try manatee instead.


###Examples:

```
//min and java             
$str="hello" "world"      
String str = "hello" + "world";  
//non leading white spaces are string concatenation so white spaces cannot be in the middle of statements unless for concatenation  

\#num=3                    
double num = 3;  
\#n=2,n=4                  
double n = 2, n = 4;  


//min  
//Why have 2 different ways for if statements, the ? : is used for all is statements  
?a>b                      
    '"hello world" //' is for print  
:?a~b  
    '"Googbye world"  
:  
    '"the world" " does not exist"  
 

//java  
if (a < b) {  
    System.out.println("hello world");  
} else if (a == b) {  
    System.out.println("Goodbye world");  
} else  
    System.out.println("the world" + " does not exist");  
}  
```
 
###Macro Syntax:

```
declarations -> variableDec |  
                functionDec |  
                clasDec  
                
variableDec ->  (type)(identifier)(=literal)? |  
                (type)(identifier'['']')(='['((literal,)*literal)?']')? |  
                _identifier'('')'  
                
statements -> literal |  
              declaration |   
              expression |  
              
expressions -> exp([|&]exp)?  
exp -> exp1((~|~>|<~|<|>)exp1)?  
exp1 -> exp2(!)?  
exp2 -> exp3(^exp3)?  
exp3 -> exp4([+-]exp4)  
exp4 -> exp5([*/]exp5)?  
exp5 -> numeric_literal  


blocks -> 
(\s{4}\*)statement(((1)statement)\*)?  //pythonic dynamic whitespacing  
```


###Micro Syntax:  
```
keysymbol -> ? |     //if  
            : |     //else  
            % |     //for
            @ |     //while  
            :? |    //else if  
            _ |     //function 
            ; |     //class
            ` |     //return 
            
identifier -> ^[a-zA-z0-9]{1,9}$  

literal -> string_literal |
           numeric_literal
           
string_literal -> '"' (\w | \" | \n | \\ | \u[0-9A-F]{4})* '"'  

numberic_literal -> \d*.\d*  

operator -> * |  
             ^ |  
             - |  
             + |  
             / |  
             ! |
             & |
             | |
             \s |  
             < |  
             > |  
             ~ |  
             <~ |  
             >~ |  
             '  
             
type -> # |  
        $ |  
        #[] |
        $[]
        
comment -> (comments are a waste of space and have no place in min!)  
```




