function longestPalindrome(s: string): string {
  return '';
}

function reverseString(s: string): string {
  return s.split('').reduce((reversed: string, b: string) => b + reversed, '');
}
