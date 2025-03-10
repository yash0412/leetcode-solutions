"use strict";
const paranthesisMap = {
    ')': '(',
    ']': '[',
    '}': '{',
};
function isValid(s) {
    const stack = [];
    const paranthesisChars = s.split('');
    for (let i = 0; i < paranthesisChars.length; i++) {
        const char = paranthesisChars[i];
        switch (char) {
            case '(':
            case '[':
            case '{':
                stack.push(char);
                break;
            case ')':
            case ']':
            case '}':
                if (stack.length === 0) {
                    return false;
                }
                const stackTop = stack[stack.length - 1];
                if (stackTop === paranthesisMap[char]) {
                    stack.pop();
                }
                else {
                    return false;
                }
        }
    }
    return stack.length === 0;
}
console.log(isValid('()[]{}{'));
