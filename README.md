# fd-spaces-node
The status of the meeting rooms are updated, considering the pre-booking details and whether the room is occupied at that particular instance or not.

Procedure to execute the project:

=> Enter these commands in order:

	rvm install 2.3.1
	
=> Run from directory where solo.rb exists(chef-folder and solo.rb must be in same location):
	
	gem install chef
	
	chef-solo -c ~solo.rb -j ~/chef_folder/node.json

=> Go to the folder where package.json exists:
	
	npm install	
	
	db-migrate create meeting
	
	db-migrate up
	
	node fixture.js
	
=> To start node server:

	grunt

=> Open another terminal for Rails server:
	
	rails s	

=> For testing purposes:
	
	npm test
