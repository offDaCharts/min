import sys
import math

poly = sys.argv[1]
x = int(sys.argv[2])

def parseTerm(poly):
    termValue = 1
    if poly[0] == '-':
        termValue = -1 * termValue
        poly = poly[1:]
    if int(poly[0]) and not math.isnan(int(poly[0])):
        termValue = termValue * int(poly[0])
        poly = poly[1:]
    if poly[0] == 'x':
        if len(poly) > 1 and poly[1] == '^':
            termValue = termValue * x**int(poly[2])
            poly = poly[3:]
        else:
            termValue = termValue * x           
            poly = poly[1:]
    return [termValue, poly]



exp, poly = parseTerm(poly)

while len(poly) and (poly[0] == '+' or poly[0] == '*'):
    if poly[0] == '+':
        poly = poly[1:]
        exp  = exp + parseTerm()

    if poly[0] == '-':
        poly = poly[1:]
        exp  = exp - parseTerm()

print exp

