#!/bin/bash

if [[ $1 == "test" ]]
then
  PSQL="psql --username=postgres --dbname=worldcuptest -t --no-align -c"
elif [[ $1 == "khlkeith" ]]
then
  PSQL="psql --dbname=postgres -t --no-align -c"
else
  PSQL="psql --username=freecodecamp --dbname=worldcup -t --no-align -c"
fi

# Do not change code above this line. Use the PSQL variable above to query your database.

echo "$($PSQL "CREATE TABLE IF NOT EXISTS teams(team_id SERIAL PRIMARY KEY NOT NULL, name VARCHAR(30) NOT NULL UNIQUE)")"
echo "$($PSQL "CREATE TABLE IF NOT EXISTS games(game_id SERIAL PRIMARY KEY NOT NULL, year INT NOT NULL, round VARCHAR(30) NOT NULL, winner_id INT NOT NULL REFERENCES teams(team_id), opponent_id INT NOT NULL REFERENCES teams(team_id), winner_goals INT NOT NULL, opponent_goals INT NOT NULL)")"
echo "$($PSQL "TRUNCATE teams, games RESTART IDENTITY")"

cat games.csv | while IFS="," read YEAR ROUND WINNER OPPONENT WINNER_GOALS OPPONENT_GOALS
do
	if [[ $YEAR != 'year' ]]
	then
		echo "$($PSQL "INSERT INTO teams(name) VALUES('$WINNER') ON CONFLICT DO NOTHING")"	
		echo "$($PSQL "INSERT INTO teams(name) VALUES('$OPPONENT') ON CONFLICT DO NOTHING")"
	fi
done

cat games.csv | while IFS=',' read YEAR ROUND WINNER OPPONENT WINNER_GOALS OPPONENT_GOALS
do
	if [[ $YEAR != 'year' ]]
	then
		WINNER_ID="$($PSQL "SELECT team_id FROM teams WHERE name='$WINNER'")";
		OPPONENT_ID="$($PSQL "SELECT team_id FROM teams WHERE name='$OPPONENT'")";
		echo $WINNER_ID $OPPONENT_ID
		echo "$($PSQL "INSERT INTO games(year, round, winner_id, opponent_id, winner_goals, opponent_goals) VALUES ($YEAR, '$ROUND', $WINNER_ID, $OPPONENT_ID, $WINNER_GOALS, $OPPONENT_GOALS)")"
	fi
done
