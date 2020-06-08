using System;
using System.Collections.Generic;
using System.Linq;

namespace PalindromesFromList {
    class Program {
        static void Main(string[] args) {
            List<string> listOfStrings = new List<string> {
                "MOM", "CIVIC", "RACECAR", "mosm", "Dammit Im Mad"
            };
            PrintPalindromes(listOfStrings);
            Console.ReadKey();

            void PrintPalindromes(List<string> listOfStrings) {
                if(listOfStrings.Count > 0) { 
                    var palindromesList = new List<string>();
                    foreach (var str in listOfStrings) {
                        var stringInList = str.Replace(" ", string.Empty);
                        var reverseOfString = "";
                        for (int i = stringInList.Length - 1; i >= 0; i--) {
                            reverseOfString += stringInList[i].ToString();
                        }
                        if (reverseOfString.ToLower() == stringInList.ToLower()) {
                            palindromesList.Add(stringInList);
                        }
                    }
                    if (palindromesList.Any()) {
                        Console.WriteLine($"Following are the strings in the list that are palindrome");
                        foreach (var palindrome in palindromesList) {
                            Console.WriteLine(palindrome);
                        }
                    } else {
                        Console.WriteLine($"There are no palindromes in the list of strings provided");
                    }
                } else {
                    Console.WriteLine($"The given list is empty");
                }
            }
        }        
    }
}
