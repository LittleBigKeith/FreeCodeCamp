#!/bin/bash

if [[ $1 = 'khlkeith' ]]
then
	PSQL="psql --dbname=postgres --tuples-only -c"
else
	PSQL="psql --username=freecodecamp --dbname=salon --tuples-only -c"
fi

$PSQL "CREATE TABLE IF NOT EXISTS customers(customer_id SERIAL PRIMARY KEY, phone VARCHAR(30) UNIQUE, name VARCHAR(30))" 1>/dev/null 2>/dev/null
$PSQL "CREATE TABLE IF NOT EXISTS services(service_id SERIAL PRIMARY KEY, name VARCHAR(30))" 1>/dev/null 2>/dev/null
$PSQL "CREATE TABLE IF NOT EXISTS appointments(appointment_id SERIAL PRIMARY KEY, customer_id INT REFERENCES customers(customer_id), service_id INT REFERENCES services(service_id), time VARCHAR(30))" 1>/dev/null 2>/dev/null

SERVICE_COUNT=$($PSQL "SELECT COUNT(*) FROM SERVICES")
if [[ $SERVICE_COUNT -eq 0 ]]
then
	$PSQL "INSERT INTO services(name) VALUES('wash, cut & blow'), ('cut only'), ('semi-permanent dye')" > /dev/null
fi


echo -e "\n\n~~~~~ 852 Salon ~~~~~\n"

add_new_customer() {
	echo -e "\nI don't have a record for that phone number, what's your name?"
	read CUSTOMER_NAME
	$PSQL "INSERT INTO customers(phone, name) VALUES('$CUSTOMER_PHONE', '$CUSTOMER_NAME')" > /dev/null
	CUSTOMER_ID=$($PSQL "SELECT customer_id FROM customers WHERE phone='$CUSTOMER_PHONE'")
	schedule_service
}

schedule_service() {
	echo -e "\nWhat time would you like your cut, $CUSTOMER_NAME?"
	read SERVICE_TIME
	$PSQL "INSERT INTO appointments(customer_id, service_id, time) VALUES($CUSTOMER_ID, $SERVICE_ID_SELECTED, '$SERVICE_TIME')" > /dev/null
  SERVICE_NAME=$($PSQL "SELECT name FROM services WHERE service_id=$SERVICE_ID_SELECTED")
	echo -e "\nI have put you down for a $SERVICE_NAME at $SERVICE_TIME, $CUSTOMER_NAME".
}

find_customer() {
	echo -e "\nWhat's your phone number?"
	read CUSTOMER_PHONE
	CUSTOMER_ID=$($PSQL "SELECT customer_id FROM customers WHERE phone='$CUSTOMER_PHONE'")
	CUSTOMER_NAME=$($PSQL "SELECT name FROM customers WHERE phone='$CUSTOMER_PHONE'")
	if [[ -z $CUSTOMER_ID ]]
	then
	    add_new_customer
	else
        schedule_service
	fi
}

read_service() {
	read SERVICE_ID_SELECTED
	SUBBED_SERVICE_ID_SELECTED=$(echo $SERVICE_ID_SELECTED | sed -E 's/^[0-9]+$//g')
	if [[ -n $SUBBED_SERVICE_ID_SELECTED ]]
	then
	   list_service "Please enter a valid number. What would you like today?"
	else
	   SERVICE_NAME=$($PSQL "SELECT name FROM services WHERE service_id=$SERVICE_ID_SELECTED")
	   if [[ -z $SERVICE_NAME ]]
	   then
	      list_service "\nI could not find that service. What would you like today?"
	   else
              find_customer
	   fi
	fi
}

list_service() {
	if [[ $1 ]]
	then
		echo -e "$1\n"
	fi
	echo "$($PSQL "SELECT * FROM services")" | while read SERVICE_ID_SELECTED BAR SERVICE_NAME
	do
		if [[ $SERVICE_NAME != 'name' ]]
		then
			echo "$SERVICE_ID_SELECTED) $SERVICE_NAME"
		fi
	done
	read_service
}

list_service "Welcome to 852 Salon. How may I help you?"
