"use strict";
function closestPrimes(left, right) {
    let prime1 = -1, prime2 = -1;
    const result = [-1, -1];
    const primes = sieveOfEratosthenes(right);
    for (let i = left; i <= right; i++) {
        if (primes[i]) {
            if (prime1 === -1) {
                prime1 = i;
            }
            else {
                prime2 = i;
                if (prime2 - prime1 < result[1] - result[0] || result[0] === -1) {
                    result[0] = prime1;
                    result[1] = prime2;
                }
                prime1 = prime2;
            }
        }
    }
    if (result[1] === -1) {
        return [-1, -1];
    }
    return result;
}
function sieveOfEratosthenes(n) {
    // Create a boolean array "prime[0..n]"
    // and initialize all entries as true.
    // A value in prime[i] will be false
    // if 'i' is not prime, otherwise true.
    let prime = new Array(n + 1).fill(true);
    // Mark 0 and 1 as non-prime
    prime[0] = false;
    prime[1] = false;
    // Loop through numbers from 2 to sqrt(n)
    // to mark their multiples as non-prime
    for (let p = 2; p * p <= n; p++) {
        // If prime[p] is still true, it means 'p' is prime
        if (prime[p] === true) {
            // Mark all multiples of p greater
            // than or equal to p^2 as non-prime
            // Numbers less than p^2 would
            // have already been marked as non-prime
            for (let i = p * p; i <= n; i += p)
                prime[i] = false;
        }
    }
    return prime;
}
console.log(closestPrimes(19, 31));
