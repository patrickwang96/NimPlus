// a cpp implementation of our nim Game
// author WANG Ruochen

#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

void print(vector<int> piles){
	cout << "The situation right now is like this: \n";
	for(int i = 1; i < piles.size(); i++)
		cout << piles[i] << '\t';
	cout << endl << endl;
}

bool isEmpty(vector<int> piles){
	for(int i = 0; i < piles.size(); i++)
		if(piles[i] != 0) return false;
	return true;
}

int main(){

	int turn = 0;//turn is odd -> player's turn, otherwise it's computer's turn

	int pile[3] = {3,5,7};
	vector<int> piles(pile,pile+3);
	piles.push_back(0);
	sort(piles.begin(),piles.end());
	vector<int> difference;
	for(int i = 0; i < piles.size();i+=2)
		difference.push_back(piles[i+1] - piles[i]);
	int stepPile[2];

	while(!isEmpty(piles)){

		turn++;
		if(turn%2 == 1){
			//player's turn
			cout << "Please input the pile you want to take(1,2,3): \n";
			cin >> stepPile[0];
			cout << "Please input the number of tokens you want to take away: \n";
			cin >> stepPile[1];

			piles[stepPile[0]] -= stepPile[1];

		}
		else{

			for(int i = 0; i < piles.size();i+=2)
				difference[i/2] = piles[i+1] - piles[i];


			int nimSum = 0;

			for(int i = 0; i < difference.size();i++){
				nimSum ^= difference[i];
			}

			if(nimSum == 0){
				for(int i = 0; i < piles.size();i++){
					if(piles[i] != 0){
						stepPile[0] = i;
						stepPile[1] = 1;
						break;
					}
				}
			}
			else{
				int eachNimSum;
				for(int i = 0; i < difference.size();i++){
					eachNimSum = nimSum ^ difference[i];
					if(eachNimSum < difference[i]) {
						stepPile[0] = i;
						stepPile[1] = difference[i] - eachNimSum;
						break;
					}
				}
			}

			//take step
			difference[stepPile[0]] -= stepPile[1];
			for(int i = 0; i < piles.size();i+=2)
				piles[i+1] = piles[i] + difference[i/2];

		}
		print(piles);
	}
	//

	cout << "Game Over!";
	if(turn % 2 == 0) cout << "You lose!\n";
	else cout << "You win!\n";


	//for(int i = 0; i < piles.size();i++)
	//	cout << piles[i] << '\t' ;
	//cout << endl;
	//for(int i = 0; i < difference.size();i++)
	//	cout << difference[i] << '\t';
	//cout << endl;

	return 0;

}
