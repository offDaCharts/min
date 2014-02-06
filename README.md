min
===

Minimal prog lang

What is it?

Min is a minimal programming language where most key words and symbols are one character. Programs in min are automatically minified so as to use very little memory. If you want something readable, min is not for you, try manatee instead.


Examples:

//min                     //java  
$str="hello" "world"      String str = "hello" + "world";  
//non leading white spaces are string concatenation so white spaces cannot be in the middle of statements unless for concatenation  
\#num=3                    double num = 3;  
\#n=2,n=4                  double n = 2, n = 4;  
Bb=T                      boolean b = true;  

//min  
//Why have 2 different ways for if statements, the ? : is used for all is statements  
?a>b                      
    P"hello world" //P is for print  
:?a~b  
    P"Googbye world"  
:  
    P"the world does not exist"  
 

//java  
if (a < b) {  
    System.out.println("hello world");  
} else if (a == b) {  
    System.out.println("Goodbye world");  
} else  
    System.out.println("the world does not exist");  
}  


//F -> for  

//W -> while  







