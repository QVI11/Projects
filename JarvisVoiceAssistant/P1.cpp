#include <iostream>
#include <vector>

using namespace std;

int minOperations(long long n, long long k) {
    if (n == 0) return 0;
    if (k == 1) return n;
    
    int operations = 0;
    while (n > 0) {
        long long power = 1;
        while (power <= n) {
            power *= k;
        }
        power /= k;
        
        if (power == 0) power = 1; 
        
        n -= power;
        operations++;
    }
    
    return operations;
}

int main() {
    int t;
    cin >> t;
    
    vector<pair<long long, long long>> inputs(t);
    vector<int> results(t);
    
   
    for (int i = 0; i < t; i++) {
        cin >> inputs[i].first >> inputs[i].second;
    }
    
    
    for (int i = 0; i < t; i++) {
        results[i] = minOperations(inputs[i].first, inputs[i].second);
    }
    
    
    for (int i = 0; i < t; i++) {
        cout << results[i] << endl;
    }
    
    return 0;
}