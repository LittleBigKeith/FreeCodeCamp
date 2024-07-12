#!/bin/bash

# Periodic Table query system
# Usage:
# [1] ./element.sh 1
# [2] ./element.sh 2
# [3] ./element.sh 3

if [[ $1 = 'khlkeith' ]]
then
        PSQL="psql --dbname=postgres -t -c"
else
        PSQL="psql --username=freecodecamp --dbname=periodic_table -t -c"
fi

# 1
$PSQL "ALTER TABLE properties RENAME COLUMN weight TO atomic_mass" 1>/dev/null 2>/dev/null
# 2
$PSQL "ALTER TABLE properties RENAME COLUMN melting_point TO melting_point_celsius" 1>/dev/null 2>/dev/null
$PSQL "ALTER TABLE properties RENAME COLUMN boiling_point TO boiling_point_celsius" 1>/dev/null 2>/dev/null
# 3
$PSQL "ALTER TABLE properties ALTER COLUMN melting_point_celsius SET NOT NULL" 1>/dev/null 2>/dev/null
$PSQL "ALTER TABLE properties ALTER COLUMN boiling_point_celsius SET NOT NULL" 1>/dev/null 2>/dev/null
# 4
$PSQL "ALTER TABLE elements DROP CONSTRAINT IF EXISTS unique_symbol" 1>/dev/null 2>/dev/null
$PSQL "ALTER TABLE elements DROP CONSTRAINT IF EXISTS unique_name" 1>/dev/null 2>/dev/null
$PSQL "ALTER TABLE elements ADD CONSTRAINT unique_symbol UNIQUE (symbol)" 1>/dev/null 2>/dev/null
$PSQL "ALTER TABLE elements ADD CONSTRAINT unique_name UNIQUE (name)" 1>/dev/null 2>/dev/null
# 5
$PSQL "ALTER TABLE elements ALTER COLUMN symbol SET NOT NULL" 1>/dev/null 2>/dev/null
$PSQL "ALTER TABLE elements ALTER COLUMN name SET NOT NULL" 1>/dev/null 2>/dev/null
# 6
$PSQL "ALTER TABLE properties ADD FOREIGN KEY(atomic_number) REFERENCES elements(atomic_number)" 1>/dev/null 2>/dev/null
# 7, 8, 9
$PSQL "CREATE TABLE IF NOT EXISTS types(type_id SERIAL PRIMARY KEY, type VARCHAR(30) NOT NULL)" 1>/dev/null 2>/dev/null
# 10
TYPE_COUNT=$($PSQL "SELECT * FROM types")
if [[ -z $TYPE_COUNT ]]
then
  echo "HELLO"
  $PSQL "INSERT INTO types(type) VALUES('nonmetal'), ('metal'), ('metalloid')" 1>/dev/null 2>/dev/null
fi
# 11, 12
$PSQL "ALTER TABLE properties ADD COLUMN IF NOT EXISTS type_id INT" 1>/dev/null 2>/dev/null
$PSQL "ALTER TABLE properties ADD FOREIGN KEY(type_id) REFERENCES types(type_id)" 1>/dev/null 2>/dev/null
for TYPE_NAME in metal nonmetal metalloid
do
        TYPE_ID=$($PSQL "SELECT type_id FROM types WHERE type='$TYPE_NAME'")
        $PSQL "UPDATE properties SET type_id=$TYPE_ID WHERE type='$TYPE_NAME'" 1>/dev/null 2>/dev/null
done
$PSQL "ALTER TABLE properties ALTER COLUMN type_id SET NOT NULL" 1>/dev/null 2>/dev/null
$PSQL "ALTER TABLE properties DROP COLUMN type" 1>/dev/null 2>/dev/null
#13
$PSQL "UPDATE elements SET symbol=INITCAP(symbol)" 1>/dev/null 2>/dev/null
#14
$PSQL "ALTER TABLE properties ALTER COLUMN atomic_mass TYPE REAL" 1>/dev/null 2>/dev/null
#15
TYPE_ID=$($PSQL "SELECT type_id FROM types WHERE type='nonmetal'")
$PSQL "INSERT INTO elements(atomic_number, symbol, name) VALUES(9, 'F', 'Fluorine') ON CONFLICT(atomic_number) DO NOTHING" 1>/dev/null 2>/dev/null
$PSQL "INSERT INTO properties(atomic_number, atomic_mass, melting_point_celsius, boiling_point_celsius, type_id) VALUES(9, 18.998, -220, -188.1, $TYPE_ID) ON CONFLICT(atomic_number) DO NOTHING" 1>/dev/null 2>/dev/null
#16
TYPE_ID=$($PSQL "SELECT type_id FROM types WHERE type='nonmetal'")
$PSQL "INSERT INTO elements(atomic_number, symbol, name) VALUES(10, 'Ne', 'Neon') ON CONFLICT(atomic_number) DO NOTHING" 1>/dev/null 2>/dev/null
$PSQL "INSERT INTO properties(atomic_number, atomic_mass, melting_point_celsius, boiling_point_celsius, type_id) VALUES(10, 20.18, -248.6, -246.1, $TYPE_ID) ON CONFLICT(atomic_number) DO NOTHING" 1>/dev/null 2>/dev/null
#30
$PSQL "DELETE FROM elements WHERE atomic_number=1000" 1>/dev/null 2>/dev/null
$PSQL "DELETE FROM properties WHERE atomic_number=1000" 1>/dev/null 2>/dev/null

if [[ $1 ]]
then
  ELEMENT_ID=$($PSQL "SELECT atomic_number FROM elements WHERE symbol='$1' OR name='$1'")
  if [[ -z $ELEMENT_ID ]]
	then
	  ELEMENT_ID=$($PSQL "SELECT atomic_number FROM elements WHERE atomic_number=$1")
  fi
	if [[ -z $ELEMENT_ID ]]
	then
		echo I could not find that element in the database.
	else
		echo $($PSQL "SELECT * FROM elements WHERE atomic_number='$ELEMENT_ID'") | while read ATOMIC_NUMBER BAR SYMBOL BAR NAME
		do
      echo $($PSQL "SELECT * FROM properties WHERE atomic_number='$ELEMENT_ID'") | while read ATOMIC_NUMBER BAR ATOMIC_MASS BAR MELTING_POINT_CELSIUS BAR BOILING_POINT_CELSIUS BAR TYPE_ID
      do
        TYPE=$($PSQL "SELECT type FROM types WHERE type_id=$TYPE_ID")
			  echo "The element with atomic number $ATOMIC_NUMBER is $NAME ($SYMBOL). It's a$TYPE, with a mass of $ATOMIC_MASS amu. $NAME has a melting point of $MELTING_POINT_CELSIUS celsius and a boiling point of $BOILING_POINT_CELSIUS celsius."
      done
		done
	fi
else
	echo Please provide an element as an argument. 
fi