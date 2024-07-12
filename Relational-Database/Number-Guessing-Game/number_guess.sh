#!/bin/bash

# usage: ./number_guess.sh

if [[ $1 = 'khlkeith' ]]
then
	PSQL="psql --dbname=postgres -t -c"
else
	PSQL="psql --username=freecodecamp --dbname=number_guess -t -c"
fi

$PSQL "CREATE TABLE IF NOT EXISTS players(username VARCHAR(50), games_played INT DEFAULT 0, best_game INT DEFAULT 0)" 1>/dev/null 2>/dev/null
echo "Enter your username:"
read INPUT
USER_INFO=$($PSQL "SELECT * FROM players WHERE username='$INPUT'")
if [[ -z $USER_INFO ]]
then
	USERNAME=$INPUT
	echo Welcome, "$USERNAME"! It looks like this is your first time here.
	$PSQL "INSERT INTO players VALUES('$USERNAME')" 1>/dev/null 2>/dev/null
    USER_INFO=$($PSQL "SELECT * FROM players WHERE username='$USERNAME'")
else
	echo "$USER_INFO" | while read USERNAME BAR GAMES_PLAYED BAR BEST_GAME
	do
		echo "Welcome back, $USERNAME! You have played $GAMES_PLAYED games, and your best game took $BEST_GAME guesses."
	done
fi


SECRET_NUMBER=$(( RANDOM % 1000 + 1 ))
GUESS=-1
ROUND=0
echo "Guess the secret number between 1 and 1000:"
while [[ $GUESS != "$SECRET_NUMBER" ]]
do
  (( ROUND++ ))
	read GUESS
	while [[ -n $(echo "$GUESS" | sed -E 's/^[0-9]+$//g') ]]
	do
		echo That is not an integer, guess again:
	 	read GUESS
	done
	if [[ $GUESS -lt $SECRET_NUMBER ]]
	then
		echo "It's higher than that, guess again:"
	elif [[ $GUESS -gt $SECRET_NUMBER ]]
	then
		echo "It's lower than that, guess again:"
	fi
done

echo "You guessed it in $ROUND tries. The secret number was $SECRET_NUMBER. Nice job!"
echo "$USER_INFO" | while read USERNAME BAR GAMES_PLAYED BAR BEST_GAME
do
(( GAMES_PLAYED++ ))
$PSQL "UPDATE players SET games_played=$GAMES_PLAYED where username='$USERNAME'" 1>/dev/null 2>/dev/null
if [[ $ROUND -lt $BEST_GAME || $BEST_GAME -eq 0 ]]
then
	$PSQL "UPDATE players SET best_game=$((ROUND + 1)) where username='$USERNAME'" 1>/dev/null 2>/dev/null
fi
done