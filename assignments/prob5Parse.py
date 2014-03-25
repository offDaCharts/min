import sys
import math

poly = sys.argv[1]
x = int(sys.argv[2])

def parseIntLit(poly):
    intLit = int(poly[0])
    poly = poly[1:]
    while len(poly) > 0:
        try:
            int(poly[0])
        except:
            break
        intLit = 10*intLit + int(poly[0])
        poly = poly[1:]
    return [intLit, poly]


def parseTerm(poly):
    termValue = 1
    while len(poly) > 0 and poly[0] != '+' and poly[0] != '-':
        # if len(poly) > 0 and poly[0] == '-':
        #     termValue = -1 * termValue
        #     poly = poly[1:]
        if len(poly) > 0 and poly[0].isdigit():
            intLit, poly = parseIntLit(poly)
            termValue = termValue * intLit
        if len(poly) > 0 and poly[0] == 'x':
            if len(poly) > 1 and poly[1] == '^':
                poly = poly[2:]
                exp, poly = parseIntLit(poly)
                termValue = termValue * x**exp
            else:
                termValue = termValue * x           
                poly = poly[1:]
    return [termValue, poly]



exp, poly = parseTerm(poly)

while len(poly) > 0 and (poly[0] == '+' or poly[0] == '-'):
    if poly[0] == '+':
        poly = poly[1:]
        term, poly = parseTerm(poly)
        exp  = exp + term
    elif len(poly) > 0 and poly[0] == '-':
        poly = poly[1:]
        term, poly = parseTerm(poly)
        exp  = exp - term

print exp

